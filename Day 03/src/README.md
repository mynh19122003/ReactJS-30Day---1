# 📚 Day 3 - Components & Props với Comments Chi Tiết

> **Mục tiêu**: Học cách tạo và sử dụng Props trong React với các ví dụ thực tế có comments chi tiết từng dòng code.

## 🎯 **Kiến thức học được**

### **1. Props (Properties)**

- ✅ Truyền dữ liệu từ component cha sang component con
- ✅ Props là **read-only** - component con không thể thay đổi
- ✅ Destructuring props để code sạch hơn
- ✅ Nested props với object phức tạp

### **2. Component Composition**

- ✅ Kết hợp nhiều components trong một app
- ✅ Tái sử dụng components với props khác nhau
- ✅ Event handling thông qua callback props

### **3. Advanced Patterns**

- ✅ Conditional rendering với props
- ✅ Array mapping để render lists
- ✅ Computed values từ props
- ✅ Complex styling dựa trên props

---

## 🗂️ **Cấu trúc Project**

```
Day 03/src/
├── App.js                    # 🏠 Main component với 120+ comments
├── components/
│   ├── ProductCard.js        # 🛍️ Product component với 90+ comments
│   └── SocialPost.js         # 📱 Social media component với 100+ comments
└── README.md                 # 📖 Hướng dẫn chi tiết này
```

---

## 🚀 **Cách chạy Project**

### **Bước 1: Tạo React App mới**

### **Bước 1: Tạo React App mới**

```bash
# Tạo project mới
npx create-react-app day03-props-demo
cd day03-props-demo

# Khởi động development server
npm start
```

### **Bước 2: Copy Code mẫu**

```bash
# Copy file App.js (thay thế file gốc)
# Copy toàn bộ thư mục components/

# Hoặc tạo thủ công:
mkdir src/components
# Copy nội dung ProductCard.js và SocialPost.js
```

### **Bước 3: Kiểm tra kết quả**

- ✅ Mở http://localhost:3000
- ✅ Thấy danh sách sản phẩm với interactive buttons
- ✅ Thấy social posts với like/comment/share
- ✅ Test các tính năng: thêm vào giỏ, like posts, etc.

---

## 📋 **Component Breakdown**

### **🏠 App.js - Main Component (120+ comments)**

**📍 Key Learning Points:**

```javascript
// 1. STATE MANAGEMENT - Quản lý data toàn app
const [products] = useState([...]);        // Static data
const [posts, setPosts] = useState([...]);  // Dynamic data
const [cart, setCart] = useState([]);       // User interactions

// 2. EVENT HANDLERS - Functions truyền xuống components
const handleAddToCart = (product) => { /* logic */ };
const handleLike = (postId) => { /* logic */ };

// 3. PROPS PASSING - Truyền data và callbacks
<ProductCard
  product={product}                // Object prop
  onAddToCart={handleAddToCart}    // Function prop
/>

<SocialPost
  post={post}                      // Complex nested object
  onLike={handleLike}              // Callback function
/>
```

**🔑 Comments học được:**

- ✅ **State vs Props**: Khi nào dùng state, khi nào dùng props
- ✅ **Data Flow**: One-way data flow từ cha xuống con
- ✅ **Event Handling**: Callback pattern để communicate ngược lên cha
- ✅ **Array Operations**: map(), filter(), find() với React state

---

### **🛍️ ProductCard.js - Props Master Class (90+ comments)**

**📍 Key Learning Points:**

```javascript
// 1. PROPS DESTRUCTURING
function ProductCard({ product, onAddToCart, onViewDetails }) {

// 2. COMPUTED VALUES từ props
const discountPrice = product.originalPrice - product.discount;
const discountPercent = Math.round((product.discount / product.originalPrice) * 100);

// 3. CONDITIONAL RENDERING
{product.discount > 0 && (
  <span>-{discountPercent}%</span>  // Chỉ hiển thị khi có discount
)}

// 4. EVENT HANDLING với props
onClick={(e) => {
  e.stopPropagation();             // Ngăn event bubbling
  onAddToCart(product);            // Gọi callback từ props
}}
```

**🔑 Comments học được:**

