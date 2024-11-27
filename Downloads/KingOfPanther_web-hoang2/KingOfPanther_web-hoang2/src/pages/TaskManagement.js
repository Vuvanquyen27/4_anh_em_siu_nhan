import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Số công việc hiển thị mỗi trang
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Dữ liệu giả (mock data) vì chưa có backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Sử dụng dữ liệu giả thay vì gọi API
        const mockData = [
          { _id: 1, name: 'Công việc 1', time: '2024-03-20 09:00', description: 'Mô tả công việc 1', status: 'Đang thực hiện' },
          { _id: 2, name: 'Công việc 2', time: '2024-03-21 14:30', description: 'Mô tả công việc 2', status: 'Đã hoàn thành' },
          { _id: 3, name: 'Công việc 3', time: '2024-03-22 10:15', description: 'Mô tả công việc 3', status: 'Chờ xử lý' },
          { _id: 4, name: 'Công việc 4', time: '2024-03-23 16:45', description: 'Mô tả công việc 4', status: 'Đang thực hiện' },
          { _id: 5, name: 'Công việc 5', time: '2024-03-24 11:20', description: 'Mô tả công việc 5', status: 'Đã hoàn thành' },
          { _id: 6, name: 'Công việc 6', time: '2024-03-25 13:00', description: 'Mô tả công việc 6', status: 'Chờ xử lý' },
          { _id: 7, name: 'Công việc 7', time: '2024-03-26 15:30', description: 'Mô tả công việc 7', status: 'Đang thực hiện' },
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

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleDelete = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setTasks(prevTasks => prevTasks.filter(task => task._id !== selectedTask._id));
    setShowDeleteModal(false);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Quản lý công việc</h1>
      
      <div className="position-relative">
        {/* Icon Previous */}
        <FontAwesomeIcon 
          icon={faChevronLeft}
          className={`position-absolute ${currentPage === 1 ? 'text-muted' : 'text-primary'}`}
          style={{ 
            fontSize: '24px',
            left: '-40px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: currentPage === 1 ? 'default' : 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        />

        {/* Bảng dữ liệu hiện tại */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-white">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    className="form-check-input"
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setTasks(prevTasks => prevTasks.map(task => ({
                        ...task,
                        selected: checked
                      })));
                    }}
                  />
                </th>
                <th>Tên công việc</th>
                <th style={{ width: '180px' }}>Thời gian</th>
                <th>Mô tả</th>
                <th style={{ width: '60px' }}>Trạng thái</th>
                <th style={{ width: '300px' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task) => (
                <tr key={task._id}>
                  <td>
                    <input 
                      type="checkbox"
                      className="form-check-input"
                      checked={task.selected || false}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setTasks(prevTasks => prevTasks.map(t => 
                          t._id === task._id ? { ...t, selected: checked } : t
                        ));
                      }}
                    />
                  </td>
                  <td>{task.name}</td>
                  <td>{task.time}</td>
                  <td>{task.description}</td>
                  <td>
                    <span 
                      className={`badge ${task.status === 'Đang thực hiện' ? 'bg-warning' : task.status === 'Đã hoàn thành' ? 'bg-success' : 'bg-secondary'}`}
                      style={{ 
                        width: '120px', 
                        display: 'inline-block',
                        textAlign: 'center'
                      }}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-info btn-sm" style={{ marginRight: '10px' }} onClick={() => {
                      setSelectedTask(task);
                      setShowDetailModal(true);
                    }}>
                      <FontAwesomeIcon icon={faEye} /> Chi tiết
                    </button>
                    <button className="btn btn-warning btn-sm" style={{ marginRight: '10px' }} onClick={() => handleEdit(task)}>
                      <FontAwesomeIcon icon={faEdit} /> Sửa
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task)}>
                      <FontAwesomeIcon icon={faTrashAlt} /> Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Icon Next */}
        <FontAwesomeIcon 
          icon={faChevronRight}
          className={`position-absolute ${currentPage === Math.ceil(tasks.length / tasksPerPage) ? 'text-muted' : 'text-primary'}`}
          style={{ 
            fontSize: '24px',
            right: '-40px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: currentPage === Math.ceil(tasks.length / tasksPerPage) ? 'default' : 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => currentPage < Math.ceil(tasks.length / tasksPerPage) && paginate(currentPage + 1)}
        />
      </div>

      {/* Modal Chi tiết */}
      <div className={`modal fade ${showDetailModal ? 'show' : ''}`} style={{ display: showDetailModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Chi tiết công việc</h5>
              <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
            </div>
            <div className="modal-body">
              {selectedTask && (
                <div>
                  <p><strong>Tên công việc:</strong> {selectedTask.name}</p>
                  <p><strong>Thời gian:</strong> {selectedTask.time}</p>
                  <p><strong>Mô tả:</strong> {selectedTask.description}</p>
                  <p><strong>Trạng thái:</strong> {selectedTask.status}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Sửa */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sửa công việc</h5>
              <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              {selectedTask && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  // Xử lý cập nhật task
                  setShowEditModal(false);
                }}>
                  <div className="mb-3">
                    <label className="form-label">Tên công việc</label>
                    <input type="text" className="form-control" defaultValue={selectedTask.name} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Thời gian</label>
                    <input type="datetime-local" className="form-control" defaultValue={selectedTask.time} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea className="form-control" defaultValue={selectedTask.description}></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Trạng thái</label>
                    <select className="form-control" defaultValue={selectedTask.status}>
                      <option>Chờ xử lý</option>
                      <option>Đang thực hiện</option>
                      <option>Đã hoàn thành</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Xóa */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Xác nhận xóa</h5>
              <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn xóa công việc "{selectedTask?.name}" không?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Hủy</button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>Xóa</button>
            </div>
          </div>
        </div>
      </div>

      {/* Thêm overlay cho modal */}
      {(showDetailModal || showEditModal || showDeleteModal) && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
};

export default TaskManagement;
