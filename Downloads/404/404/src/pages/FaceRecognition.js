import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import '../css/FaceRecognition.css';  // Đảm bảo đường dẫn CSS đúng

function FaceRecognition() {
  const [isFaceDetected, setIsFaceDetected] = useState(false);  // Kiểm tra xem khuôn mặt có được phát hiện không
  const [isCameraStarted, setIsCameraStarted] = useState(false);  // Kiểm tra xem camera đã được khởi động chưa
  const videoRef = useRef(null);  // Thẻ video
  const canvasRef = useRef(null);  // Thẻ canvas

  // Hàm khởi tạo camera
  const startCamera = async () => {
    try {
      // Yêu cầu quyền truy cập vào camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // Sử dụng camera trước (cho điện thoại và laptop)
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      await loadFaceApiModels(); // Tải các mô hình nhận diện khuôn mặt sau khi camera được bật
    } catch (err) {
      console.error("Không thể truy cập vào camera:", err);
    }
  };

  // Hàm tải các mô hình nhận diện khuôn mặt
  const loadFaceApiModels = async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    startDetection(); // Bắt đầu quá trình phát hiện khuôn mặt
  };

  // Hàm phát hiện khuôn mặt
  const startDetection = () => {
    setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        // Phát hiện tất cả các khuôn mặt
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.SsdMobilenetv1Options()
        ).withFaceLandmarks().withFaceDescriptors();

        // Vẽ các đường viền khuôn mặt và đặc điểm khuôn mặt lên canvas
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        const canvas = canvasRef.current;
        faceapi.matchDimensions(canvas, videoRef.current);

        if (detections.length > 0) {
          setIsFaceDetected(true);  // Nếu có khuôn mặt, thay đổi trạng thái
          faceapi.draw.drawDetections(canvas, detections);  // Vẽ đường viền khuôn mặt
          faceapi.draw.drawFaceLandmarks(canvas, detections);  // Vẽ các đặc điểm khuôn mặt
        } else {
          setIsFaceDetected(false);  // Không phát hiện khuôn mặt
        }
      }
    }, 100);  // Kiểm tra mỗi 100ms
  };

  // Xử lý khi nhấn nút bắt đầu
  const handleStartClick = () => {
    setIsCameraStarted(true);
    startCamera();  // Bắt đầu camera
  };

  // Dọn dẹp khi component unmount
  useEffect(() => {
    // Dừng camera khi component bị unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());  // Dừng camera
      }
    };
  }, []);

  return (
    <div className="face-recognition-container">
      <div className="camera-section">
        <h2>Xác thực khuôn mặt</h2>
        
        <div className="camera-feed">
          <video ref={videoRef} style={{ width: '100%', display: isCameraStarted ? 'block' : 'none' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>

        {!isCameraStarted ? (
          <button className="start-button" onClick={handleStartClick}>
            <i className="fas fa-camera"></i>
            Bắt đầu nhận diện
          </button>
        ) : (
          <div className="status">
            {isFaceDetected ? (
              <p className="success">
                <i className="fas fa-check-circle"></i>
                Đã phát hiện khuôn mặt
              </p>
            ) : (
              <p>
                <i className="fas fa-search"></i>
                Không tìm thấy khuôn mặt. Vui lòng nhìn vào camera.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FaceRecognition;
