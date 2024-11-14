const express = require('express');
const { register } = require('../controllers/authController');

const router = express.Router();

// Định tuyến đăng ký
router.post('/register', register);

module.exports = router;
