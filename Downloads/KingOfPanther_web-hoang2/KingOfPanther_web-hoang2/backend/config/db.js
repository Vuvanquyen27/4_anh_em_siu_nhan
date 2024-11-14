// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Không cần các tùy chọn useNewUrlParser và useUnifiedTopology
    console.log('MongoDB đã được kết nối thành công');
  } catch (error) {
    console.error('Kết nối đến MongoDB thất bại:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
