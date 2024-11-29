import '../css/Forecast.css';

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';

// Đăng ký các components cần thiết
Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title,
  Tooltip
);

function Forecast() {
  const [forecastData, setForecastData] = useState({
    income: '',
    expenses: '',
    months: 6
  });

  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForecastData({ ...forecastData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { income, expenses, months } = forecastData;
    
    const data = {
      labels: Array.from({length: parseInt(months)}, (_, i) => `Tháng ${i + 1}`),
      datasets: [
        {
          label: 'Thu nhập',
          data: Array(parseInt(months)).fill(parseFloat(income) || 0),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1
        },
        {
          label: 'Chi tiêu',
          data: Array(parseInt(months)).fill(parseFloat(expenses) || 0),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1
        },
        {
          label: 'Số dư',
          data: Array(parseInt(months)).fill((parseFloat(income) || 0) - (parseFloat(expenses) || 0)),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          tension: 0.1
        }
      ]
    };

    setChartData(data);
    setShowChart(true);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 24,
            weight: 'bold'
          },
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'Dự Báo Dòng Tiền',
        font: {
          size: 32,
          weight: 'bold'
        },
        padding: 20
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 20
          },
          padding: 15,
          callback: function(value) {
            return new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(value);
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 20
          },
          padding: 15
        }
      }
    }
  };

  return (
    <div className="forecast-page">
      <h1>Dự Báo Dòng Tiền</h1>
      
      <div className="forecast-form">
        <h2>Nhập Thông Tin Dự Báo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="income"
            placeholder="Thu nhập hàng tháng"
            value={forecastData.income}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="expenses"
            placeholder="Chi tiêu hàng tháng"
            value={forecastData.expenses}
            onChange={handleInputChange}
            required
          />
          <select
            name="months"
            value={forecastData.months}
            onChange={handleInputChange}
          >
            <option value="3">3 tháng</option>
            <option value="6">6 tháng</option>
            <option value="12">12 tháng</option>
          </select>
          <button type="submit">Dự Báo</button>
        </form>
      </div>

      {showChart && chartData && (
        <div className="forecast-chart">
          <h2>Biểu Đồ Dự Báo</h2>
          <div style={{ height: '400px' }}>
            <Line data={chartData} options={options} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Forecast; 