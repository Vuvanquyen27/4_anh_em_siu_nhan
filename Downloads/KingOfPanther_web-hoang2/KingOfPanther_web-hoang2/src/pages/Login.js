import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => { // Nhận setIsAuthenticated từ props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert('Vui lòng nhập đầy đủ email và mật khẩu');
        return;
      }

      console.log('Đang gửi request đăng nhập...', { email });

      const response = await axios.post('https://backend-hackathon-dongnai.vercel.app/api/auth/login', {
        email: email.trim(),
        password: password.trim()
      });

      console.log('Phản hồi từ server:', response.data);

      if (response.data.success) {
        alert(response.data.message || 'Đăng nhập thành công');
        localStorage.setItem('user', JSON.stringify(response.data.user));  // Lưu thông tin người dùng vào localStorage
        setIsAuthenticated(true);  // Cập nhật trạng thái đã đăng nhập
        navigate('/home'); // Chuyển hướng đến trang home khi đăng nhập thành công
      } else {
        alert('Đăng nhập không thành công');
      }

    } catch (error) {
      console.error('Chi tiết lỗi:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      if (error.response) {
        const errorMessage = error.response.data.error || error.response.data.message || 'Đăng nhập thất bại';
        alert(errorMessage);
      } else if (error.request) {
        alert('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.');
      } else {
        alert('Có lỗi xảy ra trong quá trình đăng nhập');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Đăng Nhập</h2>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary btn-block" onClick={handleLogin}>
              Đăng nhập
            </button>
            <div className="mt-3 text-center">
              <a href="/forgot-password" className="text-decoration-none">Quên mật khẩu?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
