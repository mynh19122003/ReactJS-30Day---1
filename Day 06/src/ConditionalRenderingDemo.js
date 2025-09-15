// =============================================================================
// Day 6 - CONDITIONAL RENDERING DEMO với detailed comments
// =============================================================================
// File này minh họa TẤT CẢ patterns của conditional rendering trong React
// Các kỹ thuật: if/else, ternary, logical AND, switch case, guard clauses
// =============================================================================

import React, { useState, useEffect, useMemo, useCallback } from 'react';

// =============================================================================
// 1. CONSTANTS & ENUMS - Define các states có thể có
// =============================================================================
// Định nghĩa các trạng thái của dashboard để tránh magic strings
const DASHBOARD_STATES = {
  LOADING: 'loading',      // Đang tải dữ liệu
  ERROR: 'error',          // Có lỗi xảy ra
  EMPTY: 'empty',          // Không có dữ liệu
  SUCCESS: 'success',      // Có dữ liệu và hiển thị thành công
  OFFLINE: 'offline'       // Mất kết nối mạng
};

// Định nghĩa user roles cho role-based rendering
const USER_ROLES = {
  GUEST: 'guest',         // Khách vãng lai
  USER: 'user',           // User thường
  ADMIN: 'admin',         // Quản trị viên
  SUPER_ADMIN: 'super_admin' // Super admin
};

// Permissions cho authorization
const PERMISSIONS = {
  READ: 'read',
  WRITE: 'write', 
  DELETE: 'delete',
  ADMIN: 'admin'
};

