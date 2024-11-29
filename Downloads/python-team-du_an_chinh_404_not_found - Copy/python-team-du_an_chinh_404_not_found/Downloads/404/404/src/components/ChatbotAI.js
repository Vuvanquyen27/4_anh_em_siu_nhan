import React, { useState, useRef, useEffect } from 'react';
import '../css/ChatbotAI.css';

function ChatbotAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Xin chào! Tôi là HDBank Assistant. Tôi có thể giúp gì cho bạn?",
      isBot: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Thêm tin nhắn của người dùng
    const userMessage = { text: inputText, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Xử lý phản hồi của bot
    const botResponse = await processUserMessage(inputText);
    setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
  };

  const processUserMessage = async (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Xử lý các câu hỏi về số dư
    if (lowerMessage.includes('số dư') || lowerMessage.includes('tài khoản')) {
      return "Số dư hiện tại của bạn là 50,000,000 VND. Bạn có muốn biết thêm thông tin gì không?";
    }
    
    // Xử lý câu hỏi về chi tiêu
    if (lowerMessage.includes('chi tiêu') || lowerMessage.includes('tiêu xài')) {
      return "Tháng này bạn đã chi tiêu 15,000,000 VND. Chi tiết:\n- Ăn uống: 5,000,000 VND\n- Mua sắm: 7,000,000 VND\n- Khác: 3,000,000 VND";
    }

    // Xử lý câu hỏi về mục tiêu tài chính
    if (lowerMessage.includes('mục tiêu') || lowerMessage.includes('tiết kiệm')) {
      return "Mục tiêu tiết kiệm của bạn là 100,000,000 VND. Hiện tại bạn đã đạt được 70%. Cố gắng thêm nhé!";
    }

    // Câu trả lời mặc định
    return "Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi về:\n- Số dư tài khoản\n- Chi tiêu trong tháng\n- Mục tiêu tài chính";
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-comments"></i>
      </div>

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-container">
            <div className="chat-header">
              <h2>HDBank Assistant</h2>
              <button className="close-chat" onClick={() => setIsOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập tin nhắn..."
              />
              <button type="submit">Gửi</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatbotAI; 