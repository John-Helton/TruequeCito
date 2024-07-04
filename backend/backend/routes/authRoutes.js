const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', authMiddleware, getUserProfile); // Nueva ruta

module.exports = router;
