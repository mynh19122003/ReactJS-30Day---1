# Ngày 7: Lists & Keys - Advanced Dynamic Rendering

## 🎯 Mục tiêu học tập

Sau khi hoàn thành ngày 7, bạn sẽ:

- Nắm vững cách render lists hiệu quả trong React
- Hiểu sâu về Keys và tầm quan trọng của chúng
- Thực hành với advanced list patterns
- Biết cách optimize performance cho large datasets
- Implement virtual scrolling và infinite loading
- Handle dynamic filtering, sorting, và searching

---

## 📚 Lists Rendering Fundamentals

### 1. Tại sao Lists quan trọng?

Lists là một trong những patterns phổ biến nhất trong UI:

- ✅ Hiển thị collections of data (users, products, comments)
- ✅ Dynamic content từ APIs
- ✅ Interactive components (todo lists, shopping carts)
- ✅ Navigation menus và breadcrumbs
- ✅ Real-time data feeds

### 2. Basic List Rendering

#### 2.1. Simple Array Rendering

```jsx
function FruitList() {
  const fruits = ["🍎 Apple", "🍌 Banana", "🍊 Orange", "🍇 Grape", "🥝 Kiwi"];

  return (
    <div className="fruit-list">
      <h2>Danh sách trái cây</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index} className="fruit-item">
            {fruit}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ⚠️ WARNING: Using index as key có thể gây performance issues!
```

#### 2.2. Objects Array với Proper Keys

```jsx
function UserList() {
  const users = [
    {
      id: "user_001",
      name: "Nguyễn Văn An",
      email: "an@example.com",
      age: 25,
      avatar: "👨‍💻",
      status: "active",
    },
    {
      id: "user_002",
      name: "Trần Thị Bình",
      email: "binh@example.com",
      age: 30,
      avatar: "👩‍🎨",
      status: "inactive",
    },
    {
      id: "user_003",
      name: "Lê Văn Chi",
      email: "chi@example.com",
      age: 28,
      avatar: "👨‍🔬",
      status: "active",
    },
  ];

  return (
    <div className="user-list">
      <h2>👥 Danh sách người dùng</h2>
      <div className="users-grid">
        {users.map((user) => (
          <UserCard
            key={user.id} // ✅ CORRECT: Unique, stable key
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className={`user-card ${user.status}`}>
      <div className="user-avatar">{user.avatar}</div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p className="user-email">📧 {user.email}</p>
        <p className="user-age">🎂 {user.age} tuổi</p>
        <span className={`status-badge ${user.status}`}>
          {user.status === "active" ? "🟢 Hoạt động" : "🔴 Không hoạt động"}
        </span>
      </div>
    </div>
  );
}
```

---

## 🔑 Keys Deep Dive

### 3. Tầm quan trọng của Keys

Keys giúp React:

- **Identify changes**: Biết element nào changed, added, hoặc removed
- **Preserve state**: Maintain component state khi re-render
- **Optimize performance**: Avoid unnecessary re-creation of DOM nodes
- **Prevent bugs**: Tránh các issues với form inputs và component state

### 3.1. Key Requirements

```jsx
// ❌ BAD: Missing keys
function BadList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
}

// ❌ BAD: Index as key (khi list có thể thay đổi)
function ProblematicList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
}

// ✅ GOOD: Unique, stable keys
function GoodList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// ✅ GOOD: Composite keys khi cần thiết
function CompositeKeyList({ items, category }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={`${category}-${item.id}`}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### 3.2. Key Anti-patterns và Solutions

```jsx
// ❌ ANTI-PATTERN: Math.random() as key
function RandomKeyList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={Math.random()}>{item.name}</li> // Component sẽ re-mount mỗi render!
      ))}
    </ul>
  );
}

// ❌ ANTI-PATTERN: Object properties as key khi không unique
function NonUniqueKeyList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.name}>{item.name}</li> // Có thể duplicate!
      ))}
    </ul>
  );
}

// ✅ SOLUTION: Generate stable IDs
import { v4 as uuidv4 } from "uuid";

function withStableIds(items) {
  return items.map((item) => ({
    ...item,
    _id: item.id || uuidv4(),
  }));
}

