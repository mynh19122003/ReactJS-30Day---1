import React, { useState, useEffect } from 'react';

/**
 * CourseList Component - Hiển thị danh sách khóa học
 * 
 * Concepts từ Day 1-7:
 * - Components & Props (Day 2): Nhận và sử dụng props
 * - State Management (Day 4): Quản lý state filtering, sorting, search
 * - Event Handling (Day 5): Xử lý events search, filter, sort
 * - Conditional Rendering (Day 3 & 6): Hiển thị courses dựa trên filters
 * - Advanced Lists (Day 7): Render, filter, sort danh sách courses
 * - useEffect Hook: Fetch và filter courses data
 */

const CourseList = ({ 
  onCourseClick,      // Props: function xử lý click course (Day 2)
  onEnrollCourse,     // Props: function đăng ký course (Day 2)
  currentUser,        // Props: thông tin user hiện tại (Day 2)
  userCourses         // Props: danh sách courses user đã đăng ký (Day 2)
}) => {
  
  /**
   * State Management (Day 4): Quản lý state của course list
   */
  const [allCourses, setAllCourses] = useState([]); // Tất cả courses
  const [filteredCourses, setFilteredCourses] = useState([]); // Courses sau filter
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa search
  const [selectedCategory, setSelectedCategory] = useState('all'); // Category filter
  const [selectedLevel, setSelectedLevel] = useState('all'); // Level filter
  const [sortBy, setSortBy] = useState('title'); // Sort criteria
  const [sortOrder, setSortOrder] = useState('asc'); // Sort order
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [viewMode, setViewMode] = useState('grid'); // View mode: grid or list

  /**
   * Categories for filtering
   * Advanced Lists (Day 7): Data structure cho dropdown
   */
  const categories = [
    { value: 'all', label: 'Tất cả danh mục' },
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'fullstack', label: 'Fullstack Development' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'testing', label: 'Testing & QA' },
    { value: 'devops', label: 'DevOps & Deployment' }
  ];

  /**
   * Levels for filtering
   */
  const levels = [
    { value: 'all', label: 'Tất cả cấp độ' },
    { value: 'beginner', label: 'Cơ bản' },
    { value: 'intermediate', label: 'Trung cấp' },
    { value: 'advanced', label: 'Nâng cao' },
    { value: 'expert', label: 'Chuyên gia' }
  ];

  /**
   * Sort options
   */
  const sortOptions = [
    { value: 'title', label: 'Tên khóa học' },
    { value: 'duration', label: 'Thời lượng' },
    { value: 'level', label: 'Cấp độ' },
    { value: 'rating', label: 'Đánh giá' },
    { value: 'enrollments', label: 'Lượt đăng ký' },
    { value: 'created', label: 'Ngày tạo' }
  ];

  /**
   * useEffect Hook: Load courses data khi component mount
   */
  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock courses data
        const coursesData = [
          {
            id: 1,
            title: 'React Fundamentals',
            description: 'Học những kiến thức cơ bản về React từ zero đến hero',
            category: 'frontend',
            level: 'beginner',
            duration: '6 tuần',
            durationWeeks: 6,
            instructor: 'Nguyễn Văn A',
            rating: 4.8,
            enrollments: 1250,
            price: 1500000,
            thumbnail: '⚛️',
            tags: ['React', 'JavaScript', 'Frontend'],
            created: '2024-01-15',
            isEnrolled: false,
            progress: 0
          },
          {
            id: 2,
            title: 'Advanced React Patterns',
            description: 'Các pattern nâng cao trong React: HOC, Render Props, Hooks',
            category: 'frontend',
            level: 'advanced',
            duration: '8 tuần',
            durationWeeks: 8,
            instructor: 'Trần Thị B',
            rating: 4.9,
            enrollments: 850,
            price: 2500000,
            thumbnail: '🚀',
            tags: ['React', 'Advanced', 'Patterns'],
            created: '2024-02-01',
            isEnrolled: true,
            progress: 65
          },
          {
            id: 3,
            title: 'Node.js Backend Development',
            description: 'Phát triển backend với Node.js, Express và MongoDB',
            category: 'backend',
            level: 'intermediate',
            duration: '10 tuần',
            durationWeeks: 10,
            instructor: 'Lê Văn C',
            rating: 4.7,
            enrollments: 920,
            price: 2000000,
            thumbnail: '🟢',
            tags: ['Node.js', 'Express', 'MongoDB'],
            created: '2024-01-20',
            isEnrolled: false,
            progress: 0
          },
          {
            id: 4,
            title: 'React Native Mobile Apps',
            description: 'Xây dựng ứng dụng di động với React Native',
            category: 'mobile',
            level: 'intermediate',
            duration: '12 tuần',
            durationWeeks: 12,
            instructor: 'Phạm Thị D',
            rating: 4.6,
            enrollments: 630,
            price: 2800000,
            thumbnail: '📱',
            tags: ['React Native', 'Mobile', 'iOS', 'Android'],
            created: '2024-02-10',
            isEnrolled: true,
            progress: 30
          },
          {
            id: 5,
            title: 'React Testing Library',
            description: 'Cách test React components một cách hiệu quả',
            category: 'testing',
            level: 'intermediate',
            duration: '4 tuần',
            durationWeeks: 4,
            instructor: 'Hoàng Văn E',
            rating: 4.5,
            enrollments: 420,
            price: 1200000,
            thumbnail: '🧪',
            tags: ['Testing', 'Jest', 'React Testing Library'],
            created: '2024-02-15',
            isEnrolled: false,
            progress: 0
          },
          {
            id: 6,
            title: 'Full-Stack React Application',
            description: 'Xây dựng ứng dụng full-stack với React và Node.js',
            category: 'fullstack',
            level: 'advanced',
            duration: '16 tuần',
            durationWeeks: 16,
            instructor: 'Vũ Thị F',
            rating: 4.9,
            enrollments: 780,
            price: 3500000,
            thumbnail: '🔥',
            tags: ['React', 'Node.js', 'Full-Stack', 'Database'],
            created: '2024-01-30',
            isEnrolled: false,
            progress: 0
          }
        ];
        
        setAllCourses(coursesData);
        setFilteredCourses(coursesData);
        
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []); // Empty dependency array

  /**
   * useEffect Hook: Filter và sort courses khi có thay đổi
   * Advanced Lists (Day 7): Complex filtering and sorting logic
   */
  useEffect(() => {
    let filtered = [...allCourses];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    // Sort courses
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Special handling for different sort criteria
      if (sortBy === 'duration') {
        aValue = a.durationWeeks;
        bValue = b.durationWeeks;
      } else if (sortBy === 'created') {
        aValue = new Date(a.created);
        bValue = new Date(b.created);
      }

      // String comparison
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    setFilteredCourses(filtered);
  }, [allCourses, searchTerm, selectedCategory, selectedLevel, sortBy, sortOrder]);

  /**
   * Event Handling (Day 5): Xử lý search input
   */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log('Search term changed:', value); // Debug log
    setSearchTerm(value);
  };

  /**
   * Event Handling (Day 5): Xử lý thay đổi category filter
   */
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    console.log('Category filter changed:', value); // Debug log
    setSelectedCategory(value);
  };

  /**
   * Event Handling (Day 5): Xử lý thay đổi level filter
   */
  const handleLevelChange = (e) => {
    const value = e.target.value;
    console.log('Level filter changed:', value); // Debug log
    setSelectedLevel(value);
  };

  /**
   * Event Handling (Day 5): Xử lý thay đổi sort criteria
   */
  const handleSortChange = (e) => {
    const value = e.target.value;
    console.log('Sort criteria changed:', value); // Debug log
    setSortBy(value);
  };

  /**
   * Event Handling (Day 5): Toggle sort order
   */
  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    console.log('Sort order toggled:', newOrder); // Debug log
    setSortOrder(newOrder);
  };

  /**
   * Event Handling (Day 5): Xử lý click course card
   */
  const handleCourseClick = (course) => {
    console.log('Course clicked:', course.title); // Debug log
    onCourseClick && onCourseClick(course);
  };

  /**
   * Event Handling (Day 5): Xử lý enroll course
   */
  const handleEnrollCourse = (e, course) => {
    e.stopPropagation(); // Prevent triggering course click
    console.log('Enroll course:', course.title); // Debug log
    onEnrollCourse && onEnrollCourse(course);
  };

  /**
   * Event Handling (Day 5): Xử lý clear filters
   */
  const handleClearFilters = () => {
    console.log('Clearing all filters'); // Debug log
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSortBy('title');
    setSortOrder('asc');
  };

  /**
   * Utility function: Format price
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  /**
   * Utility function: Check if course is enrolled
   */
  const isCourseEnrolled = (courseId) => {
    return userCourses?.some(course => course.id === courseId) || false;
  };

  // Conditional Rendering (Day 3): Loading state
  if (isLoading) {
    return (
      <div className="course-list loading">
        <div className="loading-content">
          <span className="loading-icon">📚</span>
          <p>Đang tải danh sách khóa học...</p>
        </div>
      </div>
    );
  }

  return (
    // JSX (Day 1): Course list structure
    <div className="course-list">
      
      {/* Header */}
      <div className="course-list-header">
        <h1>Danh sách khóa học</h1>
        <p>Khám phá và đăng ký các khóa học phù hợp với bạn</p>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học, giảng viên, hoặc từ khóa..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Filter Controls */}
        <div className="filter-controls">
          
          {/* Category Filter */}
          <select 
            value={selectedCategory} 
            onChange={handleCategoryChange}
            className="filter-select"
          >
            {/* Advanced Lists (Day 7): Render category options */}
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          {/* Level Filter */}
          <select 
            value={selectedLevel} 
            onChange={handleLevelChange}
            className="filter-select"
          >
            {/* Advanced Lists (Day 7): Render level options */}
            {levels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>

          {/* Sort Controls */}
          <div className="sort-controls">
            <select 
              value={sortBy} 
              onChange={handleSortChange}
              className="sort-select"
            >
              {/* Advanced Lists (Day 7): Render sort options */}
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  Sắp xếp: {option.label}
                </option>
              ))}
            </select>
            
            {/* Sort Order Toggle */}
            <button 
              className="sort-order-btn"
              onClick={toggleSortOrder}
              title={sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
            >
              {sortOrder === 'asc' ? '⬆️' : '⬇️'}
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Xem dạng lưới"
            >
              ⊞
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Xem dạng danh sách"
            >
              ☰
            </button>
          </div>

          {/* Clear Filters */}
          <button 
            className="clear-filters-btn"
            onClick={handleClearFilters}
            title="Xóa tất cả bộ lọc"
          >
            🗑️ Xóa bộ lọc
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <p>
          Hiển thị {filteredCourses.length} / {allCourses.length} khóa học
          {/* Conditional Rendering (Day 3): Hiển thị search term nếu có */}
          {searchTerm && (
            <span className="search-highlight">
              {' '}cho "{searchTerm}"
            </span>
          )}
        </p>
      </div>

      {/* Course Grid/List */}
      <div className={`courses-container ${viewMode}`}>
        {/* Conditional Rendering (Day 6): Hiển thị courses hoặc empty state */}
        {filteredCourses.length > 0 ? (
          // Advanced Lists (Day 7): Render filtered courses
          filteredCourses.map(course => (
            <div 
              key={course.id}
              className={`course-card ${course.isEnrolled ? 'enrolled' : ''}`}
              onClick={() => handleCourseClick(course)}
            >
              
              {/* Course Thumbnail */}
              <div className="course-thumbnail">
                <span className="course-icon">{course.thumbnail}</span>
                {/* Conditional Rendering (Day 3): Enrolled badge */}
                {course.isEnrolled && (
                  <span className="enrolled-badge">✅ Đã đăng ký</span>
                )}
              </div>

              {/* Course Content */}
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>

                {/* Course Meta */}
                <div className="course-meta">
                  <span className="course-instructor">👨‍🏫 {course.instructor}</span>
                  <span className="course-duration">📅 {course.duration}</span>
                  <span className="course-level">🎯 {course.level}</span>
                </div>

                {/* Course Stats */}
                <div className="course-stats">
                  <span className="course-rating">
                    ⭐ {course.rating} ({course.enrollments} học viên)
                  </span>
                  <span className="course-price">{formatPrice(course.price)}</span>
                </div>

                {/* Course Tags */}
                <div className="course-tags">
                  {/* Advanced Lists (Day 7): Render course tags */}
                  {course.tags.map(tag => (
                    <span key={tag} className="course-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Progress Bar (for enrolled courses) */}
                {/* Conditional Rendering (Day 3): Hiển thị progress nếu đã enroll */}
                {course.isEnrolled && course.progress > 0 && (
                  <div className="course-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="progress-text">{course.progress}% hoàn thành</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="course-actions">
                  {/* Conditional Rendering (Day 3): Hiển thị button dựa trên enrollment status */}
                  {course.isEnrolled ? (
                    <button className="continue-btn">
                      Tiếp tục học
                    </button>
                  ) : (
                    <button 
                      className="enroll-btn"
                      onClick={(e) => handleEnrollCourse(e, course)}
                    >
                      Đăng ký ngay
                    </button>
                  )}
                  
                  <button className="preview-btn">
                    Xem trước
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Empty state
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <h3>Không tìm thấy khóa học nào</h3>
            <p>Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
            <button 
              className="reset-filters-btn"
              onClick={handleClearFilters}
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default CourseList;