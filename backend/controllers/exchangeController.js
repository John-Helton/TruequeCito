  const Exchange = require('../models/Exchange');
  const User = require('../models/User');
  const { v4: uuidv4 } = require('uuid');

  // Función para generar un código único
  const generateUniqueCode = () => uuidv4().slice(0, 10).toUpperCase();

  // Proponer un intercambio
  exports.proposeExchange = async (req, res) => {
    const { productOffered, productRequested } = req.body;
    try {
      const uniqueCode = generateUniqueCode();
      console.log('Generated unique code:', uniqueCode);
      const exchange = new Exchange({
        productOffered,
        productRequested,
        userOffered: req.user.id,
        userRequested: req.body.userRequested,
        uniqueCode
      });
      await exchange.save();
      console.log('Exchange created with unique code:', uniqueCode);
      res.status(201).json({ message: 'Exchange proposed successfully', exchange });
    } catch (error) {
      console.error('Error proposing exchange:', error);
      res.status(500).json({ error: error.message });
    }
  };
  //Obtener todos los intercabios
  exports.getAllExchanges = async (req, res) => {
    try {
      // Verifica que el modelo Exchange esté correctamente configurado
      const exchanges = await Exchange.find()
        .populate({
          path: 'productOffered',
          select: 'title description images',
        })
        .populate({
          path: 'productRequested',
          select: 'title description images',
        })
        .populate({
          path: 'userOffered',
          select: 'username email',
        })
        .populate({
          path: 'userRequested',
          select: 'username email',
        });
  
      // Devuelve la respuesta exitosa con los intercambios
      res.status(200).json(exchanges);
    } catch (error) {
      // Log de error para depuración
      console.error('Error fetching all exchanges:', error.message);
  
      // Respuesta con error
      res.status(500).json({ error: 'Error fetching exchanges, please try again later' });
    }
  };
  // Obtener intercambios completados
exports.getCompletedExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.find({ status: 'completed' })
      .populate({
        path: 'productOffered',
        select: 'title description images',
      })
      .populate({
        path: 'productRequested',
        select: 'title description images',
      })
      .populate({
        path: 'userOffered',
        select: 'username email',
      })
      .populate({
        path: 'userRequested',
        select: 'username email',
      });

    res.status(200).json(exchanges);
  } catch (error) {
    console.error('Error fetching completed exchanges:', error.message);
    res.status(500).json({ error: 'Error fetching completed exchanges, please try again later' });
  }
};

  // Obtener intercambios recibidos
  exports.getReceivedExchanges = async (req, res) => {
    try {
      const exchanges = await Exchange.find({ userRequested: req.user.id, status: { $in: ['pending', 'accepted'] } })
        .populate({
          path: 'productOffered',
          select: 'title description images',
        })
        .populate({
          path: 'productRequested',
          select: 'title description images',
        })
        .populate({
          path: 'userOffered',
          select: 'username email',
        })
        .populate({
          path: 'userRequested',
          select: 'username email',
        });

      const modifiedExchanges = exchanges.map(exchange => ({
        ...exchange.toObject(),
        userType: 'offered'
      }));

      res.status(200).json(modifiedExchanges);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Obtener intercambios enviados
  exports.getSentExchanges = async (req, res) => {
    try {
      const exchanges = await Exchange.find({ userOffered: req.user.id, status: { $in: ['pending', 'accepted'] } })
        .populate({
          path: 'productOffered',
          select: 'title description images',
        })
        .populate({
          path: 'productRequested',
          select: 'title description images',
        })
        .populate({
          path: 'userOffered',
          select: 'username email',
        })
        .populate({
          path: 'userRequested',
          select: 'username email',
        });

      const modifiedExchanges = exchanges.map(exchange => ({
        ...exchange.toObject(),
        userType: 'requested'
      }));

      res.status(200).json(modifiedExchanges);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Controlador para manejar la subida de los comprobantes
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
        console.log(`Notificando a ${userOffered.email} y ${userRequested.email} que el intercambio fue ${status}`);
        // Aquí puedes agregar lógica para enviar un correo o notificación
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
      console.log('Fetching exchange with ID:', exchangeId);
      const exchange = await Exchange.findById(exchangeId)
        .populate('productOffered')
        .populate('productRequested');

      if (!exchange) {
        return res.status(404).json({ message: 'Exchange not found' });
      }

      // Determinar el userType
      const userType = exchange.userOffered.toString() === req.user.id ? 'requested' : 'offered';

      console.log('Exchange fetched:', exchange);
      console.log('Exchange unique code:', exchange.uniqueCode);
      res.json({ ...exchange.toObject(), userType });
    } catch (error) {
      console.error('Error fetching exchange:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
