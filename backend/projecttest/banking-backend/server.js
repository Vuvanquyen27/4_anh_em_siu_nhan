const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import các routes
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Import cấu hình kết nối MySQL
const { connectDB } = require('./config/db');

// Khởi tạo ứng dụng Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);  // Đảm bảo các route được sử dụng đúng
app.use('/api/transactions', transactionRoutes);
app.use('/api/ai', aiRoutes);

// Kết nối với MySQL
connectDB();

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
