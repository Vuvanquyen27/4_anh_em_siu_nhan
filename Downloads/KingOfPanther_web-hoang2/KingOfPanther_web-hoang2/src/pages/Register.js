import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Sử dụng cùng file CSS với trang đăng nhập

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      alert('Đăng ký thành công!');
      // Add registration logic here (API call or localStorage)
    } else {
      alert('Mật khẩu không khớp!');
    }
  };

  const handleBack = () => {
    navigate(-1); // Điều hướng trở lại trang trước đó
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Đăng ký</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <div className="input-icon">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="fa fa-envelope icon"></i>
            </div>
          </div>
          <div className="form-group">
            <div className="input-icon">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="fa fa-lock icon"></i>
            </div>
          </div>
          <div className="form-group">
            <div className="input-icon">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i className="fa fa-lock icon"></i>
            </div>
          </div>
          <button type="submit" className="login-btn" style={{marginBottom: '10px'}}>Đăng ký</button>
          <a href="/login" style={{textDecoration: 'none'}}>Quay lại</a>
          </form>
      </div>
    </div>
  );
};

export default Register;