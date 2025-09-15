import React, { useState, useCallback, useRef, useEffect } from 'react';

function EventHandlingDemo() {
  const [activeDemo, setActiveDemo] = useState('buttons');

  const demos = [
    { id: 'buttons', title: '🔘 Interactive Buttons', component: InteractiveButtons },
    { id: 'keyboard', title: '⌨️ Keyboard Events', component: KeyboardDemo },
    { id: 'forms', title: '📝 Advanced Forms', component: AdvancedForms },
    { id: 'performance', title: '⚡ Performance Optimization', component: PerformanceDemo },
    { id: 'custom', title: '🎯 Custom Events', component: CustomEventDemo }
  ];

  const ActiveComponent = demos.find(demo => demo.id === activeDemo)?.component;

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h1 style={{ textAlign: 'center', color: '#333', margin: 0 }}>
          Day 5 - Event Handling Mastery
        </h1>
        <p style={{ textAlign: 'center', color: '#666', marginTop: '10px' }}>
          Interactive demos showcasing React event handling patterns
        </p>
      </header>

      {/* Navigation */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 30px', 
        padding: '0 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {demos.map(demo => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              style={{
                padding: '15px',
                backgroundColor: activeDemo === demo.id ? '#007bff' : 'white',
                color: activeDemo === demo.id ? 'white' : '#333',
                border: '2px solid #007bff',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
            >
              {demo.title}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {ActiveComponent && <ActiveComponent />}
      </main>
    </div>
  );
}

// Demo 1: Interactive Buttons
function InteractiveButtons() {
  const [clickCount, setClickCount] = useState(0);
  const [doubleClickCount, setDoubleClickCount] = useState(0);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [hoverStartTime, setHoverStartTime] = useState(null);
  const [hoverDuration, setHoverDuration] = useState(0);
  const [keyPresses, setKeyPresses] = useState([]);

  const clickTimeoutRef = useRef(null);

  const handleSingleClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      handleDoubleClick();
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(prev => prev + 1);
        clickTimeoutRef.current = null;
      }, 300);
    }
  };

  const handleDoubleClick = () => {
    setDoubleClickCount(prev => prev + 1);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setContextMenuVisible(true);
  };

  const handleHoverEnter = () => {
    setHoverStartTime(Date.now());
  };

  const handleHoverLeave = () => {
    if (hoverStartTime) {
      setHoverDuration(Date.now() - hoverStartTime);
      setHoverStartTime(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      setKeyPresses(prev => [...prev.slice(-4), {
        key: e.code,
        time: new Date().toLocaleTimeString()
      }]);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
      <h2 style={{ marginBottom: '30px', color: '#333' }}>🔘 Interactive Button Gallery</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {/* Click Counter */}
        <div style={{ padding: '20px', border: '2px solid #e9ecef', borderRadius: '8px' }}>
          <h3>Single Click Counter</h3>
          <button
            onClick={handleSingleClick}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '10px'
            }}
          >
            Click me! (Count: {clickCount})
          </button>
        </div>

        {/* Double Click */}
        <div style={{ padding: '20px', border: '2px solid #e9ecef', borderRadius: '8px' }}>
          <h3>Double Click Handler</h3>
          <button
            onClick={handleSingleClick}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '10px'
            }}
          >
            Double Click! (Count: {doubleClickCount})
          </button>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            Single clicks count normally, double clicks count separately
          </p>
        </div>

        {/* Right Click Menu */}
        <div style={{ padding: '20px', border: '2px solid #e9ecef', borderRadius: '8px', position: 'relative' }}>
          <h3>Right Click Menu</h3>
          <button
            onContextMenu={handleContextMenu}
            style={{
              padding: '12px 24px',
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '10px'
            }}
          >
            Right click me!
          </button>
          
          {contextMenuVisible && (
            <div
              style={{
                position: 'fixed',
                left: contextMenuPos.x,
                top: contextMenuPos.y,
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 1000,
                minWidth: '150px'
              }}
              onClick={() => setContextMenuVisible(false)}
            >
              <div style={{ padding: '8px 12px', cursor: 'pointer' }} onClick={() => alert('Option 1')}>
                Option 1
              </div>
              <div style={{ padding: '8px 12px', cursor: 'pointer' }} onClick={() => alert('Option 2')}>
                Option 2
              </div>
              <div style={{ padding: '8px 12px', cursor: 'pointer' }} onClick={() => alert('Option 3')}>
                Option 3
              </div>
            </div>
          )}
        </div>

        {/* Hover Timer */}
        <div style={{ padding: '20px', border: '2px solid #e9ecef', borderRadius: '8px' }}>
          <h3>Hover Timer</h3>
          <button
            onMouseEnter={handleHoverEnter}
            onMouseLeave={handleHoverLeave}
            style={{
              padding: '12px 24px',
              backgroundColor: hoverStartTime ? '#dc3545' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '10px',
              transition: 'background-color 0.2s'
            }}
          >
            Hover over me!
          </button>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>
            {hoverStartTime 
              ? '⏱️ Hovering...' 
              : `Last hover: ${hoverDuration}ms`
            }
          </p>
        </div>

        {/* Keyboard Activated */}
        <div style={{ padding: '20px', border: '2px solid #e9ecef', borderRadius: '8px' }}>
          <h3>Keyboard Activated</h3>
          <button
            onKeyDown={handleKeyPress}
            tabIndex={0}
            style={{
              padding: '12px 24px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '10px'
            }}
          >
            Focus & press Space/Enter
          </button>
          <div style={{ marginTop: '10px' }}>
            {keyPresses.slice(-3).map((press, index) => (
              <div key={index} style={{ fontSize: '12px', color: '#666' }}>
                {press.key} at {press.time}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Click outside to close context menu */}
      {contextMenuVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setContextMenuVisible(false)}
        />
      )}
    </div>
  );
}

