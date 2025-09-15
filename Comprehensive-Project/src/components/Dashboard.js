import React, { useState, useEffect } from 'react';

/**
 * Dashboard Component - Trang chủ hiển thị tổng quan
 * 
 * Concepts từ Day 1-7:
 * - Components & Props (Day 2): Nhận và sử dụng props
 * - State Management (Day 4): Quản lý state của dashboard
 * - Event Handling (Day 5): Xử lý các events tương tác
 * - Conditional Rendering (Day 3 & 6): Hiển thị nội dung dựa trên điều kiện
 * - Advanced Lists (Day 7): Render danh sách courses, activities
 * - useEffect Hook: Fetch data khi component mount
 */

const Dashboard = ({ 
  currentUser,        // Props: thông tin user hiện tại (Day 2)
  userProgress,       // Props: tiến độ học tập (Day 2)
  onCourseClick,      // Props: function xử lý click course (Day 2)
  onActivityClick     // Props: function xử lý click activity (Day 2)
}) => {
  
  /**
   * State Management (Day 4): Quản lý state của dashboard
   */
  const [recentActivities, setRecentActivities] = useState([]); // Hoạt động gần đây
  const [recommendedCourses, setRecommendedCourses] = useState([]); // Khóa học đề xuất
  const [todayStats, setTodayStats] = useState(null); // Thống kê hôm nay
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [currentTime, setCurrentTime] = useState(new Date()); // Thời gian hiện tại

  /**
   * useEffect Hook: Fetch data khi component mount
   * Side Effects (Advanced): Tải dữ liệu ban đầu
   */
  useEffect(() => {
    // Simulate API call để load dashboard data
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data cho recent activities
        setRecentActivities([
          {
            id: 1,
            type: 'lesson_completed',
            title: 'Hoàn thành bài học "React Components"',
            course: 'React Fundamentals',
            time: '2 giờ trước',
            icon: '✅'
          },
          {
            id: 2,
            type: 'exercise_submitted',
            title: 'Nộp bài tập "State Management"',
            course: 'React Advanced',
            time: '4 giờ trước',
            icon: '📝'
          },
          {
            id: 3,
            type: 'achievement_unlocked',
            title: 'Đạt thành tích "React Master"',
            course: 'General',
            time: '1 ngày trước',
            icon: '🏆'
          },
          {
            id: 4,
            type: 'discussion_participated',
            title: 'Tham gia thảo luận "Best Practices"',
            course: 'React Community',
            time: '2 ngày trước',
            icon: '💬'
          }
        ]);

        // Mock data cho recommended courses
        setRecommendedCourses([
          {
            id: 1,
            title: 'Advanced React Patterns',
            description: 'Học các pattern nâng cao trong React',
            progress: 0,
            duration: '8 tuần',
            level: 'Nâng cao',
            instructor: 'Nguyễn Văn A',
            thumbnail: '🚀'
          },
          {
            id: 2,
            title: 'React Testing Library',
            description: 'Cách test React components hiệu quả',
            progress: 25,
            duration: '4 tuần',
            level: 'Trung cấp',
            instructor: 'Trần Thị B',
            thumbnail: '🧪'
          },
          {
            id: 3,
            title: 'React Native Mobile',
            description: 'Phát triển ứng dụng mobile với React Native',
            progress: 0,
            duration: '10 tuần',
            level: 'Nâng cao',
            instructor: 'Lê Văn C',
            thumbnail: '📱'
          }
        ]);

        // Mock data cho today stats
        setTodayStats({
          lessonsCompleted: 3,
          timeSpent: 120, // minutes
          exercisesSubmitted: 2,
          pointsEarned: 150
        });

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []); // Empty dependency array - chỉ chạy một lần khi mount

  /**
   * useEffect Hook: Update thời gian hiện tại mỗi giây
   * Side Effects (Advanced): Real-time clock
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function để clear interval khi component unmount
    return () => clearInterval(timer);
  }, []); // Empty dependency array

  /**
   * Event Handling (Day 5): Xử lý click vào course
   */
  const handleCourseClick = (course) => {
    console.log('Course clicked:', course.title); // Debug log
    onCourseClick && onCourseClick(course);
  };

  /**
   * Event Handling (Day 5): Xử lý click vào activity
   */
  const handleActivityClick = (activity) => {
    console.log('Activity clicked:', activity.title); // Debug log
    onActivityClick && onActivityClick(activity);
  };

  /**
   * Utility function: Format thời gian
   * Advanced Lists (Day 7): Helper function cho display
   */
  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  /**
   * Utility function: Format date
   */
  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * Utility function: Tính phần trăm progress
   */
  const calculateOverallProgress = () => {
    if (!userProgress) return 0;
    const total = userProgress.totalLessons || 1;
    const completed = userProgress.completedLessons || 0;
    return Math.round((completed / total) * 100);
  };

  /**
   * Utility function: Lấy lời chào dựa trên thời gian
   */
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  // Conditional Rendering (Day 3): Hiển thị loading state
  if (isLoading) {
    return (
      <div className="dashboard loading">
        <div className="loading-spinner">
          <span>📚</span>
          <p>Đang tải dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    // JSX (Day 1): Cấu trúc dashboard
    <div className="dashboard">
      
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h1 className="welcome-title">
            {/* JSX (Day 1): Embedding expressions */}
            {getGreeting()}, {currentUser?.name || 'Học viên'}! 👋
          </h1>
          <p className="welcome-subtitle">
            Hôm nay là {formatDate(currentTime)} - {formatTime(currentTime)}
          </p>
          <p className="welcome-message">
            Sẵn sàng tiếp tục hành trình học React của bạn chưa?
          </p>
        </div>
        
        <div className="welcome-stats">
          <div className="overall-progress">
            <h3>Tiến độ tổng thể</h3>
            <div className="progress-circle">
              <span className="progress-percentage">{calculateOverallProgress()}%</span>
            </div>
            <p>{userProgress?.completedLessons || 0} / {userProgress?.totalLessons || 0} bài học</p>
          </div>
        </div>
      </section>

      {/* Today's Stats */}
      {/* Conditional Rendering (Day 6): Hiển thị stats nếu có data */}
      {todayStats && (
        <section className="today-stats">
          <h2>Thống kê hôm nay</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">📖</span>
              <div className="stat-content">
                <span className="stat-number">{todayStats.lessonsCompleted}</span>
                <span className="stat-label">Bài học hoàn thành</span>
              </div>
            </div>
            
            <div className="stat-card">
              <span className="stat-icon">⏱️</span>
              <div className="stat-content">
                <span className="stat-number">{todayStats.timeSpent}</span>
                <span className="stat-label">Phút học tập</span>
              </div>
            </div>
            
            <div className="stat-card">
              <span className="stat-icon">💪</span>
              <div className="stat-content">
                <span className="stat-number">{todayStats.exercisesSubmitted}</span>
                <span className="stat-label">Bài tập nộp</span>
              </div>
            </div>
            
            <div className="stat-card">
              <span className="stat-icon">⭐</span>
              <div className="stat-content">
                <span className="stat-number">{todayStats.pointsEarned}</span>
                <span className="stat-label">Điểm kiếm được</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        
        {/* Recommended Courses */}
        <section className="recommended-courses">
          <div className="section-header">
            <h2>Khóa học đề xuất</h2>
            <button className="view-all-btn">Xem tất cả</button>
          </div>
          
          <div className="courses-grid">
            {/* Advanced Lists (Day 7): Render recommended courses */}
            {recommendedCourses.map(course => (
              <div 
                key={course.id}
                className="course-card"
                onClick={() => handleCourseClick(course)}
              >
                <div className="course-thumbnail">
                  <span className="course-icon">{course.thumbnail}</span>
                </div>
                
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  
                  <div className="course-meta">
                    <span className="course-duration">📅 {course.duration}</span>
                    <span className="course-level">🎯 {course.level}</span>
                  </div>
                  
                  <div className="course-instructor">
                    👨‍🏫 {course.instructor}
                  </div>
                  
                  {/* Conditional Rendering (Day 3): Hiển thị progress nếu đã bắt đầu */}
                  {course.progress > 0 ? (
                    <div className="course-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <span className="progress-text">{course.progress}% hoàn thành</span>
                    </div>
                  ) : (
                    <button className="start-course-btn">
                      Bắt đầu học
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activities */}
        <section className="recent-activities">
          <div className="section-header">
            <h2>Hoạt động gần đây</h2>
            <button className="view-all-btn">Xem tất cả</button>
          </div>
          
          <div className="activities-list">
            {/* Advanced Lists (Day 7): Render recent activities */}
            {recentActivities.map(activity => (
              <div 
                key={activity.id}
                className={`activity-item ${activity.type}`}
                onClick={() => handleActivityClick(activity)}
              >
                <span className="activity-icon">{activity.icon}</span>
                
                <div className="activity-content">
                  <h4 className="activity-title">{activity.title}</h4>
                  <p className="activity-course">{activity.course}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Conditional Rendering (Day 6): Hiển thị message nếu không có activities */}
          {recentActivities.length === 0 && (
            <div className="no-activities">
              <span className="no-activities-icon">📝</span>
              <p>Chưa có hoạt động nào gần đây</p>
              <p>Hãy bắt đầu học một khóa học mới!</p>
            </div>
          )}
        </section>
      </div>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2>Hành động nhanh</h2>
        <div className="actions-grid">
          <button className="action-btn" onClick={() => console.log('Start lesson clicked')}>
            <span className="action-icon">📖</span>
            <span className="action-text">Bắt đầu bài học</span>
          </button>
          
          <button className="action-btn" onClick={() => console.log('Practice exercise clicked')}>
            <span className="action-icon">💪</span>
            <span className="action-text">Luyện tập</span>
          </button>
          
          <button className="action-btn" onClick={() => console.log('Join discussion clicked')}>
            <span className="action-icon">💬</span>
            <span className="action-text">Tham gia thảo luận</span>
          </button>
          
          <button className="action-btn" onClick={() => console.log('View progress clicked')}>
            <span className="action-icon">📊</span>
            <span className="action-text">Xem tiến độ</span>
          </button>
        </div>
      </section>
      
    </div>
  );
};

export default Dashboard;