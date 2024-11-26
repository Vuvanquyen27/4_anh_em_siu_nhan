import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar"> {/* phần này thể hiện thanh menu */}
      <div className="navbar-container">
        <div className="logo"> {/* phần này thể hiện logo */}
          <Link to="/">
            <img src="logo.jpg" alt="HDBank Logo" />
          </Link>
        </div>
        
        <div className="nav-menu">
          <Link to="/personal" className="nav-item">Khách hàng cá nhân</Link>
          <Link to="/business" className="nav-item">Khách hàng doanh nghiệp</Link>
          <Link to="/about" className="nav-item">Về HDBank</Link>
          <Link to="/contact" className="nav-item">Liên hệ</Link>
        </div>

        <div className="nav-buttons">
          <button className="login-btn">Đăng nhập</button>
          <button className="register-btn">Đăng ký</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 