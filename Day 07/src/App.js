// =============================================================================
// Day 7 - ADVANCED LISTS & KEYS DEMO với detailed comments
// =============================================================================
// File này minh họa các patterns nâng cao cho list rendering trong React
// Bao gồm: Virtual scrolling, Real-time updates, Drag & Drop, Performance optimization
// =============================================================================

import React, { useState, useCallback, useMemo } from 'react';
import './App.css';

// Import all demo components cho different advanced patterns
import ProductCatalog from './components/ProductCatalog';
import ChatApp from './components/ChatApp';
import VirtualDataTable from './components/VirtualDataTable';
import KanbanBoard from './components/KanbanBoard';
import SocialFeed from './components/SocialFeed';

// =============================================================================
// 1. NAVIGATION TABS COMPONENT
// =============================================================================
// Component này demo controlled components và dynamic tab rendering
function NavigationTabs({ activeTab, onTabChange }) {
  // ============== CONFIGURATION DATA ==============
  // Array chứa config cho từng tab với metadata
  const tabs = [
    { 
      id: 'catalog', 
      label: '🛍️ Product Catalog', 
      difficulty: '⭐⭐',
      description: 'Basic filtering & sorting với large datasets',
      concepts: ['Array methods', 'Search & Filter', 'Pagination']
    },
    { 
      id: 'chat', 
      label: '💬 Real-time Chat', 
      difficulty: '⭐⭐⭐',
      description: 'Dynamic list updates với real-time messaging',
      concepts: ['Dynamic arrays', 'Auto-scroll', 'Message grouping']
    },
    { 
      id: 'table', 
      label: '📊 Virtual Data Table', 
      difficulty: '⭐⭐⭐⭐',
      description: 'Performance optimization cho very large datasets',
      concepts: ['Virtual scrolling', 'Windowing', 'Memory management']
    },
    { 
      id: 'kanban', 
      label: '📋 Kanban Board', 
      difficulty: '⭐⭐⭐⭐',
      description: 'Drag & Drop với complex state management',
      concepts: ['Drag & Drop', 'Multi-list state', 'Optimistic updates']
    },
    { 
      id: 'social', 
      label: '📱 Social Feed', 
      difficulty: '⭐⭐⭐⭐⭐',
      description: 'Infinite scroll với complex interactions',
      concepts: ['Infinite scroll', 'Lazy loading', 'Social interactions']
    }
  ];

  // ============== MEMOIZED VALUES ==============
  // Memoize active tab info để tránh re-calculation
  const activeTabInfo = useMemo(() => {
    return tabs.find(tab => tab.id === activeTab);
  }, [tabs, activeTab]);

  // ============== EVENT HANDLERS ==============
  // Handler cho tab change với useCallback optimization
  const handleTabChange = useCallback((tabId) => {
    // Validate tab exists trước khi change
    const tabExists = tabs.some(tab => tab.id === tabId);
    if (tabExists) {
      onTabChange(tabId);
    }
  }, [tabs, onTabChange]);

  // ============== RENDER METHODS ==============
  // Method để render individual tab button
  const renderTabButton = useCallback((tab) => {
    // Check if tab is currently active
    const isActive = activeTab === tab.id;
    
    return (
      <button
        key={tab.id} // Key prop cho React optimization
        className={`tab-button ${isActive ? 'active' : ''}`}
        onClick={() => handleTabChange(tab.id)}
        aria-pressed={isActive} // Accessibility support
        role="tab" // Semantic HTML role
      >
        {/* Tab content layout */}
        <div className="tab-content">
          <span className="tab-label">{tab.label}</span>
          <span className="tab-difficulty">{tab.difficulty}</span>
        </div>
        
        {/* Conditional tooltip info - chỉ hiện khi hover */}
        <div className="tab-tooltip">
          <p className="tooltip-description">{tab.description}</p>
          <div className="tooltip-concepts">
            {/* Map qua concepts array để render tags */}
            {tab.concepts.map((concept, index) => (
              <span key={index} className="concept-tag">
                {concept}
              </span>
            ))}
          </div>
        </div>
      </button>
    );
  }, [activeTab, handleTabChange]);

  // ============== MAIN RENDER ==============
  return (
    <nav className="navigation-tabs" role="navigation">
      {/* Header section với current tab info */}
      <div className="nav-header">
        <h1>🚀 Day 7: Advanced Lists & Keys</h1>
        <p>Interactive demos showcasing complex list rendering patterns</p>
        
        {/* Current tab indicator với dynamic content */}
        {activeTabInfo && (
          <div className="current-tab-info">
            <span className="current-label">Đang xem: {activeTabInfo.label}</span>
            <span className="current-difficulty">{activeTabInfo.difficulty}</span>
          </div>
        )}
      </div>
      
      {/* Tab list với role attributes cho accessibility */}
      <div className="tab-list" role="tablist">
        {/* Map qua tabs array với render method */}
        {tabs.map(renderTabButton)}
      </div>
      
      {/* Active tab description panel */}
      {activeTabInfo && (
        <div className="tab-description-panel">
          <h3>{activeTabInfo.label}</h3>
          <p>{activeTabInfo.description}</p>
          
          {/* Concepts tags */}
          <div className="description-concepts">
            <strong>Concepts: </strong>
            {activeTabInfo.concepts.map((concept, index) => (
              <React.Fragment key={concept}>
                <span className="concept-highlight">{concept}</span>
                {/* Add comma separator nếu không phải item cuối */}
                {index < activeTabInfo.concepts.length - 1 && ', '}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// =============================================================================
// 2. MAIN APP COMPONENT
// =============================================================================
// Component chính để orchestrate tất cả advanced demos
function App() {
  // ============== STATE MANAGEMENT ==============
  // State để track active tab - controlled component pattern
  const [activeTab, setActiveTab] = useState('catalog');
  
  // State để track loading cho tab transitions
  const [isLoading, setIsLoading] = useState(false);
  
  // State để track performance metrics (educational purpose)
  const [performanceStats, setPerformanceStats] = useState({
    renderCount: 0,
    lastRenderTime: Date.now()
  });

  // ============== EFFECT HOOKS ==============
  // Effect để track component renders cho educational purpose
  React.useEffect(() => {
    setPerformanceStats(prev => ({
      renderCount: prev.renderCount + 1,
      lastRenderTime: Date.now()
    }));
  });

  // ============== EVENT HANDLERS ==============
  // Handler cho tab change với loading state
  const handleTabChange = useCallback(async (newTab) => {
    // Guard clause: không change nếu đã active
    if (newTab === activeTab) return;
    
    // Set loading state cho smooth transition
    setIsLoading(true);
    
    // Simulate component loading delay (thực tế có thể là lazy loading)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Update active tab
    setActiveTab(newTab);
    
    // Clear loading state
    setIsLoading(false);
    
    // Log tab change cho debugging
    console.log(`🔄 Tab changed from ${activeTab} to ${newTab}`);
  }, [activeTab]);

  // ============== RENDER METHODS ==============
  // Method để render active component based on current tab
  const renderActiveComponent = useCallback(() => {
    // Show loading state during transitions
    if (isLoading) {
      return (
        <div className="component-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải component...</p>
        </div>
      );
    }

    // Switch case để render appropriate component
    // Mỗi component demo một advanced list pattern khác nhau
    switch (activeTab) {
      case 'catalog':
        // ProductCatalog: Demo filtering, sorting, pagination với large datasets
        return <ProductCatalog />;
        
      case 'chat':
        // ChatApp: Demo real-time list updates và auto-scrolling
        return <ChatApp />;
        
      case 'table':
        // VirtualDataTable: Demo virtual scrolling cho performance
        return <VirtualDataTable />;
        
      case 'kanban':
        // KanbanBoard: Demo drag & drop với complex state management
        return <KanbanBoard />;
        
      case 'social':
        // SocialFeed: Demo infinite scroll và lazy loading
        return <SocialFeed />;
        
      default:
        // Fallback component nếu tab không hợp lệ
        return (
          <div className="component-error">
            <h2>❌ Component không tìm thấy</h2>
            <p>Tab "{activeTab}" không có component tương ứng.</p>
            <button onClick={() => setActiveTab('catalog')}>
              Quay về Product Catalog
            </button>
          </div>
        );
    }
  }, [activeTab, isLoading]);

  // ============== MAIN RENDER ==============
  return (
    <div className="app">
      {/* Navigation tabs với tab management */}
      <NavigationTabs 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
      />
      
      {/* Main content area với dynamic component rendering */}
      <main className="main-content">
        {/* Content wrapper với loading states */}
        <div className={`content-wrapper ${isLoading ? 'loading' : ''}`}>
          {renderActiveComponent()}
        </div>
        
        {/* Performance info panel (educational purpose) */}
        <div className="performance-info">
          <details>
            <summary>📊 Performance Info (Educational)</summary>
            <div className="performance-details">
              <p><strong>Render Count:</strong> {performanceStats.renderCount}</p>
              <p><strong>Last Render:</strong> {new Date(performanceStats.lastRenderTime).toLocaleTimeString()}</p>
              <p><strong>Active Component:</strong> {activeTab}</p>
              <p><strong>Loading State:</strong> {isLoading ? 'Yes' : 'No'}</p>
            </div>
          </details>
        </div>
      </main>
      
      {/* Footer với key learning points */}
      <footer className="app-footer">
        <div className="footer-content">
          <h3>🎯 Day 7 Key Concepts</h3>
          <div className="concept-grid">
            <div className="concept-item">
              <h4>🔄 Dynamic Lists</h4>
              <p>Real-time updates và state synchronization</p>
            </div>
            <div className="concept-item">
              <h4>⚡ Performance</h4>
              <p>Virtual scrolling và memory optimization</p>
            </div>
            <div className="concept-item">
              <h4>🎨 Interactions</h4>
              <p>Drag & Drop và complex user interactions</p>
            </div>
            <div className="concept-item">
              <h4>♾️ Infinite Data</h4>
              <p>Pagination và lazy loading strategies</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// =============================================================================
// EXPORT DEFAULT COMPONENT
// =============================================================================
export default App;

// =============================================================================
// KẾT THÚC COMPONENT - Key Learning Points:
// =============================================================================
// 1. ADVANCED PATTERNS: Tab management với dynamic component loading
// 2. PERFORMANCE: Loading states và render optimization
// 3. COMPONENT COMPOSITION: Multiple complex components working together
// 4. STATE MANAGEMENT: Complex state flow và event handling
// 5. ACCESSIBILITY: ARIA attributes và semantic HTML
// 6. DEBUGGING: Performance tracking và development aids
// =============================================================================