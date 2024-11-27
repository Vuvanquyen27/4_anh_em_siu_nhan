import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faTasks, 
  faClipboardList, 
  faCalendarAlt,
  faChartBar,
  faSearch,
  faUserTie,
  faListCheck,
  faCalendarWeek,
  faChartPie,
  faFileAlt,
  faSearchLocation
} from '@fortawesome/free-solid-svg-icons';
import { Card, Row, Col } from 'antd';
import './Home.css';

const Home = () => {
  // Thống kê tổng quan
  const stats = [
    {
      icon: faUsers,
      title: "Tổng Đoàn Viên",
      value: "1,234",
      color: "#4e73df",
      link: "/personnel-management"
    },
    {
      icon: faTasks,
      title: "Công Việc Đang Thực Hiện",
      value: "25",
      color: "#1cc88a",
      link: "/task-management"
    },
    {
      icon: faClipboardList,
      title: "Đề Xuất Chờ Duyệt",
      value: "18",
      color: "#f6c23e",
      link: "/proposal-dashboard"
    },
    {
      icon: faCalendarAlt,
      title: "Hoạt Động Trong Tháng",
      value: "12",
      color: "#e74a3b",
      link: "/work-schedule-management"
    }
  ];

  // Chức năng chính
  const mainFeatures = [
    {
      icon: faUserTie,
      title: "Quản Lý Nhân Sự",
      description: "Quản lý thông tin đoàn viên, phân công nhiệm vụ",
      color: "#36b9cc",
      link: "/personnel-management"
    },
    {
      icon: faListCheck,
      title: "Quản Lý Công Việc",
      description: "Theo dõi, phân công và đánh giá công việc",
      color: "#4e73df",
      link: "/task-management"
    },
    {
      icon: faCalendarWeek,
      title: "Lịch Công Tác",
      description: "Xem và quản lý lịch hoạt động, sự kiện",
      color: "#1cc88a",
      link: "/work-schedule-management"
    },
    {
      icon: faChartPie,
      title: "Thống Kê Báo Cáo",
      description: "Báo cáo tổng hợp, thống kê số liệu",
      color: "#f6c23e",
      link: "/statistics"
    },
    {
      icon: faFileAlt,
      title: "Quản Lý Đề Xuất",
      description: "Xử lý đề xuất, phê duyệt yêu cầu",
      color: "#e74a3b",
      link: "/proposal-dashboard"
    },
    {
      icon: faSearchLocation,
      title: "Tra Cứu Công Tác",
      description: "Tìm kiếm thông tin công tác, nhiệm vụ",
      color: "#858796",
      link: "/work-search"
    }
  ];

  const handleCardClick = (link) => {
    window.location.href = link;
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Tổng Quan Hoạt Động</h1>
      
      {/* Thống kê */}
      <Row gutter={[16, 16]} className="stats-container">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card 
              className="stat-card" 
              bordered={false}
              onClick={() => handleCardClick(stat.link)}
            >
              <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                <FontAwesomeIcon icon={stat.icon} />
              </div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <p className="stat-value">{stat.value}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Chức năng chính */}
      <h2 className="features-title">Chức Năng Chính</h2>
      <Row gutter={[16, 16]} className="features-container">
        {mainFeatures.map((feature, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card 
              className="feature-card" 
              bordered={false}
              onClick={() => handleCardClick(feature.link)}
            >
              <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Hoạt động gần đây và đề xuất */}
      <Row gutter={[16, 16]} className="charts-container">
        <Col xs={24} md={12}>
          <Card title="Hoạt Động Gần Đây" className="activity-card">
            <ul className="activity-list">
              <li>
                <span className="activity-date">15/03/2024</span>
                <span className="activity-title">Họp đoàn tháng 3</span>
              </li>
              <li>
                <span className="activity-date">18/03/2024</span>
                <span className="activity-title">Tổ chức giải bóng đá</span>
              </li>
              <li>
                <span className="activity-date">20/03/2024</span>
                <span className="activity-title">Tình nguyện vì cộng đồng</span>
              </li>
            </ul>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Đề Xuất Mới Nhất" className="proposal-card">
            <ul className="proposal-list">
              <li>
                <span className="proposal-title">Tổ chức sự kiện văn hóa</span>
                <span className="proposal-status pending">Chờ duyệt</span>
              </li>
              <li>
                <span className="proposal-title">Mua sắm thiết bị</span>
                <span className="proposal-status approved">Đã duyệt</span>
              </li>
              <li>
                <span className="proposal-title">Kế hoạch đào tạo</span>
                <span className="proposal-status pending">Chờ duyệt</span>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
