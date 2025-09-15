# Ngày 4: State và Lifecycle - Làm cho Components "sống động"

## 1. State là gì? (Hiểu sâu với ví dụ thực tế)

### 1.1. Định nghĩa cốt lõi

**State** = Trạng thái nội tại của component, có thể thay đổi được

🎭 **Ví dụ thực tế:** State như cảm xúc của con người

```jsx
// Component như con người, state như cảm xúc
function Person() {
  const [mood, setMood] = useState("happy"); // Tâm trạng hiện tại
  const [energy, setEnergy] = useState(100); // Năng lượng
  const [isAwake, setIsAwake] = useState(true); // Tỉnh táo hay buồn ngủ

  return (
    <div className={`person person--${mood}`}>
      <h3>Trạng thái hiện tại:</h3>
      <p>
        Tâm trạng: {mood} {mood === "happy" ? "😊" : "😔"}
      </p>
      <p>Năng lượng: {energy}%</p>
      <p>Trạng thái: {isAwake ? "Tỉnh táo 👀" : "Buồn ngủ 😴"}</p>

      <div className="actions">
        <button onClick={() => setMood(mood === "happy" ? "sad" : "happy")}>
          Đổi tâm trạng
        </button>
        <button onClick={() => setEnergy(Math.max(0, energy - 10))}>
          Làm việc (-10 năng lượng)
        </button>
        <button onClick={() => setIsAwake(!isAwake)}>
          {isAwake ? "Đi ngủ" : "Thức dậy"}
        </button>
      </div>
    </div>
  );
}
```

### 1.2. State vs Props - Sự khác biệt cốt lõi

| Khía cạnh            | Props                         | State                             |
| -------------------- | ----------------------------- | --------------------------------- |
| **Nguồn gốc**        | Từ component cha              | Từ chính component                |
| **Có thể thay đổi?** | ❌ Read-only                  | ✅ Có thể update                  |
| **Khi thay đổi**     | Component re-render           | Component re-render               |
| **Ví dụ**            | Thông tin cá nhân (tên, tuổi) | Trạng thái hiện tại (login, cart) |

```jsx
// Props: Thông tin không đổi từ bên ngoài
function UserProfile({ name, avatar, role }) {
  // Props từ parent
  // State: Trạng thái nội tại có thể thay đổi
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState(new Date());

  return (
    <div>
      {/* Props */}
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>Vai trò: {role}</p>

      {/* State */}
      <div className={`status ${isOnline ? "online" : "offline"}`}>
        {isOnline ? "🟢 Đang online" : "🔴 Offline"}
      </div>
      <p>Hoạt động cuối: {lastSeen.toLocaleString()}</p>

      <button onClick={() => setIsOnline(!isOnline)}>
        Toggle Online Status
      </button>
    </div>
  );
}
```

## 2. useState Hook - Trái tim của React

### 2.1. Cú pháp và cách hoạt động

```jsx
import { useState } from "react";

function ComponentExample() {
  // ✨ Destructuring assignment
  const [state, setState] = useState(initialValue);
  //      ↑        ↑            ↑
  //   giá trị   hàm set    giá trị ban đầu

  return (
    <div>
      <p>Current state: {state}</p>
      <button onClick={() => setState(newValue)}>Update State</button>
    </div>
  );
}
```

**🔍 Phân tích chi tiết:**

