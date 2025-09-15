/**
 * Mock Data Generator - Tạo dữ liệu mẫu cho ứng dụng
 * 
 * Concepts từ Day 1-7:
 * - Advanced Lists (Day 7): Quản lý và tạo dữ liệu phức tạp
 * - JavaScript ES6+: Array methods, object destructuring
 * - State Management (Day 4): Cấu trúc dữ liệu cho state
 */

/**
 * Tạo dữ liệu user mẫu
 */
export const generateMockUser = () => {
  const users = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      email: 'an.nguyen@email.com',
      avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+An&background=0D8ABC&color=fff',
      role: 'student',
      joinDate: '2024-01-15',
      bio: 'Passionate about web development and React',
      level: 'intermediate'
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      email: 'binh.tran@email.com',
      avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+Binh&background=6366F1&color=fff',
      role: 'student',
      joinDate: '2024-02-01',
      bio: 'Frontend developer learning React',
      level: 'beginner'
    },
    {
      id: 3,
      name: 'Lê Văn Cường',
      email: 'cuong.le@email.com',
      avatar: 'https://ui-avatars.com/api/?name=Le+Van+Cuong&background=EF4444&color=fff',
      role: 'instructor',
      joinDate: '2023-12-01',
      bio: 'Senior React developer and instructor',
      level: 'expert'
    }
  ];

  // Random user for demo
  return users[Math.floor(Math.random() * users.length)];
};

/**
 * Tạo dữ liệu progress mẫu
 */
export const generateMockProgress = () => {
  return {
    totalLessons: 120,
    completedLessons: Math.floor(Math.random() * 80) + 20, // 20-100
    totalHours: Math.floor(Math.random() * 50) + 10, // 10-60 hours
    streak: Math.floor(Math.random() * 30) + 1, // 1-30 days
    points: Math.floor(Math.random() * 5000) + 500, // 500-5500 points
    certificates: Math.floor(Math.random() * 5), // 0-5 certificates
    rank: Math.floor(Math.random() * 1000) + 1, // 1-1000
    level: 'intermediate',
    achievements: [
      'First Steps', 
      'React Basics', 
      'Component Master', 
      'State Expert',
      'Event Handler Pro'
    ].slice(0, Math.floor(Math.random() * 5) + 1)
  };
};

/**
 * Tạo dữ liệu courses mẫu
 */
