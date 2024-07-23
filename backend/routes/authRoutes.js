const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { updateProfile } = require('../controllers/userController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const generateToken = require('../utils/token');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', authMiddleware, getUserProfile);
router.put('/user/profile', authMiddleware, updateProfile);

// Ruta para iniciar el proceso de autenticación con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'] }));

// Ruta de callback a la que Google redirige después de la autenticación
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Autenticación exitosa, enviar información del usuario como JSON
    res.json({
      user: {
        id: req.user._id,
        email: req.user.email,
        username: req.user.username,
        avatar: req.user.avatar
      },
      token: generateToken(req.user._id),
    });
  }
);

// Ruta para obtener el perfil del usuario autenticado
router.get('/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }
  res.json({
    id: req.user._id,
    email: req.user.email,
    username: req.user.username,
    avatar: req.user.avatar
  });
});

module.exports = router;
