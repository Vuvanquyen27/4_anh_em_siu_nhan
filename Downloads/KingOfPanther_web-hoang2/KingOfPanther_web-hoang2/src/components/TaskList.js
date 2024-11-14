import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onCreateTask }) => {
  return (
    <div>
      <h3>Danh sách công việc</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      {/* Form hoặc cách thêm công việc mới */}
      <button onClick={() => onCreateTask({ id: Date.now(), name: 'New Task', status: 'pending', project: 'Project A' })}>
        Thêm công việc mới
      </button>
    </div>
  );
};

export default TaskList;
