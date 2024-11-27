export const getTasks = async () => {
    // Giả sử bạn đang gọi API để lấy danh sách công việc
    return [
      { id: 1, name: 'Công việc 1', status: 'pending', project: 'Dự án A' },
      { id: 2, name: 'Công việc 2', status: 'pending', project: 'Dự án B' },
    ];
  };
  
  export const createTask = async (task) => {
    // Gửi công việc mới lên server
    console.log('Creating task', task);
  };
  
  export const getProjects = async () => {
    // Tạm thời return mock data
    return [
      { id: 1, name: 'Dự án A' },
      { id: 2, name: 'Dự án B' },
      { id: 3, name: 'Dự án C' },
    ];
  };
  
  export const getMembers = async () => {
    // Tạm thời return mock data
    return [
      { id: 1, name: 'Thành viên 1' },
      { id: 2, name: 'Thành viên 2' },
      { id: 3, name: 'Thành viên 3' },
    ];
  };
  
  export const updateTask = async (taskId, updates) => {
    // Tạm thời return mock data
    return {
      id: taskId,
      ...updates
    };
  };
  