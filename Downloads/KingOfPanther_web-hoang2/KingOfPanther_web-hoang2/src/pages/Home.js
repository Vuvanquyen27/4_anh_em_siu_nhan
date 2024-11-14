import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Chào mừng bạn đến với Hệ thống Quản lý Thanh niên</h1>
      <p className="text-center">Hệ thống hỗ trợ quản lý nhân sự, tài chính, công việc, và các hoạt động trong tổ chức.</p>

      <div className="mt-4">
        <h2>Chức năng chính:</h2>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/personnel-management" className="btn btn-link">Quản lý nhân sự</Link>
          </li>
          <li className="list-group-item">
            <Link to="/task-management" className="btn btn-link">Quản lý công việc</Link>
          </li>
          <li className="list-group-item">
            <Link to="/proposal-dashboard" className="btn btn-link">Quản lý đề xuất</Link>
          </li>
          <li className="list-group-item">
            <Link to="/work-schedule-management" className="btn btn-link">Quản lý công tác</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