// =============================================================================
// 2. MULTI-STATE DASHBOARD COMPONENT
// =============================================================================
// Component này minh họa cách handle nhiều states khác nhau
function MultiStateDashboard() {
  // ============== STATE DECLARATIONS ==============
  // State chính để track dashboard status
  const [state, setState] = useState(DASHBOARD_STATES.LOADING);
  
  // Array chứa data từ API
  const [data, setData] = useState([]);
  
  // Error object nếu có lỗi xảy ra
  const [error, setError] = useState(null);
  
  // Count số lần retry để limit retries
  const [retryCount, setRetryCount] = useState(0);

  // ============== EFFECT HOOKS ==============
  // Effect để auto fetch data lần đầu
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency = chỉ chạy 1 lần

  // ============== HELPER FUNCTIONS ==============
  // Function để simulate API call với các outcomes khác nhau
  const fetchData = useCallback(async () => {
    // Reset error state và set loading
    setState(DASHBOARD_STATES.LOADING);
    setError(null);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Random outcomes để demo các cases khác nhau
      const outcomes = ['success', 'error', 'empty'];
      const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      
      // Simulate API error
      if (randomOutcome === 'error') {
        throw new Error(`API Error ${Date.now()}: Server không phản hồi`);
      }
      
      // Create mock data hoặc empty array
      const mockData = randomOutcome === 'empty' ? [] : [
        { 
          id: 1, 
          title: 'Doanh thu hôm nay', 
          value: '125.5M VNĐ', 
          trend: '+12%',
          icon: '💰',
          color: '#28a745'
        },
        { 
          id: 2, 
          title: 'Người dùng hoạt động', 
          value: '45.2K người', 
          trend: '+8%',
          icon: '👥',
          color: '#007bff'
        },
        { 
          id: 3, 
          title: 'Đơn hàng mới', 
          value: '1.8K đơn', 
          trend: '+15%',
          icon: '📦',
          color: '#fd7e14'
        }
      ];
      
      // Update state based on data
      setData(mockData);
      setState(mockData.length === 0 ? DASHBOARD_STATES.EMPTY : DASHBOARD_STATES.SUCCESS);
      
      // Reset retry count on success
      setRetryCount(0);
      
    } catch (err) {
      // Handle error case
      setError(err);
      setState(DASHBOARD_STATES.ERROR);
    }
  }, []); // No dependencies

  // Function để retry fetch với limit
  const handleRetry = useCallback(() => {
    if (retryCount < 3) { // Limit 3 retries
      setRetryCount(prev => prev + 1);
      fetchData();
    }
  }, [retryCount, fetchData]);

  // ============== RENDER HELPERS ==============
  // PATTERN 1: Switch case cho clean code
  const renderDashboardContent = () => {
    switch (state) {
      case DASHBOARD_STATES.LOADING:
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            backgroundColor: '#f8f9fa',
            border: '2px dashed #dee2e6',
            borderRadius: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #e9ecef',
              borderTop: '4px solid #007bff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '20px'
            }}></div>
            <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>
              Đang tải dữ liệu...
            </h3>
            <p style={{ color: '#868e96', textAlign: 'center' }}>
              Vui lòng chờ trong giây lát
            </p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        );
        
      case DASHBOARD_STATES.ERROR:
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            backgroundColor: '#f8d7da',
            border: '2px solid #f5c6cb',
            borderRadius: '12px',
            padding: '30px'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>❌</div>
            <h3 style={{ color: '#721c24', marginBottom: '15px' }}>
              Có lỗi xảy ra!
            </h3>
            <p style={{ 
              color: '#721c24', 
              textAlign: 'center',
              marginBottom: '20px',
              backgroundColor: 'rgba(0,0,0,0.1)',
              padding: '10px',
              borderRadius: '6px',
              fontFamily: 'monospace'
            }}>
              {error?.message || 'Lỗi không xác định'}
            </p>
            
            {/* PATTERN 2: Ternary operator cho conditional button */}
            {retryCount < 3 ? (
              <button
                onClick={handleRetry}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Thử lại ({3 - retryCount} lần còn lại)
              </button>
            ) : (
              <p style={{ color: '#721c24', fontStyle: 'italic' }}>
                Đã thử lại tối đa. Vui lòng liên hệ support.
              </p>
            )}
          </div>
        );
        
      case DASHBOARD_STATES.EMPTY:
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            backgroundColor: '#fff3cd',
            border: '2px solid #ffeaa7',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
            <h3 style={{ color: '#856404', marginBottom: '15px' }}>
              Chưa có dữ liệu
            </h3>
            <p style={{ color: '#856404', textAlign: 'center', marginBottom: '20px' }}>
              Hiện tại chưa có dữ liệu để hiển thị.<br/>
              Hãy thử làm mới trang hoặc quay lại sau.
            </p>
            <button
              onClick={() => fetchData()}
              style={{
                padding: '12px 24px',
                backgroundColor: '#ffc107',
                color: '#212529',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Làm mới dữ liệu
            </button>
          </div>
        );
        
      case DASHBOARD_STATES.SUCCESS:
        return (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px',
              padding: '20px',
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '8px'
            }}>
              <div>
                <h3 style={{ color: '#155724', margin: 0 }}>
                  ✅ Dashboard hoạt động bình thường
                </h3>
                <p style={{ color: '#155724', margin: 0, fontSize: '14px' }}>
                  Cập nhật lúc: {new Date().toLocaleTimeString('vi-VN')}
                </p>
              </div>
              <button
                onClick={() => fetchData()}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Làm mới
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              {/* PATTERN 3: map() với conditional rendering */}
              {data.map(item => (
                <div
                  key={item.id} // Key prop quan trọng
                  style={{
                    padding: '24px',
                    backgroundColor: 'white',
                    border: '1px solid #dee2e6',
                    borderRadius: '12px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '15px'
                  }}>
                    <span style={{ fontSize: '32px' }}>{item.icon}</span>
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: item.color,
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {item.trend}
                    </span>
                  </div>
                  
                  <h4 style={{ 
                    color: '#495057', 
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 'normal'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    color: item.color,
                    fontSize: '24px',
                    fontWeight: 'bold',
                    margin: 0
                  }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        // Fallback case
        return (
          <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>
            <h3>⚠️ Trạng thái không hợp lệ: {state}</h3>
            <button onClick={() => setState(DASHBOARD_STATES.LOADING)}>
              Reset Dashboard
            </button>
          </div>
        );
    }
  };

  // Return main dashboard component
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '2px solid #e9ecef'
      }}>
        <div>
          <h2 style={{ color: '#333', margin: 0, marginBottom: '5px' }}>
            📊 Multi-State Dashboard
          </h2>
          <p style={{ color: '#666', margin: 0 }}>
            Demo conditional rendering với multiple states
          </p>
        </div>
        
        <div style={{
          padding: '8px 16px',
          backgroundColor: state === DASHBOARD_STATES.SUCCESS ? '#d4edda' : 
                          state === DASHBOARD_STATES.ERROR ? '#f8d7da' :
                          state === DASHBOARD_STATES.LOADING ? '#cce5ff' : '#fff3cd',
          color: state === DASHBOARD_STATES.SUCCESS ? '#155724' : 
                state === DASHBOARD_STATES.ERROR ? '#721c24' :
                state === DASHBOARD_STATES.LOADING ? '#004085' : '#856404',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          {state.toUpperCase()}
        </div>
      </div>

      {renderDashboardContent()}
    </div>
  );
}

