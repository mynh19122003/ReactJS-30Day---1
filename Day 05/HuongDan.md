# Ngày 5: Xử lý sự kiện (Event Handling)

## 🎯 Mục tiêu học tập

Sau khi hoàn thành ngày 5, bạn sẽ:

- Hiểu cách xử lý sự kiện trong React
- Nắm vững SyntheticEvents và cách sử dụng
- Biết cách truyền tham số cho event handlers
- Hiểu về event delegation và performance
- Thực hành với các patterns phổ biến

---

## 📚 Lý thuyết cơ bản

### 1. SyntheticEvents trong React

React sử dụng **SyntheticEvents** - một wrapper xung quanh native events của trình duyệt để:

- ✅ Đảm bảo tính nhất quán giữa các browser
- ✅ Cung cấp API thống nhất
- ✅ Tự động pooling để tối ưu performance
- ✅ Hỗ trợ event bubbling và capturing

### 2. Điểm khác biệt với DOM Events

| DOM Events       | SyntheticEvents |
| ---------------- | --------------- |
| `onclick`        | `onClick`       |
| `onchange`       | `onChange`      |
| Browser-specific | Cross-browser   |
| Manual cleanup   | Auto-cleanup    |

---

## 🛠️ Các loại Event cơ bản

### 1.1. Mouse Events

```jsx
function MouseEvents() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleClick = (e) => {
    console.log("Clicked at:", e.clientX, e.clientY);
    console.log("Button:", e.button); // 0: left, 1: middle, 2: right
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={() => console.log("Double clicked!")}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onContextMenu={(e) => {
        e.preventDefault(); // Ngăn right-click menu
        console.log("Right clicked!");
      }}
      style={{
        width: "300px",
        height: "200px",
        backgroundColor: isHovered ? "#e3f2fd" : "#f5f5f5",
        border: "2px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        cursor: "pointer",
      }}
    >
      <h3>Interactive Area</h3>
      <p>
        Mouse position: {position.x}, {position.y}
      </p>
      <p>Hovered: {isHovered ? "Yes" : "No"}</p>
    </div>
  );
}
```

### 1.2. Keyboard Events

