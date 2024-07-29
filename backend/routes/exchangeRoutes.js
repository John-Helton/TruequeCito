const express = require('express');
const { proposeExchange, getReceivedExchanges, getSentExchanges, updateExchangeStatus, getExchangeById, uploadReceipt, getAllExchanges, getCompletedExchanges } = require('../controllers/exchangeController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', authMiddleware, proposeExchange);
router.get('/all', authMiddleware, getAllExchanges); //* obtener todos los intercambios
router.get('/completed', authMiddleware, getCompletedExchanges);
router.get('/received', authMiddleware, getReceivedExchanges);
router.get('/sent', authMiddleware, getSentExchanges);
router.put('/status', authMiddleware, updateExchangeStatus);
router.get('/:exchangeId', authMiddleware, getExchangeById);
router.post('/upload-receipt', authMiddleware, upload.single('receipt'), uploadReceipt);
router.get('/all', authMiddleware, getAllExchanges);
router.get('/completed', authMiddleware, getCompletedExchanges);

module.exports = router;
