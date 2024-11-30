import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/home';
import Account from './pages/AccountFinance';
import Transaction from './pages/Transaction';
import Forecast from './pages/Forecast';
import ImageScanner from './pages/ImageScanner';
import CreditAnalysis from './pages/CreditAnalysis';
import Report from './pages/Report';
import Support from './pages/Support';
import UserAccount from './pages/UserAccount';
import AuthPage from './pages/AuthPage';
import ChatbotAI from './components/ChatbotAI';
import './css/App.css';
import './css/Pages.css';
import './css/grid.css';
import './css/typography.css';
import './css/responsive.css';
import './css/MobileNav.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <div className="app">
        <Navbar onLogout={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
        }} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/image-scanner" element={<ImageScanner />} />
            <Route path="/credit-analysis" element={<CreditAnalysis />} />
            <Route path="/report" element={<Report />} />
            <Route path="/support" element={<Support />} />
            <Route path="/user-account" element={<UserAccount />} />
          </Routes>
        </div>
        <Footer />
        <ChatbotAI />
      </div>
    </Router>
  );
}

export default App;
