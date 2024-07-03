const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
  productOffered: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productRequested: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  userOffered: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userRequested: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Exchange = mongoose.model('Exchange', exchangeSchema);

module.exports = Exchange;