```jsx
function KeyboardEvents() {
  const [keys, setKeys] = useState([]);
  const [value, setValue] = useState("");

  const handleKeyDown = (e) => {
    const keyInfo = {
      key: e.key,
      code: e.code,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
      metaKey: e.metaKey,
    };

    // Xử lý shortcuts
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      console.log("Ctrl+S: Save triggered!");
      return;
    }

    if (e.key === "Escape") {
      setValue("");
      console.log("Escaped: Input cleared!");
      return;
    }

    if (e.key === "Enter" && e.shiftKey) {
      console.log("Shift+Enter: New line!");
      return;
    }

    // Log key presses
    setKeys((prev) => [...prev.slice(-4), keyInfo]);
  };

  const handleKeyUp = (e) => {
    console.log(`Key released: ${e.key}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>🎹 Keyboard Event Demo</h3>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Type here... Try Ctrl+S, Escape, Shift+Enter"
        style={{
          width: "100%",
          height: "100px",
          padding: "10px",
          fontSize: "16px",
          border: "2px solid #ddd",
          borderRadius: "6px",
        }}
      />

      <div style={{ marginTop: "15px" }}>
        <h4>Recent Key Presses:</h4>
        {keys.slice(-5).map((keyInfo, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#f8f9fa",
              padding: "8px",
              margin: "4px 0",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            <strong>{keyInfo.key}</strong>
            {keyInfo.ctrlKey && " + Ctrl"}
            {keyInfo.shiftKey && " + Shift"}
            {keyInfo.altKey && " + Alt"}
            {keyInfo.metaKey && " + Meta"}
            <span style={{ color: "#666" }}> (code: {keyInfo.code})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 1.3. Form Events

```jsx
function FormEvents() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    category: "",
    subscribe: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Basic validation
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
    }
  };

  const handleReset = (e) => {
    console.log("Form reset triggered");
    setFormData({
      username: "",
      email: "",
      category: "",
      subscribe: false,
    });
    setErrors({});
  };

  const handleFocus = (e) => {
    console.log(`Field focused: ${e.target.name}`);
    e.target.style.borderColor = "#007bff";
  };

  const handleBlur = (e) => {
    console.log(`Field blurred: ${e.target.name}`);
    e.target.style.borderColor = "#ddd";
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <h3>📝 Form Events Demo</h3>

      <div style={{ marginBottom: "15px" }}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width: "100%",
            padding: "8px",
            border: `2px solid ${errors.username ? "#dc3545" : "#ddd"}`,
            borderRadius: "4px",
          }}
        />
        {errors.username && (
          <span style={{ color: "#dc3545", fontSize: "14px" }}>
            {errors.username}
          </span>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width: "100%",
            padding: "8px",
            border: `2px solid ${errors.email ? "#dc3545" : "#ddd"}`,
            borderRadius: "4px",
          }}
        />
        {errors.email && (
          <span style={{ color: "#dc3545", fontSize: "14px" }}>
            {errors.email}
          </span>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "8px",
            border: "2px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <option value="">Select...</option>
          <option value="student">Student</option>
          <option value="developer">Developer</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleInputChange}
            style={{ marginRight: "8px" }}
          />
          Subscribe to newsletter
        </label>
      </div>

      <div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>

        <button
          type="reset"
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
```

---

## 🎯 Patterns nâng cao

### 2.1. Truyền tham số cho Event Handlers

```jsx
function ParameterHandling() {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", active: false },
    { id: 2, name: "Item 2", active: true },
    { id: 3, name: "Item 3", active: false },
  ]);

  // ❌ Tạo function mới mỗi lần render (performance issue)
  const badExample = () => {
    return items.map((item) => (
      <button key={item.id} onClick={() => handleDelete(item.id)}>
        Delete {item.name}
      </button>
    ));
  };

  // ✅ Sử dụng data attributes
  const handleDeleteByData = (e) => {
    const id = parseInt(e.target.dataset.id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Sử dụng currying
  const handleDeleteCurried = (id) => (e) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Sử dụng useCallback để optimize
  const handleToggle = useCallback((id, field) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: !item[field] } : item
      )
    );
  }, []);

  return (
    <div>
      <h3>🎯 Parameter Handling Techniques</h3>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            marginBottom: "8px",
          }}
        >
          <span>{item.name}</span>
          <span
            style={{
              color: item.active ? "#28a745" : "#6c757d",
              fontWeight: "bold",
            }}
          >
            {item.active ? "Active" : "Inactive"}
          </span>

          {/* Method 1: Data attributes */}
          <button
            data-id={item.id}
            onClick={handleDeleteByData}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            Delete (Data)
          </button>

          {/* Method 2: Currying */}
          <button
            onClick={handleDeleteCurried(item.id)}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            Delete (Curry)
          </button>

          {/* Method 3: Inline with useCallback */}
          <button
            onClick={() => handleToggle(item.id, "active")}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            Toggle
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 2.2. Event Delegation Pattern

```jsx
function EventDelegation() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy to production', completed: true }
  ]);

  // Single event handler cho toàn bộ list
  const handleListClick = (e) => {
    const todoId = parseInt(e.target.closest('[data-todo-id]')?.dataset.todoId);
    if (!todoId) return;

    const action = e.target.dataset.action;

    switch (action) {
      case 'toggle':
        setTodos(prev => prev.map(todo =>
          todo.id === todoId
            ? { ...todo, completed: !todo.completed }
            : todo
        ));
        break;

      case 'delete':
        setTodos(prev => prev.filter(todo => todo.id !== todoId));
        break;

      case 'edit':
        const newText = prompt('Edit todo:',
          todos.find(t => t.id === todoId)?.text
        );
        if (newText) {
          setTodos(prev => prev.map(todo =>
            todo.id === todoId
              ? { ...todo, text: newText }
              : todo
          ));
        }
        break;

      default:
        console.log('Unknown action:', action);
    }
  };

  return (
    <div>
      <h3>🎯 Event Delegation Pattern</h3>
      <p>Single event handler cho toàn bộ danh sách - Better performance!</p>

```

### 2.3. Custom Events và Event Emitter Pattern

```jsx
function CustomEventExample() {
  const [notifications, setNotifications] = useState([]);

  // Custom event emitter
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

  const handleCustomAction = (action) => {
    switch (action) {
      case "success":
        emitNotification("success", "Action completed successfully!");
        break;
      case "warning":
        emitNotification("warning", "This is a warning message.");
        break;
      case "error":
        emitNotification("error", "An error occurred!");
        break;
      default:
        emitNotification("info", "Information message.");
    }
  };

  return (
    <div>
      <h3>🎉 Custom Events & Notifications</h3>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => handleCustomAction("success")}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          Success Event
        </button>
        <button
          onClick={() => handleCustomAction("warning")}
          style={{
            backgroundColor: "#ffc107",
            color: "black",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          Warning Event
        </button>
        <button
          onClick={() => handleCustomAction("error")}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          Error Event
        </button>
      </div>

      <div
        style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000 }}
      >
        {notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              backgroundColor:
                notification.type === "success"
                  ? "#d4edda"
                  : notification.type === "warning"
                  ? "#fff3cd"
                  : notification.type === "error"
                  ? "#f8d7da"
                  : "#d1ecf1",
              color:
                notification.type === "success"
                  ? "#155724"
                  : notification.type === "warning"
                  ? "#856404"
                  : notification.type === "error"
                  ? "#721c24"
                  : "#0c5460",
              padding: "12px",
              margin: "5px 0",
              borderRadius: "4px",
              border: "1px solid",
              borderColor:
                notification.type === "success"
                  ? "#c3e6cb"
                  : notification.type === "warning"
                  ? "#ffeaa7"
                  : notification.type === "error"
                  ? "#f5c6cb"
                  : "#b6d4fe",
              minWidth: "250px",
              animation: "slideIn 0.3s ease-out",
            }}
          >
            <strong>{notification.type.toUpperCase()}</strong>
            <br />
            {notification.message}
            <br />
            <small>{notification.timestamp}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 2.4. Debouncing và Throttling Events

```jsx
import { useState, useCallback, useRef } from "react";

function PerformanceOptimization() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Debounce hook
  const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);

    return useCallback(
      (...args) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => callback(...args), delay);
      },
      [callback, delay]
    );
  };

  // Throttle hook
  const useThrottle = (callback, delay) => {
    const lastRun = useRef(Date.now());

    return useCallback(
      (...args) => {
        if (Date.now() - lastRun.current >= delay) {
          callback(...args);
          lastRun.current = Date.now();
        }
      },
      [callback, delay]
    );
  };

  // Debounced search
  const debouncedSearch = useDebounce((term) => {
    console.log("Searching for:", term);
    // Simulate API call
    const mockResults = term
      ? Array.from({ length: 5 }, (_, i) => `${term} result ${i + 1}`)
      : [];
    setResults(mockResults);
  }, 500);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Throttled scroll handler
  const throttledScrollHandler = useThrottle((e) => {
    setScrollPosition(e.target.scrollTop);
  }, 100);

  // Throttled mouse move handler
  const throttledMouseMove = useThrottle((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, 50);

  return (
    <div>
      <h3>⚡ Performance Optimization</h3>

      {/* Debounced Search */}
      <div style={{ marginBottom: "20px" }}>
        <h4>🔍 Debounced Search (500ms delay)</h4>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Type to search..."
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "2px solid #ddd",
            borderRadius: "6px",
          }}
        />
        <div style={{ marginTop: "10px" }}>
          {results.map((result, index) => (
            <div
              key={index}
              style={{
                padding: "8px",
                backgroundColor: "#f8f9fa",
                margin: "4px 0",
                borderRadius: "4px",
              }}
            >
              {result}
            </div>
          ))}
        </div>
      </div>

      {/* Throttled Scroll */}
      <div style={{ marginBottom: "20px" }}>
        <h4>📜 Throttled Scroll (100ms throttle)</h4>
        <div
          onScroll={throttledScrollHandler}
          style={{
            height: "150px",
            overflow: "auto",
            border: "2px solid #ddd",
            borderRadius: "6px",
            padding: "10px",
          }}
        >
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              style={{ padding: "10px", borderBottom: "1px solid #eee" }}
            >
              Item {i + 1} - Scroll position: {Math.round(scrollPosition)}px
            </div>
          ))}
        </div>
      </div>

      {/* Throttled Mouse Move */}
      <div
        onMouseMove={throttledMouseMove}
        style={{
          height: "150px",
          backgroundColor: "#f8f9fa",
          border: "2px solid #ddd",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          cursor: "crosshair",
        }}
      >
        <div>
          <h4>🖱️ Throttled Mouse Move (50ms throttle)</h4>
          <p>Move your mouse here!</p>
          <p>
            Position: ({mousePosition.x}, {mousePosition.y})
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## 🚨 Common Pitfalls và Best Practices

### 3.1. Common Mistakes

```jsx
function CommonMistakes() {
  const [count, setCount] = useState(0);

  // ❌ BAD: Tạo function mới mỗi lần render
  const badHandler = () => {
    return <button onClick={() => setCount(count + 1)}>Bad: {count}</button>;
  };

  // ✅ GOOD: Sử dụng functional update
  const goodHandler = () => {
    return (
      <button onClick={() => setCount((prev) => prev + 1)}>
        Good: {count}
      </button>
    );
  };

  // ❌ BAD: Inline object creation
  const badStyleHandler = () => {
    return (
      <div
        onClick={() => console.log("clicked")}
        style={{ backgroundColor: "red" }} // Tạo object mới mỗi render
      >
        Bad Styling
      </div>
    );
  };

  // ✅ GOOD: Stable object reference
  const stableStyle = { backgroundColor: "green" };
  const goodStyleHandler = () => {
    return (
      <div onClick={() => console.log("clicked")} style={stableStyle}>
        Good Styling
      </div>
    );
  };

  // ❌ BAD: Không prevent default khi cần
  const badFormHandler = () => {
    return (
      <form onSubmit={() => console.log("submitted")}>
        <button type="submit">Submit (Page will reload!)</button>
      </form>
    );
  };

  // ✅ GOOD: Proper event handling
  const goodFormHandler = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("submitted properly");
    };

    return (
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit (No reload)</button>
      </form>
    );
  };

  return (
    <div>
      <h3>🚨 Common Pitfalls</h3>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {badHandler()}
        {goodHandler()}
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {badStyleHandler()}
        {goodStyleHandler()}
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {badFormHandler()}
        {goodFormHandler()}
      </div>
    </div>
  );
}
```

### 3.2. Best Practices Summary

#### ✅ DO:

- Sử dụng functional updates khi state mới phụ thuộc vào state cũ
- Prevent default behavior khi cần thiết (forms, links)
- Sử dụng data attributes cho passing parameters
- Implement debouncing cho search inputs
- Implement throttling cho scroll/resize events
- Sử dụng event delegation cho large lists
- Cleanup event listeners trong useEffect

#### ❌ DON'T:

- Tạo inline functions trong JSX (performance issue)
- Quên preventDefault() trong form submissions
- Mutate state directly
- Bind this trong functional components
- Ignore memory leaks từ event listeners

---

## 🧪 Bài tập thực hành

### Bài tập 1: Interactive TODO App

Tạo một TODO app với các tính năng:

- Add/delete/toggle todos
- Keyboard shortcuts (Enter để add, Delete để remove)
- Drag and drop reordering
- Search/filter functionality

### Bài tập 2: Advanced Form Handler

Tạo một form với:

- Real-time validation
- Debounced API calls
- File upload với drag & drop
- Progress indicators

### Bài tập 3: Game Controller

Tạo một simple game với:

- Keyboard controls (WASD, Arrow keys)
- Mouse interactions
- Touch events cho mobile
- Game state management

---

## 📝 Tóm tắt

Trong Day 5, bạn đã học:

1. **SyntheticEvents** - React's cross-browser event system
2. **Event Types** - Mouse, keyboard, form events
3. **Parameter Passing** - Data attributes, currying, callbacks
4. **Performance** - Debouncing, throttling, event delegation
5. **Best Practices** - Common pitfalls và cách tránh

**Key takeaways:**

- Events trong React được wrap trong SyntheticEvents
- Luôn sử dụng functional updates cho state
- Optimize performance với debouncing/throttling
- Event delegation tốt cho large lists
- Prevention default behavior khi cần thiết

**Next up:** Day 6 sẽ đi sâu vào Forms và Validation! 🚀
setItems(items.filter((\_, i) => i !== index));
};

// Cách 3: Closure
const handleDelete3 = (index) => {
return () => {
setItems(items.filter((\_, i) => i !== index));
};
};

return (
<ul>
{items.map((item, index) => (
<li key={index}>
{item}

          {/* Cách 1 */}
          <button onClick={() => handleDelete1(index)}>Xóa (Cách 1)</button>

          {/* Cách 2 */}
          <button data-index={index} onClick={handleDelete2}>
            Xóa (Cách 2)
          </button>

          {/* Cách 3 */}
          <button onClick={handleDelete3(index)}>Xóa (Cách 3)</button>
        </li>
      ))}
    </ul>

);
}

````

## 4. Form Handling

### 4.1. Controlled Components

```jsx
function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error khi user bắt đầu sửa
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form data:", formData);
    // Xử lý đăng nhập
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={{ borderColor: errors.email ? "red" : "" }}
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </div>

      <div>
        <label>Mật khẩu:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          style={{ borderColor: errors.password ? "red" : "" }}
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
          />
          Ghi nhớ đăng nhập
        </label>
      </div>

      <button type="submit">Đăng nhập</button>
    </form>
  );
}
````

