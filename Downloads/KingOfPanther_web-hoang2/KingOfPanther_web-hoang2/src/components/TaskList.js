import React from 'react';
import '../styles/TaskList.css'; // Import CSS cho TaskList

const TaskList = ({ tasks, onDelete, onEdit, onToggleComplete, onShowDetail, selectAll, onSelectAll }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={onSelectAll}
                className="form-check-input"
              />
            </th>
            <th>Tên công việc</th>
            <th>Dự án</th>
            <th>Trạng thái</th>
            <th>Thời gian</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(index)}
                  className="form-check-input"
                />
              </td>
              <td>{task.name}</td>
              <td>{task.project}</td>
              <td>
                <span className={`status-badge ${task.status}`}>
                  {task.status === 'pending' ? 'Chờ xử lý' : 
                   task.status === 'in-progress' ? 'Đang thực hiện' : 
                   'Hoàn thành'}
                </span>
              </td>
              <td>{task.deadline || 'Chưa có'}</td>
              <td className="task-actions">
                <button 
                  className="btn btn-info btn-sm btt-task"
                  onClick={() => onShowDetail(task)}
                >
                  Chi tiết
                </button>
                <button 
                  className="btn btn-warning btn-sm btt-task"
                  onClick={() => onEdit(task)}
                >
                  Sửa
                </button>
                <button 
                  className="btn btn-danger btn-sm btt-task"
                  onClick={() => onDelete(index)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
