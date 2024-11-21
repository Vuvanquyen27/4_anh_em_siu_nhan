import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Chuyển đổi số cùng HDBank</h1>
        <p className="subtitle">Trải nghiệm ngân hàng thông minh với công nghệ AI tiên tiến</p>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <i className="fas fa-robot"></i>
          <h3>AI Chatbot Thông Minh</h3>
          <p>Hỗ trợ 24/7 với trợ lý ảo được đào tạo chuyên sâu</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-shield-alt"></i>
          <h3>Bảo Mật Sinh Trắc Học</h3>
          <p>Xác thực khuôn mặt an toàn, bảo mật tuyệt đối.</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-clock"></i>
          <h3>Giao Dịch Nhanh Chóng</h3>
          <p>Xử lý giao dịch tức thì, tiết kiệm thời gian.</p>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Bắt đầu trải nghiệm ngay hôm nay</h2>
          <p>Đăng ký tài khoản và nhận ngay ưu đãi đặc biệt dành cho khách hàng mới</p>
          <ul className="benefits-list">
            <li>Miễn phí duy trì tài khoản trong 2 năm đầu.</li>
            <li>Hoàn tiền 2% cho mọi giao dịch online.</li>
            <li>Tặng ngay 100.000 VND khi đăng ký thành công.</li>
            <li>Đặc biệt, chúng tôi hỗ trợ tạo tài khoản chỉ với 2 bước đơn giản.</li>
          </ul>
          <Link to="/register" className="register-now-btn">
            Đăng Ký Ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
