import React, { useState } from 'react';
import '../css/Account.css';

function Account() {
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Tài khoản chính', balance: 50000000 },
    { id: 2, name: 'Tài khoản tiết kiệm', balance: 100000000 },
  ]);

  const [newAccount, setNewAccount] = useState({ name: '', balance: '' });

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const id = accounts.length + 1;
    setAccounts([...accounts, { id, ...newAccount }]);
    setNewAccount({ name: '', balance: '' });
  };

  return (
    <div className="account-page">
      <div className="dashboard">
        <h1>Bảng Điều Khiển Tổng Quan</h1>
        
        <div className="overview-cards">
          <div className="card">
            <h2>Số Dư Tài Khoản</h2>
            <p id="account-balance">
              {accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()} VND
            </p>
          </div>
          <div className="card">
            <h2>Tổng Thu Nhập</h2>
            <p id="total-income">75,000,000 VND</p>
          </div>
          <div className="card">
            <h2>Tổng Chi Tiêu</h2>
            <p id="total-expenses">25,000,000 VND</p>
          </div>
        </div>

        {/* ... rest of the dashboard content ... */}
      </div>

      <div className="account-list">
        <h2>Danh Sách Tài Khoản</h2>
        <ul>
          {accounts.map(account => (
            <li key={account.id}>
              {account.name}: {account.balance.toLocaleString()} VND
            </li>
          ))}
        </ul>
      </div>

      <div className="create-account">
        <h2>Tạo Tài Khoản Mới</h2>
        <form onSubmit={handleCreateAccount}>
          <input
            type="text"
            placeholder="Tên tài khoản"
            value={newAccount.name}
            onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Số dư ban đầu"
            value={newAccount.balance}
            onChange={(e) => setNewAccount({...newAccount, balance: parseInt(e.target.value)})}
            required
          />
          <button type="submit">Tạo Tài Khoản</button>
        </form>
      </div>
    </div>
  );
}

export default Account; 