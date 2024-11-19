import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import ChatbotAI from './pages/chatbotAI';
import FaceRecognition from './pages/FaceRecognition';
import './css/App.css';
import './css/Pages.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<ChatbotAI />} />
            <Route path="/chatbot" element={<ChatbotAI />} />
            <Route path="/face-recognition" element={<FaceRecognition />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
