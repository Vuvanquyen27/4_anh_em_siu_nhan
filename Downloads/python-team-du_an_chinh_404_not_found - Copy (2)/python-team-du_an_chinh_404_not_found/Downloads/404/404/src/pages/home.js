import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Chào mừng đến với HDBank</h1>
        <p className="tagline">Đối tác tài chính đáng tin cậy cho tương lai của bạn</p>
      </header>

      <section className="features">
        <h2>Tại sao chọn HDBank?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>An toàn & Bảo mật</h3>
            <p>Hệ thống bảo mật đa lớp, đảm bảo an toàn tuyệt đối cho tài sản của bạn</p>
          </div>
          <div className="feature-card">
            <h3>Tiện ích Đa dạng</h3>
            <p>Đầy đủ các dịch vụ ngân hàng hiện đại, từ thanh toán đến đầu tư</p>
          </div>
          <div className="feature-card">
            <h3>Ưu đãi Hấp dẫn</h3>
            <p>Nhiều chương trình khuyến mãi và ưu đãi đặc biệt dành cho khách hàng mới</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Bắt đầu hành trình tài chính của bạn ngay hôm nay</h2>
        <p>Đăng ký tài khoản HDBank để trải nghiệm các dịch vụ tài chính tốt nhất</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn-primary">Đăng ký ngay</Link>
          <Link to="/about" className="btn-secondary">Tìm hiểu thêm</Link>
        </div>
      </section>

      <section className="benefits">
        <h2>Quyền lợi thành viên</h2>
        <ul className="benefits-list">
          <li>Miễn phí mở tài khoản và phí duy trì</li>
          <li>Lãi suất ưu đãi cho khách hàng mới</li>
          <li>Tích điểm đổi quà với mọi giao dịch</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
