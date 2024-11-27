import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faHome,
  faUser,
  faExchangeAlt,
  faChartLine,
  faCreditCard,
  faFileAlt,
  faHeadset 
} from '@fortawesome/free-solid-svg-icons';
import '../css/MobileNav.css';

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="mobile-nav">
      <button 
        className="mobile-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Đóng menu" : "Mở menu"}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>

      {isOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-item" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faHome} className="nav-icon" />
            Trang chủ
          </Link>
          <Link to="/account" className="mobile-nav-item" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faUser} className="nav-icon" />
            Tài khoản
          </Link>
          <Link to="/transactions" className="mobile-nav-item" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faExchangeAlt} className="nav-icon" />
            Giao dịch
          </Link>
          <Link to="/forecast" className="mobile-nav-item" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faChartLine} className="nav-icon" />
            Dự báo dòng tiền
          </Link>
          <Link to="/credit" className="mobile-nav-item" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faCreditCard} className="nav-icon" />
            Phân tích tín dụng
          </Link>
          <Link to="/reports" className="mobile-nav-item" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faFileAlt} className="nav-icon" />
            Báo cáo
          </Link>
          <Link to="/support" className="mobile-nav-item" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faHeadset} className="nav-icon" />
            Hỗ trợ
          </Link>
        </div>
      )}
    </div>
  );
}

export default MobileNav; 