const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

pool.getConnection()
  .then(connection => {
    console.log('Kết nối database thành công!');
    connection.release();
  })
  .catch(err => {
    console.error('Lỗi kết nối database:', err);
  });

// Initialize admin user
async function initializeAdmin() {
  try {
    // Kiểm tra xem bảng users đã tồn tại chưa
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user'
      )
    `);

    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', ['admin']);
    
    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash('password', 10);
      await pool.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        ['admin', hashedPassword, 'admin']
      );
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
}

initializeAdmin();

// Tách route auth ra riêng
const authRoutes = require('./routes/auth');

// Sử dụng routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 