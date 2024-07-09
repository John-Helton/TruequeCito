const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decodificado:', decoded);
      req.user = await User.findById(decoded.id).select('-password');
      console.log('Usuario autenticado:', req.user);
      next();
    } catch (err) {
      console.error('Token inválido:', err);
      res.status(401).json({ message: 'No autorizado, token inválido' });
    }
  } else {
    console.log('Token no proporcionado');
    res.status(401).json({ message: 'No autorizado, no se encontró el token' });
  }
};

module.exports = authMiddleware;