### 4.2. Multiple Inputs

```jsx
function ContactForm() {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    category: "",
    newsletter: false,
  });

  // Generic handler cho tất cả inputs
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setContact((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form>
      <input
        name="firstName"
        value={contact.firstName}
        onChange={handleChange}
        placeholder="Tên"
      />

      <input
        name="lastName"
        value={contact.lastName}
        onChange={handleChange}
        placeholder="Họ"
      />

      <select name="category" value={contact.category} onChange={handleChange}>
        <option value="">Chọn danh mục</option>
        <option value="support">Hỗ trợ</option>
        <option value="sales">Bán hàng</option>
        <option value="feedback">Phản hồi</option>
      </select>

      <textarea
        name="message"
        value={contact.message}
        onChange={handleChange}
        placeholder="Tin nhắn"
      />

      <label>
        <input
          type="checkbox"
          name="newsletter"
          checked={contact.newsletter}
          onChange={handleChange}
        />
        Đăng ký nhận tin
      </label>
    </form>
  );
}
```

## 5. Event Delegation

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: false },
  ]);

  // Event delegation - một handler cho nhiều buttons
  const handleTodoAction = (event) => {
    const todoId = parseInt(event.target.dataset.todoId);
    const action = event.target.dataset.action;

    switch (action) {
      case "toggle":
        setTodos(
          todos.map((todo) =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
          )
        );
        break;

      case "delete":
        setTodos(todos.filter((todo) => todo.id !== todoId));
        break;

      default:
        break;
    }
  };

  return (
    <ul onClick={handleTodoAction}>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>

          <button data-todo-id={todo.id} data-action="toggle">
            {todo.completed ? "Undo" : "Complete"}
          </button>

          <button data-todo-id={todo.id} data-action="delete">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

## 6. Custom Event Handlers

```jsx
function SearchBox({ onSearch, onClear, placeholder }) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search
  useEffect(() => {
    if (!query.trim()) return;

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      onSearch(query);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (!value.trim()) {
      onClear();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(query);
    }

    if (event.key === "Escape") {
      setQuery("");
      onClear();
    }
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
      />

      {query && <button onClick={handleClear}>×</button>}

      {isSearching && <span>Đang tìm...</span>}
    </div>
  );
}

// Sử dụng
function App() {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const handleClear = () => {
    console.log("Search cleared");
  };

  return (
    <SearchBox
      onSearch={handleSearch}
      onClear={handleClear}
      placeholder="Tìm kiếm..."
    />
  );
}
```

## 7. Best Practices

### 7.1. Tránh tạo function mới mỗi lần render

```jsx
// ❌ Tạo function mới mỗi lần render
function BadExample() {
  return <button onClick={() => console.log("clicked")}>Click me</button>;
}

// ✅ Tái sử dụng function
function GoodExample() {
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <button onClick={handleClick}>Click me</button>;
}
```

### 7.2. Sử dụng event.preventDefault() và event.stopPropagation()

```jsx
function PreventDefaultExample() {
  const handleLinkClick = (event) => {
    event.preventDefault(); // Ngăn chặn navigate
    console.log("Link clicked but not navigated");
  };

  const handleButtonClick = (event) => {
    event.stopPropagation(); // Ngăn chặn event bubble up
    console.log("Button clicked");
  };

  return (
    <div onClick={() => console.log("Div clicked")}>
      <a href="/somewhere" onClick={handleLinkClick}>
        Link
      </a>
      <button onClick={handleButtonClick}>
        Button (không trigger div click)
      </button>
    </div>
  );
}
```
