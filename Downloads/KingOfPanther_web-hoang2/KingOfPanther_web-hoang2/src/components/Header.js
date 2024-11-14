import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-custom py-3"> {/* Sử dụng lớp mới bg-custom để thay đổi màu nền */}
      <nav className="container">
        {/* Logo bên trái */}
        <div className="d-flex align-items-center">
          <Link to="/home">
            <img src="/assets/logo.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <ul className="list-unstyled d-flex justify-content-center mb-0 custom-header">
          <li className="mx-3">
            <Link to="/personnel-management" className="text-white btn btn-link hover">QUẢN LÝ NHÂN SỰ</Link>
          </li>
          <li className="mx-3">
            <Link to="/task-management" className="text-white btn btn-link hover">QUẢN LÝ CÔNG VIỆC</Link>
          </li>
          <li className="mx-3">
            <Link to="/proposal-dashboard" className="text-white btn btn-link hover">QUẢN LÝ ĐỀ XUẤT</Link>
          </li>
          <li className="mx-3">
            <Link to="/work-schedule-management" className="text-white btn btn-link hover">QUẢN LÝ CÔNG TÁC</Link>
          </li>
        </ul>
        <div className="d-flex align-items-center">
          {/* Icon thông báo */}
          <div className="position-relative me-3"> {/* Thêm margin phải cho khoảng cách */}
            <img 
              src="/assets/bell.png" 
              alt="Thông báo" 
              style={{ width: '50px', height: 'auto', marginRight: '30px'}} 
            />
            {/* Giả sử có số thông báo */}
            <span className="bell position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
              5
            </span>
          </div>
          <div className="user-profile-container">
            {/* Logo profile bên phải */}
            <div className="d-flex align-items-center">
              <img src="/assets/logo-profile.png" alt="User Profile" className="logo-profile" />
              <span className="text-white ms-2">Admin</span>
            </div>

            {/* Menu xổ xuống */}
            <div className="dropdown-menu">
              <ul>
                <li><Link to="/information">Trang cá nhân</Link></li>
                <li><a href="/home">Đổi mật khẩu</a></li>
                <li><a href="/login" onClick={(e) => {
                  e.preventDefault(); // Ngăn chuyển trang ngay lập tức
                  const confirmLogout = window.confirm("Sẽ thoát phiên làm việc này, bạn có muốn đăng xuất?");
                  if (confirmLogout) {
                    localStorage.removeItem('user'); // Xóa thông tin người dùng
                    window.location.href = '/login'; // Chuyển hướng về trang login
                  }
                }}>Đăng xuất</a></li>
              </ul>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
