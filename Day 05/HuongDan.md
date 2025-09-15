# Ngày 5: Xử lý sự kiện (Event Handling)

## 1. Events trong React

React sử dụng **SyntheticEvents** - một wrapper xung quanh native events của trình duyệt, đảm bảo tính nhất quán giữa các browser khác nhau.

### 1.1. Cú pháp cơ bản

```jsx
function Button() {
  const handleClick = () => {
    console.log("Button được click!");
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### 1.2. Các loại event phổ biến

```jsx
function EventExamples() {
  return (
    <div>
      {/* Click events */}
      <button onClick={() => console.log("Click")}>Click</button>
      <button onDoubleClick={() => console.log("Double click")}>
        Double Click
      </button>

      {/* Form events */}
      <input onChange={(e) => console.log(e.target.value)} />
      <form onSubmit={(e) => e.preventDefault()}>
        <button type="submit">Submit</button>
      </form>

      {/* Mouse events */}
      <div
        onMouseEnter={() => console.log("Mouse enter")}
        onMouseLeave={() => console.log("Mouse leave")}
      >
        Hover me
      </div>

      {/* Keyboard events */}
      <input
        onKeyDown={(e) => console.log("Key down:", e.key)}
        onKeyUp={(e) => console.log("Key up:", e.key)}
      />
    </div>
  );
}
```

## 2. Event Object

```jsx
function EventObjectExample() {
  const handleInputChange = (event) => {
    console.log("Value:", event.target.value);
    console.log("Name:", event.target.name);
    console.log("Type:", event.type);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Enter được nhấn!");
    }

    if (event.ctrlKey && event.key === "s") {
      event.preventDefault(); // Ngăn chặn Ctrl+S mặc định
      console.log("Ctrl+S được nhấn!");
    }
  };

  return (
    <input
      name="username"
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      placeholder="Nhập tên..."
    />
  );
}
```

## 3. Truyền tham số cho Event Handler

```jsx
function ParameterExample() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  // Cách 1: Arrow function inline
  const handleDelete1 = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Cách 2: Sử dụng data attributes
  const handleDelete2 = (event) => {
    const index = parseInt(event.target.dataset.index);
    setItems(items.filter((_, i) => i !== index));
  };

  // Cách 3: Closure
  const handleDelete3 = (index) => {
    return () => {
      setItems(items.filter((_, i) => i !== index));
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
```

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
```

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