```jsx
function CounterDetailed() {
  // useState trả về một array có 2 elements
  const stateArray = useState(0);
  const count = stateArray[0]; // Giá trị hiện tại
  const setCount = stateArray[1]; // Hàm để update

  // Tương đương với destructuring:
  // const [count, setCount] = useState(0);

  console.log("Component rendered with count:", count);

  return (
    <div>
      <h3>Counter: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### 2.2. State Types - Các kiểu dữ liệu state

**2.2.1. Primitive Types**

```jsx
function PrimitiveStates() {
  // String state
  const [message, setMessage] = useState("Hello World");

  // Number state
  const [score, setScore] = useState(0);

  // Boolean state
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Null/undefined state
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <div>
        <label>Message:</label>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <p>You typed: {message}</p>
      </div>

      <div>
        <p>Score: {score}</p>
        <button onClick={() => setScore(score + 10)}>+10</button>
        <button onClick={() => setScore(score - 5)}>-5</button>
      </div>

      <div>
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Hide" : "Show"} Content
        </button>
        {isVisible && <p>This content can be toggled!</p>}
      </div>

      <div>
        {isLoading ? (
          <div>Loading... 🔄</div>
        ) : (
          <button onClick={() => setIsLoading(true)}>Start Loading</button>
        )}
      </div>
    </div>
  );
}
```

**2.2.2. Array State (Quan trọng!)**

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build an app", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");

  // ✅ ĐÚNG: Thêm item mới (immutable)
  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };

      setTodos((prevTodos) => [...prevTodos, newTodoItem]);
      setNewTodo("");
    }
  };

  // ✅ ĐÚNG: Xóa item (immutable)
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // ✅ ĐÚNG: Update item (immutable)
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ❌ SAI: Mutating array directly
  const wrongAddTodo = () => {
    todos.push(newTodoItem); // DON'T DO THIS!
    setTodos(todos); // React won't detect change
  };

  return (
    <div className="todo-list">
      <h3>Todo List ({todos.length} items)</h3>

      <div className="add-todo">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="stats">
        <p>Completed: {todos.filter((t) => t.completed).length}</p>
        <p>Remaining: {todos.filter((t) => !t.completed).length}</p>
      </div>
    </div>
  );
}
```

**2.2.3. Object State (Phức tạp)**

```jsx
function UserForm() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    preferences: {
      theme: "light",
      notifications: true,
      language: "vi",
    },
    skills: [],
  });

  const [errors, setErrors] = useState({});

  // ✅ ĐÚNG: Update single field
  const updateField = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  // ✅ ĐÚNG: Update nested object
  const updatePreference = (key, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        [key]: value,
      },
    }));
  };

  // ✅ ĐÚNG: Add skill to array
  const addSkill = (skill) => {
    setUser((prevUser) => ({
      ...prevUser,
      skills: [...prevUser.skills, skill],
    }));
  };

  // ✅ ĐÚNG: Remove skill from array
  const removeSkill = (skillToRemove) => {
    setUser((prevUser) => ({
      ...prevUser,
      skills: prevUser.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!user.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Email is invalid";
    }

    if (user.age < 1 || user.age > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("User data:", user);
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h3>User Registration</h3>

      <div className="form-row">
        <div className="form-field">
          <label>First Name:</label>
          <input
            value={user.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className={errors.firstName ? "error" : ""}
          />
          {errors.firstName && (
            <span className="error-text">{errors.firstName}</span>
          )}
        </div>

        <div className="form-field">
          <label>Last Name:</label>
          <input
            value={user.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
          />
        </div>
      </div>

      <div className="form-field">
        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label>Age:</label>
        <input
          type="number"
          value={user.age}
          onChange={(e) => updateField("age", parseInt(e.target.value) || 0)}
          className={errors.age ? "error" : ""}
        />
        {errors.age && <span className="error-text">{errors.age}</span>}
      </div>

      {/* Preferences */}
      <fieldset>
        <legend>Preferences</legend>

        <div className="form-field">
          <label>Theme:</label>
          <select
            value={user.preferences.theme}
            onChange={(e) => updatePreference("theme", e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div className="form-field">
          <label>
            <input
              type="checkbox"
              checked={user.preferences.notifications}
              onChange={(e) =>
                updatePreference("notifications", e.target.checked)
              }
            />
            Enable notifications
          </label>
        </div>

        <div className="form-field">
          <label>Language:</label>
          <select
            value={user.preferences.language}
            onChange={(e) => updatePreference("language", e.target.value)}
          >
            <option value="vi">Vietnamese</option>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
          </select>
        </div>
      </fieldset>

      {/* Skills */}
      <fieldset>
        <legend>Skills</legend>
        <div className="skills-input">
          <input
            placeholder="Add a skill and press Enter"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const skill = e.target.value.trim();
                if (skill && !user.skills.includes(skill)) {
                  addSkill(skill);
                  e.target.value = "";
                }
              }
            }}
          />
        </div>

        <div className="skills-list">
          {user.skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
              <button type="button" onClick={() => removeSkill(skill)}>
                ×
              </button>
            </span>
          ))}
        </div>
      </fieldset>

      <button type="submit">Register</button>

      {/* Debug info */}
      <details>
        <summary>Debug: Current User State</summary>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </details>
    </form>
  );
}
```

