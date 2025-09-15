import React from 'react';

/**
 * Header Component - Hiển thị header của ứng dụng
 * 
 * Concepts từ Day 1-7:
 * - JSX (Day 1): Sử dụng JSX để viết UI
 * - Components & Props (Day 2): Nhận props và render có điều kiện
 * - Event Handling (Day 5): Xử lý click events
 * - Conditional Rendering (Day 3 & 6): Hiển thị nội dung dựa trên điều kiện
 */

const Header = ({ 
  currentUser,      // Props: thông tin user hiện tại (Day 2)
  onLogin,          // Props: function xử lý login (Day 2)
  onLogout,         // Props: function xử lý logout (Day 2)
  onProfileClick,   // Props: function xử lý click profile (Day 2)
  isDarkMode,       // Props: chế độ dark mode (Day 2)
  onToggleTheme     // Props: function toggle theme (Day 2)
}) => {
  
  /**
   * Hàm xử lý click vào logo
   * Event Handling (Day 5): Xử lý sự kiện click
   */
  const handleLogoClick = () => {
    console.log('Logo clicked - Navigate to home'); // Debug log
    // Có thể thêm navigation logic ở đây
  };

  /**
   * Hàm xử lý click vào profile
   * Event Handling (Day 5): Wrapper function cho event handling
   */
  const handleProfileClick = () => {
    console.log('Profile clicked for user:', currentUser?.name); // Debug log
    onProfileClick && onProfileClick(); // Optional chaining để tránh lỗi
  };

  /**
   * Hàm xử lý logout
   * Event Handling (Day 5): Xử lý sự kiện logout với confirm
   */
  const handleLogout = () => {
    // Xác nhận trước khi logout
    if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
      console.log('User logging out'); // Debug log
      onLogout && onLogout(); // Call parent function
    }
  };

  /**
   * Hàm toggle dark mode
   * Event Handling (Day 5): Xử lý toggle theme
   */
  const handleThemeToggle = () => {
    console.log('Theme toggled, current isDarkMode:', isDarkMode); // Debug log
    onToggleTheme && onToggleTheme(); // Call parent function
  };

  return (
    // JSX (Day 1): Sử dụng JSX để định nghĩa UI
    <header className="app-header">
      {/* Logo Section */}
      <div className="header-left">
        {/* Event Handling (Day 5): onClick event */}
        <div className="logo" onClick={handleLogoClick}>
          {/* JSX (Day 1): Embedding expressions */}
          <span className="logo-icon">📚</span>
          <span className="logo-text">React Learning Hub</span>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="header-nav">
        {/* JSX (Day 1): Danh sách navigation items */}
        <a href="#dashboard" className="nav-link">Dashboard</a>
        <a href="#courses" className="nav-link">Khóa học</a>
        <a href="#progress" className="nav-link">Tiến độ</a>
        <a href="#community" className="nav-link">Cộng đồng</a>
      </nav>

      {/* User Section */}
      <div className="header-right">
        {/* Theme Toggle Button */}
        {/* Event Handling (Day 5): Button click event */}
        <button 
          className="theme-toggle"
          onClick={handleThemeToggle}
          title={isDarkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
        >
          {/* Conditional Rendering (Day 3): Hiển thị icon dựa trên isDarkMode */}
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        {/* Conditional Rendering (Day 3 & 6): Hiển thị user info hoặc login button */}
        {currentUser ? (
          // Nếu user đã login - hiển thị thông tin user
          <div className="user-info">
            {/* JSX (Day 1): Hiển thị avatar */}
            <img 
              src={currentUser.avatar || '/default-avatar.png'} 
              alt={`Avatar của ${currentUser.name}`}
              className="user-avatar"
            />
            
            {/* User dropdown */}
            <div className="user-dropdown">
              {/* Event Handling (Day 5): Click event cho profile */}
              <button 
                className="user-name"
                onClick={handleProfileClick}
              >
                {currentUser.name} {/* JSX (Day 1): Hiển thị tên user */}
              </button>
              
              {/* Dropdown menu */}
              <div className="dropdown-menu">
                <button onClick={handleProfileClick}>
                  👤 Hồ sơ
                </button>
                <button onClick={() => console.log('Settings clicked')}>
                  ⚙️ Cài đặt
                </button>
                <button onClick={() => console.log('Help clicked')}>
                  ❓ Trợ giúp
                </button>
                <hr />
                {/* Event Handling (Day 5): Logout event */}
                <button onClick={handleLogout} className="logout-btn">
                  🚪 Đăng xuất
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Nếu user chưa login - hiển thị login button
          <div className="auth-buttons">
            {/* Event Handling (Day 5): Login button click */}
            <button 
              className="login-btn"
              onClick={onLogin}
            >
              Đăng nhập
            </button>
            <button 
              className="signup-btn"
              onClick={() => console.log('Sign up clicked')}
            >
              Đăng ký
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;