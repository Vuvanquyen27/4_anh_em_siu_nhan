import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/home';
import ChatbotAI from './pages/chatbotAI';
import FaceRecognition from './pages/FaceRecognition';
import './css/App.css';
import './css/Pages.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<ChatbotAI />} />
            <Route path="/face-recognition" element={<FaceRecognition />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
