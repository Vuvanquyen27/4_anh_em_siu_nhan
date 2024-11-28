import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
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
import './css/App.css';
import './css/Pages.css';
import './css/grid.css';
import './css/typography.css';
import './css/responsive.css';
import './css/MobileNav.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} />
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
      </div>
    </Router>
  );
}

export default App;
