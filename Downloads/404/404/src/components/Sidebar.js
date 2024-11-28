import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h2>Menu</h2>
        <nav>
          <NavLink 
            to="/image-scanner" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="fas fa-image"></i>
            <span>Quét ảnh từ máy</span>
          </NavLink>

          <NavLink 
            to="/chatbot" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="fas fa-robot"></i>
            <span>AI Chatbot</span>
          </NavLink>

          <NavLink 
            to="/face-auth" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="fas fa-user-shield"></i>
            <span>Xác thực khuôn mặt</span>
          </NavLink>

        </nav>
      </div>
    </div>
  );
}

export default Sidebar; 