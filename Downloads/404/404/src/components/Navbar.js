import React from 'react';
import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import '../css/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src="logo.jpg" alt="HDBank Logo" />
          </Link>
        </div>
        
        <div className="nav-menu">
          <Link to="/hom" className="nav-item">Trang chủ</Link>
          <Link to="/business" className="nav-item">Tài khoản</Link>
          <Link to="/about" className="nav-item">Giao dịch</Link>
          <Link to="/contact" className="nav-item">Dự báo dòng tiền</Link>
          <Link to="/contact" className="nav-item">Phân tích tín dụng</Link>
          <Link to="/contact" className="nav-item">Báo cáo</Link>
          <Link to="/contact" className="nav-item">Hỗ trợ</Link>
          <Link to="/contact" className="nav-item">Tài khoản người dùng</Link>
        </div>

        <div class="auth-buttons">
          <button className="login-btn">Đăng nhập</button>
          <button className="register-btn">Đăng ký</button>
        </div>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar; 