- ✅ **Props Types**: String, Number, Boolean, Object, Function props
- ✅ **Conditional Styling**: CSS dựa trên props values
- ✅ **Event Propagation**: stopPropagation(), preventDefault()
- ✅ **Accessibility**: Alt text, disabled states, cursors

---

### **📱 SocialPost.js - Advanced Props (100+ comments)**

**📍 Key Learning Points:**

```javascript
// 1. NESTED OBJECT PROPS
{
  post.author.name;
} // post.author.name
{
  post.author.verified && <span>✓</span>;
} // Conditional từ nested prop

// 2. ARRAY PROPS MAPPING
{
  post.hashtags.map((tag, index) => (
    <span key={index}>#{tag}</span> // Render array items
  ));
}

// 3. COMPLEX CONDITIONAL LOGIC
{
  post.likes > 0 && `${post.likes.toLocaleString()} lượt thích`;
}

// 4. UTILITY FUNCTIONS
const formatTime = (timestamp) => {
  /* logic */
}; // Process props data
```

**🔑 Comments học được:**

- ✅ **Nested Props**: Truy cập deep object properties
- ✅ **Array Rendering**: map() with key prop requirement
- ✅ **Data Processing**: Utility functions để format props
- ✅ **Complex UI States**: Multiple conditional rendering patterns

---

## 🎓 **Props Patterns đã học**

### **1. Basic Props**

```javascript
// String props
<Component title="Hello World" />

// Number props
<Component count={42} />

// Boolean props
<Component isActive={true} />
<Component isActive />  // Shorthand cho true
```

### **2. Object Props**

```javascript
// Simple object
const user = { name: "John", age: 25 };
<Component user={user} />;

// Nested object
const product = {
  id: 1,
  details: { name: "iPhone", price: 1000 },
};
<Component product={product} />;
// Sử dụng: {product.details.name}
```

### **3. Array Props**

```javascript
// Array of strings
<Component tags={["React", "JavaScript"]} />

// Array of objects
<Component items={[{id: 1, name: "Item 1"}]} />
// Render: {items.map(item => <div key={item.id}>{item.name}</div>)}
```

### **4. Function Props (Callbacks)**

```javascript
// Event handlers
<Component onClick={(data) => console.log(data)} />

// Data processing callbacks
<Component onSubmit={(formData) => saveToAPI(formData)} />
```

---

## ⚡ **Performance Tips từ Comments**

### **1. Conditional Rendering Optimization**

```javascript
// ✅ Good - Chỉ render khi cần
{
  items.length > 0 && <ItemList items={items} />;
}

// ❌ Avoid - Render empty arrays
{
  items.map((item) => <Item key={item.id} />);
} // Nếu items = []
```

### **2. Event Handler Optimization**

```javascript
// ✅ Good - Callback với specific data
onClick={() => handleClick(item.id)}

// ❌ Avoid - Passing entire objects unnecessarily
onClick={() => handleClick(entireComplexObject)}
```

### **3. Key Prop Best Practices**

```javascript
// ✅ Good - Stable unique keys
{
  items.map((item) => <Item key={item.id} />);
}

// ❌ Avoid - Index as key khi list thay đổi
{
  items.map((item, index) => <Item key={index} />);
}
```

---

## 🔧 **Debugging Props với Comments**

### **1. Props Validation**

```javascript
// Comment pattern để check props
function Component({ user, onSave }) {
  // Debug: Log props để kiểm tra
  console.log("Props received:", { user, onSave });

  // Validate props
  if (!user) return <div>No user data</div>;
  if (!onSave) console.warn("onSave callback missing");
}
```

### **2. Props Flow Tracing**

```javascript
// Comments để trace data flow
function App() {
  const [users] = useState([...]); // 1. Data source

  return (
    <UserList
      users={users}                  // 2. Pass to child
      onUserClick={handleUserClick}  // 3. Callback handler
    />
  );
}

function UserList({ users, onUserClick }) {
  // 4. Receive props, pass further down
  return users.map(user => (
    <UserCard
      key={user.id}
      user={user}                    // 5. Individual user data
      onClick={onUserClick}          // 6. Same callback passed down
    />
  ));
}
```

---

## 🎯 **Exercises để Practice**

### **Bài 1: Modify Product Data**

