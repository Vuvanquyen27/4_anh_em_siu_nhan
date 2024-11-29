import React, { useState } from 'react';
import '../css/Support.css';

function Support() {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqList = [
    {
      id: 1,
      question: 'Làm thế nào để tạo tài khoản mới?',
      answer: 'Bạn có thể tạo tài khoản mới bằng cách nhấn vào nút "Đăng ký" ở góc phải màn hình, sau đó điền đầy đủ thông tin theo yêu cầu.'
    },
    {
      id: 2,
      question: 'Làm sao để xem báo cáo tài chính?',
      answer: 'Truy cập mục "Báo cáo" trên menu chính, sau đó chọn loại báo cáo bạn muốn xem.'
    },
    // ... thêm các FAQ khác
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form liên hệ
    console.log('Form submitted:', contactForm);
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="support-page">
      <h1 style={{ textAlign: 'center', color: '#e31837' }}>Trung tâm Hỗ trợ</h1>
      
      <div className="support-tabs">
        <button 
          className={activeTab === 'faq' ? 'active' : ''}
          onClick={() => setActiveTab('faq')}
        >
          Câu hỏi thường gặp
        </button>
        <button 
          className={activeTab === 'contact' ? 'active' : ''}
          onClick={() => setActiveTab('contact')}
        >
          Liên hệ hỗ trợ
        </button>
      </div>

      {activeTab === 'faq' && (
        <div className="faq-section">
          {faqList.map((faq) => (
            <div key={faq.id} className="faq-item">
              <div 
                className="faq-question"
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
              >
                <h3>{faq.question}</h3>
                <span className={`arrow ${expandedFaq === faq.id ? 'expanded' : ''}`}>
                  ▼
                </span>
              </div>
              {expandedFaq === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="contact-section">
          <form onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label>Họ và tên:</label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Chủ đề:</label>
              <input
                type="text"
                value={contactForm.subject}
                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Nội dung:</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                required
              />
            </div>
            <button type="submit">Gửi yêu cầu hỗ trợ</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Support; 