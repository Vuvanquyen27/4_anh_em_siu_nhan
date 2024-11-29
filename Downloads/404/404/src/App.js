import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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
import Login from './pages/Login';
import Introduction from './pages/Introduction';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="app-wrapper">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/introduction" element={<Introduction />} />
            
            {/* Protected Routes */}
            <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/image-scanner" element={<ImageScanner />} />
              <Route path="/credit-analysis" element={<CreditAnalysis />} />
              <Route path="/report" element={<Report />} />
              <Route path="/support" element={<Support />} />
              <Route path="/user-account" element={<UserAccount />} />
            </Route>
          </Routes>
          <ChatBot />
        </Router>
      </AuthProvider>
    </div>
  );
}

// Tạo component Layout riêng
function Layout() {
  return (
    <div className="app">
      <div className="app-background"></div>
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
