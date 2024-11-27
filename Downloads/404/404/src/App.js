import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/home';
import ImageScanner from './pages/ImageScanner';
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
            <Route path="/" element={<Home />} />
            <Route path="/image-scanner" element={<ImageScanner />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
