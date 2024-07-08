const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.registerUser = async (req, res) => {
  const { email, password, username, avatar } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const user = await User.create({
      email,
      password: bcrypt.hashSync(password, 10),
      username,  // Asegúrate de guardar el username
      avatar     // Asegúrate de guardar el avatar
    });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      username: user.username,  // Incluye el username en la respuesta
      avatar: user.avatar,      // Incluye el avatar en la respuesta
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
          avatar: user.avatar
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Credenciales no válidas' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};
