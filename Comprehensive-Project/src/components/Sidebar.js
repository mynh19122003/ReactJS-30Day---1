import React, { useState } from 'react';

/**
 * Sidebar Component - Menu bên trái của ứng dụng
 * 
 * Concepts từ Day 1-7:
 * - Components & Props (Day 2): Nhận props và render menu items
 * - State Management (Day 4): Quản lý trạng thái collapsed/expanded
 * - Event Handling (Day 5): Xử lý click events
 * - Conditional Rendering (Day 3 & 6): Hiển thị menu items dựa trên props
 * - Advanced Lists (Day 7): Render danh sách menu items với map
 */

const Sidebar = ({ 
  currentPage,        // Props: trang hiện tại để highlight (Day 2)
  onPageChange,       // Props: function thay đổi trang (Day 2)
  userProgress,       // Props: tiến độ học của user (Day 2)
  isCollapsed,        // Props: trạng thái thu gọn sidebar (Day 2)
  onToggleCollapse    // Props: function toggle collapsed state (Day 2)
}) => {
  
  /**
   * State Management (Day 4): Quản lý trạng thái của submenu
   */
  const [expandedMenus, setExpandedMenus] = useState(['courses']); // Mặc định expand courses menu

  /**
   * Menu items data structure
   * Advanced Lists (Day 7): Dữ liệu cho việc render menu
   */
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: '📊',
      path: 'dashboard',
      description: 'Tổng quan học tập'
    },
    {
      id: 'courses',
      title: 'Khóa học',
      icon: '📚',
      path: 'courses',
      description: 'Danh sách khóa học',
      submenu: [
        { id: 'all-courses', title: 'Tất cả khóa học', path: 'courses/all' },
        { id: 'my-courses', title: 'Khóa học của tôi', path: 'courses/my' },
        { id: 'favorites', title: 'Yêu thích', path: 'courses/favorites' },
        { id: 'completed', title: 'Đã hoàn thành', path: 'courses/completed' }
      ]
    },
    {
      id: 'progress',
      title: 'Tiến độ',
      icon: '📈',
      path: 'progress',
      description: 'Theo dõi tiến độ học'
    },
    {
      id: 'exercises',
      title: 'Bài tập',
      icon: '💪',
      path: 'exercises',
      description: 'Luyện tập coding',
      submenu: [
        { id: 'daily-challenge', title: 'Thử thách hàng ngày', path: 'exercises/daily' },
        { id: 'practice', title: 'Luyện tập', path: 'exercises/practice' },
        { id: 'assignments', title: 'Bài tập được giao', path: 'exercises/assignments' }
      ]
    },
    {
      id: 'community',
      title: 'Cộng đồng',
      icon: '👥',
      path: 'community',
      description: 'Kết nối với học viên khác'
    },
    {
      id: 'resources',
      title: 'Tài liệu',
      icon: '📖',
      path: 'resources',
      description: 'Tài liệu tham khảo'
    }
  ];

  /**
   * Event Handling (Day 5): Xử lý click menu item
   */
  const handleMenuClick = (item) => {
    console.log('Menu clicked:', item.title); // Debug log
    
    // Nếu có submenu, toggle expand/collapse
    if (item.submenu) {
      toggleSubmenu(item.id);
    } else {
      // Nếu không có submenu, chuyển trang
      onPageChange && onPageChange(item.path);
    }
  };

  /**
   * State Management (Day 4): Toggle submenu expansion
   */
  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => {
      // Nếu menu đã expanded, thu gọn nó
      if (prev.includes(menuId)) {
        return prev.filter(id => id !== menuId);
      } else {
        // Nếu menu chưa expanded, mở rộng nó
        return [...prev, menuId];
      }
    });
  };

  /**
   * Event Handling (Day 5): Xử lý click submenu item
   */
  const handleSubmenuClick = (subItem, parentItem) => {
    console.log('Submenu clicked:', subItem.title, 'in', parentItem.title); // Debug log
    onPageChange && onPageChange(subItem.path);
  };

  /**
   * Utility function: Kiểm tra menu item có active không
   * Conditional Rendering (Day 3): Logic để xác định active state
   */
  const isMenuActive = (path) => {
    return currentPage === path || currentPage?.startsWith(path + '/');
  };

  /**
   * Utility function: Tính phần trăm tiến độ
   * Advanced Lists (Day 7): Xử lý data calculations
   */
  const getProgressPercentage = () => {
    if (!userProgress) return 0;
    const total = userProgress.totalLessons || 1;
    const completed = userProgress.completedLessons || 0;
    return Math.round((completed / total) * 100);
  };

  return (
    // JSX (Day 1): Cấu trúc sidebar với conditional classes
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {/* Conditional Rendering (Day 6): Hiển thị title khi không collapsed */}
        {!isCollapsed && (
          <h3 className="sidebar-title">Menu</h3>
        )}
        
        {/* Event Handling (Day 5): Toggle collapse button */}
        <button 
          className="collapse-toggle"
          onClick={onToggleCollapse}
          title={isCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
        >
          {/* Conditional Rendering (Day 3): Icon dựa trên collapsed state */}
          {isCollapsed ? '▶️' : '◀️'}
        </button>
      </div>

      {/* Progress Summary - chỉ hiển thị khi không collapsed */}
      {!isCollapsed && userProgress && (
        <div className="progress-summary">
          <h4>Tiến độ học tập</h4>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <span className="progress-text">
            {userProgress.completedLessons || 0} / {userProgress.totalLessons || 0} bài học
          </span>
        </div>
      )}

      {/* Menu Items */}
      <nav className="sidebar-nav">
        {/* Advanced Lists (Day 7): Render menu items với map */}
        {menuItems.map(item => (
          <div key={item.id} className="menu-group">
            
            {/* Main menu item */}
            <div 
              className={`menu-item ${isMenuActive(item.path) ? 'active' : ''}`}
              onClick={() => handleMenuClick(item)}
            >
              <span className="menu-icon">{item.icon}</span>
              
              {/* Conditional Rendering (Day 6): Hiển thị text khi không collapsed */}
              {!isCollapsed && (
                <>
                  <span className="menu-text">{item.title}</span>
                  
                  {/* Conditional Rendering (Day 3): Hiển thị expand icon nếu có submenu */}
                  {item.submenu && (
                    <span className="expand-icon">
                      {expandedMenus.includes(item.id) ? '🔽' : '▶️'}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Submenu items */}
            {/* Conditional Rendering (Day 3 & 6): Hiển thị submenu khi expanded và không collapsed */}
            {item.submenu && !isCollapsed && expandedMenus.includes(item.id) && (
              <div className="submenu">
                {/* Advanced Lists (Day 7): Render submenu items */}
                {item.submenu.map(subItem => (
                  <div 
                    key={subItem.id}
                    className={`submenu-item ${isMenuActive(subItem.path) ? 'active' : ''}`}
                    onClick={() => handleSubmenuClick(subItem, item)}
                  >
                    <span className="submenu-text">{subItem.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Sidebar Footer - Quick Stats */}
      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="quick-stats">
            <div className="stat-item">
              <span className="stat-icon">🎯</span>
              <div className="stat-info">
                <span className="stat-number">{userProgress?.streak || 0}</span>
                <span className="stat-label">Ngày liên tiếp</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⭐</span>
              <div className="stat-info">
                <span className="stat-number">{userProgress?.points || 0}</span>
                <span className="stat-label">Điểm</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </aside>
  );
};

export default Sidebar;