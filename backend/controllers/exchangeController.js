const Exchange = require('../models/Exchange');

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
    const exchanges = await Exchange.find({ userRequested: req.user.id }).populate('productOffered productRequested userOffered userRequested', 'title email');
    res.status(200).json(exchanges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSentExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.find({ userOffered: req.user.id }).populate('productOffered productRequested userOffered userRequested', 'title email');
    res.status(200).json(exchanges);
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
    res.status(200).json({ message: `Exchange ${status} successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
