const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createProduct);
router.get('/', getProducts);

module.exports = router;