// =============================================================================
// 3. USER AUTHENTICATION COMPONENT
// =============================================================================
// Component để demo role-based conditional rendering
function UserAuthDemo() {
  // ============== STATE DECLARATIONS ==============
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const availableUsers = [
    {
      id: 1,
      name: 'Khách vãng lai',
      role: USER_ROLES.GUEST,
      permissions: [PERMISSIONS.READ],
      avatar: '👤'
    },
    {
      id: 2,
      name: 'Nguyễn Văn User',
      role: USER_ROLES.USER,
      permissions: [PERMISSIONS.READ, PERMISSIONS.WRITE],
      avatar: '👨‍💼'
    },
    {
      id: 3,
      name: 'Admin Hệ Thống',
      role: USER_ROLES.ADMIN,
      permissions: [PERMISSIONS.READ, PERMISSIONS.WRITE, PERMISSIONS.DELETE, PERMISSIONS.ADMIN],
      avatar: '👨‍💻'
    }
  ];

  // ============== HELPER FUNCTIONS ==============
  const hasPermission = useCallback((permission) => {
    // PATTERN 4: Guard clause pattern
    if (!currentUser) return false;
    return currentUser.permissions.includes(permission);
  }, [currentUser]);

  const switchUser = useCallback(async (user) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentUser(user);
    setIsLoading(false);
  }, []);

  // ============== CONDITIONAL RENDER HELPERS ==============
  const renderUserActions = () => {
    // PATTERN 5: Early return pattern
    if (!currentUser) {
      return (
        <div style={{ textAlign: 'center', color: '#666' }}>
          Vui lòng chọn user để xem actions
        </div>
      );
    }

    const actions = [];

    // PATTERN 6: Logical AND (&&) pattern
    hasPermission(PERMISSIONS.READ) && actions.push(
      <button key="read" style={{
        padding: '8px 16px',
        backgroundColor: '#17a2b8',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '5px'
      }}>
        📖 Xem dữ liệu
      </button>
    );

    hasPermission(PERMISSIONS.WRITE) && actions.push(
      <button key="write" style={{
        padding: '8px 16px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '5px'
      }}>
        ✏️ Chỉnh sửa
      </button>
    );

    hasPermission(PERMISSIONS.DELETE) && actions.push(
      <button key="delete" style={{
        padding: '8px 16px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '5px'
      }}>
        🗑️ Xóa
      </button>
    );

    return (
      <div>
        <h4 style={{ color: '#333', marginBottom: '15px' }}>
          🎯 Actions Available
        </h4>
        <div style={{ textAlign: 'center' }}>
          {actions.length > 0 ? actions : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              Không có quyền thực hiện action nào
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '2px solid #e9ecef'
      }}>
        <div>
          <h2 style={{ color: '#333', margin: 0, marginBottom: '5px' }}>
            🔐 User Authentication & Roles
          </h2>
          <p style={{ color: '#666', margin: 0 }}>
            Demo role-based conditional rendering
          </p>
        </div>
      </div>

      {/* Current User Display */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '25px'
      }}>
        <div style={{ fontSize: '48px', marginRight: '20px' }}>
          {isLoading ? '⏳' : (currentUser?.avatar || '❓')}
        </div>
        
        <div style={{ flex: 1 }}>
          <h3 style={{ color: '#333', margin: 0, marginBottom: '5px' }}>
            {isLoading ? 'Đang chuyển user...' : (currentUser?.name || 'Chưa chọn user')}
          </h3>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {/* PATTERN 7: Optional chaining với conditional render */}
            {currentUser?.role && (
              <span style={{
                padding: '4px 8px',
                backgroundColor: currentUser.role === USER_ROLES.ADMIN ? '#dc3545' :
                                currentUser.role === USER_ROLES.USER ? '#007bff' : '#6c757d',
                color: 'white',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {currentUser.role.toUpperCase()}
              </span>
            )}
            
            {/* Map permissions với conditional render */}
            {currentUser?.permissions?.map(permission => (
              <span
                key={permission}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
              >
                {permission}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* User Switcher */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ color: '#333', marginBottom: '15px' }}>
          🔄 Select User
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {availableUsers.map(user => (
            <button
              key={user.id}
              onClick={() => switchUser(user)}
              disabled={isLoading || currentUser?.id === user.id}
              style={{
                padding: '15px',
                backgroundColor: currentUser?.id === user.id ? '#007bff' : 'white',
                color: currentUser?.id === user.id ? 'white' : '#333',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                cursor: isLoading || currentUser?.id === user.id ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                opacity: isLoading || currentUser?.id === user.id ? 0.6 : 1
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{user.avatar}</div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{user.name}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{user.role}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Actions based on permissions */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        {renderUserActions()}
      </div>

      {/* Admin Panel - PATTERN 8: Logical AND với complex condition */}
      {hasPermission(PERMISSIONS.ADMIN) && (
        <div style={{
          backgroundColor: '#f8f9fa',
          border: '2px solid #dee2e6',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>
            🔒 Admin Panel
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <div style={{
              padding: '15px',
              backgroundColor: 'white',
              borderRadius: '6px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ color: '#007bff', marginBottom: '10px' }}>👥 User Management</h4>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                Quản lý người dùng và phân quyền
              </p>
              <button style={{
                padding: '8px 12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}>
                Mở Panel
              </button>
            </div>

            <div style={{
              padding: '15px',
              backgroundColor: 'white',
              borderRadius: '6px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ color: '#28a745', marginBottom: '10px' }}>⚙️ System Settings</h4>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                Cấu hình hệ thống và bảo mật
              </p>
              <button style={{
                padding: '8px 12px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}>
                Cấu hình
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// 4. NOTIFICATION SYSTEM COMPONENT
// =============================================================================
function NotificationDemo() {
  // ============== STATE DECLARATIONS ==============
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error', 
    WARNING: 'warning',
    INFO: 'info'
  };

  // ============== HELPER FUNCTIONS ==============
  const addNotification = useCallback((type, message) => {
    const newNotification = {
      id: Date.now() + Math.random(),
      type,
      message,
      timestamp: new Date(),
      isRead: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  }, []);

  // ============== COMPUTED VALUES ==============
  const filteredNotifications = useMemo(() => {
    // PATTERN 9: Complex conditional logic với multiple returns
    if (filter === 'all') return notifications;
    if (filter === 'unread') return notifications.filter(n => !n.isRead);
    return notifications.filter(n => n.type === filter);
  }, [notifications, filter]);

  const stats = useMemo(() => {
    return {
      total: notifications.length,
      unread: notifications.filter(n => !n.isRead).length,
      success: notifications.filter(n => n.type === NOTIFICATION_TYPES.SUCCESS).length,
      error: notifications.filter(n => n.type === NOTIFICATION_TYPES.ERROR).length
    };
  }, [notifications, NOTIFICATION_TYPES]);

  // ============== RENDER HELPERS ==============
  const getNotificationConfig = (type) => {
    // PATTERN 10: Switch case với object return
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return { icon: '✅', color: '#28a745', bg: '#d4edda', border: '#c3e6cb' };
      case NOTIFICATION_TYPES.ERROR:
        return { icon: '❌', color: '#dc3545', bg: '#f8d7da', border: '#f5c6cb' };
      case NOTIFICATION_TYPES.WARNING:
        return { icon: '⚠️', color: '#ffc107', bg: '#fff3cd', border: '#ffeaa7' };
      case NOTIFICATION_TYPES.INFO:
        return { icon: 'ℹ️', color: '#17a2b8', bg: '#d1ecf1', border: '#bee5eb' };
      default:
        return { icon: '📝', color: '#6c757d', bg: '#f8f9fa', border: '#dee2e6' };
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '2px solid #e9ecef'
      }}>
        <div>
          <h2 style={{ color: '#333', margin: 0, marginBottom: '5px' }}>
            🔔 Notification System
          </h2>
          <p style={{ color: '#666', margin: 0 }}>
            Demo dynamic conditional rendering
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{stats.total}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Tổng cộng</div>
        </div>
        
        <div style={{
          textAlign: 'center',
          padding: '15px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>{stats.unread}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Chưa đọc</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '25px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => addNotification(NOTIFICATION_TYPES.SUCCESS, 'Thao tác thành công!')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ✅ Add Success
        </button>
        
        <button
          onClick={() => addNotification(NOTIFICATION_TYPES.ERROR, 'Có lỗi xảy ra!')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ❌ Add Error
        </button>
        
        <button
          onClick={() => addNotification(NOTIFICATION_TYPES.WARNING, 'Cảnh báo hệ thống!')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#ffc107',
            color: '#212529',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ⚠️ Add Warning
        </button>
        
        <button
          onClick={() => addNotification(NOTIFICATION_TYPES.INFO, 'Thông tin mới!')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ℹ️ Add Info
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '5px',
        marginBottom: '20px',
        borderBottom: '1px solid #dee2e6'
      }}>
        {[
          { key: 'all', label: 'Tất cả', count: stats.total },
          { key: 'unread', label: 'Chưa đọc', count: stats.unread }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: '10px 15px',
              backgroundColor: filter === tab.key ? '#007bff' : 'transparent',
              color: filter === tab.key ? 'white' : '#333',
              border: 'none',
              borderBottom: filter === tab.key ? '2px solid #007bff' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {/* PATTERN 11: Ternary với complex JSX */}
        {filteredNotifications.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#6c757d'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
            <h3 style={{ marginBottom: '10px' }}>
              {filter === 'all' ? 'Chưa có notification nào' : 'Không có notification phù hợp'}
            </h3>
            <p>Hãy tạo notification đầu tiên!</p>
          </div>
        ) : (
          <div>
            {filteredNotifications.map(notification => {
              const config = getNotificationConfig(notification.type);
              
              return (
                <div
                  key={notification.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '15px',
                    padding: '15px',
                    backgroundColor: config.bg,
                    border: `1px solid ${config.border}`,
                    borderRadius: '8px',
                    marginBottom: '10px',
                    opacity: notification.isRead ? 0.7 : 1
                  }}
                >
                  <div style={{ fontSize: '24px', flexShrink: 0 }}>
                    {config.icon}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <p style={{
                      color: config.color,
                      margin: 0,
                      marginBottom: '8px',
                      fontWeight: notification.isRead ? 'normal' : 'bold'
                    }}>
                      {notification.message}
                    </p>
                    <p style={{
                      color: '#6c757d',
                      fontSize: '12px',
                      margin: 0
                    }}>
                      {notification.timestamp.toLocaleString('vi-VN')}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    {/* PATTERN 12: Logical AND với complex condition */}
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: config.color,
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Đánh dấu đã đọc
                      </button>
                    )}
                    
                    <button
                      onClick={() => removeNotification(notification.id)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// 5. MAIN COMPONENT
// =============================================================================
function ConditionalRenderingDemo() {
  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#333', marginBottom: '15px', fontSize: '36px' }}>
          Day 6 - Conditional Rendering
        </h1>
        <p style={{ color: '#666', fontSize: '18px', margin: 0, lineHeight: '1.6' }}>
          Học tất cả patterns của conditional rendering: if/else, ternary operator, <br/>
          logical AND, switch case, guard clauses và role-based rendering
        </p>
      </header>

      {/* Demo Components */}
      <MultiStateDashboard />
      <UserAuthDemo />
      <NotificationDemo />

      {/* Footer với learning points */}
      <footer style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        marginTop: '30px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#28a745', marginBottom: '20px' }}>
          ✅ Hoàn thành Day 6 - Conditional Rendering!
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px',
          textAlign: 'left'
        }}>
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ color: '#007bff', marginBottom: '10px' }}>🎯 Conditional Patterns</h4>
            <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <li>if/else statements</li>
              <li>Ternary operator (? :)</li>
              <li>Logical AND (&&)</li>
              <li>Switch case</li>
              <li>Guard clauses</li>
              <li>Early returns</li>
            </ul>
          </div>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ color: '#28a745', marginBottom: '10px' }}>🔐 Authentication</h4>
            <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <li>Role-based rendering</li>
              <li>Permission checking</li>
              <li>Protected components</li>
              <li>Authentication states</li>
              <li>User context</li>
            </ul>
          </div>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ color: '#ffc107', marginBottom: '10px' }}>⚡ Best Practices</h4>
            <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <li>Early returns cho performance</li>
              <li>Readable condition expressions</li>
              <li>Avoid nested ternaries</li>
              <li>Use enums cho constants</li>
              <li>Component composition</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

// =============================================================================
// EXPORT DEFAULT COMPONENT
// =============================================================================
export default ConditionalRenderingDemo;

// =============================================================================
// KẾT THÚC COMPONENT - Key Learning Points:
// =============================================================================
// 1. CONDITIONAL PATTERNS: 12 patterns khác nhau được demo
//    - Switch case, Ternary, Logical AND, Guard clauses, Early returns
// 2. AUTHENTICATION: Role-based và permission-based rendering
// 3. DYNAMIC RENDERING: Based on data và user interactions
// 4. PERFORMANCE: Early returns và efficient condition checking
// 5. UX: Loading states, empty states, error handling với visual feedback
// 6. CODE ORGANIZATION: Helper functions và clean readable patterns
// =============================================================================