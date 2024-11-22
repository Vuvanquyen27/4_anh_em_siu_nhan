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
            to="/chatbot" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="fas fa-robot"></i>
            <span>Chatbot AI</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar; 