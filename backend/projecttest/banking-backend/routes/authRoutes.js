const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Định nghĩa các route cho đăng ký và đăng nhập
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;  // Đảm bảo bạn đang xuất router đúng cách
