import React, { useState, useEffect } from 'react'; 
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; // Thêm trang đăng ký
import PersonnelManagement from './pages/PersonnelManagement';
import PrivateRoute from './PrivateRoute';  // Ensure this import is correct
import ProposalDashboard from './pages/ProposalDashboard';
import TaskManagement from './pages/TaskManagement';
import ForgotPassword from './pages/ForgotPassword';
import WorkScheduleManagement from './pages/WorkScheduleManagement';
import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';  // Đảm bảo rằng các styles từ App.css được áp dụng
import RegistrationForm from './components/information';
import 'antd/dist/reset.css';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation(); // Sử dụng useLocation để lấy đường dẫn hiện tại

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);  // Nếu có user trong localStorage, coi như đã đăng nhập
    }
  }, []);

  return (
    <div>
      {/* Chỉ hiển thị Header nếu không ở trang login hoặc register */}
      {location.pathname !== "/login" && location.pathname !== "/register" &&  location.pathname !== "/forgot-password" && <Header />}
      <div>
        <Routes>
          {/* Redirect đến trang home nếu người dùng vào root "/" và đã đăng nhập */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} 
          />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          {/* Các route bảo vệ (chỉ cho người đã đăng nhập) */}
          <Route path="/home" element={(
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          )} />
          <Route path="/personnel-management" element={(
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <PersonnelManagement />
            </PrivateRoute>
          )} />
          <Route path="/task-management" element={(
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <TaskManagement />
            </PrivateRoute>
          )} />
          <Route path="/proposal-dashboard" element={(
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ProposalDashboard />
            </PrivateRoute>
          )} />
          <Route path="/information" element={(
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <RegistrationForm />
            </PrivateRoute>
          )} />
          <Route path="/work-schedule-management" element={(
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <WorkScheduleManagement />
            </PrivateRoute>
          )} />
        </Routes>
      </div>
      {/* Chỉ hiển thị Footer nếu không ở trang login hoặc register */}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}
    </div>
  );
};

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
