const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();




// ... existing code ...


// ... existing code ...

// Lấy pool từ file riêng để tái sử dụng
const pool = require('../config/database');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });

    const [users] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    console.log('Found user:', users[0]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    // Tạo token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Chi tiết lỗi login:', error);
    res.status(500).json({ message: 'Lỗi server' });

    
  }

  

});



module.exports = router; 