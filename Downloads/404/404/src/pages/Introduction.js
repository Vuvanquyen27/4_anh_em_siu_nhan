import React from 'react';
import '../css/Introduction.css';

function Introduction() {
  return (
    <div className="introduction">
      <h1>Chào Mừng Đến Với HDBank</h1>
      <p>
        HDBank là một ứng dụng quản lý tài chính cá nhân giúp bạn theo dõi thu nhập, chi tiêu và dự báo dòng tiền của mình.
      </p>
      <h2>Các Tính Năng Chính</h2>
      <ul>
        <li>Quản lý tài khoản ngân hàng</li>
        <li>Ghi chép giao dịch hàng ngày</li>
        <li>Dự báo dòng tiền trong tương lai</li>
        <li>Phân tích chi tiêu và thu nhập</li>
      </ul>
      <h2>Hướng Dẫn Sử Dụng</h2>
      <p>
        Để bắt đầu, hãy tạo một tài khoản và đăng nhập. Sau đó, bạn có thể thêm tài khoản ngân hàng, ghi chép giao dịch và xem báo cáo tài chính của mình.
      </p>
    </div>
  );
}

export default Introduction; 