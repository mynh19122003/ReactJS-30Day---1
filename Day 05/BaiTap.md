# Day 5: Bài tập Event Handling

## 🎯 Tổng quan bài tập

Hôm nay bạn sẽ thực hành xử lý sự kiện trong React thông qua 5 bài tập từ cơ bản đến nâng cao, giúp bạn nắm vững các patterns quan trọng.

---

## 📝 Bài tập 1: Interactive Button Gallery (⭐⭐)

Tạo một gallery các button với different event handling patterns:

### 🎯 Yêu cầu:

1. **Click Counter Button** - Đếm số lần click
2. **Double Click Button** - Chỉ phản hồi double click, ignore single click
3. **Right Click Menu** - Custom context menu với options
4. **Hover Timer Button** - Đo thời gian hover, hiển thị progress bar
5. **Keyboard Activated Button** - Space/Enter để activate

### 💡 Implementation Hints:

```javascript
// Double click handler với timeout
const [clickTimeout, setClickTimeout] = useState(null);

const handleClick = () => {
  if (clickTimeout) {
    clearTimeout(clickTimeout);
    setClickTimeout(null);
    // Handle double click
  } else {
    const timeout = setTimeout(() => {
      // Handle single click
      setClickTimeout(null);
    }, 300);
    setClickTimeout(timeout);
  }
};

// Hover timer
const [hoverStartTime, setHoverStartTime] = useState(null);
const [hoverDuration, setHoverDuration] = useState(0);

const handleMouseEnter = () => {
  setHoverStartTime(Date.now());
};

const handleMouseLeave = () => {
  if (hoverStartTime) {
    setHoverDuration(Date.now() - hoverStartTime);
  }
};
```

### ✅ Expected Output:

- 5 different buttons với unique behaviors
- Visual feedback cho mỗi interaction
- Real-time statistics (clicks, hover times, etc.)
- Responsive design với hover effects

---

## 📝 Bài tập 2: Advanced Registration Form (⭐⭐⭐)

Tạo form đăng ký với comprehensive event handling và real-time validation:

### 🎯 Yêu cầu chính:

1. **Real-time validation** khi user typing
2. **Focus/Blur effects** với visual feedback
3. **Keyboard shortcuts** (Enter, Escape, Tab navigation)
4. **Auto-save draft** mỗi 3 giây
5. **Password strength indicator** với realtime updates
6. **Copy/Paste detection** và handling

### 📋 Form Fields:

```javascript
const formSchema = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
    blacklist: ["admin", "root", "user"], // Forbidden usernames
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    asyncValidation: true, // Check email exists (simulate API)
  },
  password: {
    required: true,
    minLength: 8,
    requirements: {
      lowercase: /[a-z]/,
      uppercase: /[A-Z]/,
      number: /\d/,
      symbol: /[!@#$%^&*(),.?":{}|<>]/,
    },
  },
  confirmPassword: {
    required: true,
    mustMatch: "password",
  },
  phone: {
    required: false,
    pattern: /^(\+84|0)[0-9]{9,10}$/,
    formatter: true, // Auto format phone number
  },
  birthDate: {
    required: true,
    minAge: 13,
    maxAge: 120,
  },
  terms: {
    required: true,
    type: "boolean",
  },
};
```

### 🎨 Advanced Features:

```javascript
// Auto-save với debouncing
const useAutoSave = (data, delay = 3000) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("form-draft", JSON.stringify(data));
      console.log("Auto-saved:", new Date().toLocaleTimeString());
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [data, delay]);
};

// Password strength calculator
const calculatePasswordStrength = (password) => {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    noCommon: !["password", "12345678", "qwerty"].includes(
      password.toLowerCase()
    ),
  };

  score = Object.values(checks).filter(Boolean).length;

  return {
    score,
    strength: score < 3 ? "weak" : score < 5 ? "medium" : "strong",
    checks,
  };
};
```

### ✅ Expected Output:

- Form với 7 fields và comprehensive validation
- Real-time feedback cho tất cả fields
- Password strength indicator với visual progress
- Auto-save functionality với notifications
- Keyboard navigation và shortcuts
- Mobile-friendly design

