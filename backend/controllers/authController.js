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
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Por favor, proporciona todos los campos necesarios' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const user = await User.create({
      email,
      password, // La contraseña se encriptará automáticamente en el esquema
      username,
      avatar
    });

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor, proporciona todos los campos necesarios' });
    }

    const user = await User.findOne({ email });

    console.log('Usuario encontrado para el email:', user);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Comparación de contraseñas:', isMatch, 'Ingresada:', password, 'Almacenada:', user.password);

      if (isMatch) {
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
    } else {
      res.status(401).json({ message: 'Credenciales no válidas' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};