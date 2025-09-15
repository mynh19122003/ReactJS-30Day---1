import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// CSS reset và styling cơ bản
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.5;
    color: #333;
    background-color: #ffffff;
  }
  
  button:hover {
    opacity: 0.8;
    transform: translateY(-1px);
    transition: all 0.2s ease;
  }
  
  a:hover {
    text-decoration: underline !important;
  }
`;

// Thêm styles vào document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Render ứng dụng
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Thêm một số console.log để debug (có thể xóa trong production)
console.log('✅ React App đã được khởi chạy thành công!');
console.log('🎯 Đây là ứng dụng Day 1 - Làm quen với React');
console.log('📝 Hãy mở Developer Tools để xem các thông báo này');