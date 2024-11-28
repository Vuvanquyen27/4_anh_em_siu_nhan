import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import '../css/Navbar.css';

const Navbar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/home">
            <img src="logo.jpg" alt="HDBank Logo" />
          </Link>
        </div>
        
        <div className="nav-menu">
          <Link to="" className="nav-item">Trang chủ</Link>
          <Link to="/account" className="nav-item">Tài khoản</Link>
          <Link to="/transaction" className="nav-item">Giao dịch</Link>
          <Link to="/forecast" className="nav-item">Dự báo dòng tiền</Link>
          <Link to="/credit-analysis" className="nav-item">Phân tích tín dụng</Link>
          <Link to="/report" className="nav-item">Báo cáo</Link>
          <Link to="/support" className="nav-item">Hỗ trợ</Link>
          <Link to="/user-account" className="nav-item">Tài khoản người dùng</Link>
        </div>

        <div className="auth-buttons">
          <button className="login-btn" onClick={() => setShowLoginForm(true)}>Đăng nhập</button>
          <button className="register-btn" onClick={() => setShowRegisterForm(true)}>Đăng ký</button>
        </div>

        <MobileNav 
          onShowLogin={() => setShowLoginForm(true)}
          onShowRegister={() => setShowRegisterForm(true)}
        />
      </div>

      {showLoginForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>Đăng nhập</h2>
            <form>
              <input type="text" placeholder="Tên đăng nhập" required />
              <input type="password" placeholder="Mật khẩu" required />
              <button type="submit">Đăng nhập</button>
            </form>
            <button className="close-btn" onClick={() => setShowLoginForm(false)}>Đóng</button>
          </div>
        </div>
      )}

      {showRegisterForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>Đăng ký</h2>
            <form>
              <input type="text" placeholder="Họ và tên" required />
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Tên đăng nhập" required />
              <input type="password" placeholder="Mật khẩu" required />
              <input type="password" placeholder="Xác nhận mật khẩu" required />
              <button type="submit">Đăng ký</button>
            </form>
            <button className="close-btn" onClick={() => setShowRegisterForm(false)}>Đóng</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 