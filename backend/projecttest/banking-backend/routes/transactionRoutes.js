const express = require('express');
const { createTransaction, getTransactions } = require('../controllers/transactionController');
const router = express.Router();

// Định nghĩa các route cho giao dịch
router.post('/', createTransaction);
router.get('/', getTransactions);

module.exports = router;  // Đảm bảo bạn đang xuất router đúng cách
