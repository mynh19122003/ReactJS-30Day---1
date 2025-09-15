// =============================================================================
// DAY 1: HEADER COMPONENT - Component hiển thị phần đầu trang
// =============================================================================

// 1. IMPORT REACT
// Import React để có thể tạo component
import React from 'react';

// 2. ĐỊNH NGHĨA FUNCTIONAL COMPONENT
// Functional component nhận props làm tham số
// Props là object chứa tất cả các thuộc tính được truyền từ component cha
function Header({ user, onMenuClick }) {
  
  // 3. DESTRUCTURING PROPS
  // Đã destructure props trong parameter: { user, onMenuClick }
  // Tương đương với: const user = props.user; const onMenuClick = props.onMenuClick;
  
  // 4. RENDER JSX
  return (
    // Container chính của header
    <header style={{
      display: 'flex',          // Sử dụng flexbox layout
      justifyContent: 'space-between', // Căn đều 2 đầu (user info và navigation)
      alignItems: 'center',     // Căn giữa theo chiều dọc
      padding: '20px',          // Padding 20px tất cả các phía
      background: '#282c34',    // Màu nền xám đậm
      color: 'white'            // Màu text trắng
    }}>
      
      {/* 5. USER INFO SECTION */}
      {/* Phần hiển thị thông tin user */}
      <div style={{ 
        display: 'flex',        // Flexbox để sắp xếp avatar và text
        alignItems: 'center'    // Căn giữa theo chiều dọc
      }}>
        
        {/* User avatar image */}
        <img 
          src={user.avatar}     // Lấy URL avatar từ props.user.avatar
          alt="User"            // Alt text cho accessibility (nên cải thiện thành user.name)
          style={{
            width: '40px',       // Chiều rộng 40px
            height: '40px',      // Chiều cao 40px
            borderRadius: '50%', // Bo tròn thành hình tròn
            marginRight: '15px'  // Margin phải 15px để tạo khoảng cách với text
          }}
        />
        
        {/* Welcome text */}
        <span>Xin chào, {user.name}!</span> {/* Hiển thị tên user từ props */}
      </div>
      
      {/* 6. NAVIGATION SECTION */}
      {/* Phần navigation menu */}
      <nav>
        
        {/* Menu button 1: Home */}
        <button 
          onClick={() => onMenuClick('home')} // Gọi callback function với tham số 'home'
          style={{
            background: 'transparent',  // Nền trong suốt
            border: '1px solid white',  // Border trắng 1px
            color: 'white',            // Màu text trắng
            padding: '8px 16px',       // Padding trên/dưới 8px, trái/phải 16px
            margin: '0 5px',           // Margin trái/phải 5px
            borderRadius: '4px',       // Bo góc 4px
            cursor: 'pointer'          // Con trỏ chuột thành pointer khi hover
          }}
        >
          Trang chủ {/* Text hiển thị trên button */}
        </button>
        
        {/* Menu button 2: Profile */}
        <button 
          onClick={() => onMenuClick('profile')} // Gọi callback function với tham số 'profile'
          style={{
            background: 'transparent',  // Nền trong suốt
            border: '1px solid white',  // Border trắng 1px
            color: 'white',            // Màu text trắng
            padding: '8px 16px',       // Padding trên/dưới 8px, trái/phải 16px
            margin: '0 5px',           // Margin trái/phải 5px
            borderRadius: '4px',       // Bo góc 4px
            cursor: 'pointer'          // Con trỏ chuột thành pointer khi hover
          }}
        >
          Hồ sơ {/* Text hiển thị trên button */}
        </button>
      </nav>
    </header>
  );
}

// 7. EXPORT COMPONENT
// Export default để component có thể được import ở file khác
export default Header;