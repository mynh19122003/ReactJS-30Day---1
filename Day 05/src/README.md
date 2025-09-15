# Day 5 - Event Handling Examples

Các file code mẫu cho ngày 5 về Event Handling trong React:

## Cấu trúc thư mục

```
src/
├── App.js                    # Component chính
└── EventHandlingDemo.js      # Demo comprehensive event handling
```

## Cách chạy code

1. **Khởi tạo project React mới:**

```bash
npx create-react-app day05-demo
cd day05-demo
```

2. **Copy các file từ thư mục src/ này vào project:**

   - Thay thế nội dung file `src/App.js`
   - Copy `EventHandlingDemo.js` vào thư mục src

3. **Chạy ứng dụng:**

```bash
npm start
```

## Tính năng demo

### 1. Interactive Buttons Gallery

**Event patterns được demonstrate:**

- **Single vs Double Click** - Phân biệt single và double click events
- **Context Menu** - Custom right-click menu với positioning
- **Hover Timer** - Measure hover duration với real-time feedback
- **Keyboard Activation** - Space/Enter key handling với focus management

**Code patterns quan trọng:**

```javascript
// Single vs Double Click Pattern
const handleSingleClick = () => {
  if (clickTimeoutRef.current) {
    clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = null;
    handleDoubleClick(); // Double click detected
  } else {
    clickTimeoutRef.current = setTimeout(() => {
      // Single click action
      setClickCount((prev) => prev + 1);
      clickTimeoutRef.current = null;
    }, 300);
  }
};

// Context Menu Pattern
const handleContextMenu = (e) => {
  e.preventDefault();
  setContextMenuPos({ x: e.clientX, y: e.clientY });
  setContextMenuVisible(true);
};

// Hover Timer Pattern
const handleHoverEnter = () => {
  setHoverStartTime(Date.now());
};

const handleHoverLeave = () => {
  if (hoverStartTime) {
    setHoverDuration(Date.now() - hoverStartTime);
    setHoverStartTime(null);
  }
};
```

### 2. Keyboard Event Laboratory

**Features:**

- **Key History Tracking** - Log all keystrokes với metadata
- **Keyboard Shortcuts** - Ctrl+S, Ctrl+Z, Escape handling
- **Modifier Keys** - Detect Ctrl, Shift, Alt combinations
- **Event Prevention** - Prevent browser defaults

**Advanced keyboard handling:**

```javascript
const handleKeyDown = (e) => {
  const keyInfo = {
    key: e.key,
    code: e.code,
    ctrlKey: e.ctrlKey,
    shiftKey: e.shiftKey,
    altKey: e.altKey,
    timestamp: Date.now(),
  };

  // Shortcut handling
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    // Handle save action
    return;
  }

  if (e.key === "Escape") {
    // Handle escape action
    setInput("");
    return;
  }

  // Log normal key presses
  setKeyHistory((prev) => [...prev.slice(-9), keyInfo]);
};
```

### 3. Advanced Form Handling

**Event patterns:**

- **Real-time Validation** - onChange validation với debouncing
- **Focus/Blur Effects** - Visual feedback và validation triggers
- **Form Submission** - preventDefault và data handling
- **Field State Management** - Individual field focus tracking

**Form validation pattern:**

```javascript
const validateField = (name, value) => {
  switch (name) {
    case "username":
      return value.length < 3 ? "Username must be at least 3 characters" : "";
    case "email":
      return !/\S+@\S+\.\S+/.test(value) ? "Invalid email format" : "";
    case "password":
      return value.length < 8 ? "Password must be at least 8 characters" : "";
    default:
      return "";
  }
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));

  const error = validateField(name, value);
  setErrors((prev) => ({ ...prev, [name]: error }));
};
```

### 4. Performance Optimization Demos

**Optimization techniques:**

- **Debounced Search** - Reduce API calls với 300ms delay
- **Throttled Scroll** - Limit scroll event frequency
- **Event Listener Cleanup** - Proper cleanup trong useEffect

**Debouncing implementation:**

```javascript
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

// Usage in component
const debouncedSearch = useCallback(
  debounce((term) => {
    const mockResults = term
      ? Array.from({ length: 5 }, (_, i) => `${term} result ${i + 1}`)
      : [];
    setResults(mockResults);
  }, 300),
  []
);
```

**Throttling implementation:**

```javascript
function throttle(func, wait) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
}

// Throttled scroll handler
const throttledScroll = useCallback(
  throttle(() => {
    setScrollY(window.scrollY);
  }, 100),
  []
);
```

### 5. Custom Event System

**Features:**

- **Event Emitter Pattern** - Custom notification system
- **Auto-cleanup** - Notifications tự động disappear sau 3s
- **Event Types** - Success, warning, error notifications
- **Real-time Updates** - Dynamic notification management

**Custom event pattern:**

```javascript
const emitNotification = (type, message) => {
  const notification = {
    id: Date.now(),
    type,
    message,
    timestamp: new Date().toLocaleTimeString(),
  };

  setNotifications((prev) => [...prev, notification]);

  // Auto remove after 3 seconds
  setTimeout(() => {
    setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
  }, 3000);
};
```

## Event Handling Best Practices học được

### 1. **Event Handler Optimization**

```javascript
// ❌ BAD: Creates new function every render
<button onClick={() => handleClick(id)}>Click</button>

// ✅ GOOD: Use data attributes
<button data-id={id} onClick={handleClickByData}>Click</button>

// ✅ GOOD: Use currying
<button onClick={handleClickCurried(id)}>Click</button>
```

### 2. **Performance Patterns**

- **Debouncing** cho search inputs (300-500ms)
- **Throttling** cho scroll/resize events (100ms)
- **Event delegation** cho large lists
- **Proper cleanup** với useEffect

### 3. **Keyboard Accessibility**

- Support Space và Enter cho custom buttons
- Tab navigation với proper focus management
- Escape key để cancel operations
- Keyboard shortcuts cho power users

### 4. **Form Event Handling**

- Real-time validation với debouncing
- Focus/blur visual feedback
- preventDefault cho form submissions
- Proper error state management

### 5. **Advanced Patterns**

- Context menus với positioning
- Single vs double click distinction
- Hover timers và interactions
- Custom event systems

## Common Pitfalls tránh được

### ❌ Avoid:

- Inline functions trong JSX (performance issue)
- Quên preventDefault() trong forms
- Memory leaks từ event listeners
- Over-triggering events (cần debounce/throttle)

### ✅ Best Practices:

- Use useCallback cho event handlers
- Cleanup event listeners trong useEffect
- Implement proper error handling
- Test keyboard accessibility
- Optimize performance với throttling/debouncing

## Bài tập mở rộng

1. **Advanced Todo App:**

   - Drag & drop reordering
   - Bulk operations với keyboard shortcuts
   - Inline editing với double-click
   - Search với highlighting

2. **Game Controller:**

   - WASD movement controls
   - Mouse tracking với smooth animations
   - Touch events cho mobile
   - Game state management

3. **Form Builder:**

   - Dynamic form generation
   - Conditional field visibility
   - File upload với drag & drop
   - Advanced validation rules

4. **Performance Monitor:**
   - Real-time event frequency tracking
   - Memory usage monitoring
   - FPS counter cho animations
   - Event listener audit tool

Hãy thử customize các demos và thêm features mới!
