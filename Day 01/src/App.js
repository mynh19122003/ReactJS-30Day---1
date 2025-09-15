import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InteractiveDemo from './components/InteractiveDemo';

function App() {
  const handleMenuClick = (page) => {
    alert(`Điều hướng đến trang: ${page}`);
  };

  const userData = {
    name: 'Học viên React',
    avatar: 'https://via.placeholder.com/40x40/007bff/white?text=HV'
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        user={userData}
        onMenuClick={handleMenuClick}
      />
      
      <main style={{ flex: 1, padding: '20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
            Chào mừng đến với React - Day 1
          </h1>
          
          <section style={{ 
            background: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '30px'
          }}>
            <h2 style={{ color: '#007bff', marginBottom: '15px' }}>
              🎯 Mục tiêu hôm nay
            </h2>
            <ul style={{ lineHeight: '1.6' }}>
              <li>Hiểu cơ bản về React</li>
              <li>Tạo component đầu tiên</li>
              <li>Học cách sử dụng props</li>
              <li>Thực hành với interactive demo</li>
            </ul>
          </section>

          <InteractiveDemo />
          
          <section style={{ 
            background: '#e8f5e8', 
            padding: '20px', 
            borderRadius: '8px',
            marginTop: '30px'
          }}>
            <h2 style={{ color: '#28a745', marginBottom: '15px' }}>
              ✅ Bạn đã hoàn thành
            </h2>
            <p style={{ lineHeight: '1.6', margin: 0 }}>
              Tuyệt vời! Bạn đã tạo ra ứng dụng React đầu tiên với Header, Footer và 
              component tương tác. Hãy thử chỉnh sửa code và xem kết quả thay đổi!
            </p>
          </section>
        </div>
      </main>

      <Footer 
        year={new Date().getFullYear()}
        company="React Learning Academy"
      />
    </div>
  );
}

export default App;