import React, { useState } from 'react';
import '../css/Transaction.css';
import '../css/Background.css';

function Transaction() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-06-01', type: 'Thu', amount: 5000000, description: 'Lương tháng 6' },
    { id: 2, date: '2023-06-05', type: 'Chi', amount: 1000000, description: 'Tiền điện nước' },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    date: '',
    type: 'Thu',
    amount: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = transactions.length + 1;
    setTransactions([...transactions, { id, ...newTransaction }]);
    setNewTransaction({ date: '', type: 'Thu', amount: '', description: '' });
  };

  return (
    <div className="background-container">
      <div className="transaction-page">
        <h1>Quản lý Giao Dịch</h1>
        
        <div className="create-transaction">
          <h2>Tạo Giao Dịch Mới</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="date"
              name="date"
              value={newTransaction.date}
              onChange={handleInputChange}
              required
            />
            <select
              name="type"
              value={newTransaction.type}
              onChange={handleInputChange}
              required
            >
              <option value="Thu">Thu</option>
              <option value="Chi">Chi</option>
            </select>
            <input
              type="number"
              name="amount"
              placeholder="Số tiền"
              value={newTransaction.amount}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Mô tả"
              value={newTransaction.description}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Tạo Giao Dịch</button>
          </form>
        </div>

        <div className="transaction-history">
          <h2>Lịch Sử Giao Dịch</h2>
          <table>
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Loại</th>
                <th>Số Tiền</th>
                <th>Mô Tả</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount.toLocaleString()} VND</td>
                  <td>{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transaction; 