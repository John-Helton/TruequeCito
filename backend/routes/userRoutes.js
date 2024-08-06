const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener la información de un usuario por su ID
router.get('/:userId', userController.getUserById);

// Ruta para seguir a un usuario
router.post('/:userId/follow', authMiddleware, userController.followUser);

// Ruta para dejar de seguir a un usuario
router.post('/:userId/unfollow', authMiddleware, userController.unfollowUser);

// Ruta para dar like a un usuario
router.post('/:userId/like', authMiddleware, userController.likeUser);

module.exports = router;