### 2.3. State Update Patterns

**2.3.1. Functional Updates (Quan trọng cho performance)**

```jsx
function CounterAdvanced() {
  const [count, setCount] = useState(0);

  // ❌ POTENTIAL ISSUE: Stale closure
  const incrementThrice = () => {
    setCount(count + 1); // count = 0, sets to 1
    setCount(count + 1); // count = 0, sets to 1
    setCount(count + 1); // count = 0, sets to 1
    // Result: count becomes 1, not 3!
  };

  // ✅ CORRECT: Functional update
  const incrementThriceCorrect = () => {
    setCount((prev) => prev + 1); // prev = 0, returns 1
    setCount((prev) => prev + 1); // prev = 1, returns 2
    setCount((prev) => prev + 1); // prev = 2, returns 3
    // Result: count becomes 3 ✓
  };

  // ✅ PRACTICAL: Batch multiple updates
  const complexUpdate = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      console.log(`Incrementing from ${prev} to ${newCount}`);
      return newCount;
    });
  };

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={incrementThrice}>Wrong Increment (×3)</button>
      <button onClick={incrementThriceCorrect}>Correct Increment (×3)</button>
      <button onClick={complexUpdate}>Complex Update</button>
    </div>
  );
}
```

**2.3.2. Lazy Initial State**

```jsx
function ExpensiveComponent() {
  // ❌ EXPENSIVE: Runs on every render
  const [data, setData] = useState(expensiveCalculation());

  // ✅ OPTIMIZED: Only runs once
  const [optimizedData, setOptimizedData] = useState(() => {
    console.log("Running expensive calculation...");
    return expensiveCalculation();
  });

  // ✅ PRACTICAL: Reading from localStorage
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("app-settings");
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch (error) {
      console.error("Error loading settings:", error);
      return defaultSettings;
    }
  });

  return (
    <div>
      <h3>Expensive Component</h3>
      <p>Data: {optimizedData}</p>
      <p>Settings: {JSON.stringify(settings)}</p>
    </div>
  );
}

function expensiveCalculation() {
  // Simulate expensive operation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.random();
  }
  return Math.round(result);
}

const defaultSettings = {
  theme: "light",
  notifications: true,
  autoSave: false,
};
```

## 3. Component Lifecycle - Vòng đời của Components

### 3.1. Function Component Lifecycle

```jsx
function LifecycleDemo({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("🔄 Component rendering...");

  // 🎬 Mounting: Component được tạo
  useEffect(() => {
    console.log("🎬 Component mounted");

    // Cleanup function: 🧹 Unmounting
    return () => {
      console.log("🧹 Component will unmount");
    };
  }, []); // Empty dependency array = only run once

  // 🔄 Updating: Khi userId thay đổi
  useEffect(() => {
    console.log("📡 Fetching user data for ID:", userId);

    setLoading(true);
    setError(null);

    // Simulate API call
    const fetchUser = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay

        // Random success/failure
        if (Math.random() > 0.8) {
          throw new Error("Failed to fetch user");
        }

        const userData = {
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`,
          avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=${userId}`,
        };

        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Dependency array: re-run when userId changes

  // 🎯 Conditional rendering based on state
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner">🔄</div>
        <p>Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h3>❌ Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>User ID: {user.id}</p>
    </div>
  );
}

// Parent component để test lifecycle
function LifecycleTestApp() {
  const [currentUserId, setCurrentUserId] = useState(1);
  const [showComponent, setShowComponent] = useState(true);

  return (
    <div>
      <h2>Lifecycle Demo</h2>

      <div className="controls">
        <button onClick={() => setCurrentUserId((prev) => prev + 1)}>
          Next User (ID: {currentUserId + 1})
        </button>

        <button onClick={() => setShowComponent(!showComponent)}>
          {showComponent ? "Hide" : "Show"} Component
        </button>
      </div>

      {showComponent && <LifecycleDemo userId={currentUserId} />}
    </div>
  );
}
```

### 3.2. Class Component Lifecycle (Reference)