---

## 📝 Bài tập 3: Interactive Todo List with Advanced Events (⭐⭐⭐)

Tạo todo app với advanced event handling patterns:

### 🎯 Core Features:

1. **Add todos** với Enter key hoặc click
2. **Edit todos** với double-click to edit mode
3. **Delete todos** với confirmation modal
4. **Drag & Drop reordering** (bonus)
5. **Bulk operations** (select multiple, delete all)
6. **Keyboard shortcuts** cho power users

### ⌨️ Keyboard Shortcuts:

```javascript
const shortcuts = {
  "Ctrl+N": "Add new todo",
  "Ctrl+A": "Select all todos",
  Delete: "Delete selected todos",
  Escape: "Cancel current operation",
  Enter: "Confirm edit/add",
  "Ctrl+Z": "Undo last action",
  "Ctrl+F": "Focus search",
};
```

### 🎨 Event Patterns:

```javascript
// Keyboard shortcut handler
const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = `${e.ctrlKey ? "Ctrl+" : ""}${e.shiftKey ? "Shift+" : ""}${
        e.key
      }`;

      if (shortcuts[key]) {
        e.preventDefault();
        shortcuts[key]();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
};

// Double-click to edit pattern
const [editingId, setEditingId] = useState(null);
const [editValue, setEditValue] = useState("");

const handleDoubleClick = (todo) => {
  setEditingId(todo.id);
  setEditValue(todo.text);
};

const handleEditSubmit = (e) => {
  if (e.key === "Enter") {
    // Save edit
    updateTodo(editingId, editValue);
    setEditingId(null);
  } else if (e.key === "Escape") {
    // Cancel edit
    setEditingId(null);
  }
};
```

### ✅ Expected Output:

- Fully functional todo app với all basic operations
- Advanced keyboard navigation
- Visual feedback cho all interactions
- Bulk selection với checkboxes
- Search/filter functionality
- Undo/Redo functionality (bonus)

---

## 📝 Bài tập 4: Event Performance Laboratory (⭐⭐⭐⭐)

Tạo một lab để test và demonstrate event performance optimization:

### 🎯 Components to Build:

1. **Debounced Search** với search suggestions
2. **Throttled Scroll** với infinite loading
3. **Optimized List** với virtual scrolling
4. **Mouse Tracker** với performance metrics
5. **Event Delegation** demo với 1000+ items

### 🔬 Performance Tests:

```javascript
// Performance monitor component
const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    renders: 0,
    eventsFired: 0,
    memoryUsage: 0,
    fps: 0,
  });

  // Performance measurement hooks
  const measurePerformance = useCallback(() => {
    const start = performance.now();

    return () => {
      const end = performance.now();
      console.log(`Operation took ${end - start} milliseconds`);
    };
  }, []);

  // Memory usage tracking
  useEffect(() => {
    const interval = setInterval(() => {
      if (performance.memory) {
        setMetrics((prev) => ({
          ...prev,
          memoryUsage: Math.round(
            performance.memory.usedJSHeapSize / 1024 / 1024
          ),
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
};
```

### 🎨 Optimization Techniques:

```javascript
// Debounced search với cache
const useSearchWithCache = (delay = 300) => {
  const [cache, setCache] = useState(new Map());
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (cache.has(query)) {
        return cache.get(query);
      }

      setIsLoading(true);
      try {
        const results = await searchAPI(query);
        setCache((prev) => new Map(prev).set(query, results));
        return results;
      } finally {
        setIsLoading(false);
      }
    }, delay),
    [cache, delay]
  );

  return { debouncedSearch, isLoading, cache };
};

// Virtual scrolling implementation
const VirtualList = ({ items, itemHeight, containerHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: "relative" }}>
        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: "absolute",
              top: (startIndex + index) * itemHeight,
              height: itemHeight,
              width: "100%",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### ✅ Expected Output:

- Performance comparison dashboard
- Real-time metrics display
- Before/after optimization demos
- Memory usage tracking
- FPS counter cho smooth animations

---

## 📝 Bài tập 5: Custom Event System (⭐⭐⭐⭐⭐)

Tạo một custom event system với pub/sub pattern:

### 🎯 Architecture:

```javascript
// Event Bus implementation
class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);

    // Return unsubscribe function
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    };
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => callback(data));
    }
  }

  once(eventName, callback) {
    const unsubscribe = this.subscribe(eventName, (data) => {
      callback(data);
      unsubscribe();
    });
    return unsubscribe;
  }
}

