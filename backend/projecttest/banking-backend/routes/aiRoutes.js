const express = require('express');
const router = express.Router();

// Các route cho AI
router.post('/predict', (req, res) => {
  res.json({ message: 'AI route for prediction' });
});

module.exports = router;  // Đảm bảo bạn đang xuất router đúng cách