```jsx
// ⚠️ Legacy: Chỉ để reference, không khuyến khích dùng
class ClassLifecycleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      user: null,
    };
    console.log("🎬 Constructor: Component được khởi tạo");
  }

  // 🎬 Mounting
  componentDidMount() {
    console.log("🎬 componentDidMount: Component đã mount");
    // Tương đương useEffect(() => {}, [])
  }

  // 🔄 Updating
  componentDidUpdate(prevProps, prevState) {
    console.log("🔄 componentDidUpdate: Component đã update");
    // Tương đương useEffect(() => {}, [dependency])

    if (prevProps.userId !== this.props.userId) {
      // Fetch new user data
    }
  }

  // 🧹 Unmounting
  componentWillUnmount() {
    console.log("🧹 componentWillUnmount: Component sẽ unmount");
    // Cleanup timers, subscriptions, etc.
  }

  render() {
    console.log("🔄 render: Component đang render");
    return (
      <div>
        <h3>Class Component: {this.state.count}</h3>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

// 🎯 Modern equivalent with hooks
function ModernLifecycleDemo(props) {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  // Constructor equivalent
  console.log("🎬 Function component: Component được khởi tạo");

  // componentDidMount equivalent
  useEffect(() => {
    console.log("🎬 useEffect mount: Component đã mount");

    // componentWillUnmount equivalent
    return () => {
      console.log("🧹 useEffect cleanup: Component sẽ unmount");
    };
  }, []);

  // componentDidUpdate equivalent
  useEffect(() => {
    console.log("🔄 useEffect update: userId changed to", props.userId);
    // Fetch user data
  }, [props.userId]);

  // render equivalent (function body)
  console.log("🔄 Function body: Component đang render");

  return (
    <div>
      <h3>Modern Component: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## 4. State Management Patterns

### 4.1. Multiple State vs Single State Object

**❌ Multiple useState cho related data:**

```jsx
function UserProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  // Khó sync và validate
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAge(0);
  };
}
```

**✅ Single useState cho related data:**

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
  });

  // Dễ quản lý hơn
  const resetForm = () => {
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      age: 0,
    });
  };

  const updateField = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
}
```

### 4.2. State Lifting Pattern

```jsx
// Parent component quản lý shared state
function ShoppingApp() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <div className="shopping-app">
      <Header
        cartCount={cartItems.length}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ProductList category={selectedCategory} onAddToCart={addToCart} />

      <Cart items={cartItems} onRemoveItem={removeFromCart} />
    </div>
  );
}

// Child components nhận props và gọi callbacks
function ProductList({ category, onAddToCart }) {
  const [products] = useState(mockProducts);

  const filteredProducts = products.filter(
    (product) => category === "all" || product.category === category
  );

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
}
```

### 4.3. Custom State Hooks

```jsx
// Custom hook cho localStorage sync
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Custom hook cho toggle state
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse];
}

// Custom hook cho counter
function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((prev) => prev + step), [step]);
  const decrement = useCallback(() => setCount((prev) => prev - step), [step]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  const setValue = useCallback((value) => setCount(value), []);

  return { count, increment, decrement, reset, setValue };
}

// Sử dụng custom hooks
function CustomHooksDemo() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [isMenuOpen, toggleMenu, openMenu, closeMenu] = useToggle();
  const { count, increment, decrement, reset } = useCounter(0, 2);

  return (
    <div className={`app theme-${theme}`}>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Switch to {theme === "light" ? "dark" : "light"} theme
      </button>

      <button onClick={toggleMenu}>{isMenuOpen ? "Close" : "Open"} Menu</button>

      <div>
        Count: {count}
        <button onClick={increment}>+2</button>
        <button onClick={decrement}>-2</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
```

## 5. Common Mistakes & Solutions

### 5.1. Stale Closure Problem

```jsx
// ❌ Problem: Stale closure
function StaleClosureProblem() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Count in interval:", count); // Always logs 0!
      setCount(count + 1); // Always sets to 1!
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array causes stale closure

  return <div>Count: {count}</div>;
}

// ✅ Solution 1: Functional update
function SolutionFunctionalUpdate() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        console.log("Previous count:", prev);
        return prev + 1; // Always correct!
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Count: {count}</div>;
}

// ✅ Solution 2: Include dependency
function SolutionWithDependency() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Count in interval:", count);
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count]); // Include count in dependencies

  return <div>Count: {count}</div>;
}
```