// Demo 2: Keyboard Events
function KeyboardDemo() {
  const [input, setInput] = useState('');
  const [keyHistory, setKeyHistory] = useState([]);
  const [shortcuts, setShortcuts] = useState([]);

  const handleKeyDown = (e) => {
    const keyInfo = {
      key: e.key,
      code: e.code,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
      timestamp: Date.now()
    };

    // Handle shortcuts
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      setShortcuts(prev => [...prev, 'Ctrl+S: Save triggered!']);
      return;
    }

    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault();
      setShortcuts(prev => [...prev, 'Ctrl+Z: Undo triggered!']);
      return;
    }

    if (e.key === 'Escape') {
      setInput('');
      setShortcuts(prev => [...prev, 'Escape: Input cleared!']);
      return;
    }

    // Log key press
    setKeyHistory(prev => [...prev.slice(-9), keyInfo]);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
      <h2 style={{ marginBottom: '30px', color: '#333' }}>⌨️ Keyboard Event Laboratory</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          <h3>Interactive Input</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type here... Try Ctrl+S, Ctrl+Z, Escape"
            style={{
              width: '100%',
              height: '150px',
              padding: '15px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '6px',
              resize: 'vertical'
            }}
          />
          
          <div style={{ marginTop: '15px' }}>
            <h4>Shortcuts Available:</h4>
            <ul style={{ fontSize: '14px', color: '#666' }}>
              <li>Ctrl+S - Save (prevented)</li>
              <li>Ctrl+Z - Undo</li>
              <li>Escape - Clear input</li>
            </ul>
          </div>
        </div>

        <div>
          <h3>Key Press History</h3>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '6px',
            height: '200px',
            overflow: 'auto',
            fontSize: '14px'
          }}>
            {keyHistory.map((keyInfo, index) => (
              <div key={index} style={{
                padding: '5px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>
                  <strong>{keyInfo.key}</strong>
                  {keyInfo.ctrlKey && ' + Ctrl'}
                  {keyInfo.shiftKey && ' + Shift'}
                  {keyInfo.altKey && ' + Alt'}
                </span>
                <span style={{ color: '#666' }}>
                  {keyInfo.code}
                </span>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: '20px' }}>Shortcut Log</h3>
          <div style={{
            backgroundColor: '#e8f5e8',
            padding: '15px',
            borderRadius: '6px',
            height: '100px',
            overflow: 'auto',
            fontSize: '14px'
          }}>
            {shortcuts.slice(-5).map((shortcut, index) => (
              <div key={index} style={{ padding: '2px 0' }}>
                {shortcut}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo 3: Advanced Forms (simplified for space)
function AdvancedForms() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        return value.length < 3 ? 'Username must be at least 3 characters' : '';
      case 'email':
        return !/\S+@\S+\.\S+/.test(value) ? 'Invalid email format' : '';
      case 'password':
        return value.length < 8 ? 'Password must be at least 8 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! Check console for data.');
    console.log('Form data:', formData);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
      <h2 style={{ marginBottom: '30px', color: '#333' }}>📝 Advanced Form Handling</h2>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        {Object.keys(formData).map(field => (
          <div key={field} style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onFocus={() => setFocusedField(field)}
              onBlur={() => setFocusedField(null)}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${
                  errors[field] ? '#dc3545' : 
                  focusedField === field ? '#007bff' : '#ddd'
                }`,
                borderRadius: '6px',
                fontSize: '16px',
                transition: 'border-color 0.2s'
              }}
            />
            {errors[field] && (
              <span style={{ color: '#dc3545', fontSize: '14px' }}>
                {errors[field]}
              </span>
            )}
          </div>
        ))}
        
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Submit Form
        </button>
      </form>
    </div>
  );
}

// Demo 4: Performance Optimization
function PerformanceDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((term) => {
      const mockResults = term 
        ? Array.from({ length: 5 }, (_, i) => `${term} result ${i + 1}`)
        : [];
      setResults(mockResults);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // Throttled scroll
  const throttledScroll = useCallback(
    throttle(() => {
      setScrollY(window.scrollY);
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [throttledScroll]);

  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
      <h2 style={{ marginBottom: '30px', color: '#333' }}>⚡ Performance Optimization Demos</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          <h3>Debounced Search</h3>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search... (300ms delay)"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          />
          <div style={{ marginTop: '15px' }}>
            {results.map((result, index) => (
              <div key={index} style={{
                padding: '8px',
                backgroundColor: '#f8f9fa',
                margin: '4px 0',
                borderRadius: '4px'
              }}>
                {result}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3>Scroll Position (Throttled)</h3>
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {Math.round(scrollY)}px
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Scroll Y Position (Updated every 100ms)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo 5: Custom Events
function CustomEventDemo() {
  const [notifications, setNotifications] = useState([]);

  const emitNotification = (type, message) => {
    const notification = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
      <h2 style={{ marginBottom: '30px', color: '#333' }}>🎯 Custom Event System</h2>
      
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <button
          onClick={() => emitNotification('success', 'Success notification!')}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Success Event
        </button>
        <button
          onClick={() => emitNotification('warning', 'Warning notification!')}
          style={{
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Warning Event
        </button>
        <button
          onClick={() => emitNotification('error', 'Error notification!')}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Error Event
        </button>
      </div>

      {/* Notification Container */}
      <div style={{ position: 'relative', minHeight: '200px' }}>
        {notifications.map(notification => (
          <div
            key={notification.id}
            style={{
              backgroundColor: 
                notification.type === 'success' ? '#d4edda' :
                notification.type === 'warning' ? '#fff3cd' : '#f8d7da',
              color:
                notification.type === 'success' ? '#155724' :
                notification.type === 'warning' ? '#856404' : '#721c24',
              padding: '12px',
              margin: '8px 0',
              borderRadius: '6px',
              border: '1px solid',
              borderColor:
                notification.type === 'success' ? '#c3e6cb' :
                notification.type === 'warning' ? '#ffeaa7' : '#f5c6cb'
            }}
          >
            <strong>{notification.type.toUpperCase()}</strong>: {notification.message}
            <br />
            <small>{notification.timestamp}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, wait) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, wait);
    }
  };
}

export default EventHandlingDemo;