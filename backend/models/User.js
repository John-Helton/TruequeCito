const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  providerId: { type: String },
  provider: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  username: { type: String, required: true },
  avatar: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png' },
  exchanges: { type: Number, default: 0 },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: [] }],
  reputation: { type: Number, default: 0 }, // Añadido campo de reputación
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }], // Añadido campo de seguidores
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }], // Añadido campo de siguiendo
  likes: { type: Number, default: 0 },
  role: { type: String, default: 'user' }
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
