import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang login
    return <Navigate to="/login" />;
  }

  return children;  // Hiển thị các component con nếu đã đăng nhập
};

export default PrivateRoute;
