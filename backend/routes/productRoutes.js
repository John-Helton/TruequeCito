const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  registerExchange,
  editProduct,
  deleteProduct
} = require('../controllers/productController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createProduct);
router.get('/', getProducts);
router.get('/:productId', getProductById);
router.post('/exchange', authMiddleware, registerExchange);
router.put('/:id', authMiddleware, editProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
