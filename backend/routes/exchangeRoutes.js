const express = require('express');
const { proposeExchange, getExchanges, updateExchangeStatus } = require('../controllers/exchangeController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, proposeExchange);
router.get('/', authMiddleware, getExchanges);
router.put('/status', authMiddleware, updateExchangeStatus);

module.exports = router;
