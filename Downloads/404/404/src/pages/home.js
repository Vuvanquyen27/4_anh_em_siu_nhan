import React from 'react';
import '../css/Home.css';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';

// Đăng ký các components cần thiết cho Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

function Home() {
  const expenseData = {
    labels: ['Thức ăn', 'Di chuyển', 'Tiện ích', 'Giải trí', 'Khác'],
    datasets: [{
      data: [2000000, 1500000, 1000000, 500000, 300000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
    }],
  };

  const cashFlowData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
    datasets: [{
      label: 'Dòng tiền',
      data: [3000000, 3500000, 2800000, 4000000, 3200000, 3800000],
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
      fill: false,
    }],
  };

  // Thêm options chung cho cả 2 loại biểu đồ
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 50,
          padding: 20,
          font: {
            size: 50,
            weight: 'bold'
          },
          color: '#2c3e50',
          usePointStyle: true,
        }
      },
      tooltip: {
        bodyFont: {
          size: 60
        },
        titleFont: {
          size: 18
        },
        padding: 15
      }
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Bảng Điều Khiển Tổng Quan</h1>
      
      <div className="overview-cards">
        <div className="card card-account-balance">
          <h2>Số Dư Tài Khoản</h2>
          <p id="account-balance">50,000,000 VND</p>
        </div>
        <div className="card card-total-income">
          <h2>Tổng Thu Nhập</h2>
          <p id="total-income">75,000,000 VND</p>
        </div>
        <div className="card card-total-expenses">
          <h2>Tổng Chi Tiêu</h2>
          <p id="total-expenses">25,000,000 VND</p>
        </div>
      </div>

      <div className="charts-and-graphs">
        <h2>Biểu Đồ và Đồ Thị</h2>
        
        <div className="chart">
          <h3>Xu Hướng Dòng Tiền</h3>
          <div className="chart-container">
            <Line 
              data={cashFlowData} 
              options={{
                ...commonOptions,
                aspectRatio: 2,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      font: {
                        size: 20
                      },
                      callback: function(value) {
                        return value.toLocaleString('vi-VN') + ' VND';
                      }
                    }
                  },
                  x: {
                    ticks: {
                      font: { 
                        size: 14
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>

        <div className="chart">
          <h3>Phân Loại Chi Tiêu</h3>
          <div className="chart-container">
            <Pie 
              data={expenseData} 
              options={{
                ...commonOptions,
                aspectRatio: 1.5,
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
