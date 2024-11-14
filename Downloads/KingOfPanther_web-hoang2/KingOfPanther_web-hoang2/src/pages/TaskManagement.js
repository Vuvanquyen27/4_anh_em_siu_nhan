import React, { useState, useEffect } from 'react';


const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Số công việc hiển thị mỗi trang

  // Dữ liệu giả (mock data) vì chưa có backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Sử dụng dữ liệu giả thay vì gọi API
        const mockData = [
          { _id: 1, name: 'Công việc 1', description: 'Mô tả công việc 1', status: 'Đang thực hiện' },
          { _id: 2, name: 'Công việc 2', description: 'Mô tả công việc 2', status: 'Đã hoàn thành' },
          { _id: 3, name: 'Công việc 3', description: 'Mô tả công việc 3', status: 'Chờ xử lý' },
          { _id: 4, name: 'Công việc 4', description: 'Mô tả công việc 4', status: 'Đang thực hiện' },
          { _id: 5, name: 'Công việc 5', description: 'Mô tả công việc 5', status: 'Đã hoàn thành' },
          { _id: 6, name: 'Công việc 6', description: 'Mô tả công việc 6', status: 'Chờ xử lý' },
          { _id: 7, name: 'Công việc 7', description: 'Mô tả công việc 7', status: 'Đang thực hiện' },
        ];
        setTasks(mockData); // Thay vì axios, ta sử dụng dữ liệu giả
        // const response = await axios.get('/api/tasks');
        // setTasks(response.data);
      } catch (error) {
        console.error('Lỗi tải danh sách công việc', error);
      }
    };

    fetchTasks();
  }, []);

  // Xử lý phân trang
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Quản lý công việc</h1>
      <div className="mb-4 text-right">
        <button className="btn btn-primary">Thêm công việc mới</button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-white">
          <thead className="thead-dark">
            <tr>
              <th>Tên công việc</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task._id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>
                  <span className={`badge ${task.status === 'Đang thực hiện' ? 'bg-warning' : task.status === 'Đã hoàn thành' ? 'bg-success' : 'bg-secondary'}`}>
                    {task.status}
                  </span>
                </td>
                <td>
                  {/* Dùng style trực tiếp để tạo khoảng cách */}
                  <button className="btn btn-info btn-sm" style={{ marginRight: '10px' }}>
                    <i className="fas fa-eye"></i> Chi tiết
                  </button>
                  <button className="btn btn-warning btn-sm" style={{ marginRight: '10px' }}>
                    <i className="fas fa-edit"></i> Sửa
                  </button>
                  <button className="btn btn-danger btn-sm">
                    <i className="fas fa-trash-alt"></i> Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                <i className="fas fa-chevron-left"></i>
              </button>
            </li>
            {[...Array(Math.ceil(tasks.length / tasksPerPage))].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === Math.ceil(tasks.length / tasksPerPage) ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TaskManagement;
