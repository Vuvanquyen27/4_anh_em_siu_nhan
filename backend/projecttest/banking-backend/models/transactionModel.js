const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel');

// Định nghĩa model Transaction
const Transaction = sequelize.define('Transaction', {
    amount: { type: DataTypes.FLOAT, allowNull: false },
    senderId: { 
        type: DataTypes.INTEGER,
        references: {
            model: User, // Chỉ định model liên kết
            key: 'id'
        }
    },
    receiverId: { 
        type: DataTypes.INTEGER,
        references: {
            model: User, 
            key: 'id'
        }
    }
}, {
    tableName: 'transactions',
    timestamps: true
});

module.exports = Transaction;
