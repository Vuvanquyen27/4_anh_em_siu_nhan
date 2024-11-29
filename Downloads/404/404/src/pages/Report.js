import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../css/Report.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Report() {
  const [reportType, setReportType] = useState('income-expense');
  const [customReportConfig, setCustomReportConfig] = useState({
    startDate: '',
    endDate: '',
    categories: [],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  const data = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
    datasets: [
      {
        label: 'Thu nhập',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.1
      },
      {
        label: 'Chi tiêu',
        data: [8, 12, 6, 9, 4, 7],
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        tension: 0.1
      }
    ]
  };

  const handleCustomReportChange = (e) => {
    const { name, value } = e.target;
    setCustomReportConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setCustomReportConfig(prev => {
      if (checked) {
        return {
          ...prev,
          categories: [...prev.categories, value]
        };
      } else {
        return {
          ...prev,
          categories: prev.categories.filter(cat => cat !== value)
        };
      }
    });
  };

  const generateCustomReport = () => {
    console.log('Tạo báo cáo với config:', customReportConfig);
  };

  return (
    <div className="report-page">
      <h1>Báo Cáo</h1>
      
      <div className="report-type-selector">
        <button 
          className={reportType === 'income-expense' ? 'active' : ''}
          onClick={() => setReportType('income-expense')}
        >
          Báo cáo Thu Chi
        </button>
        <button 
          className={reportType === 'custom' ? 'active' : ''}
          onClick={() => setReportType('custom')}
        >
          Báo cáo Tùy chỉnh
        </button>
      </div>

      {reportType === 'income-expense' && (
        <div className="income-expense-report">
          <div className="chart-container">
            <Line 
              data={data} 
              options={options}
              height={300}
              width={600}
            />
          </div>
        </div>
      )}

      {reportType === 'custom' && (
        <div className="custom-report">
          <h2>Tạo Báo Cáo Tùy Chỉnh</h2>
          <form onSubmit={(e) => { e.preventDefault(); generateCustomReport(); }}>
            <div className="form-group">
              <label>Từ ngày:</label>
              <input 
                type="date" 
                name="startDate"
                value={customReportConfig.startDate}
                onChange={handleCustomReportChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Đến ngày:</label>
              <input 
                type="date" 
                name="endDate"
                value={customReportConfig.endDate}
                onChange={handleCustomReportChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Danh mục:</label>
              <div className="checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    value="income"
                    onChange={handleCategoryChange}
                  /> Thu nhập
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    value="expense"
                    onChange={handleCategoryChange}
                  /> Chi tiêu
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    value="savings"
                    onChange={handleCategoryChange}
                  /> Tiết kiệm
                </label>
              </div>
            </div>
            <button type="submit">Tạo Báo Cáo</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Report; 