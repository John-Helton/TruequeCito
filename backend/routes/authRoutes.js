const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { updateProfile } = require('../controllers/userController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', authMiddleware, getUserProfile);
router.put('/user/profile', authMiddleware, updateProfile);

console.log("Auth Routes Loaded");

module.exports = router;
