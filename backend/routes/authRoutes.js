const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { updateProfile } = require('../controllers/userController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', authMiddleware, getUserProfile);
router.put('/user/profile', authMiddleware, updateProfile);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "user has not authenticated",
      user: null,
    });
  }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
    user: null,
  });
});

router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { 
      successRedirect: process.env.FRONTEND_URL,
      failureRedirect: 'http://localhost:4200/login' }),
);

module.exports = router;
