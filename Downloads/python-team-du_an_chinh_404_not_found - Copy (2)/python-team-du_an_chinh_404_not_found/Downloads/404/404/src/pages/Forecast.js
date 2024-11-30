import '../css/Forecast.css';
import axios from 'axios';

import React, { useState } from 'react';

function Forecast() {
  const [forecastData, setForecastData] = useState({
    income: '',
    expenses: '',
    months: 6
  });

  const [confirmValues, setConfirmValues] = useState({
    income: false,
    expenses: false
  });

  const [budgetData, setBudgetData] = useState({
    fixedExpenses: '',
    savingsGoal: '',
    budgetTemplate: '1',
    customRatios: null
  });

  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [budgetResult, setBudgetResult] = useState(null);
  const [savingsEvaluation, setSavingsEvaluation] = useState(null);

  const [aiPredictions, setAiPredictions] = useState(null);
  const [spendingPatterns, setSpendingPatterns] = useState(null);

  // Thêm templates phân bổ ngân sách
  const budgetTemplates = {
    '1': { name: 'Cân bằng (50-30-20)', ratios: { necessities: 0.5, wants: 0.3, additional_savings: 0.2 } },
    '2': { name: 'Tiết kiệm (60-20-20)', ratios: { necessities: 0.6, wants: 0.2, additional_savings: 0.2 } },
    '3': { name: 'Tự do (40-40-20)', ratios: { necessities: 0.4, wants: 0.4, additional_savings: 0.2 } },
  };

  // Hàm format số tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount).replace(/,/g, ".");
  };

  // Cập nhật state customRatios
  const [customRatios, setCustomRatios] = useState({
    necessities: '',
    wants: '',
    additional_savings: ''
  });

  // Cập nhật hàm handleCustomRatioChange
  const handleCustomRatioChange = (type, value) => {
    // Loại bỏ ký tự % nếu có và chỉ giữ lại số
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // Giới hạn giá trị từ 0-100
    if (numericValue === '' || (parseInt(numericValue) >= 0 && parseInt(numericValue) <= 100)) {
      const newRatios = { 
        ...customRatios, 
        [type]: numericValue 
      };
      
      // Tính tổng các tỷ lệ (trừ wants)
      const totalExceptWants = Object.entries(newRatios)
        .filter(([key, val]) => key !== 'wants' && val !== '')
        .reduce((sum, [_, val]) => sum + parseInt(val), 0);

      // Nếu tổng các tỷ lệ (trừ wants) <= 100, tự động điền phần còn lại vo wants
      if (totalExceptWants <= 100) {
        newRatios.wants = (100 - totalExceptWants).toString();
        setCustomRatios(newRatios);

        // Cập nhật ratios cho budgetData
        setBudgetData({
          ...budgetData,
          customRatios: {
            necessities: parseInt(newRatios.necessities || '0') / 100,
            wants: parseInt(newRatios.wants || '0') / 100,
            additional_savings: parseInt(newRatios.additional_savings || '0') / 100
          }
        });
      }
    }
  };

  // Thêm hàm kiểm tra tổng tỷ lệ
  const getTotalRatio = () => {
    return Object.values(customRatios)
      .filter(val => val !== '')
      .reduce((sum, val) => sum + parseInt(val), 0);
  };

  // Hàm xử lý nhập số tiền
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/\./g, '').replace(/\s/g, '');
    
    if (name === 'months') {
        setForecastData({ ...forecastData, [name]: parseInt(value) || '' });
        return;
    }

    if (/^\d*$/.test(cleanValue)) {
        if (name === 'fixedExpenses' || name === 'savingsGoal') {
            setBudgetData({ ...budgetData, [name]: cleanValue });
        } else {
            setForecastData({ ...forecastData, [name]: cleanValue });
        }
        e.target.value = cleanValue ? formatCurrency(cleanValue) : '';
    }
  };

  // Hàm xác nhận giá trị nhập
  const handleInputConfirm = (name) => {
    const value = forecastData[name];
    if (value) {
      const formattedValue = formatCurrency(value);
      console.log(`${name}: ${formattedValue} VND`);
      setConfirmValues({ ...confirmValues, [name]: true });
    }
  };

  // Hàm đánh giá tiết kiệm
  const evaluateSavings = (totalSavings) => {
    if (totalSavings >= 1000000000) {
      return "💎 Chúc mừng! Bạn đã là một nhà tiết kiệm xuất sắc. Hãy tiếp tục phát huy nhé!";
    } else {
      const gap = 1000000000 - totalSavings;
      return `💪 Cố gắng lên! Bạn cần tiết kiệm thêm ${formatCurrency(gap)} VND nữa để đạt mục tiêu 1 tỷ VND`;
    }
  };

  // Thêm state để theo dõi việc nhập liệu ngân sách
  const [budgetInputs, setBudgetInputs] = useState({
    income: '',
    fixedExpenses: '',
    savingsGoal: ''
  });

  // Cập nhật hàm handleBudgetInput
  const handleBudgetInput = (e) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/\./g, '').replace(/\s/g, '');
    
    if (/^\d*$/.test(cleanValue)) {
      setBudgetInputs({ ...budgetInputs, [name]: cleanValue });
      // Cập nhật cả forecastData và budgetData
      if (name === 'fixedExpenses' || name === 'savingsGoal') {
        setBudgetData({ ...budgetData, [name]: cleanValue });
      } else {
        setForecastData({ ...forecastData, [name]: cleanValue });
      }
      e.target.value = cleanValue ? formatCurrency(cleanValue) : '';
    }
  };

  // Cập nhật hàm calculateBudget
  const calculateBudget = () => {
    // Kiểm tra thu nhập từ forecastData
    if (!forecastData.income) {
      alert('Vui lòng nhập thu nhập!');
      return;
    }

    // Kiểm tra dữ liệu đầu vào từ budgetData
    if (!budgetData.fixedExpenses || !budgetData.savingsGoal) {
      alert('Vui lòng nhập đầy đủ chi phí cố định và mục tiêu tiết kiệm!');
      return;
    }

    const income = parseFloat(forecastData.income);
    const fixedExpenses = parseFloat(budgetData.fixedExpenses);
    const savingsGoal = parseFloat(budgetData.savingsGoal);

    // Kiểm tra giá trị hợp lệ
    if (isNaN(income) || isNaN(fixedExpenses) || isNaN(savingsGoal)) {
      alert('Vui lòng nhập số tiền hợp lệ!');
      return;
    }

    // Kiểm tra chi phí cố định không được lớn hơn thu nhập
    if (fixedExpenses >= income) {
      alert('Chi phí cố định không được lớn hơn thu nhập!');
      return;
    }

    const disposableIncome = income - fixedExpenses;

    let ratios;
    if (budgetData.budgetTemplate === 'custom') {
      if (!budgetData.customRatios) {
        alert('Vui lòng nhập đầy đủ tỷ lệ phân bổ!');
        return;
      }
      ratios = budgetData.customRatios;
    } else {
      ratios = budgetTemplates[budgetData.budgetTemplate].ratios;
    }

    const budget = {
      savings: savingsGoal,
      necessities: Math.round(disposableIncome * ratios.necessities),
      wants: Math.round(disposableIncome * ratios.wants),
      additional_savings: Math.round(disposableIncome * ratios.additional_savings)
    };

    setBudgetResult(budget);
    const totalSavings = budget.savings + budget.additional_savings;
    setSavingsEvaluation(evaluateSavings(totalSavings));
  };

  // Thêm hàm gọi API
  const getAIPredictions = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/predict', {
        income: forecastData.income,
        expenses: forecastData.expenses,
        months: forecastData.months
      });

      setAiPredictions(response.data.predictions);
      setSpendingPatterns(response.data.patterns);
    } catch (error) {
      console.error('Error fetching AI predictions:', error);
    }
  };

  // Cập nhật hàm handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await getAIPredictions();
  };

  return (
    <div className="forecast-page">
      <div className="forecast-form">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="income"
              placeholder="Thu nhập hàng tháng"
              onChange={handleInputChange}
            />
            {!confirmValues.income && (
              <div className="confirm-section">
                <button
                  type="button"
                  className="confirm-btn"
                  onClick={() => handleInputConfirm('income')}
                >
                  Xác nhận
                </button>
              </div>
            )}

            <input
              type="text"
              name="expenses"
              placeholder="Chi tiêu hàng tháng"
              onChange={handleInputChange}
            />
            {!confirmValues.expenses && (
              <div className="confirm-section">
                <button
                  type="button"
                  className="confirm-btn"
                  onClick={() => handleInputConfirm('expenses')}
                >
                  Xác nhận
                </button>
              </div>
            )}

            <input
              type="number"
              name="months"
              placeholder="Số tháng dự báo"
              min="1"
              max="12"
              value={forecastData.months}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>

      <div className="budget-section">
        <h2>Phân Tích Ngân Sách</h2>
        <button 
          onClick={() => setShowBudgetForm(true)}
          className="analyze-btn"
        >
          Phân Tích Ngân Sách
        </button>

        {showBudgetForm && (
          <div className="budget-form">
            <div className="input-group">
              <input
                type="text"
                name="fixedExpenses"
                placeholder="Chi phí cố định hàng tháng"
                onChange={handleBudgetInput}
              />
              <input
                type="text"
                name="savingsGoal"
                placeholder="Mục tiêu tiết kiệm hàng tháng"
                onChange={handleBudgetInput}
              />
            </div>

            <div className="template-selection">
              <select
                value={budgetData.budgetTemplate}
                onChange={(e) => setBudgetData({...budgetData, budgetTemplate: e.target.value})}
              >
                {Object.entries(budgetTemplates).map(([key, template]) => (
                  <option key={key} value={key}>{template.name}</option>
                ))}
                <option value="custom">Tự điều chỉnh tỷ lệ</option>
              </select>
            </div>

            {budgetData.budgetTemplate === 'custom' && (
              <div className="custom-ratios">
                <h3>Nhập tỷ lệ phân bổ (tổng phải bằng 100%):</h3>
                <div className="ratio-input-group">
                  <input
                    type="text"
                    placeholder="Tỷ lệ chi tiêu thiết yếu"
                    value={customRatios.necessities ? `${customRatios.necessities}%` : ''}
                    onChange={(e) => handleCustomRatioChange('necessities', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Tỷ lệ chi tiêu cá nhân"
                    value={customRatios.wants ? `${customRatios.wants}%` : ''}
                    disabled
                    className="auto-calculated"
                  />
                  <input
                    type="text"
                    placeholder="Tỷ lệ tiết kiệm thêm"
                    value={customRatios.additional_savings ? `${customRatios.additional_savings}%` : ''}
                    onChange={(e) => handleCustomRatioChange('additional_savings', e.target.value)}
                  />
                </div>
                <div className="ratio-total">
                  <p>Tổng: {getTotalRatio()}%</p>
                  <p className="auto-fill-note">
                    * Chi tiêu cá nhân sẽ tự động điều chỉnh để đạt tổng 100%
                  </p>
                </div>
              </div>
            )}

            <button 
              onClick={calculateBudget}
              className="calculate-btn"
            >
              Tính Toán Ngân Sách
            </button>
          </div>
        )}

        {budgetResult && (
          <div className="budget-result">
            <h3>Đề Xuất Ngân Sách</h3>
            <p>Tiết kiệm cố định: {formatCurrency(budgetResult.savings)} VND</p>
            <p>Chi tiêu thiết yếu: {formatCurrency(budgetResult.necessities)} VND</p>
            <p>Chi tiêu cá nhân: {formatCurrency(budgetResult.wants)} VND</p>
            <p>Tiết kiệm thêm: {formatCurrency(budgetResult.additional_savings)} VND</p>
            {savingsEvaluation && (
              <div className="savings-evaluation">
                {savingsEvaluation}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Thêm phần hiển thị dự đoán AI */}
      {aiPredictions && (
        <div className="ai-predictions">
          <h2>Phân Tích AI</h2>
          
          <div className="spending-patterns">
            <h3>Mẫu Chi Tiêu</h3>
            <div className="pattern-grid">
              {Object.entries(spendingPatterns.chi_tiêu_theo_danh_mục).map(([category, amount]) => (
                <div key={category} className="pattern-item">
                  <h4>{category}</h4>
                  <p>{formatCurrency(amount)} VND</p>
                  <p>{spendingPatterns.tỷ_lệ_chi_tiêu[category].toFixed(1)}%</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ai-forecast">
            <h3>Dự Báo Chi Tiêu Theo Danh Mục</h3>
            {Object.entries(aiPredictions).map(([category, predictions]) => (
              <div key={category} className="category-forecast">
                <h4>{category}</h4>
                <p>Trung bình: {formatCurrency(predictions.reduce((a, b) => a + b, 0) / predictions.length)} VND/tháng</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Forecast; 