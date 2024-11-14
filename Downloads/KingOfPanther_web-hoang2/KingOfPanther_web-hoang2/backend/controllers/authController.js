const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng ký người dùng
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Kiểm tra người dùng đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 12);

    // Tạo người dùng mới
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Tạo token xác thực
    const token = jwt.sign({ id: newUser._id }, 'secret_key', { expiresIn: '1h' });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register };
