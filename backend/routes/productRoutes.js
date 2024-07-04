const express = require('express');
const { createProduct, getProducts, registerExchange } = require('../controllers/productController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createProduct);
router.get('/', getProducts);
router.post('/exchange', authMiddleware, registerExchange); // Nueva ruta para registrar intercambios

module.exports = router;