### 5.2. Direct State Mutation

```jsx
// ❌ Problem: Direct mutation
function DirectMutationProblem() {
  const [user, setUser] = useState({
    name: "John",
    preferences: {
      theme: "light",
      notifications: true,
    },
    skills: ["React", "JavaScript"],
  });

  const updateTheme = () => {
    user.preferences.theme = "dark"; // Don't mutate!
    setUser(user); // React won't detect the change
  };

  const addSkill = () => {
    user.skills.push("TypeScript"); // Don't mutate!
    setUser(user); // React won't detect the change
  };
}

// ✅ Solution: Immutable updates
function ImmutableUpdates() {
  const [user, setUser] = useState({
    name: "John",
    preferences: {
      theme: "light",
      notifications: true,
    },
    skills: ["React", "JavaScript"],
  });

  const updateTheme = () => {
    setUser((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        theme: "dark",
      },
    }));
  };

  const addSkill = (newSkill) => {
    setUser((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const removeSkill = (skillToRemove) => {
    setUser((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };
}
```

### 5.3. Unnecessary Re-renders

```jsx
// ❌ Problem: Creates new object every render
function UnnecessaryRerender() {
  const [count, setCount] = useState(0);

  const user = { name: "John", count }; // New object every render!

  return <ExpensiveChild user={user} />;
}

// ✅ Solution: useMemo for expensive objects
function OptimizedComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("John");

  const user = useMemo(
    () => ({
      name,
      count,
      fullName: `${name} (${count})`,
    }),
    [name, count]
  ); // Only recreate when dependencies change

  return <ExpensiveChild user={user} />;
}
```

## 6. Practical Exercises & Solutions

### Exercise 1: Shopping Cart

**Requirements:**

- Add/remove products from cart
- Update quantity
- Calculate total price
- Persist cart in localStorage