// React Hook for EventBus
const useEventBus = () => {
  const eventBus = useRef(new EventBus()).current;

  const subscribe = useCallback(
    (eventName, callback) => {
      return eventBus.subscribe(eventName, callback);
    },
    [eventBus]
  );

  const emit = useCallback(
    (eventName, data) => {
      eventBus.emit(eventName, data);
    },
    [eventBus]
  );

  return { subscribe, emit };
};
```

### 🎨 Implementation Features:

1. **Global notification system**
2. **Cross-component communication**
3. **Event logging và debugging**
4. **Event middleware** (validation, transformation)
5. **Event replay** cho debugging

### ✅ Expected Output:

- Working pub/sub system
- Multiple components communicating
- Event inspector/debugger
- Performance monitoring
- Real-world use cases demo

---

## 🎯 Submission Checklist

### Bài tập 1: ✅ Hoàn thành khi:

- [ ] 5 buttons với different event types
- [ ] Visual feedback cho all interactions
- [ ] Clean, reusable code structure

### Bài tập 2: ✅ Hoàn thành khi:

- [ ] 7 form fields với comprehensive validation
- [ ] Real-time feedback và error handling
- [ ] Auto-save functionality
- [ ] Keyboard shortcuts working

### Bài tập 3: ✅ Hoàn thành khi:

- [ ] Full CRUD operations
- [ ] Keyboard shortcuts implemented
- [ ] Edit mode với double-click
- [ ] Search/filter functionality

### Bài tập 4: ✅ Hoàn thành khi:

- [ ] Performance comparisons working
- [ ] Debouncing/throttling implemented
- [ ] Virtual scrolling demo
- [ ] Metrics dashboard

### Bài tập 5: ✅ Hoàn thành khi:

- [ ] Custom EventBus working
- [ ] Cross-component communication
- [ ] Event debugging tools
- [ ] Real-world examples

---

## 💡 Tips & Best Practices

### Performance Tips:

- Sử dụng `useCallback` cho event handlers
- Implement debouncing cho search inputs
- Use throttling cho scroll/resize events
- Consider event delegation cho large lists

### Code Organization:

- Tách event handlers thành separate functions
- Use custom hooks cho reusable event logic
- Implement error boundaries cho event errors
- Add proper TypeScript types

### Testing:

- Test all keyboard shortcuts
- Verify form validation edge cases
- Check performance với large datasets
- Test mobile touch events

**Deadline:** Hoàn thành tất cả bài tập trong 2 ngày
**Difficulty:** ⭐⭐⭐ (Intermediate to Advanced)
**Time estimate:** 6-8 hours total
phone: {
pattern: /^[0-9]{10,11}$/,
},
birthDate: {
required: true,
minAge: 13,
},
};

````

## Bài tập 3: Interactive Game - Simon Says

Tạo game Simon Says với event handling:

### Luật chơi:

- 4 nút màu: Đỏ, Xanh lá, Xanh dương, Vàng
- Máy hiển thị sequence màu
- Player phải click theo đúng thứ tự
- Mỗi level thêm 1 màu mới

### Events cần xử lý:

- Click buttons để chơi
- Keyboard: 1,2,3,4 tương ứng với 4 màu
- Mouse hover effects
- Touch events (mobile friendly)
- Start/Pause/Reset game

### State Management:

```javascript
const gameState = {
  sequence: [], // Sequence máy tạo
  playerSequence: [], // Sequence player nhập
  currentLevel: 1,
  gameStatus: "idle", // idle, playing, gameover
  score: 0,
  highScore: 0,
  isShowingSequence: false,
};
````

## Bài tập 4: Dynamic List với Event Delegation

Tạo Todo List sử dụng event delegation:

