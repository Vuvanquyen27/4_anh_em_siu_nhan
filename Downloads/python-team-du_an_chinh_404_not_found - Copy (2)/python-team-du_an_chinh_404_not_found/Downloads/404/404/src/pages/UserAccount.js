import React, { useState } from 'react';
import '../css/UserAccount.css';

function UserAccount() {
  const [userInfo, setUserInfo] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: 'Hồ Chí Minh',
    dateOfBirth: '1990-01-01'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(userInfo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({ ...editedInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInfo(editedInfo);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Xử lý đăng xuất ở đây
    console.log('Đăng xuất');
  };
  
  return (
    <div className="user-account-page">
      <div className="account-header">
        <h1>Tài Khoản Người Dùng</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>

      <div className="account-content">
        {!isEditing ? (
          <div className="info-display">
            <div className="info-group">
              <label>Họ và tên:</label>
              <span>{userInfo.fullName}</span>
            </div>
            <div className="info-group">
              <label>Email:</label>
              <span>{userInfo.email}</span>
            </div>
            <div className="info-group">
              <label>Số điện thoại:</label>
              <span>{userInfo.phone}</span>
            </div>
            <div className="info-group">
              <label>Địa chỉ:</label>
              <span>{userInfo.address}</span>
            </div>
            <div className="info-group">
              <label>Ngày sinh:</label>
              <span>{userInfo.dateOfBirth}</span>
            </div>
            <button 
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Chỉnh sửa thông tin
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label>Họ và tên:</label>
              <input
                type="text"
                name="fullName"
                value={editedInfo.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editedInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại:</label>
              <input
                type="tel"
                name="phone"
                value={editedInfo.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={editedInfo.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Ngày sinh:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={editedInfo.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="save-btn">Lưu thay đổi</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  setEditedInfo(userInfo);
                }}
              >
                Hủy
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserAccount; 