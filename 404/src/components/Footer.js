import React from 'react';
import '../css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Về HDBank</h4>
          <ul>
            <li>Giới thiệu</li>
            <li>Tuyển dụng</li>
            <li>Tin tức</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Liên hệ</h4>
          <ul>
            <li>Hotline: 097-352-4327</li>
            <li>Email: 404team@gmail.com</li>
            <li>Địa chỉ: Trường Đại Học Công Nghệ Đồng Nai</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Kết nối với chúng tôi</h4>
          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=100053983899971"><i className="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/ezrisoooo/"><i className="fab fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@ezrisooooo?is_from_webapp=1&sender_device=pc"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 HDBank. All rights reserved. Developed by Team 404</p>
      </div>
    </footer>
  );
}

export default Footer; 