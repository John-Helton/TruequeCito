const User = require('../models/User');

// Obtener perfil del usuario
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Actualizar perfil del usuario
exports.updateProfile = async (req, res) => {
  const { username, avatar, exchanges, reputation } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.username = username || user.username;
    user.avatar = avatar || user.avatar;
    user.exchanges = exchanges || user.exchanges;
    user.reputation = reputation || user.reputation;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};