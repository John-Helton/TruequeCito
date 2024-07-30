const Exchange = require('../models/Exchange');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// Función para generar un código único
const generateUniqueCode = () => uuidv4().slice(0, 10).toUpperCase();

// Proponer un intercambio
exports.proposeExchange = async (req, res) => {
  const { productOffered, productRequested, userRequested } = req.body;
  try {
    const uniqueCode = generateUniqueCode();
    const exchange = new Exchange({
      productOffered,
      productRequested,
      userOffered: req.user.id,
      userRequested,
      uniqueCode
    });
    await exchange.save();

    // Crear notificación para el usuario solicitado
const notification = new Notification({
  userId: userRequested,
  message: 'Propuesta de intercambio recibida',
  timestamp: new Date(),
  read: false
});

    await notification.save();

    res.status(201).json({ message: 'Exchange proposed successfully', exchange });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener intercambios recibidos
exports.getReceivedExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.find({ userRequested: req.user.id, status: { $in: ['pending', 'accepted'] } })
      .populate('productOffered', 'title description images')
      .populate('productRequested', 'title description images')
      .populate('userOffered', 'username email')
      .populate('userRequested', 'username email');

    res.status(200).json(exchanges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener intercambios enviados
exports.getSentExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.find({ userOffered: req.user.id, status: { $in: ['pending', 'accepted'] } })
      .populate('productOffered', 'title description images')
      .populate('productRequested', 'title description images')
      .populate('userOffered', 'username email')
      .populate('userRequested', 'username email');

    res.status(200).json(exchanges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Subir comprobante
exports.uploadReceipt = async (req, res) => {
  const { exchangeId, userType } = req.body;
  const file = req.file;

  try {
    const exchange = await Exchange.findById(exchangeId);
    if (!exchange) {
      return res.status(404).json({ message: 'Intercambio no encontrado' });
    }

    if (userType === 'requested') {
      exchange.receiptRequested = file.path;
    } else if (userType === 'offered') {
      exchange.receiptOffered = file.path;
    }

    await exchange.save();

    // Verificar si ambos comprobantes han sido subidos
    if (exchange.receiptRequested && exchange.receiptOffered) {
      exchange.status = 'completed';
      await exchange.save();
      // Notificación al administrador
      console.log('Ambos comprobantes cargados, notificar al administrador.');
      // Aquí puedes agregar la lógica para notificar al administrador
    }

    res.status(200).json({ message: 'Comprobante cargado con éxito', exchange });
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar el comprobante', error: error.message });
  }
};


// Actualizar estado del intercambio
exports.updateExchangeStatus = async (req, res) => {
  const { exchangeId, status } = req.body;
  try {
    const exchange = await Exchange.findById(exchangeId);
    if (!exchange) {
      return res.status(404).json({ message: 'Exchange not found' });
    }
    if (exchange.userRequested.toString() !== req.user.id && exchange.userOffered.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this exchange' });
    }
    exchange.status = status;
    await exchange.save();

    // Notificar a los usuarios
    const userOffered = await User.findById(exchange.userOffered);
    const userRequested = await User.findById(exchange.userRequested);

    if (userOffered && userRequested) {
      const message = `El intercambio fue ${status}`;
      const notifications = [
        new Notification({ userId: userOffered._id, message, timestamp: new Date(), read: false }),
        new Notification({ userId: userRequested._id, message, timestamp: new Date(), read: false })
      ];

      await Notification.insertMany(notifications);
      console.log(`Notificando a ${userOffered.email} y ${userRequested.email} que el intercambio fue ${status}`);
    }

    res.status(200).json({ message: `Exchange ${status} successfully`, uniqueCode: exchange.uniqueCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener intercambio por ID
exports.getExchangeById = async (req, res) => {
  try {
    const exchangeId = req.params.exchangeId;
    const exchange = await Exchange.findById(exchangeId)
      .populate('productOffered')
      .populate('productRequested');

    if (!exchange) {
      return res.status(404).json({ message: 'Exchange not found' });
    }

    const userType = exchange.userOffered.toString() === req.user.id ? 'requested' : 'offered';
    res.json({ ...exchange.toObject(), userType });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
