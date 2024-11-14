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
  