import React, { useState } from 'react';
import '../css/ImageScanner.css';

function ImageScanner() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="image-scanner-container">
      <h2>Quét ảnh từ máy</h2>
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="image-input"
          style={{ display: 'none' }}
        />
        <label htmlFor="image-input" className="upload-button">
          Chọn ảnh từ máy
        </label>
      </div>
      {selectedImage && (
        <div className="image-preview">
          <h3>Ảnh đã chọn:</h3>
          <img src={selectedImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />
        </div>
      )}
    </div>
  );
}

export default ImageScanner; 