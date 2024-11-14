import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersonnelManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dữ liệu form để thêm/sửa người dùng
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    role_id: '',
    organization_level: '',
    department_id: '',
  });

  const [editUserId, setEditUserId] = useState(null); // Track which user is being edited

  // Lấy danh sách người dùng từ API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://backend-hackathon-dongnai.vercel.app/api/auth', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.data) {
          setUsers(response.data);
        } else {
          setError('Không có dữ liệu trả về từ server');
        }
        setLoading(false);
      } catch (err) {
        console.error('Chi tiết lỗi:', err);
        setError(err.response?.data?.message || 'Lỗi khi tải dữ liệu người dùng');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Hàm thêm người dùng mới
  const handleAddUser = async () => {
    try {
      const response = await axios.post('https://backend-hackathon-dongnai.vercel.app/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers([...users, response.data.user]);
      resetFormData();
      alert('Thêm người dùng thành công');
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi thêm người dùng');
    }
  };

  // Hàm xóa người dùng
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://backend-hackathon-dongnai.vercel.app/api/auth/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(users.filter((user) => user.user_id !== userId));
      alert('Xóa người dùng thành công');
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi xóa người dùng');
    }
  };

  // Hàm chỉnh sửa người dùng
  const handleEditUser = async (userId) => {
    setEditUserId(userId);
    const userToEdit = users.find((user) => user.user_id === userId);
    setFormData({
      full_name: userToEdit.full_name,
      email: userToEdit.email,
      phone_number: userToEdit.phone_number,
      password: '',
      role_id: userToEdit.role_id,
      organization_level: userToEdit.organization_level,
      department_id: userToEdit.department_id,
    });
  };

  // Hàm cập nhật người dùng
  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        `https://backend-hackathon-dongnai.vercel.app/api/auth/${editUserId}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setUsers(users.map((user) => (user.user_id === editUserId ? response.data.user : user)));
      resetFormData();
      setEditUserId(null);
      alert('Cập nhật người dùng thành công');
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi khi cập nhật người dùng');
    }
  };

  // Hàm xử lý thay đổi form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetFormData = () => {
    setFormData({
      full_name: '',
      email: '',
      phone_number: '',
      password: '',
      role_id: '',
      organization_level: '',
      department_id: '',
    });
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Quản lý nhân sự</h1>
      <form>
        <input
          type="text"
          name="full_name"
          placeholder="Tên đầy đủ"
          value={formData.full_name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Số điện thoại"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="role_id"
          placeholder="ID Vai trò"
          value={formData.role_id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="organization_level"
          placeholder="Cấp độ tổ chức"
          value={formData.organization_level}
          onChange={handleChange}
        />
        <input
          type="text"
          name="department_id"
          placeholder="ID Phòng ban"
          value={formData.department_id}
          onChange={handleChange}
        />
        <button type="button" onClick={editUserId ? handleUpdateUser : handleAddUser}>
          {editUserId ? 'Cập nhật người dùng' : 'Thêm người dùng'}
        </button>
      </form>

      <h2>Danh sách nhân viên</h2>
      <ul>
        {users.map((user) => (
          <li key={user.user_id || user._id}>
            <p>Họ tên: {user.full_name}</p>
            <p>Email: {user.email}</p>
            <p>Số điện thoại: {user.telephone || user.phone_number}</p>
            <p>Vai trò: {user.role_id}</p>
            <p>Cấp độ tổ chức: {user.organization_level}</p>
            <p>Phòng ban: {user.department_id?.name || user.department_id}</p>
            <button onClick={() => handleEditUser(user.user_id || user._id)}>Chỉnh sửa</button>
            <button onClick={() => handleDeleteUser(user.user_id || user._id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonnelManagement;