// ✅ SOLUTION: Use multiple properties
function MultiPropertyKey({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={`${item.name}-${item.category}-${item.index}`}>{item.name}</li>
      ))}
    </ul>
  );
}
```

---

## ⚡ Advanced List Patterns

### 4.1. Dynamic Filtering và Searching

```jsx
function AdvancedProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 15",
      category: "smartphones",
      price: 25000000,
      rating: 4.8,
      inStock: true,
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      category: "smartphones",
      price: 22000000,
      rating: 4.7,
      inStock: true,
    },
    {
      id: 3,
      name: "MacBook Pro",
      category: "laptops",
      price: 45000000,
      rating: 4.9,
      inStock: false,
    },
    {
      id: 4,
      name: "Dell XPS 13",
      category: "laptops",
      price: 35000000,
      rating: 4.6,
      inStock: true,
    },
    {
      id: 5,
      name: "iPad Air",
      category: "tablets",
      price: 18000000,
      rating: 4.8,
      inStock: true,
    },
  ]);

  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    priceRange: [0, 50000000],
    inStockOnly: false,
    minRating: 0,
  });

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Memoized filtering và sorting logic
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Search filter
      const matchesSearch = product.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      // Category filter
      const matchesCategory =
        filters.category === "all" || product.category === filters.category;

      // Price range filter
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      // Stock filter
      const matchesStock = !filters.inStockOnly || product.inStock;

      // Rating filter
      const matchesRating = product.rating >= filters.minRating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesStock &&
        matchesRating
      );
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [products, filters, sortBy, sortOrder]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="advanced-product-list">
      <h2>🛍️ Advanced Product List</h2>

      {/* Search và Filters */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm sản phẩm..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        <div className="filter-controls">
          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="all">Tất cả danh mục</option>
            <option value="smartphones">📱 Smartphones</option>
            <option value="laptops">💻 Laptops</option>
            <option value="tablets">📟 Tablets</option>
          </select>

          {/* Sort Controls */}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Tên</option>
            <option value="price">Giá</option>
            <option value="rating">Đánh giá</option>
          </select>

          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="sort-order-btn"
          >
            {sortOrder === "asc" ? "⬆️ Tăng dần" : "⬇️ Giảm dần"}
          </button>

          {/* Stock Filter */}
          <label className="checkbox-filter">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) =>
                handleFilterChange("inStockOnly", e.target.checked)
              }
            />
            Chỉ hiển thị hàng có sẵn
          </label>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        Tìm thấy {filteredAndSortedProducts.length} sản phẩm
        {filters.search && ` cho "${filters.search}"`}
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredAndSortedProducts.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">😔</div>
            <h3>Không tìm thấy sản phẩm</h3>
            <p>Thử điều chỉnh bộ lọc để xem thêm kết quả</p>
          </div>
        ) : (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className={`product-card ${!product.inStock ? "out-of-stock" : ""}`}>
      <div className="product-header">
        <h3>{product.name}</h3>
        <span className="category-badge">{product.category}</span>
      </div>

      <div className="product-details">
        <div className="price">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.price)}
        </div>

        <div className="rating">
          {"⭐".repeat(Math.floor(product.rating))} {product.rating}
        </div>

        <div
          className={`stock-status ${
            product.inStock ? "in-stock" : "out-of-stock"
          }`}
        >
          {product.inStock ? "✅ Còn hàng" : "❌ Hết hàng"}
        </div>
      </div>
    </div>
  );
}
```

### 4.2. Nested Lists với Recursive Rendering

````jsx
function NestedCommentTree() {
  const commentsData = [
    {
      id: 'comment_1',
      author: 'Nguyễn Văn A',
      content: 'Bài viết rất hay! Cảm ơn tác giả đã chia sẻ.',
      timestamp: '2024-01-15T10:30:00Z',
      likes: 15,
      replies: [
        {
          id: 'comment_1_1',
          author: 'Trần Thị B',
          content: 'Tôi cũng nghĩ vậy. Rất hữu ích!',
          timestamp: '2024-01-15T11:15:00Z',
          likes: 8,
          replies: [
            {
              id: 'comment_1_1_1',
              author: 'Lê Văn C',
              content: 'Đồng ý hoàn toàn!',
              timestamp: '2024-01-15T11:45:00Z',
              likes: 3,
              replies: []
            }
          ]
        },
        {
          id: 'comment_1_2',
          author: 'Phạm Thị D',
          content: 'Có thể chia sẻ thêm về phần này được không?',
          timestamp: '2024-01-15T12:00:00Z',
          likes: 5,
          replies: []
        }
      ]
    },
    {
      id: 'comment_2',
      author: 'Hoàng Văn E',
      content: 'Tôi có một câu hỏi về implementation...',
      timestamp: '2024-01-15T14:20:00Z',
      likes: 12,
      replies: []
    }
  ];

  return (
    <div className="nested-comment-tree">
      <h2>💬 Nested Comment System</h2>
      <CommentList comments={commentsData} level={0} />
    </div>
  );
}

// Recursive Comment Component
function CommentList({ comments, level = 0 }) {
  const maxDepth = 5; // Prevent infinite nesting

  if (level > maxDepth) {
    return (
      <div className="max-depth-notice">
        <span>... {comments.length} reply(ies) ẩn (quá sâu)</span>
      </div>
    );
  }

  return (
    <div className={`comment-list level-${level}`}>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          level={level}
        />
      ))}
    </div>
  );
}

function Comment({ comment, level }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const hasReplies = comment.replies && comment.replies.length > 0;
  const indentationStyle = {
    marginLeft: `${level * 20}px`,
    borderLeft: level > 0 ? '2px solid #e1e8ed' : 'none',
    paddingLeft: level > 0 ? '15px' : '0'
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('vi-VN');
  };

  return (
    <div className="comment" style={indentationStyle}>
      <div className="comment-content">
        <div className="comment-header">
          <span className="author">{comment.author}</span>
          <span className="timestamp">{formatTimestamp(comment.timestamp)}</span>
        </div>

        <div className="comment-body">
          {comment.content}
        </div>

        <div className="comment-actions">
          <button className="like-btn">
            👍 {comment.likes}
          </button>
          <button
            className="reply-btn"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            💬 Reply
          </button>

          {hasReplies && (
            <button
              className="toggle-replies-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '➖' : '➕'}
              {comment.replies.length} replies
            </button>
          )}
        </div>
      </div>

      {showReplyForm && (
        <div className="reply-form">
          <ReplyForm
            parentId={comment.id}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {hasReplies && isExpanded && (
        <CommentList
          comments={comment.replies}
          level={level + 1}
        />
      )}
    </div>
  );
}

function ReplyForm({ parentId, onCancel }) {
  const [replyText, setReplyText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      // Handle reply submission
      console.log('Reply to:', parentId, 'Content:', replyText);
      setReplyText('');
      onCancel();
    }
  };

  return (
    <form className="reply-form-content" onSubmit={handleSubmit}>
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Viết phản hồi của bạn..."
        rows="3"
      />
      <div className="reply-form-actions">
        <button type="submit" disabled={!replyText.trim()}>
          Gửi phản hồi
        </button>
        <button type="button" onClick={onCancel}>
          Hủy
        </button>
      </div>
    </form>
  );
}

---

## 🚀 Performance Optimization Techniques

### 5.1. Virtual Scrolling cho Large Lists

```jsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedList() {
  // Generate large dataset
  const items = useMemo(() =>
    Array.from({ length: 10000 }, (_, index) => ({
      id: `item_${index}`,
      name: `Item ${index + 1}`,
      description: `Description for item ${index + 1}`,
      value: Math.floor(Math.random() * 1000),
      category: ['Electronics', 'Books', 'Clothing', 'Home'][index % 4]
    }))
  , []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  // Row renderer for react-window
  const Row = ({ index, style }) => {
    const item = filteredItems[index];

    return (
      <div style={style} className="virtual-list-item">
        <div className="item-content">
          <h4>{item.name}</h4>
          <p>{item.description}</p>
          <div className="item-meta">
            <span className="category">{item.category}</span>
            <span className="value">${item.value}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="virtualized-list-demo">
      <h2>⚡ Virtual Scrolling Demo</h2>
      <p>Hiển thị {items.length.toLocaleString()} items với hiệu suất cao</p>

      {/* Controls */}
      <div className="list-controls">
        <input
          type="text"
          placeholder="🔍 Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home</option>
        </select>
      </div>

      <div className="results-info">
        Showing {filteredItems.length.toLocaleString()} of {items.length.toLocaleString()} items
      </div>

      {/* Virtual List */}
      <div className="virtual-list-container">
        <List
          height={400}           // Container height
          itemCount={filteredItems.length}
          itemSize={80}          // Height of each item
          overscanCount={5}      // Render extra items for smooth scrolling
        >
          {Row}
        </List>
      </div>
    </div>
  );
}
````

````

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
````

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