```jsx
function ShoppingCart() {
  const [cart, setCart] = useLocalStorage("shopping-cart", []);
  const [products] = useState([
    { id: 1, name: "iPhone 15", price: 999, image: "/iphone.jpg" },
    { id: 2, name: "MacBook Pro", price: 1999, image: "/macbook.jpg" },
    { id: 3, name: "AirPods", price: 179, image: "/airpods.jpg" },
  ]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="shopping-cart-app">
      <h1>Shopping Cart Demo</h1>

      <div className="products-section">
        <h2>Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-section">
        <h2>Cart ({totalItems} items)</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price} each</p>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">${item.price * item.quantity}</div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}

            <div className="cart-summary">
              <h3>Total: ${totalPrice}</h3>
              <button onClick={clearCart}>Clear Cart</button>
              <button className="checkout-btn">Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

### Exercise 2: Multi-Step Form

**Requirements:**

- 3 steps: Personal Info, Preferences, Review
- Form validation
- Progress indicator
- Go back/forward

```jsx
function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Step 2: Preferences
    theme: "light",
    newsletter: false,
    notifications: {
      email: true,
      push: false,
      sms: false,
    },

    // Step 3: Review (computed)
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const updateNestedData = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone is required";
      } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Phone must be at least 10 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Form submitted successfully!");
      console.log("Submitted data:", formData);

      // Reset form
      setCurrentStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        theme: "light",
        newsletter: false,
        notifications: {
          email: true,
          push: false,
          sms: false,
        },
      });
    } catch (error) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h3>Personal Information</h3>

            <div className="form-row">
              <div className="form-field">
                <label>First Name *</label>
                <input
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  className={errors.firstName ? "error" : ""}
                />
                {errors.firstName && (
                  <span className="error-text">{errors.firstName}</span>
                )}
              </div>

              <div className="form-field">
                <label>Last Name *</label>
                <input
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  className={errors.lastName ? "error" : ""}
                />
                {errors.lastName && (
                  <span className="error-text">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="form-field">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-field">
              <label>Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && (
                <span className="error-text">{errors.phone}</span>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h3>Preferences</h3>

            <div className="form-field">
              <label>Theme</label>
              <select
                value={formData.theme}
                onChange={(e) => updateFormData("theme", e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="form-field">
              <label>
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) =>
                    updateFormData("newsletter", e.target.checked)
                  }
                />
                Subscribe to newsletter
              </label>
            </div>

            <fieldset>
              <legend>Notification Preferences</legend>

              <label>
                <input
                  type="checkbox"
                  checked={formData.notifications.email}
                  onChange={(e) =>
                    updateNestedData("notifications", "email", e.target.checked)
                  }
                />
                Email notifications
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={formData.notifications.push}
                  onChange={(e) =>
                    updateNestedData("notifications", "push", e.target.checked)
                  }
                />
                Push notifications
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={formData.notifications.sms}
                  onChange={(e) =>
                    updateNestedData("notifications", "sms", e.target.checked)
                  }
                />
                SMS notifications
              </label>
            </fieldset>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h3>Review Your Information</h3>

            <div className="review-section">
              <h4>Personal Information</h4>
              <p>
                <strong>Name:</strong> {formData.firstName} {formData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
            </div>

            <div className="review-section">
              <h4>Preferences</h4>
              <p>
                <strong>Theme:</strong> {formData.theme}
              </p>
              <p>
                <strong>Newsletter:</strong>{" "}
                {formData.newsletter ? "Yes" : "No"}
              </p>
              <p>
                <strong>Notifications:</strong>
              </p>
              <ul>
                <li>Email: {formData.notifications.email ? "Yes" : "No"}</li>
                <li>Push: {formData.notifications.push ? "Yes" : "No"}</li>
                <li>SMS: {formData.notifications.sms ? "Yes" : "No"}</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form">
      <div className="progress-bar">
        <div className="progress-steps">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`progress-step ${
                step <= currentStep ? "active" : ""
              } ${step < currentStep ? "completed" : ""}`}
            >
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 && "Personal"}
                {step === 2 && "Preferences"}
                {step === 3 && "Review"}
              </div>
            </div>
          ))}
        </div>
        <div
          className="progress-fill"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      <form>
        {renderStep()}

        <div className="form-actions">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep}>
              Previous
            </button>
          )}

          {currentStep < totalSteps ? (
            <button type="button" onClick={nextStep}>
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
```

### Exercise 3: Dynamic Quiz App

**Requirements:**

- Multiple choice questions
- Score tracking
- Time limit per question
- Results summary

```jsx
function QuizApp() {
  const [questions] = useState([
    {
      id: 1,
      question: "What is the correct way to create a state variable in React?",
      options: [
        "const [state, setState] = useState()",
        "const state = createState()",
        "const state = React.state()",
        "const state = new State()",
      ],
      correct: 0,
      timeLimit: 30,
    },
    {
      id: 2,
      question: "Which hook is used for side effects in React?",
      options: ["useCallback", "useMemo", "useEffect", "useReducer"],
      correct: 2,
      timeLimit: 25,
    },
    {
      id: 3,
      question: "How do you pass data from parent to child component?",
      options: [
        "Through state",
        "Through props",
        "Through context",
        "Through refs",
      ],
      correct: 1,
      timeLimit: 20,
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (currentQuestion && !isAnswered && !isQuizComplete) {
      setTimeLeft(currentQuestion.timeLimit);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAnswer(null); // Auto-submit when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, isAnswered, isQuizComplete]);

  const handleAnswer = (answerIndex) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    const newAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: answerIndex,
      correctAnswer: currentQuestion.correct,
      isCorrect: answerIndex === currentQuestion.correct,
      timeSpent: currentQuestion.timeLimit - timeLeft,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    // Auto-advance after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setIsQuizComplete(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setTimeLeft(0);
    setIsQuizComplete(false);
    setIsAnswered(false);
  };

  const calculateScore = () => {
    const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
    return {
      correct: correctAnswers,
      total: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100),
    };
  };

  if (isQuizComplete) {
    const score = calculateScore();

    return (
      <div className="quiz-results">
        <h2>Quiz Complete! 🎉</h2>

        <div className="score-summary">
          <div className="score-circle">
            <span className="score-percentage">{score.percentage}%</span>
          </div>
          <p>
            You got {score.correct} out of {score.total} questions correct!
          </p>
        </div>

        <div className="answers-review">
          <h3>Review Your Answers</h3>
          {answers.map((answer, index) => {
            const question = questions[index];
            return (
              <div key={question.id} className="answer-review">
                <h4>Question {index + 1}</h4>
                <p>{question.question}</p>

                <div className="answer-options">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`option-review ${
                        optionIndex === question.correct ? "correct" : ""
                      } ${
                        optionIndex === answer.selectedAnswer &&
                        !answer.isCorrect
                          ? "incorrect"
                          : ""
                      }`}
                    >
                      {option}
                      {optionIndex === question.correct && " ✓"}
                      {optionIndex === answer.selectedAnswer &&
                        !answer.isCorrect &&
                        " ✗"}
                    </div>
                  ))}
                </div>

                <p className="time-spent">
                  Time spent: {answer.timeSpent}s / {question.timeLimit}s
                </p>
              </div>
            );
          })}
        </div>

        <button onClick={restartQuiz} className="restart-btn">
          Take Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-app">
      <div className="quiz-header">
        <div className="progress-info">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          />
        </div>

        <div className={`timer ${timeLeft <= 5 ? "urgent" : ""}`}>
          ⏰ {timeLeft}s
        </div>
      </div>

      <div className="question-container">
        <h2>{currentQuestion.question}</h2>

        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={`option ${
                isAnswered && index === currentQuestion.correct ? "correct" : ""
              } ${
                isAnswered &&
                index === selectedAnswer &&
                index !== currentQuestion.correct
                  ? "incorrect"
                  : ""
              } ${selectedAnswer === index ? "selected" : ""}`}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className="feedback">
            {selectedAnswer === currentQuestion.correct ? (
              <p className="correct-feedback">✅ Correct!</p>
            ) : selectedAnswer === null ? (
              <p className="timeout-feedback">⏰ Time's up!</p>
            ) : (
              <p className="incorrect-feedback">
                ❌ Incorrect. The correct answer is{" "}
                {String.fromCharCode(65 + currentQuestion.correct)}.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

## 7. Next Steps & Homework

### 7.1. Practice Assignments

1. **State Counter App**: Build a counter with increment, decrement, reset, and step size
2. **Form Validator**: Create a signup form with real-time validation
3. **Todo List**: Implement add, edit, delete, toggle, filter functionality
4. **Shopping Cart**: Build a mini e-commerce cart with localStorage
5. **Weather App**: Use state to manage current weather, favorites, units

### 7.2. Advanced Challenges

1. **State Machine**: Implement a simple finite state machine for user authentication flow
2. **Undo/Redo**: Add undo/redo functionality to the todo list
3. **Optimistic Updates**: Implement optimistic UI updates with rollback on error
4. **Complex Forms**: Build a multi-step form with conditional fields and validation

### 7.3. Study for Tomorrow

**Day 5 Preview: Event Handling**

- Event types and synthetic events
- Form handling and validation
- Event delegation and performance
- Custom events and communication
- Debouncing and throttling
- Keyboard shortcuts and accessibility

**Key concepts to review:**

- JavaScript event handling
- Form elements and validation
- Performance optimization techniques

### 7.4. Quick Self-Check

✅ **You should be able to:**

- [ ] Explain the difference between state and props
- [ ] Use useState with different data types
- [ ] Update state immutably (arrays and objects)
- [ ] Understand component lifecycle phases
- [ ] Avoid common state management mistakes
- [ ] Build complex stateful applications
- [ ] Debug state-related issues

Chúc mừng! Bạn đã nắm vững State và Lifecycle - hai khái niệm cốt lõi nhất của React! 🎉
function UpdateExamples() {
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: "An", age: 25 });
const [items, setItems] = useState(["item1", "item2"]);

// Cập nhật primitive value
const increment = () => {
setCount(count + 1);
};

// Cập nhật object (phải tạo object mới)
const updateUser = () => {
setUser({
...user, // spread operator để giữ lại các thuộc tính cũ
age: user.age + 1, // chỉ thay đổi age
});
};

// Cập nhật array (phải tạo array mới)
const addItem = () => {
setItems([...items, `item${items.length + 1}`]);
};

const removeItem = (index) => {
setItems(items.filter((\_, i) => i !== index));
};

return (
<div>
<p>Count: {count}</p>
<button onClick={increment}>Tăng</button>

      <p>
        User: {user.name}, {user.age} tuổi
      </p>
      <button onClick={updateUser}>Tăng tuổi</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeItem(index)}>Xóa</button>
          </li>
        ))}
      </ul>
      <button onClick={addItem}>Thêm item</button>
    </div>

);
}

