import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import '../styles/WorkScheduleManagement.css'; // Import CSS
import { Modal, Button, Form } from 'react-bootstrap'; // Thêm import Form
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Thêm dòng này vào phần import

const WorkScheduleManagement = () => {
  const fakeTasks = [
    { 
      name: 'Phát triển giao diện trang web', 
      status: 'pending', 
      project: 'Dự án A',
      deadline: '2024-03-20',
      completed: false
    },
    { name: 'Họp với khách hàng', status: 'in-progress', project: 'Dự án B', deadline: '2024-03-21', completed: false },
    { name: 'Kiểm tra tiến độ dự án', status: 'completed', project: 'Dự án C', deadline: '2024-03-22', completed: false },
    { name: 'Cập nhật hệ thống phần mềm', status: 'in-progress', project: 'Dự án A', deadline: '2024-03-23', completed: false },
    { name: 'Đào tạo nhân viên mới', status: 'pending', project: 'Dự án D', deadline: '2024-03-24', completed: false }
  ];

  const [tasks, setTasks] = useState(fakeTasks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [newTask, setNewTask] = useState({
    name: '',
    status: 'pending',
    project: '',
    deadline: '',
    completed: false
  });
  const [selectAll, setSelectAll] = useState(false);

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setNewTask({ ...task });
    setShowAddModal(true);
  };

  const handleToggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    const allCompleted = newTasks.every(task => task.completed);
    setSelectAll(allCompleted);
  };

  const handleShowDetail = (task) => {
    setSelectedTask(task);
    setShowDetailModal(true);
  };

  const handleDeleteConfirm = (index) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công việc này không?')) {
      handleDelete(index);
    }
  };

  const handleSort = (criteria, direction) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (criteria === 'deadline') {
        return direction === 'asc' 
          ? new Date(a[criteria]) - new Date(b[criteria])
          : new Date(b[criteria]) - new Date(a[criteria]);
      }
      return direction === 'asc'
        ? a[criteria].localeCompare(b[criteria])
        : b[criteria].localeCompare(a[criteria]);
    });

    setTasks(sortedTasks);
  };

  const handleAddTask = () => {
    setTasks([...tasks, newTask]);
    setShowAddModal(false);
    setNewTask({
      name: '',
      status: 'pending',
      project: '',
      deadline: '',
      completed: false
    });
  };

  const handleSelectAll = () => {
    const newTasks = tasks.map(task => ({
      ...task,
      completed: !selectAll
    }));
    setTasks(newTasks);
    setSelectAll(!selectAll);
  };

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map(task => 
      task === editingTask ? newTask : task
    );
    setTasks(updatedTasks);
    setShowAddModal(false);
    setEditingTask(null);
    setNewTask({
      name: '',
      status: 'pending',
      project: '',
      deadline: '',
      completed: false
    });
  };

  const handleAddNewTask = () => {
    setEditingTask(null);
    setNewTask({
      name: '',
      status: 'pending',
      project: '',
      deadline: '',
      completed: false
    });
    setShowAddModal(true);
  };

  const SortDropdown = () => {
    return (
      <select 
        className="form-select" 
        value={`${sortCriteria}-${sortDirection}`}
        onChange={(e) => {
          const [criteria, direction] = e.target.value.split('-');
          setSortCriteria(criteria);
          setSortDirection(direction);
          handleSort(criteria, direction);
        }}
      >
        <option value="default" disabled>Sắp xếp theo</option>
        <option value="name-asc">Tên công việc: A-Z </option>
        <option value="name-desc">Tên công việc: Z-A</option>
        <option value="project-asc">Dự án: A-Z</option>
        <option value="project-desc">Dự án: Z-A</option>
        <option value="status-asc">Trạng thái: A-Z</option>
        <option value="status-desc">Trạng thái: Z-A</option>
        <option value="deadline-asc">Thời hạn: Cũ nhất</option>
        <option value="deadline-desc">Thời hạn: Mới nhất</option>
      </select>
    );
  };

  return (
    <div className="container work-schedule-container">
      <div className="header d-flex justify-content-between align-items-center bg-white p-0">
        <h2 style={{ color: 'black' }}>Quản lý lịch công tác</h2>
      </div>
      <div className="task-overview">
        <div className="status-panel">
          <h4>Tổng quan trạng thái</h4>
          <ul>
            <li>Công việc chờ xử lý: {tasks.filter(task => task.status === 'pending').length}</li>
            <li>Công việc đang thực hiện: {tasks.filter(task => task.status === 'in-progress').length}</li>
            <li>Công việc đã hoàn thành: {tasks.filter(task => task.status === 'completed').length}</li>
          </ul>
        </div>
      </div>

      <div className="sort-controls mb-3 d-flex justify-content-between align-items-center">
        <SortDropdown />
        <button 
          className="btn btn-primary ms-3" 
          onClick={handleAddNewTask}
        >
          Thêm công việc mới
        </button>
      </div>

      <TaskList 
        tasks={tasks}
        onDelete={handleDeleteConfirm}
        onEdit={handleEdit}
        onToggleComplete={handleToggleComplete}
        onShowDetail={handleShowDetail}
        selectAll={selectAll}
        onSelectAll={handleSelectAll}
      />

      {/* Modal xem chi tiết */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết công việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <div>
              <p><strong>Tên công việc:</strong> {selectedTask.name}</p>
              <p><strong>Dự án:</strong> {selectedTask.project}</p>
              <p>
                <strong style={{ width: '120px' }}>Trạng thái:</strong>
                <span className={`badge ${
                  selectedTask.status === 'pending' ? 'bg-secondary' :
                  selectedTask.status === 'in-progress' ? 'bg-warning' :
                  'bg-success'
                }`} style={{ width: '120px', display: 'inline-block', textAlign: 'center' }}>
                  {selectedTask.status === 'pending' ? 'Chờ xử lý' :
                   selectedTask.status === 'in-progress' ? 'Đang thực hiện' :
                   'Hoàn thành'}
                </span>
              </p>
              <p><strong>Deadline:</strong> {selectedTask.deadline}</p>
              <p><strong>Hoàn thành:</strong> {selectedTask.completed ? 'Có' : 'Không'}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowDetailModal(false)}
            style={{ marginRight: '10px', width: '120px' }}
          >
            Đóng
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              setShowDetailModal(false);
              handleEdit(selectedTask);
            }}
            style={{ width: '120px' }}
          >
            Chỉnh sửa
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal thêm công việc */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTask ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskName">
              <Form.Label>Tên công việc</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nhập tên công việc" 
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formTaskProject">
              <Form.Label>Dự án</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nhập tên dự án" 
                value={newTask.project}
                onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formTaskDeadline">
              <Form.Label>Thời hạn</Form.Label>
              <Form.Control 
                type="date" 
                value={newTask.deadline}
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formTaskStatus">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control 
                as="select" 
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              >
                <option value="pending">Chờ xử lý</option>
                <option value="in-progress">Đang thực hiện</option>
                <option value="completed">Hoàn thành</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
            onClick={() => {
              setShowAddModal(false);
              setEditingTask(null);
              setNewTask({
                name: '',
                status: 'pending',
                project: '',
                deadline: '',
                completed: false
              });
            }}
            style={{ width: '120px' }}
          >
            Đóng
          </Button>
          <Button 
            variant="primary" 
            onClick={editingTask ? handleUpdateTask : handleAddTask}
            style={{ width: '120px' }}
          >
            {editingTask ? 'Cập nhật' : 'Thêm công việc'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkScheduleManagement;