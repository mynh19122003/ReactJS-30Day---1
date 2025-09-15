import React, { useState } from 'react';

function InteractiveDemo() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Nhấn nút để bắt đầu!');
  const [color, setColor] = useState('#3498db');
  
  const handleButtonClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    if (newCount === 1) {
      setMessage('Tuyệt vời! Bạn vừa trigger event đầu tiên!');
      setColor('#2ecc71');
    } else if (newCount === 5) {
      setMessage('Wow! Bạn đã click 5 lần rồi! 🎉');
      setColor('#e74c3c');
    } else if (newCount === 10) {
      setMessage('Bạn là cao thủ click chuột! 🏆');
      setColor('#f39c12');
    } else {
      setMessage(`Số lần click: ${newCount}`);
    }
  };
  
  const handleReset = () => {
    setCount(0);
    setMessage('Nhấn nút để bắt đầu!');
    setColor('#3498db');
  };
  
  const handleColorChange = () => {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };
  
  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      textAlign: 'center',
      margin: '20px'
    }}>
      <h3 style={{ color: '#333', marginBottom: '20px' }}>
        Demo Tương tác đầu tiên
      </h3>
      
      <div style={{
        background: color,
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        transition: 'all 0.3s ease',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        {message}
      </div>
      
      <div style={{
        background: '#ecf0f1',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <span style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: color
        }}>
          {count}
        </span>
        <p style={{ margin: '5px 0 0 0', color: '#7f8c8d' }}>
          Số lần click
        </p>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={handleButtonClick}
          style={{
            background: color,
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'transform 0.1s ease'
          }}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        >
          Click me! 🎯
        </button>
        
        <button
          onClick={handleColorChange}
          style={{
            background: '#95a5a6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Đổi màu 🎨
        </button>
        
        <button
          onClick={handleReset}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Reset 🔄
        </button>
      </div>
      
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#f8f9fa',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#6c757d'
      }}>
        💡 <strong>Bạn đã học:</strong> useState hook, event handling, conditional rendering, và inline styling!
      </div>
    </div>
  );
}

export default InteractiveDemo;