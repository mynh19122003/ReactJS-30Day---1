# Ngày 7: Render danh sách (Lists and Keys)

## 1. Rendering Lists trong React

Một trong những tác vụ phổ biến nhất trong React là hiển thị danh sách dữ liệu. React cung cấp cách hiệu quả để render arrays thành JSX elements.

### 1.1. Cú pháp cơ bản với map()

```jsx
function FruitList() {
  const fruits = ["Apple", "Banana", "Orange", "Grape"];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}
```

### 1.2. Rendering objects array

```jsx
function UserList() {
  const users = [
    { id: 1, name: "An", email: "an@email.com", age: 25 },
    { id: 2, name: "Bình", email: "binh@email.com", age: 30 },
    { id: 3, name: "Chi", email: "chi@email.com", age: 22 },
  ];

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Tuổi: {user.age}</p>
        </div>
      ))}
    </div>
  );
}
```

## 2. Keys trong React

**Key** là một thuộc tính đặc biệt giúp React xác định element nào đã thay đổi, được thêm hoặc xóa.

### 2.1. Tại sao Keys quan trọng?

```jsx
// ❌ Không có key - React có thể render sai
function BadList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li>{item.name}</li> // Missing key!
      ))}
    </ul>
  );
}

// ✅ Có key - React render chính xác
function GoodList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### 2.2. Quy tắc chọn Keys

```jsx
function KeyExamples() {
  const users = [
    { id: 1, name: "An" },
    { id: 2, name: "Bình" },
  ];

  return (
    <div>
      {/* ✅ Tốt nhất: Sử dụng unique ID */}
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}

      {/* ⚠️ Chấp nhận được: Sử dụng index khi không có ID */}
      {["Apple", "Banana"].map((fruit, index) => (
        <div key={index}>{fruit}</div>
      ))}

      {/* ❌ Tránh: Random keys */}
      {users.map((user) => (
        <div key={Math.random()}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 2.3. Vấn đề với index làm key

```jsx
function ProblematicList() {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", completed: false },
    { id: 2, name: "Item 2", completed: false },
  ]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: `Item ${items.length + 1}`,
      completed: false,
    };
    setItems([newItem, ...items]); // Thêm vào đầu
  };

  return (
    <div>
      <button onClick={addItem}>Thêm item</button>

      {/* ❌ Sử dụng index - có thể gây lỗi state */}
      {items.map((item, index) => (
        <TodoItem
          key={index} // Problem: index thay đổi khi thêm item vào đầu
          item={item}
        />
      ))}

      {/* ✅ Sử dụng stable ID */}
      {items.map((item) => (
        <TodoItem
          key={item.id} // Stable key
          item={item}
        />
      ))}
    </div>
  );
}

function TodoItem({ item }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <input defaultValue={item.name} />
      ) : (
        <span>{item.name}</span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
}
```

## 3. Các pattern phổ biến

### 3.1. Filtering lists

```jsx
function ProductList({ products, category, minPrice }) {
  const filteredProducts = products.filter((product) => {
    const matchesCategory = !category || product.category === category;
    const matchesPrice = !minPrice || product.price >= minPrice;
    return matchesCategory && matchesPrice;
  });

  if (filteredProducts.length === 0) {
    return <p>Không tìm thấy sản phẩm nào.</p>;
  }

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 3.2. Sorting lists

```jsx
function SortableUserList() {
  const [users, setUsers] = useState([
    { id: 1, name: "An", age: 25, joinDate: "2020-01-01" },
    { id: 2, name: "Bình", age: 30, joinDate: "2019-06-15" },
    { id: 3, name: "Chi", age: 22, joinDate: "2021-03-10" },
  ]);

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedUsers = [...users].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Convert dates for comparison
    if (sortBy === "joinDate") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    // Compare values
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <div className="sort-controls">
        <button onClick={() => handleSort("name")}>
          Tên {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button onClick={() => handleSort("age")}>
          Tuổi {sortBy === "age" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button onClick={() => handleSort("joinDate")}>
          Ngày tham gia{" "}
          {sortBy === "joinDate" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
      </div>

      <div className="user-list">
        {sortedUsers.map((user) => (
          <div key={user.id} className="user-item">
            <h3>{user.name}</h3>
            <p>Tuổi: {user.age}</p>
            <p>Tham gia: {user.joinDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3.3. Grouped lists

```jsx
function GroupedProductList({ products }) {
  // Group products by category
  const groupedProducts = products.reduce((groups, product) => {
    const category = product.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});

  return (
    <div>
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <div key={category} className="product-category">
          <h2>{category}</h2>
          <div className="product-grid">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 3.4. Paginated lists

```jsx
function PaginatedList({ items, itemsPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="items-list">
        {currentItems.map((item) => (
          <div key={item.id} className="item">
            {item.name}
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className="pagination-info">
        Hiển thị {startIndex + 1}-{Math.min(endIndex, items.length)} /{" "}
        {items.length} items
      </div>
    </div>
  );
}
```

## 4. Nested lists

```jsx
function NestedMenuList({ menuItems }) {
  return (
    <ul className="menu">
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

function MenuItem({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li className="menu-item">
      <div className="menu-item-content">
        <span>{item.name}</span>
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="expand-button"
          >
            {isExpanded ? "−" : "+"}
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <ul className="submenu">
          {item.children.map((child) => (
            <MenuItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```

## 5. Dynamic lists với CRUD operations

```jsx
function DynamicTodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <div>
      <div className="add-todo">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Thêm todo mới..."
        />
        <button onClick={addTodo}>Thêm</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        ))}
      </ul>

      {todos.length === 0 && <p className="empty-state">Chưa có todo nào.</p>}
    </div>
  );
}

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <div className="edit-mode">
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="view-mode">
          <span className="todo-text">{todo.text}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      )}
    </li>
  );
}
```

## 6. Performance considerations

### 6.1. Memoizing list items

```jsx
import { memo } from "react";

// Memoize component to avoid unnecessary re-renders
const ExpensiveListItem = memo(function ExpensiveListItem({ item, onUpdate }) {
  console.log("Rendering:", item.id); // Chỉ render khi props thay đổi

  return (
    <div className="expensive-item">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <button onClick={() => onUpdate(item.id)}>Update</button>
    </div>
  );
});

function OptimizedList({ items }) {
  const [, setCounter] = useState(0);

  const updateItem = useCallback((id) => {
    console.log("Updating item:", id);
  }, []);

  return (
    <div>
      <button onClick={() => setCounter((c) => c + 1)}>
        Re-render parent (items won't re-render)
      </button>

      {items.map((item) => (
        <ExpensiveListItem key={item.id} item={item} onUpdate={updateItem} />
      ))}
    </div>
  );
}
```

## 7. Best Practices

1. **Luôn sử dụng keys:** Giúp React tối ưu hóa rendering
2. **Keys phải stable và unique:** Tránh dùng index khi list có thể thay đổi thứ tự
3. **Filter và sort bên ngoài render:** Tránh tính toán trong JSX
4. **Memoize expensive list items:** Sử dụng `memo()` cho items phức tạp
5. **Handle empty states:** Hiển thị thông báo khi list trống
6. **Virtualization cho lists lớn:** Sử dụng libraries như react-window
7. **Debounce search và filter:** Tránh render quá nhiều lần
