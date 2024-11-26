import React, { useState } from 'react';
import '../css/ImageScanner.css';
import jsQR from 'jsqr';

function ImageScanner() {
  const [qrData, setQrData] = useState(""); // Dữ liệu QR quét được
  const [imageUrl, setImageUrl] = useState(null); // URL của ảnh đã chọn

  // Hàm xử lý chọn ảnh từ máy
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Đặt URL ảnh đã chọn vào state
        decodeQRCode(reader.result); // Gọi hàm giải mã QR
      };
      reader.readAsDataURL(file);
    }
  };

  // Hàm giải mã QR từ ảnh
  const decodeQRCode = (imageDataUrl) => {
    const img = new Image();
    img.src = imageDataUrl;
    img.onload = () => {
      // Tạo canvas để vẽ ảnh và lấy dữ liệu pixel
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Lấy dữ liệu pixel từ canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      console.log('Dữ liệu pixel:', imageData.data); // Kiểm tra dữ liệu pixel

      // Giải mã QR từ dữ liệu pixel
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        setQrData(code.data); // Lưu dữ liệu QR vào state
        console.log('Dữ liệu QR quét được:', code.data); // Hiển thị dữ liệu QR trong console
      } else {
        setQrData("Không tìm thấy mã QR"); // Nếu không có mã QR
        console.log('Không tìm thấy mã QR'); // Log lỗi
      }
    };
  };

  // Hàm sao chép dữ liệu QR
  const handleCopy = () => {
    if (qrData) {
      navigator.clipboard.writeText(qrData).then(() => {
        alert("Dữ liệu đã được sao chép vào clipboard!");
      }).catch((err) => {
        alert("Không thể sao chép dữ liệu: " + err);
      });
    }
  };

  return (
    <div className="image-scanner-container">
      <h2>Quét mã QR từ ảnh</h2>

      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: '20px' }}
        />
      </div>

      {imageUrl && (
        <div className="image-preview">
          <img src={imageUrl} alt="Ảnh quét QR" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        </div>
      )}

      {qrData && (
        <div className="qr-data">
          <h3>Dữ liệu QR:</h3>
          <div className="qr-data-table">
            <p>{qrData}</p>
            <button onClick={handleCopy}>Sao chép dữ liệu</button>
            <br />
            {qrData.startsWith('http') && (
              <a href={qrData} target="_blank" rel="noopener noreferrer">Mở URL</a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageScanner;
