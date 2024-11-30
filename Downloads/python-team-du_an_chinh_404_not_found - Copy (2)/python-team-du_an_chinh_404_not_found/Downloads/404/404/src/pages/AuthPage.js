import React, { useState } from 'react';
import axios from 'axios';
import '../css/AuthPage.css';

const API_URL = 'http://localhost:3000';

function AuthPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Đang gửi request với:', formData);
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username: formData.username,
        password: formData.password
      });
      console.log('Response:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      setError(error.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-form-container">
          <h2>Đăng Nhập</h2>
          {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Tên đăng nhập"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
          </form>
        </div>
      </div>
    </div>



  );
}

export default AuthPage; 