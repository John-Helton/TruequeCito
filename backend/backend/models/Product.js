const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [String],
  approved: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
