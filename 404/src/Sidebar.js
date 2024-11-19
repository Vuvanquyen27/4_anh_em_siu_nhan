import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Menu Section */}
      <div className="sidebar-section">
        <div className="section-header">
          <span className="icon">⚡</span   >
          <span>Menu</span>
        </div>
      </div>

      {/* Embeddings Model Section */}
      <div className="sidebar-section">
        <div className="section-header">
          <span className="icon">⭐</span>
          <span>Embeddings Model</span>
        </div>
        <div className="section-content">
          <div className="radio-group">
            <label className="radio-item">
              <input type="radio" name="model" checked />
              <span className="radio-label">OpenAI</span>
            </label>
            <label className="radio-item">
              <input type="radio" name="model" />
              <span className="radio-label">Ollama</span>
            </label>
          </div>
        </div>
      </div>

      {/* Data Source Section */}
      <div className="sidebar-section">
        <div className="section-header">
          <span className="icon">📁</span>
          <span>Data Source</span>
        </div>
        <div className="section-content">
          <div className="radio-group">
            <label className="radio-item">
              <input type="radio" name="source" checked />
              <span className="radio-label">File Local</span>
            </label>
            <label className="radio-item">
              <input type="radio" name="source" />
              <span className="radio-label">URL trực tiếp</span>
            </label>
          </div>
        </div>
      </div>

      {/* Collections Section */}
      <div className="sidebar-section">
        <div className="section-header">
          <span className="icon">🔍</span>
          <span>Collections to query</span>
        </div>
        <div className="section-content">
          <div className="collections-list">
            <div className="collection-tag">shadcn</div>
            <div className="collection-tag">stack_ai</div>
            <div className="collection-tag">data_test</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 