### Chức năng:

- Thêm todo (Enter hoặc click button)
- Edit todo (double click)
- Delete todo (click delete button)
- Toggle complete (click checkbox)
- Drag & drop để reorder
- Bulk actions (select multiple, delete selected)

### Event Delegation:

- Một event handler cho toàn bộ list
- Sử dụng data attributes để xác định action
- Handle multiple event types (click, dblclick, keydown)

```jsx
const handleListEvent = (event) => {
  const { target } = event;
  const action = target.dataset.action;
  const todoId = target.dataset.todoId;

  switch (action) {
    case "toggle":
      // Toggle todo
      break;
    case "delete":
      // Delete todo
      break;
    case "edit":
      // Start editing
      break;
    // ... other actions
  }
};
```

## Bài tập 5: File Upload với Events

Tạo component upload file với các event:

### Events:

- **Drop events:** Drag & drop file vào area
- **File change:** Select file từ input
- **Progress events:** Hiển thị progress upload (fake)
- **Error handling:** Validate file type, size
- **Preview:** Hiển thị preview image

### Features:

- Multiple file support
- Drag & drop visual feedback
- File type validation (image, pdf, doc)
- File size limit (5MB)
- Upload progress simulation
- Remove uploaded files

## Bài tập 6: Search với Advanced Events

Tạo search component nâng cao:

### Features:

- **Debounced search:** Delay search khi user ngừng gõ
- **Autocomplete:** Hiển thị suggestions
- **Keyboard navigation:** Up/Down để chọn suggestion, Enter để select
- **Click outside:** Đóng suggestions khi click bên ngoài
- **Search history:** Lưu và hiển thị lịch sử tìm kiếm
- **Clear search:** X button để xóa

### Events:

```javascript
const searchEvents = {
  onInputChange: (value) => {},
  onSearch: (query) => {},
  onSuggestionSelect: (suggestion) => {},
  onHistorySelect: (historyItem) => {},
  onClear: () => {},
  onFocus: () => {},
  onBlur: () => {},
};
```

## Bài tập 7: Interactive Canvas Drawing

Tạo ứng dụng vẽ đơn giản:

### Events:

- **Mouse events:** mousedown, mousemove, mouseup
- **Touch events:** Hỗ trợ mobile
- **Keyboard shortcuts:**
  - C: Clear canvas
  - Z: Undo
  - S: Save image

### Features:

- Brush size adjustment
- Color picker
- Eraser tool
- Undo/Redo
- Save drawing as image
- Load background image

### State:

```javascript
const drawingState = {
  isDrawing: false,
  tool: "brush", // brush, eraser
  brushSize: 5,
  color: "#000000",
  paths: [], // Array of drawing paths
  currentPath: [],
};
```

## Bài tập 8: Modal với Event Handling

Tạo Modal component với đầy đủ events:

### Events:

- **Keyboard:** ESC để đóng modal
- **Click outside:** Click overlay để đóng
- **Focus trap:** Tab chỉ di chuyển trong modal
- **Prevent scroll:** Không scroll background khi modal mở

### Features:

- Confirm dialog
- Form modal
- Image gallery modal
- Nested modals
- Animation open/close

## Kiểm tra kiến thức

1. ✅ Tôi hiểu SyntheticEvent trong React
2. ✅ Tôi biết cách xử lý các loại event khác nhau
3. ✅ Tôi có thể truyền tham số cho event handlers
4. ✅ Tôi hiểu về event delegation
5. ✅ Tôi biết khi nào dùng preventDefault() và stopPropagation()
6. ✅ Tôi có thể xử lý form events hiệu quả
7. ✅ Tôi biết tối ưu hóa event handlers (useCallback)
8. ✅ Tôi có thể xử lý keyboard và mouse events

## Challenge

Xây dựng một **Rich Text Editor** đơn giản với:

- Bold, Italic, Underline (Ctrl+B, Ctrl+I, Ctrl+U)
- Text alignment (Left, Center, Right)
- Font size và color
- Insert link, image
- Undo/Redo (Ctrl+Z, Ctrl+Y)
- Copy/Paste formatting
- Auto-save content
