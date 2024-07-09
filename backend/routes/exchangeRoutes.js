const express = require('express');
const { proposeExchange, getReceivedExchanges, getSentExchanges, updateExchangeStatus } = require('../controllers/exchangeController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, proposeExchange);
router.get('/received', authMiddleware, getReceivedExchanges);
router.get('/sent', authMiddleware, getSentExchanges);
router.put('/status', authMiddleware, updateExchangeStatus);

module.exports = router;