export const generateMockCourses = () => {
  const categories = ['frontend', 'backend', 'fullstack', 'mobile', 'testing', 'devops'];
  const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
  const instructors = [
    'Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 
    'Hoàng Văn E', 'Vũ Thị F', 'Đỗ Văn G', 'Bùi Thị H'
  ];
  
  const courseTemplates = [
    {
      title: 'React Fundamentals',
      description: 'Học những kiến thức cơ bản về React từ zero đến hero',
      thumbnail: '⚛️',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      title: 'Advanced React Patterns',
      description: 'Các pattern nâng cao trong React: HOC, Render Props, Hooks',
      thumbnail: '🚀',
      tags: ['React', 'Advanced', 'Patterns']
    },
    {
      title: 'Node.js Backend Development',
      description: 'Phát triển backend với Node.js, Express và MongoDB',
      thumbnail: '🟢',
      tags: ['Node.js', 'Express', 'MongoDB']
    },
    {
      title: 'React Native Mobile Apps',
      description: 'Xây dựng ứng dụng di động với React Native',
      thumbnail: '📱',
      tags: ['React Native', 'Mobile', 'iOS', 'Android']
    },
    {
      title: 'React Testing Library',
      description: 'Cách test React components một cách hiệu quả',
      thumbnail: '🧪',
      tags: ['Testing', 'Jest', 'React Testing Library']
    },
    {
      title: 'Full-Stack React Application',
      description: 'Xây dựng ứng dụng full-stack với React và Node.js',
      thumbnail: '🔥',
      tags: ['React', 'Node.js', 'Full-Stack', 'Database']
    },
    {
      title: 'React Performance Optimization',
      description: 'Tối ưu hóa hiệu suất ứng dụng React',
      thumbnail: '⚡',
      tags: ['React', 'Performance', 'Optimization']
    },
    {
      title: 'React State Management',
      description: 'Quản lý state với Redux, Context API và Zustand',
      thumbnail: '🔄',
      tags: ['React', 'Redux', 'Context API', 'State']
    }
  ];

  return courseTemplates.map((template, index) => ({
    id: index + 1,
    ...template,
    category: categories[Math.floor(Math.random() * categories.length)],
    level: levels[Math.floor(Math.random() * levels.length)],
    duration: `${Math.floor(Math.random() * 12) + 4} tuần`,
    durationWeeks: Math.floor(Math.random() * 12) + 4,
    instructor: instructors[Math.floor(Math.random() * instructors.length)],
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5-5.0
    enrollments: Math.floor(Math.random() * 2000) + 100,
    price: (Math.floor(Math.random() * 30) + 10) * 100000, // 1M-4M VND
    created: new Date(2024, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    isEnrolled: Math.random() > 0.7, // 30% chance enrolled
    progress: Math.random() > 0.5 ? Math.floor(Math.random() * 100) : 0,
    lessons: Math.floor(Math.random() * 30) + 10, // 10-40 lessons
    projects: Math.floor(Math.random() * 5) + 1, // 1-5 projects
    quizzes: Math.floor(Math.random() * 10) + 5 // 5-15 quizzes
  }));
};

/**
 * Tạo dữ liệu activities mẫu
 */
export const generateMockActivities = () => {
  const activityTypes = [
    {
      type: 'lesson_completed',
      icon: '✅',
      actions: ['Hoàn thành bài học', 'Kết thúc chương', 'Học xong module']
    },
    {
      type: 'exercise_submitted',
      icon: '📝',
      actions: ['Nộp bài tập', 'Hoàn thành thử thách', 'Gửi project']
    },
    {
      type: 'achievement_unlocked',
      icon: '🏆',
      actions: ['Đạt thành tích', 'Mở khóa badge', 'Nhận chứng chỉ']
    },
    {
      type: 'discussion_participated',
      icon: '💬',
      actions: ['Tham gia thảo luận', 'Trả lời câu hỏi', 'Đặt câu hỏi']
    },
    {
      type: 'course_enrolled',
      icon: '📚',
      actions: ['Đăng ký khóa học', 'Bắt đầu learning path', 'Tham gia bootcamp']
    }
  ];

  const courses = [
    'React Fundamentals', 'Advanced React', 'Node.js Backend', 
    'React Native', 'Testing Library', 'Full-Stack Development'
  ];

  const timeRanges = [
    '5 phút trước', '30 phút trước', '1 giờ trước', '2 giờ trước',
    '5 giờ trước', '1 ngày trước', '2 ngày trước', '1 tuần trước'
  ];

  return Array.from({ length: 15 }, (_, index) => {
    const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const action = activityType.actions[Math.floor(Math.random() * activityType.actions.length)];
    const course = courses[Math.floor(Math.random() * courses.length)];
    const time = timeRanges[Math.floor(Math.random() * timeRanges.length)];

    return {
      id: index + 1,
      type: activityType.type,
      icon: activityType.icon,
      title: `${action} "${course}"`,
      course: course,
      time: time,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time within 7 days
    };
  });
};

/**
 * Tạo dữ liệu lessons mẫu cho một course
 */
export const generateMockLessons = (courseId) => {
  const lessonTypes = ['video', 'text', 'quiz', 'exercise', 'project'];
  const difficulties = ['easy', 'medium', 'hard'];
  
  const lessonTitles = [
    'Giới thiệu về React',
    'JSX và Components',
    'Props và State',
    'Event Handling',
    'Conditional Rendering',
    'Lists và Keys',
    'Forms trong React',
    'Component Lifecycle',
    'Hooks cơ bản',
    'useState và useEffect',
    'Custom Hooks',
    'Context API',
    'React Router',
    'State Management',
    'Performance Optimization',
    'Testing Components',
    'Deployment',
    'Best Practices'
  ];

  return lessonTitles.map((title, index) => ({
    id: index + 1,
    courseId: courseId,
    title: title,
    description: `Tìm hiểu chi tiết về ${title.toLowerCase()}`,
    type: lessonTypes[Math.floor(Math.random() * lessonTypes.length)],
    difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
    duration: Math.floor(Math.random() * 45) + 15, // 15-60 minutes
    order: index + 1,
    isCompleted: Math.random() > 0.6, // 40% completed
    isLocked: index > 5 && Math.random() > 0.8, // Some advanced lessons locked
    videoUrl: `https://example.com/video/${courseId}/${index + 1}`,
    materials: [
      'Slide bài giảng',
      'Code examples',
      'Bài tập thực hành'
    ].slice(0, Math.floor(Math.random() * 3) + 1)
  }));
};

/**
 * Tạo dữ liệu notifications mẫu
 */
export const generateMockNotifications = () => {
  const notificationTypes = [
    {
      type: 'course_update',
      icon: '📚',
      messages: ['Có bài học mới trong khóa học', 'Khóa học được cập nhật', 'Thêm tài liệu mới']
    },
    {
      type: 'achievement',
      icon: '🏆',
      messages: ['Bạn đã đạt thành tích mới', 'Chúc mừng! Bạn nhận được badge', 'Hoàn thành milestone']
    },
    {
      type: 'reminder',
      icon: '⏰',
      messages: ['Đừng quên học hôm nay', 'Hãy tiếp tục bài học', 'Thời gian học đều đặn']
    },
    {
      type: 'social',
      icon: '👥',
      messages: ['Có người trả lời câu hỏi của bạn', 'Ai đó mention bạn', 'Thảo luận mới về topic']
    }
  ];

  return Array.from({ length: 8 }, (_, index) => {
    const notificationType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const message = notificationType.messages[Math.floor(Math.random() * notificationType.messages.length)];

    return {
      id: index + 1,
      type: notificationType.type,
      icon: notificationType.icon,
      title: message,
      message: `Chi tiết về ${message.toLowerCase()}`,
      time: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(), // Random time within 3 days
      isRead: Math.random() > 0.4, // 60% read
      isImportant: Math.random() > 0.8 // 20% important
    };
  });
};

/**
 * Tạo dữ liệu discussion/forum mẫu
 */
export const generateMockDiscussions = () => {
  const topics = [
    'Cách optimize React performance?',
    'Sự khác biệt giữa useState và useReducer',
    'Best practices cho React folder structure',
    'Khi nào nên sử dụng Context API?',
    'Testing strategies cho React components',
    'Server-side rendering vs Client-side rendering',
    'React 18 có gì mới?',
    'Cách handle error boundaries hiệu quả'
  ];

  const authors = [
    'Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D',
    'Hoàng Văn E', 'Vũ Thị F', 'Đỗ Văn G', 'Bùi Thị H'
  ];

  return topics.map((topic, index) => ({
    id: index + 1,
    title: topic,
    author: authors[Math.floor(Math.random() * authors.length)],
    replies: Math.floor(Math.random() * 20),
    views: Math.floor(Math.random() * 500) + 50,
    lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['React', 'JavaScript', 'Frontend'].slice(0, Math.floor(Math.random() * 3) + 1),
    isResolved: Math.random() > 0.6,
    isPinned: Math.random() > 0.9,
    votes: Math.floor(Math.random() * 50) - 10 // Can be negative
  }));
};

/**
 * Utility function: Tạo dữ liệu mẫu cho toàn bộ app
 */
export const generateFullMockData = () => {
  const user = generateMockUser();
  const progress = generateMockProgress();
  const courses = generateMockCourses();
  const activities = generateMockActivities();
  const notifications = generateMockNotifications();
  const discussions = generateMockDiscussions();

  return {
    currentUser: user,
    userProgress: progress,
    courses: courses,
    enrolledCourses: courses.filter(course => course.isEnrolled),
    activities: activities,
    notifications: notifications,
    discussions: discussions,
    // Generate lessons for first course as example
    lessons: courses.length > 0 ? generateMockLessons(courses[0].id) : []
  };
};

/**
 * Utility function: Simulate API delay
 */
export const simulateApiDelay = (min = 500, max = 1500) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};