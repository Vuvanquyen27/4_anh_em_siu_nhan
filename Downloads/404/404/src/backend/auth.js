const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Đăng ký
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, fullName } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Thêm user mới
    const [result] = await pool.execute(
      'INSERT INTO users (username, password, email, full_name) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, email, fullName]
    );
    
    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Kiểm tra user
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác' });
    }
    
    const user = users[0];
    
    // Kiểm tra password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác' });
    }
    
    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      'your_jwt_secret',
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 