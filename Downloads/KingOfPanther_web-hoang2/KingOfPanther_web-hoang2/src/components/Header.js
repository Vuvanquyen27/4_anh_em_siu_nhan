import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Tạo file CSS riêng cho Header

const Header = () => {
  return (
    <header className="bg-custom"> {/* Bỏ py-3 để điều chỉnh trong CSS */}
      <nav className="container">
        {/* Logo bên trái */}
        <div className="d-flex align-items-center">
          <Link to="/home">
            <img src="/assets/logo.png" alt="Logo" className="header-logo" />
          </Link>
        </div>
        <ul className="list-unstyled d-flex justify-content-center mb-0 nav-links">
          <li>
            <Link to="/personnel-management" className="nav-link">QUẢN LÝ NHÂN SỰ</Link>
          </li>
          <li>
            <Link to="/task-management" className="nav-link">QUẢN LÝ CÔNG VIỆC</Link>
          </li>
          <li>
            <Link to="/proposal-dashboard" className="nav-link">QUẢN LÝ ĐỀ XUẤT</Link>
          </li>
          <li>
            <Link to="/work-schedule-management" className="nav-link">QUẢN LÝ CÔNG TÁC</Link>
          </li>
        </ul>
        <div className="header-right">
          {/* Icon thông báo */}
          <div className="notification-container">
            <img 
              src="/assets/bell.png" 
              alt="Thông báo" 
              className="notification-icon"
            />
            <span className="notification-badge">5</span>
          </div>
          <div className="user-profile-container">
            <div className="user-info">
              <img src="/assets/logo-profile.png" alt="User Profile" className="profile-icon" />
              <span className="username">Admin</span>
            </div>

            <div className="dropdown-menu">
              <ul>
                <li><Link to="/Profile">Trang cá nhân</Link></li>
                <li><a href="/information" onClick={(e) => {
                  e.preventDefault();
                  const confirmLogout = window.confirm("Sẽ thoát phiên làm việc này, bạn có muốn đăng xuất?");
                  if (confirmLogout) {
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                  }
                }}>Đăng xuất</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
