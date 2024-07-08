const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'https://www.gravatar.com/avatar/?d=mp' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  exchanges: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
