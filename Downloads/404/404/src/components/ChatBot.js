import React, { useState, useEffect } from 'react';
import '../css/ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [goals, setGoals] = useState([]);
  const [goalSetting, setGoalSetting] = useState({
    isSettingGoal: false,
    step: 0, // 0: initial, 1: amount, 2: deadline
    tempGoal: {
      amount: null,
      deadline: null,
      type: null
    }
  });

  // Simulated user data
  const userData = {
    balance: 15000000,
    monthlySpending: 8000000,
    upcomingPayments: [
      { type: 'Học phí', amount: 5000000, dueDate: '2024-08-05' },
      { type: 'Thẻ tín dụng', amount: 2000000, dueDate: '2024-07-25' }
    ]
  };

  useEffect(() => {
    // Add welcome message
    setMessages([{
      type: 'bot',
      text: 'Xin chào! Tôi có thể giúp gì cho bạn?'
    }]);

    // Check for upcoming payments
    checkUpcomingPayments();
  }, []);

  const checkUpcomingPayments = () => {
    userData.upcomingPayments.forEach(payment => {
      const dueDate = new Date(payment.dueDate);
      const today = new Date();
      const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

      if (diffDays <= 7) {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: `Sắp đến hạn thanh toán ${payment.type}: ${payment.amount.toLocaleString()} VND vào ngày ${payment.dueDate}`
        }]);
      }
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: input }]);

    // Process user input
    processUserInput(input);
    setInput('');
  };

  const processUserInput = (text) => {
    const lowerText = text.toLowerCase();
    
    if (goalSetting.isSettingGoal) {
      handleGoalSetting(text);
      return;
    }

    // Handle different user queries
    if (lowerText.includes('số dư')) {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: `Số dư hiện tại của bạn là: ${userData.balance.toLocaleString()} VND`
      }]);
    } else if (lowerText.includes('chi tiêu')) {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: `Tháng này bạn đã chi tiêu: ${userData.monthlySpending.toLocaleString()} VND`
      }]);
    } else if (lowerText.includes('mục tiêu')) {
      if (lowerText.includes('xem')) {
        // Hiển thị danh sách mục tiêu
        if (goals.length === 0) {
          setMessages(prev => [...prev, {
            type: 'bot',
            text: 'Bạn chưa có mục tiêu nào.'
          }]);
        } else {
          setMessages(prev => [...prev, {
            type: 'bot',
            text: 'Danh sách mục tiêu của bạn:'
          }]);
          goals.forEach(goal => {
            setMessages(prev => [...prev, {
              type: 'bot',
              text: `${goal.type}: ${goal.amount.toLocaleString()} VND (đến ${new Date(goal.deadline).toLocaleDateString('vi-VN')})`
            }]);
          });
        }
      } else {
        handleGoalSetting(text);
      }
    } else {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Xin lỗi, tôi không hiểu yêu cầu của bạn. Bạn có thể hỏi về số dư, chi tiêu hoặc đặt mục tiêu tài chính.'
      }]);
    }
  };

  const handleGoalSetting = (text) => {
    if (!goalSetting.isSettingGoal) {
      setGoalSetting({
        isSettingGoal: true,
        step: 0,
        tempGoal: { amount: null, deadline: null, type: null }
      });
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Bạn muốn đặt mục tiêu gì? (Tiết kiệm/Chi tiêu/Đầu tư)'
      }]);
      return;
    }

    switch (goalSetting.step) {
      case 0: // Xử lý loại mục tiêu
        const goalType = text.toLowerCase();
        if (['tiết kiệm', 'chi tiêu', 'đầu tư'].includes(goalType)) {
          setGoalSetting(prev => ({
            ...prev,
            step: 1,
            tempGoal: { ...prev.tempGoal, type: goalType }
          }));
          setMessages(prev => [...prev, {
            type: 'bot',
            text: 'Vui lòng nhập số tiền mục tiêu (VD: 10000000)'
          }]);
        } else {
          setMessages(prev => [...prev, {
            type: 'bot',
            text: 'Vui lòng chọn một trong các loại: Tiết kiệm, Chi tiêu, hoặc Đầu tư'
          }]);
        }
        break;

      case 1: // Xử lý số tiền
        const amount = parseFloat(text.replace(/[^0-9]/g, ''));
        if (!isNaN(amount) && amount > 0) {
          setGoalSetting(prev => ({
            ...prev,
            step: 2,
            tempGoal: { ...prev.tempGoal, amount }
          }));
          setMessages(prev => [...prev, {
            type: 'bot',
            text: 'Vui lòng nhập thời hạn (VD: 31/12/2024)'
          }]);
        } else {
          setMessages(prev => [...prev, {
            type: 'bot',
            text: 'Vui lòng nhập một số tiền hợp lệ'
          }]);
        }
        break;

      case 2: // Xử lý thời hạn
        const deadline = new Date(text);
        if (deadline && deadline > new Date()) {
          const newGoal = {
            ...goalSetting.tempGoal,
            deadline: deadline.toISOString()
          };
          setGoals(prev => [...prev, newGoal]);
          setGoalSetting({
            isSettingGoal: false,
            step: 0,
            tempGoal: { amount: null, deadline: null, type: null }
          });
          setMessages(prev => [...prev, {
            type: 'bot',
            text: `Đã tạo mục tiêu ${newGoal.type} ${newGoal.amount.toLocaleString()} VND đến ngày ${deadline.toLocaleDateString('vi-VN')}`
          }]);
        } else {
          setMessages(prev => [...prev, {
            type: 'bot',
            text: 'Vui lòng nhập thời hạn hợp lệ (phải là ngày trong tương lai)'
          }]);
        }
        break;
    }
  };

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
      </div>
      
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={handleSend}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 