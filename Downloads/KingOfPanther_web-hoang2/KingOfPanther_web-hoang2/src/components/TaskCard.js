import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div>
      <h4>{task.name}</h4>
      <p>Status: {task.status}</p>
      <p>Project: {task.project}</p>
      {/* Mỗi công việc có thể có các nút để thay đổi trạng thái hoặc thêm ghi chú */}
    </div>
  );
};

export default TaskCard;