````

### 2.4. State với hàm

Khi state mới phụ thuộc vào state cũ, nên sử dụng function:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // ❌ Có thể gây lỗi trong một số trường hợp
  const increment = () => {
    setCount(count + 1);
  };

  // ✅ Luôn đúng
  const incrementSafe = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Ví dụ tại sao cần dùng function
  const incrementTwice = () => {
    // Cách này chỉ tăng 1 lần vì count chưa được cập nhật
    setCount(count + 1);
    setCount(count + 1);

    // Cách đúng - tăng 2 lần
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Tăng 1</button>
      <button onClick={incrementTwice}>Tăng 2</button>
    </div>
  );
}
````

## 3. Vòng đời Component (Lifecycle)

Mặc dù function component không có lifecycle methods như class component, nhưng vẫn có các giai đoạn:

### 3.1. Mounting (Gắn kết)

Component được tạo và thêm vào DOM lần đầu tiên.

### 3.2. Updating (Cập nhật)

Component được render lại khi props hoặc state thay đổi.

### 3.3. Unmounting (Gỡ bỏ)

Component bị xóa khỏi DOM.

```jsx
function LifecycleExample() {
  const [count, setCount] = useState(0);

  console.log("Component render/re-render"); // Chạy mỗi lần render

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tăng (gây re-render)</button>
    </div>
  );
}
```

