import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mobile-nav-container">
      <button className="mobile-menu-btn" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`mobile-nav ${isOpen ? 'active' : ''}`}>
        <div className="mobile-nav-items">
          <Link to="/" className="mobile-nav-item" onClick={toggleMenu}>
            Trang chủ
          </Link>
          <Link to="/account" className="mobile-nav-item" onClick={toggleMenu}>
            Tài khoản
          </Link>
          <Link to="/transaction" className="mobile-nav-item" onClick={toggleMenu}>
            Giao dịch
          </Link>
          <Link to="/forecast" className="mobile-nav-item" onClick={toggleMenu}>
            Dự báo dòng tiền
          </Link>
          <Link to="/credit-analysis" className="mobile-nav-item" onClick={toggleMenu}>
            Phân tích tín dụng
          </Link>
          <Link to="/report" className="mobile-nav-item" onClick={toggleMenu}>
            Báo cáo
          </Link>
          <Link to="/support" className="mobile-nav-item" onClick={toggleMenu}>
            Hỗ trợ
          </Link>
          <Link to="/user-account" className="mobile-nav-item" onClick={toggleMenu}>
            Tài khoản người dùng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav; 