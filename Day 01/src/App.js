// =============================================================================
// DAY 1: REACT BASICS - APP COMPONENT (File chính của ứng dụng)
// =============================================================================

// 1. IMPORT CÁC THƯ VIỆN VÀ COMPONENTS CẦN THIẾT
// React: thư viện chính để tạo components và quản lý UI
import React from 'react';
// Import các components con mà chúng ta đã tạo trong thư mục components/
import Header from './components/Header';     // Component header của trang
import Footer from './components/Footer';     // Component footer của trang
import InteractiveDemo from './components/InteractiveDemo'; // Component demo tương tác

// 2. ĐỊNH NGHĨA COMPONENT CHÍNH CUA ỨNG DỤNG
// Function component - cách viết hiện đại nhất trong React
function App() {
  
  // 3. TẠO CÁC FUNCTION XỬ LÝ SỰ KIỆN (Event Handlers)
  // Hàm xử lý khi user click vào menu
  // Tham số 'page' sẽ nhận tên trang mà user muốn điều hướng đến
  const handleMenuClick = (page) => {
    // Hiển thị thông báo (trong thực tế sẽ là điều hướng)
    alert(`Điều hướng đến trang: ${page}`);
  };

  // 4. ĐỊNH NGHĨA DỮ LIỆU (Data/State)
  // Object chứa thông tin user - đây là ví dụ về data object
  const userData = {
    name: 'Học viên React',     // Tên hiển thị
    avatar: 'https://via.placeholder.com/40x40/007bff/white?text=HV' // Link ảnh đại diện
  };

  // 5. RENDER JSX - PHẦN HIỂN THỊ CỦA COMPONENT
  // return về JSX (JavaScript XML) - cú pháp giống HTML nhưng trong JavaScript
  return (
    // Container chính - sử dụng inline styles (trong thực tế nên dùng CSS classes)
    <div style={{ 
      minHeight: '100vh',      // Chiều cao tối thiểu bằng viewport height
      display: 'flex',         // Sử dụng flexbox layout
      flexDirection: 'column'  // Sắp xếp theo chiều dọc
    }}>
      
      {/* 6. SỬ DỤNG COMPONENT CON VỚI PROPS */}
      {/* Header component - truyền data qua props */}
      <Header 
        user={userData}           // Truyền object userData qua prop 'user'
        onMenuClick={handleMenuClick} // Truyền function qua prop 'onMenuClick'
      />
      
      {/* 7. MAIN CONTENT AREA */}
      {/* main tag - khu vực nội dung chính */}
      <main style={{ 
        flex: 1,           // Chiếm toàn bộ không gian còn lại
        padding: '20px'    // Padding 20px tất cả các phía
      }}>
        
        {/* Container giới hạn width và center content */}
        <div style={{ 
          maxWidth: '800px',    // Giới hạn width tối đa
          margin: '0 auto'      // Center horizontally
        }}>
          
          {/* 8. TIÊU ĐỀ CHÍNH */}
          {/* h1 tag với inline styles */}
          <h1 style={{ 
            textAlign: 'center',   // Căn giữa text
            color: '#333',         // Màu text xám đậm
            marginBottom: '30px'   // Margin bottom 30px
          }}>
            Chào mừng đến với React - Day 1
          </h1>
          
          {/* 9. SECTION MỤC TIÊU HỌC TẬP */}
          {/* section tag - nhóm nội dung có liên quan */}
          <section style={{ 
            background: '#f8f9fa',   // Màu nền xám nhạt
            padding: '20px',         // Padding 20px tất cả phía
            borderRadius: '8px',     // Bo góc 8px
            marginBottom: '30px'     // Margin bottom 30px
          }}>
            
            {/* Tiêu đề section */}
            <h2 style={{ 
              color: '#007bff',      // Màu xanh primary
              marginBottom: '15px'   // Margin bottom 15px
            }}>
              🎯 Mục tiêu hôm nay
            </h2>
            
            {/* Danh sách mục tiêu */}
            <ul style={{ lineHeight: '1.6' }}> {/* Line height cho dễ đọc */}
              <li>Hiểu cơ bản về React</li>
              <li>Tạo component đầu tiên</li>
              <li>Học cách sử dụng props</li>
              <li>Thực hành với interactive demo</li>
            </ul>
          </section>

          {/* 10. COMPONENT DEMO TƯƠNG TÁC */}
          {/* Sử dụng component InteractiveDemo không cần props */}
          <InteractiveDemo />
          
          {/* 11. SECTION HOÀN THÀNH */}
          {/* Section hiển thị khi học xong */}
          <section style={{ 
            background: '#e8f5e8',   // Màu nền xanh nhạt (success color)
            padding: '20px',         // Padding 20px
            borderRadius: '8px',     // Bo góc 8px
            marginTop: '30px'        // Margin top 30px
          }}>
            
            {/* Tiêu đề hoàn thành */}
            <h2 style={{ 
              color: '#28a745',      // Màu xanh success
              marginBottom: '15px'   // Margin bottom 15px
            }}>
              ✅ Bạn đã hoàn thành
            </h2>
            
            {/* Nội dung chúc mừng */}
            <p style={{ 
              lineHeight: '1.6',  // Line height cho dễ đọc
              margin: 0           // Loại bỏ margin default của p tag
            }}>
              Tuyệt vời! Bạn đã tạo ra ứng dụng React đầu tiên với Header, Footer và 
              component tương tác. Hãy thử chỉnh sửa code và xem kết quả thay đổi!
            </p>
          </section>
        </div>
      </main>

      {/* 12. FOOTER COMPONENT */}
      {/* Sử dụng Footer component với props */}
      <Footer 
        year={new Date().getFullYear()}  // Truyền năm hiện tại qua prop 'year'
        company="React Learning Academy"   // Truyền tên công ty qua prop 'company'
      />
    </div>
  );
}

// 13. EXPORT COMPONENT
// Export default để component này có thể được import ở file khác
// Đây là cách để chia sẻ component giữa các file
export default App;