```javascript
// Thử thay đổi dữ liệu products trong App.js:
// - Thêm sản phẩm mới
// - Thay đổi discount, stock
// - Xem component tự động update
```

### **Bài 2: Add New Props**

```javascript
// Thêm props mới cho ProductCard:
// - category (string)
// - isFavorite (boolean)
// - onToggleFavorite (function)
```

### **Bài 3: Create New Component**

```javascript
// Tạo component UserProfile nhận props:
// - user: { name, email, avatar, bio }
// - isEditable: boolean
// - onEdit: function
```

---

## ✅ **Checklist hoàn thành Day 3**

- [ ] Hiểu được Props là gì và cách sử dụng
- [ ] Biết cách destructure props
- [ ] Nắm được one-way data flow
- [ ] Sử dụng được conditional rendering với props
- [ ] Render được arrays từ props với map()
- [ ] Implement được callback props cho event handling
- [ ] Xử lý được nested object props
- [ ] Biết optimize performance với props

**🎉 Chúc mừng! Bạn đã hoàn thành Day 3 - Components & Props!**

- Hiển thị hình ảnh sản phẩm với badges (giảm giá, mới)
- Rating system với sao vàng
- Tính toán giá sau giảm giá
- Kiểm tra tồn kho và disable button khi hết hàng
- Hover effects và responsive design
- Event handling với stopPropagation

### SocialPost.js

**Props nhận vào:**

- `post`: Object chứa thông tin bài viết
  - `id`, `content`, `image`, `timestamp`, `location`
  - `author` (name, avatar, verified)
  - `hashtags`, `likes`, `comments`, `shares`
  - `userLiked`
- `onLike`, `onComment`, `onShare`: Functions xử lý tương tác

**Tính năng:**

- Hiển thị thông tin tác giả với avatar và verified badge
- Format thời gian relative (vừa xong, X giờ trước...)
- Hiển thị hashtags clickable
- Engagement stats (likes, comments, shares)
- Interactive buttons với hover effects
- Conditional rendering cho các elements tùy chọn

### App.js

**Chức năng chính:**

- Quản lý state cho products và posts
- Quản lý shopping cart với localStorage
- Event handlers cho tất cả interactions
- Layout responsive với sections riêng biệt
- Real-time updates cho likes và cart

## Concepts học được

### 1. **Props Destructuring**

```javascript
function ProductCard({ product, onAddToCart, onViewDetails }) {
  // Destructuring props ngay trong parameter
}
```

### 2. **Conditional Rendering**

```javascript
{
  product.discount > 0 && <span>-{discountPercent}%</span>;
}

{
  product.stock > 0 ? "Thêm vào giỏ" : "Hết hàng";
}
```

### 3. **Event Handling with Parameters**

```javascript
onClick={() => onAddToCart(product)}
onClick={(e) => {
  e.stopPropagation();
  onViewDetails(product);
}}
```

### 4. **Dynamic Styling**

```javascript
color: post.userLiked ? "#e74c3c" : "#666";
backgroundColor: product.stock > 0 ? "#007bff" : "#ccc";
```

### 5. **Array Mapping & Conditional Classes**

```javascript
{
  [...Array(5)].map((_, index) => (
    <span
      key={index}
      style={{
        color: index < product.rating ? "#ffc107" : "#e0e0e0",
      }}
    >
      ★
    </span>
  ));
}
```

### 6. **Complex State Management**

```javascript
const handleLike = (postId) => {
  setPosts((prev) =>
    prev.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          userLiked: !post.userLiked,
          likes: post.userLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    })
  );
};
```

## Bài tập mở rộng

1. **Thêm filter/search cho ProductCard:**

   - Tìm kiếm theo tên
   - Lọc theo giá, rating, tồn kho

2. **Enhanced SocialPost:**

   - Comment system với nested replies
   - Image gallery với multiple photos
   - Emoji reactions thay vì chỉ like

3. **Shopping Cart:**

   - Persist cart trong localStorage
   - Quantity controls (+/-)
   - Checkout flow

4. **Performance:**

   - React.memo cho components
   - useMemo cho expensive calculations
   - useCallback cho functions

5. **Accessibility:**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

Hãy thử chỉnh sửa props data và xem components re-render như thế nào!
