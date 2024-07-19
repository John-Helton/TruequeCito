const Exchange = require('../models/Exchange');
const User = require('../models/User');

exports.proposeExchange = async (req, res) => {
  const { productOffered, productRequested } = req.body;
  try {
    const exchange = new Exchange({
      productOffered,
      productRequested,
      userOffered: req.user.id,
      userRequested: req.body.userRequested
    });
    await exchange.save();
    res.status(201).json({ message: 'Exchange proposed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReceivedExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.find({ userRequested: req.user.id, status: 'pending' })
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

    const formattedExchanges = exchanges.map(exchange => ({
      ...exchange._doc,
      productOffered: {
        ...exchange._doc.productOffered._doc,
        image: exchange._doc.productOffered.images[0]
      },
      productRequested: {
        ...exchange._doc.productRequested._doc,
        image: exchange._doc.productRequested.images[0]
      }
    }));

    res.status(200).json(formattedExchanges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSentExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.find({ userOffered: req.user.id, status: 'pending' })
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

    const formattedExchanges = exchanges.map(exchange => ({
      ...exchange._doc,
      productOffered: {
        ...exchange._doc.productOffered._doc,
        image: exchange._doc.productOffered.images[0]
      },
      productRequested: {
        ...exchange._doc.productRequested._doc,
        image: exchange._doc.productRequested.images[0]
      }
    }));

    res.status(200).json(formattedExchanges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExchangeStatus = async (req, res) => {
  const { exchangeId, status } = req.body;
  try {
    const exchange = await Exchange.findById(exchangeId);
    if (!exchange) {
      return res.status(404).json({ message: 'Exchange not found' });
    }
    if (exchange.userRequested.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this exchange' });
    }
    exchange.status = status;
    await exchange.save();

    // Notify the userOffered about the status update
    const userOffered = await User.findById(exchange.userOffered);
    if (userOffered) {
      console.log(`Notifying ${userOffered.email} that their exchange was ${status}`);
    }

    res.status(200).json({ message: `Exchange ${status} successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
