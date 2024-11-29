const Transaction = require('../models/transactionModel');

const createTransaction = async (req, res) => {
    const { senderId, receiverId, amount } = req.body;
    try {
        const transaction = await Transaction.create({ senderId, receiverId, amount });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTransaction, getTransactions };
