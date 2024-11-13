import React, { useState } from 'react';

function LoginForm() {
  // Tạo các state cho tài khoản, mật khẩu, và trạng thái của nút Đăng nhập
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Hàm xử lý khi thay đổi giá trị trong các ô nhập liệu
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    checkButtonStatus(e.target.value, password); // Kiểm tra trạng thái nút
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkButtonStatus(username, e.target.value); // Kiểm tra trạng thái nút
  };

  // Hàm kiểm tra xem nút Đăng nhập có thể được kích hoạt không
  const checkButtonStatus = (username, password) => {
    if (username.trim() !== '' && password.trim() !== '') {
      setIsButtonDisabled(false); // Kích hoạt nút nếu các trường đều có giá trị
    } else {
      setIsButtonDisabled(true); // Vô hiệu hóa nút nếu thiếu trường nào
    }
  };

  // Hàm xử lý khi người dùng nhấn nút Đăng nhập
  const handleLogin = () => {
    // Xử lý logic đăng nhập ở đây
    console.log('Đăng nhập với tài khoản:', username, 'và mật khẩu:', password);
  };

    return (
      
        <div className="login-container">
  <div className="icon-section">
    <h1>HỆ THỐNG QUẢN LÝ SỐ HÓA NGHIỆP VỤ</h1>
    <img id="form-logo" src="https://bit.ly/3UP2raV" alt="logo" />
    <h2>TỈNH ĐỒNG NAI</h2>
  </div>
  <div className="form-section">
    <h1>ĐĂNG NHẬP</h1>
    <form>
      <span>Tài khoản</span>
      <input type="text" placeholder="Tài khoản" value={username} onChange={handleUsernameChange}/>
      <span>Mật khẩu</span>
      <input type="password" placeholder="Mật khẩu" value={password} onChange={handlePasswordChange}/>
      <div className="forgot-password"> 
        <a href="#">Quên mật khẩu?</a>
      </div>
      <button type="submit" onClick={handleLogin} disabled={isButtonDisabled} >Đăng nhập</button>
    </form>
    <div className="register-link">
    <p>Bạn chưa có tài khoản? <button > Tạo mới tài khoản</button></p>
    </div>
  </div>
</div>
    );
  }

export default LoginForm