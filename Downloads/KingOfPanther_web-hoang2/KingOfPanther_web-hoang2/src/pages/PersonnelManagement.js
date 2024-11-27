import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Modal, Form, Select, message } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import './PersonnelManagement.css';

const { Option } = Select;

const PersonnelManagement = () => {
  const [data, setData] = useState([]); /* Dữ liệu đoàn viên được lấy từ API */
  const [loading, setLoading] = useState(false); /* Trạng thái loading */
  const [searchText, setSearchText] = useState(''); /* Text tìm kiếm */
  const [isModalVisible, setIsModalVisible] = useState(false); /* Trạng thái modal */
  const [form] = Form.useForm(); /* Form để thêm/sửa đoàn viên */
  const [editingId, setEditingId] = useState(null); /* ID của đoàn viên đang được sửa */

  // Giả lập dữ liệu
  useEffect(() => {
    setData([
      {
        key: '1',
        id: 'DV001',
        name: 'Nguyễn Văn A',
        dateOfBirth: '1995-05-15',
        gender: 'Nam',
        position: 'Bí thư',
        department: 'Chi đoàn 1',
        phone: '0123456789',
        email: 'nguyenvana@gmail.com',
        status: 'Đang hoạt động'
      },
      // Thêm dữ liệu mẫu khác...
    ]);
  }, []);

  const columns = [
    {
      title: 'Mã ĐV',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase()) ||
               String(record.id).toLowerCase().includes(value.toLowerCase()) ||
               String(record.department).toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      width: 120,
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: 100,
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      key: 'position',
      width: 150,
    },
    {
      title: 'Chi đoàn',
      dataIndex: 'department',
      key: 'department',
      width: 150,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingId(record.key);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa đoàn viên này?',
      onOk() {
        setData(data.filter(item => item.key !== key));
        message.success('Xóa thành công');
      },
    });
  };

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields()
      .then(values => {
        if (editingId) {
          setData(data.map(item => 
            item.key === editingId ? { ...values, key: editingId } : item
          ));
          message.success('Cập nhật thành công');
        } else {
          const newKey = String(data.length + 1);
          setData([...data, { ...values, key: newKey }]);
          message.success('Thêm mới thành công');
        }
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <div className="personnel-management">
      <div className="personnel-header">
        <h1>Quản Lý Đoàn Viên</h1>
        <Space>
          <Input
            placeholder="Tìm kiếm theo tên, mã ĐV, chi đoàn..."
            prefix={<SearchOutlined />}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button 
            type="primary" 
            icon={<UserAddOutlined />}
            onClick={handleAdd}
          >
            Thêm Đoàn Viên
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 1500 }}
        pagination={{
          total: data.length,
          pageSize: 10,
          showTotal: (total) => `Tổng số ${total} đoàn viên`,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <Modal
        title={editingId ? "Sửa thông tin đoàn viên" : "Thêm đoàn viên mới"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="dateOfBirth"
            label="Ngày sinh"
            rules={[{ required: true, message: 'Vui lòng nhập ngày sinh' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
          >
            <Select>
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
            </Select>
          </Form.Item>

          {/* Thêm các trường form khác tương tự */}
        </Form>
      </Modal>
    </div>
  );
};

export default PersonnelManagement;