## 4. Ví dụ thực tế

### 4.1. Form đăng nhập

```jsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (email === "admin@example.com" && password === "123456") {
        alert("Đăng nhập thành công!");
      } else {
        setError("Email hoặc mật khẩu không đúng");
      }
    } catch (err) {
      setError("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Mật khẩu:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
```

### 4.2. Todo List với state phức tạp

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div>
      <h1>Todo App</h1>

      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Thêm todo mới..."
        />
        <button onClick={addTodo}>Thêm</button>
      </div>

      <div>
        <button
          onClick={() => setFilter("all")}
          style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
        >
          Tất cả ({todos.length})
        </button>
        <button
          onClick={() => setFilter("active")}
          style={{ fontWeight: filter === "active" ? "bold" : "normal" }}
        >
          Đang làm ({todos.filter((t) => !t.completed).length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{ fontWeight: filter === "completed" ? "bold" : "normal" }}
        >
          Hoàn thành ({todos.filter((t) => t.completed).length})
        </button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Xóa</button>
          </li>
        ))}
      </ul>

      {filteredTodos.length === 0 && (
        <p>
          Không có todo nào{" "}
          {filter !== "all" ? `trong danh mục "${filter}"` : ""}.
        </p>
      )}
    </div>
  );
}
```

## 5. Lưu ý quan trọng

### 5.1. State là bất đồng bộ

```jsx
function AsyncStateExample() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log(count); // Vẫn là giá trị cũ!

    // Để sử dụng giá trị mới, dùng useEffect hoặc callback
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

### 5.2. Đừng mutate state trực tiếp

```jsx
function DontMutateState() {
  const [items, setItems] = useState([1, 2, 3]);

  const badAddItem = () => {
    items.push(4); // ❌ Sai - mutate trực tiếp
    setItems(items); // React không nhận ra sự thay đổi
  };

  const goodAddItem = () => {
    setItems([...items, 4]); // ✅ Đúng - tạo array mới
  };

  return <div>{/* JSX */}</div>;
}
```

### 5.3. Lazy initial state

Khi giá trị khởi tạo cần tính toán phức tạp:

```jsx
function ExpensiveComponent() {
  // ❌ Hàm chạy mỗi lần render
  const [state, setState] = useState(expensiveCalculation());

  // ✅ Hàm chỉ chạy lần đầu
  const [state2, setState2] = useState(() => expensiveCalculation());

  return <div>{/* JSX */}</div>;
}
```
