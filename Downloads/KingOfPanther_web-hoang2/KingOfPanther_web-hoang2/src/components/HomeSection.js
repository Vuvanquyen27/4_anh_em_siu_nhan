import React from 'react';
import HeroSection from './HeroSection';
import ImageColumn from './ImageColumn';
import './HomeSection.css';

function HomeSection() {
  return (
    <div className="home-section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <HeroSection />
          </div>
          <div className="col-md-6">
            <ImageColumn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;