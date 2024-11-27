import React, { useState, useEffect } from 'react';

import { 
  Table, Card, Input, Select, Button, Tag, Space, 
  Modal, Form, Tabs, Typography 
} from 'antd';
import { SearchOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const ProposalDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const mockProposals = [
    {
      _id: '1',
      title: 'Đề xuất mua thiết bị văn phòng',
      department: 'Hành chính',
      proposer: 'Nguyễn Văn A',
      status: 'pending',
      createdAt: '2024-03-20'
    },
    {
      _id: '2',
      title: 'Đề xuất tổ chức sự kiện công ty',
      department: 'Marketing',
      proposer: 'Trần Thị B',
      status: 'approved',
      createdAt: '2024-03-19'
    },
    {
      _id: '3',
      title: 'Đề xuất nâng cấp phần mềm',
      department: 'IT',
      proposer: 'Lê Văn C',
      status: 'rejected',
      createdAt: '2024-03-18'
    },
    {
      _id: '4',
      title: 'Đề xuất tuyển dụng nhân sự',
      department: 'HR',
      proposer: 'Phạm Thị D',
      status: 'review',
      createdAt: '2024-03-17'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setProposals(mockProposals);
    }, 500);
  }, []);

  const columns = [
    {
      title: 'Tên đề xuất',
      dataIndex: 'title',
      key: 'title',
      filterable: true,
    },
    {
      title: 'Ban đề xuất',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Người đề xuất',
      dataIndex: 'proposer',
      key: 'proposer',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={
          status === 'approved' ? 'green' :
          status === 'rejected' ? 'red' :
          status === 'pending' ? 'gold' : 'blue'
        }>
          {status === 'approved' ? 'Đã phê duyệt' :
           status === 'rejected' ? 'Từ chối' :
           status === 'pending' ? 'Chờ duyệt' : 'Thẩm định lại'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<CheckOutlined />}
            onClick={() => handleApprove(record)}
            disabled={record.status === 'approved'}
          >
            Phê duyệt
          </Button>
          <Button 
            danger 
            icon={<CloseOutlined />}
            onClick={() => handleReject(record)}
            disabled={record.status === 'rejected'}
          >
            Từ chối
          </Button>
        </Space>
      ),
    },
  ];

  const getFilteredProposals = () => {
    return proposals
      .filter(item => 
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.department.toLowerCase().includes(searchText.toLowerCase()) ||
        item.proposer.toLowerCase().includes(searchText.toLowerCase())
      )
      .filter(item => 
        filterStatus === 'all' ? true : item.status === filterStatus
      );
  };

  const handleApprove = (record) => {
    const updatedProposals = proposals.map(p => 
      p._id === record._id ? {...p, status: 'approved'} : p
    );
    setProposals(updatedProposals);
  };

  const handleReject = (record) => {
    const updatedProposals = proposals.map(p => 
      p._id === record._id ? {...p, status: 'rejected'} : p
    );
    setProposals(updatedProposals);
  };

  return (
    <div className="proposal-dashboard">
      <Card>
        <Title level={2}>Quản lý đề xuất</Title>
        
        <Space className="filter-section" style={{ marginBottom: 16 }}>
          <Input
            placeholder="Tìm kiếm đề xuất..."
            prefix={<SearchOutlined />}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Select 
            defaultValue="all" 
            style={{ width: 200 }}
            onChange={value => setFilterStatus(value)}
          >
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="approved">Đã phê duyệt</Option>
            <Option value="rejected">Từ chối</Option>
            <Option value="pending">Chờ duyệt</Option>
            <Option value="review">Thẩm định lại</Option>
          </Select>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Tạo đề xuất mới
          </Button>
        </Space>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Tất cả đề xuất" key="1">
            <Table 
              columns={columns} 
              dataSource={getFilteredProposals()}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="Đề xuất của tôi" key="2">
            <Table 
              columns={columns} 
              dataSource={getFilteredProposals().filter(p => p.proposer === 'Nguyễn Văn A')}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title="Tạo đề xuất mới"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          {/* Form fields here */}
        </Form>
      </Modal>
    </div>
  );
};

export default ProposalDashboard;
