import React from 'react';
import '../css/Home.css';

function Home() {
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

      <div className="cash-flow-chart">
        <h2>Biểu Đồ Dòng Tiền</h2>
        <div id="cash-flow-chart-container" className="chart-container">
          {/* Đây là nơi bạn sẽ thêm biểu đồ dòng tiền bằng JavaScript */}
        </div>
      </div>

      <div className="charts-and-graphs">
        <h2>Biểu Đồ và Đồ Thị</h2>
        
        <div className="chart">
          <h3>Xu Hướng Dòng Tiền</h3>
          <div id="cash-flow-trend-chart" className="chart-container">
            {/* Đây là nơi bạn sẽ thêm biểu đồ xu hướng dòng tiền */}
          </div>
        </div>

        <div className="chart">
          <h3>Thu Chi Theo Thời Gian</h3>
          <div id="income-expense-time-chart" className="chart-container">
            {/* Đây là nơi bạn sẽ thêm biểu đồ thu chi theo thời gian */}
          </div>
        </div>

        <div className="chart">
          <h3>Phân Loại Chi Tiêu</h3>
          <div id="expense-category-chart" className="chart-container">
            {/* Đây là nơi bạn sẽ thêm biểu đồ phân loại chi tiêu */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
