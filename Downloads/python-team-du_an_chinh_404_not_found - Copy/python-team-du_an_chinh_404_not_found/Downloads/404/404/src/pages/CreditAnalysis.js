import React, { useState } from 'react';
import '../css/CreditAnalysis.css';

function CreditAnalysis() {
  const [creditData, setCreditData] = useState({
    income: '',
    expenses: '',
    assets: '',
    liabilities: '',
    paymentHistory: 'good',
    employmentStatus: 'employed',
    employmentDuration: ''
  });

  const [creditScore, setCreditScore] = useState(null);
  const [showReport, setShowReport] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditData({ ...creditData, [name]: value });
  };

  const calculateCreditScore = () => {
    let score = 0;
    const {
      income,
      expenses,
      assets,
      liabilities,
      paymentHistory,
      employmentStatus,
      employmentDuration
    } = creditData;

    // Tính điểm dựa trên thu nhập và chi tiêu
    const incomeRatio = (parseFloat(expenses) / parseFloat(income)) || 0;
    if (incomeRatio < 0.3) score += 300;
    else if (incomeRatio < 0.5) score += 200;
    else score += 100;

    // Tính điểm dựa trên tài sản và nợ
    const debtRatio = (parseFloat(liabilities) / parseFloat(assets)) || 0;
    if (debtRatio < 0.4) score += 300;
    else if (debtRatio < 0.6) score += 200;
    else score += 100;

    // Điểm cho lịch sử thanh toán
    if (paymentHistory === 'excellent') score += 300;
    else if (paymentHistory === 'good') score += 200;
    else score += 100;

    // Điểm cho tình trạng việc làm
    if (employmentStatus === 'employed' && parseInt(employmentDuration) > 2) {
      score += 100;
    }

    return score;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = calculateCreditScore();
    setCreditScore(score);
    setShowReport(true);
  };

  const getCreditRating = (score) => {
    if (score >= 800) return 'Xuất sắc';
    if (score >= 700) return 'Tốt';
    if (score >= 600) return 'Khá';
    if (score >= 500) return 'Trung bình';
    return 'Cần cải thiện';
  };

  return (
    <div className="credit-analysis-page">
      <h1>Phân Tích Tín Dụng</h1>
      
      <div className="credit-form">
        <h2>Nhập Thông Tin Đánh Giá</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Thu nhập hàng tháng:</label>
            <input
              type="number"
              name="income"
              value={creditData.income}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Chi tiêu hàng tháng:</label>
            <input
              type="number"
              name="expenses"
              value={creditData.expenses}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tổng tài sản:</label>
            <input
              type="number"
              name="assets"
              value={creditData.assets}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tổng nợ:</label>
            <input
              type="number"
              name="liabilities"
              value={creditData.liabilities}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Lịch sử thanh toán:</label>
            <select
              name="paymentHistory"
              value={creditData.paymentHistory}
              onChange={handleInputChange}
            >
              <option value="excellent">Xuất sắc</option>
              <option value="good">Tốt</option>
              <option value="fair">Trung bình</option>
              <option value="poor">Kém</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tình trạng việc làm:</label>
            <select
              name="employmentStatus"
              value={creditData.employmentStatus}
              onChange={handleInputChange}
            >
              <option value="employed">Đang làm việc</option>
              <option value="self-employed">Tự kinh doanh</option>
              <option value="unemployed">Thất nghiệp</option>
            </select>
          </div>

          <div className="form-group">
            <label>Thời gian làm việc (năm):</label>
            <input
              type="number"
              name="employmentDuration"
              value={creditData.employmentDuration}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">Phân Tích</button>
        </form>
      </div>

      {showReport && creditScore && (
        <div className="credit-report">
          <h2>Báo Cáo Tín Dụng</h2>
          <div className="report-content">
            <div className="score-section">
              <h3>Điểm tín dụng của bạn</h3>
              <div className="credit-score">{creditScore}</div>
              <div className="credit-rating">Xếp hạng: {getCreditRating(creditScore)}</div>
            </div>
            
            <div className="analysis-section">
              <h3>Phân tích chi tiết</h3>
              <ul>
                <li>Tỷ lệ chi tiêu/thu nhập: {((creditData.expenses / creditData.income) * 100).toFixed(1)}%</li>
                <li>Tỷ lệ nợ/tài sản: {((creditData.liabilities / creditData.assets) * 100).toFixed(1)}%</li>
                <li>Lịch sử thanh toán: {creditData.paymentHistory}</li>
                <li>Tình trạng việc làm: {creditData.employmentStatus}</li>
              </ul>
            </div>

            <div className="recommendations">
              <h3>Khuyến nghị</h3>
              <ul>
                {creditScore < 600 && (
                  <>
                    <li>Cải thiện tỷ lệ chi tiêu/thu nhập</li>
                    <li>Giảm nợ hiện tại</li>
                    <li>Duy trì thanh toán đúng hạn</li>
                  </>
                )}
                {creditScore >= 600 && creditScore < 800 && (
                  <>
                    <li>Tiếp tục duy trì thói quen tài chính tốt</li>
                    <li>Xem xét đầu tư để tăng tài sản</li>
                  </>
                )}
                {creditScore >= 800 && (
                  <>
                    <li>Duy trì tình hình tài chính hiện tại</li>
                    <li>Xem xét các cơ hội đầu tư</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreditAnalysis; 