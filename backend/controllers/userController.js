const User = require('../models/User');
const Product = require('../models/Product');
const Follower = require('../models/Follower');

// Obtener perfil del usuario autenticado
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Actualizar perfil del usuario autenticado
exports.updateProfile = async (req, res) => {
  const { username, avatar, exchanges } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.username = username || user.username;
    user.avatar = avatar || user.avatar;

    if (typeof exchanges === 'number' && exchanges >= 0) {
      user.exchanges = exchanges;
      console.log(`Exchanges antes de guardar: ${user.exchanges}`);

      if (user.exchanges >= 15) {
        user.reputation = 5;
      } else {
        user.reputation = Math.round((user.exchanges / 15) * 5);
      }
      console.log(`Reputation antes de guardar: ${user.reputation}`);
    }

    await user.save();
    console.log(`Usuario guardado: ${user}`);
    res.json(user);
  } catch (err) {
    console.error('Error actualizando perfil:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Obtener perfil de un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password').populate('products', 'title');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Calcular reputación basada en el número de intercambios
    if (user.exchanges >= 15) {
      user.reputation = 5;
    } else {
      user.reputation = Math.round((user.exchanges / 15) * 5);
    }
    console.log(`Reputation calculada en getUserById: ${user.reputation}`);
    
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Seguir a un usuario
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.userId);
    if (!userToFollow) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const currentUser = req.user;
    const existingFollow = await Follower.findOne({ user: userToFollow._id, follower: currentUser._id });

    if (!existingFollow) {
      const newFollower = new Follower({ user: userToFollow._id, follower: currentUser._id });
      await newFollower.save();
      res.json({ message: 'Usuario seguido' });
    } else {
      res.status(400).json({ message: 'Ya sigues a este usuario' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};
