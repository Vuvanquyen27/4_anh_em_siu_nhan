import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import { getTasks, createTask } from '../components/taskService';

const WorkScheduleManagement = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch các công việc khi trang load
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleCreateTask = (newTask) => {
    // Gửi yêu cầu tạo công việc mới
    createTask(newTask);
    setTasks([...tasks, newTask]); // Cập nhật danh sách công việc
  };

  return (
    <div>
      <h2>Quản lý lịch công tác</h2>
      <TaskList tasks={tasks} onCreateTask={handleCreateTask} />
    </div>
  );
};

export default WorkScheduleManagement;
