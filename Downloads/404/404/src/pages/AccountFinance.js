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
      <h1>Quản lý Tài Khoản</h1>
      
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