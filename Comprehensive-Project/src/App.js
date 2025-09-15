// =============================================================================
// REACT LEARNING MANAGEMENT SYSTEM - MAIN APP
// =============================================================================
// Comprehensive project tổng hợp kiến thức từ Days 1-7
// Demonstrates: JSX, Components, Props, State, Events, Conditional Rendering, Lists
// =============================================================================

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';

// Import components (sẽ được tạo sau)
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Dashboard from './components/student/Dashboard';
import CourseList from './components/course/CourseList';
import StudentProfile from './components/student/StudentProfile';
import Quiz from './components/interactive/Quiz';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';

// Import data và utilities
import { generateSampleCourses } from './data/courses';
import { generateSampleStudent } from './data/students';
import { generateSampleQuizzes } from './data/quizzes';
import { useLocalStorage } from './hooks/useLocalStorage';

// =============================================================================
// APP CONSTANTS - Day 2 Concepts (Constants và Configuration)
// =============================================================================
const APP_ROUTES = {
  DASHBOARD: 'dashboard',
  COURSES: 'courses',
  PROFILE: 'profile',
  QUIZ: 'quiz',
  ACHIEVEMENTS: 'achievements'
};

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

// =============================================================================
// MAIN APP COMPONENT
// =============================================================================
function App() {
  // ============== STATE MANAGEMENT - Day 4 Concepts ==============
  // Navigation state
  const [currentRoute, setCurrentRoute] = useState(APP_ROUTES.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Data state - Day 4: Complex state management
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useLocalStorage('student-profile', null);
  const [enrolledCourses, setEnrolledCourses] = useLocalStorage('enrolled-courses', []);
  const [quizData, setQuizData] = useState([]);
  
  // UI state - Day 6: Advanced conditional rendering conditions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useLocalStorage('app-theme', THEMES.LIGHT);
  const [notifications, setNotifications] = useState([]);
  
  // Search và filter state - Day 7: Advanced list patterns
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  
  // Quiz state - Day 4: Interactive state
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizResults, setQuizResults] = useLocalStorage('quiz-results', {});

  // ============== COMPUTED VALUES - Day 3 & 7: Data processing ==============
  // Filtered courses based on search và category - Day 7 concepts
  const filteredCourses = useMemo(() => {
    let filtered = courses;
    
    // Search filter - Day 7: Search implementation
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Category filter - Day 6: Conditional filtering
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    // Sorting - Day 7: Advanced sorting patterns
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.enrollmentCount - a.enrollmentCount;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'rating':
          return b.rating - a.rating;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [courses, searchTerm, selectedCategory, sortBy]);

  // Student progress calculations - Day 3: Data transformation
  const studentStats = useMemo(() => {
    if (!student || enrolledCourses.length === 0) {
      return {
        totalCourses: 0,
        completedCourses: 0,
        totalLessons: 0,
        completedLessons: 0,
        averageProgress: 0,
        certificatesEarned: 0
      };
    }

    const enrolledCourseData = courses.filter(course => 
      enrolledCourses.includes(course.id)
    );

    const completedCourses = enrolledCourseData.filter(course => {
      const progress = student.courseProgress?.[course.id];
      return progress && progress.completionPercentage === 100;
    }).length;

    const totalLessons = enrolledCourseData.reduce((sum, course) => 
      sum + course.lessons.length, 0
    );

    const completedLessons = enrolledCourseData.reduce((sum, course) => {
      const progress = student.courseProgress?.[course.id];
      return sum + (progress?.completedLessons?.length || 0);
    }, 0);

    const averageProgress = enrolledCourseData.length > 0 
      ? enrolledCourseData.reduce((sum, course) => {
          const progress = student.courseProgress?.[course.id];
          return sum + (progress?.completionPercentage || 0);
        }, 0) / enrolledCourseData.length
      : 0;

    return {
      totalCourses: enrolledCourses.length,
      completedCourses,
      totalLessons,
      completedLessons,
      averageProgress: Math.round(averageProgress),
      certificatesEarned: completedCourses // Simplified
    };
  }, [student, enrolledCourses, courses]);

  // Categories for filtering - Day 7: Dynamic options
  const availableCategories = useMemo(() => {
    const categories = [...new Set(courses.map(course => course.category))];
    return categories.sort();
  }, [courses]);

  // ============== EVENT HANDLERS - Day 5: Event handling patterns ==============
  // Navigation handlers - Day 5: onClick events
  const handleRouteChange = useCallback((route) => {
    setCurrentRoute(route);
    
    // Add notification for navigation - Day 4: State updates
    addNotification(`Navigated to ${route}`, 'info');
  }, []);

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  // Course interaction handlers - Day 5: Complex event handling
  const handleCourseEnroll = useCallback((courseId) => {
    // Day 4: State updates với arrays
    setEnrolledCourses(prev => {
      if (prev.includes(courseId)) {
        return prev; // Already enrolled
      }
      return [...prev, courseId];
    });

    // Update student progress - Day 4: Nested state updates
    setStudent(prev => ({
      ...prev,
      courseProgress: {
        ...prev.courseProgress,
        [courseId]: {
          completionPercentage: 0,
          completedLessons: [],
          lastAccessed: new Date().toISOString(),
          startedAt: new Date().toISOString()
        }
      }
    }));

    addNotification('Successfully enrolled in course!', 'success');
  }, [setEnrolledCourses, setStudent]);

  const handleLessonComplete = useCallback((courseId, lessonId) => {
    setStudent(prev => {
      const courseProgress = prev.courseProgress?.[courseId] || {
        completionPercentage: 0,
        completedLessons: [],
        lastAccessed: new Date().toISOString()
      };

      // Add lesson to completed if not already there
      const completedLessons = courseProgress.completedLessons.includes(lessonId)
        ? courseProgress.completedLessons
        : [...courseProgress.completedLessons, lessonId];

      // Calculate completion percentage
      const course = courses.find(c => c.id === courseId);
      const totalLessons = course ? course.lessons.length : 1;
      const completionPercentage = Math.round((completedLessons.length / totalLessons) * 100);

      return {
        ...prev,
        courseProgress: {
          ...prev.courseProgress,
          [courseId]: {
            ...courseProgress,
            completedLessons,
            completionPercentage,
            lastAccessed: new Date().toISOString()
          }
        }
      };
    });

    addNotification('Lesson completed!', 'success');
  }, [courses, setStudent]);

  // Quiz handlers - Day 5: Form handling patterns
  const handleQuizStart = useCallback((quizId) => {
    const quiz = quizData.find(q => q.id === quizId);
    if (quiz) {
      setCurrentQuiz({
        ...quiz,
        startedAt: new Date().toISOString(),
        currentQuestion: 0,
        answers: {},
        timeRemaining: quiz.timeLimit * 60 // Convert minutes to seconds
      });
      setCurrentRoute(APP_ROUTES.QUIZ);
    }
  }, [quizData]);

  const handleQuizAnswer = useCallback((questionIndex, answer) => {
    setCurrentQuiz(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionIndex]: answer
      }
    }));
  }, []);

  const handleQuizSubmit = useCallback(() => {
    if (!currentQuiz) return;

    // Calculate score
    const totalQuestions = currentQuiz.questions.length;
    const correctAnswers = currentQuiz.questions.reduce((count, question, index) => {
      return currentQuiz.answers[index] === question.correctAnswer ? count + 1 : count;
    }, 0);

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = score >= (currentQuiz.passingScore || 70);

    // Save results
    const result = {
      quizId: currentQuiz.id,
      score,
      passed,
      completedAt: new Date().toISOString(),
      timeTaken: currentQuiz.timeLimit * 60 - currentQuiz.timeRemaining,
      answers: currentQuiz.answers
    };

    setQuizResults(prev => ({
      ...prev,
      [currentQuiz.id]: result
    }));

    // Update student profile
    setStudent(prev => ({
      ...prev,
      quizResults: {
        ...prev.quizResults,
        [currentQuiz.id]: result
      }
    }));

    setCurrentQuiz(null);
    setCurrentRoute(APP_ROUTES.DASHBOARD);
    addNotification(
      `Quiz completed! Score: ${score}% ${passed ? '(Passed)' : '(Failed)'}`,
      passed ? 'success' : 'warning'
    );
  }, [currentQuiz, setQuizResults, setStudent]);

  // Search và filter handlers - Day 5: Input events
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value);
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  // Theme handler - Day 5: Complex state changes
  const handleThemeChange = useCallback((newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    addNotification(`Theme changed to ${newTheme}`, 'info');
  }, [setTheme]);

  // Notification system - Day 4: Array state management
  const addNotification = useCallback((message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString()
    };

    setNotifications(prev => [...prev, notification]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  }, []);

  const removeNotification = useCallback((notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  // ============== LIFECYCLE EFFECTS ==============
  // Data loading effect - Day 6: Loading states
  useEffect(() => {
    const loadAppData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API calls với setTimeout - Day 6: Async patterns
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate sample data
        const coursesData = generateSampleCourses(50);
        const quizzesData = generateSampleQuizzes(20);
        let studentData = student;

        // Create default student if none exists
        if (!studentData) {
          studentData = generateSampleStudent();
          setStudent(studentData);
        }

        setCourses(coursesData);
        setQuizData(quizzesData);

        addNotification('Welcome to React LMS!', 'success');
      } catch (err) {
        setError('Failed to load application data');
        console.error('App loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAppData();
  }, []); // Empty dependency array - runs once on mount

  // Theme initialization effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Quiz timer effect - Day 6: Complex effects
  useEffect(() => {
    if (!currentQuiz || currentQuiz.timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setCurrentQuiz(prev => {
        if (!prev || prev.timeRemaining <= 1) {
          // Time's up - auto submit
          handleQuizSubmit();
          return null;
        }
        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuiz, handleQuizSubmit]);

  // ============== CONDITIONAL RENDERING HELPERS - Day 6 ==============
  // Loading state - Day 6: Loading patterns
  if (loading) {
    return (
      <div className="app-loading">
        <LoadingSpinner size="large" />
        <h2>Loading React LMS...</h2>
        <p>Preparing your learning experience</p>
      </div>
    );
  }

  // Error state - Day 6: Error handling
  if (error) {
    return (
      <div className="app-error">
        <h2>⚠️ Application Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          🔄 Reload Application
        </button>
      </div>
    );
  }

  // Render route content - Day 6: Complex conditional rendering
  const renderRouteContent = () => {
    switch (currentRoute) {
      case APP_ROUTES.DASHBOARD:
        return (
          <Dashboard
            student={student}
            stats={studentStats}
            enrolledCourses={enrolledCourses}
            courses={courses}
            quizResults={quizResults}
            onCourseSelect={(courseId) => {
              setCurrentRoute(APP_ROUTES.COURSES);
              // Could add course detail view
            }}
            onQuizStart={handleQuizStart}
          />
        );

      case APP_ROUTES.COURSES:
        return (
          <CourseList
            courses={filteredCourses}
            enrolledCourses={enrolledCourses}
            student={student}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            sortBy={sortBy}
            availableCategories={availableCategories}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
            onCourseEnroll={handleCourseEnroll}
            onLessonComplete={handleLessonComplete}
          />
        );

      case APP_ROUTES.PROFILE:
        return (
          <StudentProfile
            student={student}
            stats={studentStats}
            onStudentUpdate={setStudent}
            onThemeChange={handleThemeChange}
            currentTheme={theme}
          />
        );

      case APP_ROUTES.QUIZ:
        return currentQuiz ? (
          <Quiz
            quiz={currentQuiz}
            onAnswer={handleQuizAnswer}
            onSubmit={handleQuizSubmit}
            onCancel={() => {
              setCurrentQuiz(null);
              setCurrentRoute(APP_ROUTES.DASHBOARD);
            }}
          />
        ) : (
          <div className="no-quiz">
            <h3>No quiz selected</h3>
            <button onClick={() => setCurrentRoute(APP_ROUTES.DASHBOARD)}>
              Return to Dashboard
            </button>
          </div>
        );

      default:
        return (
          <div className="route-not-found">
            <h3>Page not found</h3>
            <button onClick={() => setCurrentRoute(APP_ROUTES.DASHBOARD)}>
              Go to Dashboard
            </button>
          </div>
        );
    }
  };

  // ============== MAIN RENDER - Day 1-7: All concepts combined ==============
  return (
    <ErrorBoundary>
      <div className={`app ${theme} ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Header Component - Day 1: Component composition */}
        <Header
          student={student}
          currentRoute={currentRoute}
          onRouteChange={handleRouteChange}
          onSidebarToggle={handleSidebarToggle}
          onThemeChange={handleThemeChange}
          currentTheme={theme}
          notifications={notifications}
          onNotificationRemove={removeNotification}
        />

        {/* Main Content Area */}
        <div className="app-content">
          {/* Sidebar Navigation - Day 2: Props và conditional rendering */}
          {sidebarOpen && (
            <Sidebar
              currentRoute={currentRoute}
              onRouteChange={handleRouteChange}
              studentStats={studentStats}
              enrolledCourses={enrolledCourses}
              courses={courses}
            />
          )}

          {/* Main Content - Day 6: Advanced conditional rendering */}
          <main className="main-content">
            {renderRouteContent()}
          </main>
        </div>

        {/* Footer Component - Day 1: Basic component */}
        <Footer />

        {/* Notifications Panel - Day 7: List rendering */}
        {notifications.length > 0 && (
          <div className="notifications-panel">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`notification ${notification.type}`}
                onClick={() => removeNotification(notification.id)}
              >
                <span className="notification-message">
                  {notification.message}
                </span>
                <button className="notification-close">×</button>
              </div>
            ))}
          </div>
        )}

        {/* Quiz Timer Overlay - Day 6: Conditional UI */}
        {currentQuiz && (
          <div className="quiz-timer-overlay">
            <div className="timer">
              ⏰ {Math.floor(currentQuiz.timeRemaining / 60)}:
              {String(currentQuiz.timeRemaining % 60).padStart(2, '0')}
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

// Export component - Day 1: Module exports
export default App;