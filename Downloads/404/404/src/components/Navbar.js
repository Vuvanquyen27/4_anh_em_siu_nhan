import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import '../css/Navbar.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src="/logo.jpg" alt="HDBank Logo" />
          </Link>
        </div>
        
        <div className="nav-menu">
          <Link to="/" className="nav-item">Trang chủ</Link>
          <Link to="/account" className="nav-item">Tài khoản</Link>
          <Link to="/transaction" className="nav-item">Giao dịch</Link>
          <Link to="/forecast" className="nav-item">Dự báo dòng tiền</Link>
          <Link to="/credit-analysis" className="nav-item">Phân tích tín dụng</Link>
          <Link to="/report" className="nav-item">Báo cáo</Link>
          <Link to="/support" className="nav-item">Hỗ trợ</Link>
          <Link to="/user-account" className="nav-item">Tài khoản người dùng</Link>
        </div>

        <div className="auth-buttons">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Đăng xuất</span>
          </button>
        </div>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar; 