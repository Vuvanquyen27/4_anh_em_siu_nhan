import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBuilding, faFileContract } from '@fortawesome/free-solid-svg-icons';
import './TrangChu.css';

function HeroSection() {
    return (
      <section className="hero-section">
        <div className="container">
          <h1>Chào mừng đến với Hệ thống Quản lý Đoàn viên</h1>
          <p className="lead">Ứng dụng quản lý nhân sự và công việc của Đoàn viên trong các tổ chức Đoàn Thanh niên</p>
          <div className="dashboard-stats">
            <div className="stat-item">
              <FontAwesomeIcon icon={faUsers} />
              <h3>200+</h3>
              <p>Nhân viên</p>
            </div>
            <div className="stat-item">
              <FontAwesomeIcon icon={faBuilding} />
              <h3>10</h3>
              <p>Phòng ban</p>
            </div>
            <div className="stat-item">
              <FontAwesomeIcon icon={faFileContract} />
              <h3>150</h3>
              <p>Hợp đồng</p>
            </div>
          </div>
        </div>
      </section>
    );
}

export default HeroSection;  