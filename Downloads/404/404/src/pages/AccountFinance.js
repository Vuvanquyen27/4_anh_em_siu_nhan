import React, { useState } from 'react';
import '../css/Account.css';

function Account() {
  const [accounts, setAccounts] = useState([
    { 
      id: 1, 
      name: 'Tài khoản chính', 
      balance: 50000000,
      accountNumber: '1234567890',
      type: 'Thanh toán'
    },
    { 
      id: 2, 
      name: 'Tài khoản tiết kiệm', 
      balance: 100000000,
      accountNumber: '0987654321',
      type: 'Tiết kiệm'
    },
  ]);

  const [newAccount, setNewAccount] = useState({ 
    name: '', 
    balance: '', 
    accountNumber: '',
    type: 'Thanh toán'
  });

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const id = accounts.length + 1;
    setAccounts([...accounts, { id, ...newAccount }]);
    setNewAccount({ name: '', balance: '', accountNumber: '', type: 'Thanh toán' });
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="account-page">
      <div className="account-header">
        <h1>Quản lý Tài Khoản</h1>
        <div className="total-balance">
          Tổng số dư: <span>{totalBalance.toLocaleString()} VND</span>
        </div>
      </div>
      
      <div className="account-content">
        <div className="account-list">
          <h2>Danh Sách Tài Khoản</h2>
          <div className="account-cards">
            {accounts.map(account => (
              <div key={account.id} className="account-card">
                <div className="account-card-header">
                  <h3>{account.name}</h3>
                  <span className="account-type">{account.type}</span>
                </div>
                <div className="account-card-body">
                  <p className="account-number">Số TK: {account.accountNumber}</p>
                  <p className="account-balance">{account.balance.toLocaleString()} VND</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="create-account">
          <h2>Tạo Tài Khoản Mới</h2>
          <form onSubmit={handleCreateAccount}>
            <div className="form-group">
              <label>Tên tài khoản</label>
              <input
                type="text"
                value={newAccount.name}
                onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Số tài khoản</label>
              <input
                type="text"
                value={newAccount.accountNumber}
                onChange={(e) => setNewAccount({...newAccount, accountNumber: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Loại tài khoản</label>
              <select
                value={newAccount.type}
                onChange={(e) => setNewAccount({...newAccount, type: e.target.value})}
              >
                <option value="Thanh toán">Thanh toán</option>
                <option value="Tiết kiệm">Tiết kiệm</option>
              </select>
            </div>
            <div className="form-group">
              <label>Số dư ban đầu</label>
              <input
                type="number"
                value={newAccount.balance}
                onChange={(e) => setNewAccount({...newAccount, balance: parseInt(e.target.value)})}
                required
              />
            </div>
            <button type="submit">Tạo Tài Khoản</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account; 