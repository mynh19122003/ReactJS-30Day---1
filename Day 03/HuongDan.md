# Ngày 3: Components và Props - Xây dựng UI như LEGO

## 1. Component là gì? (Hiểu sâu với ví dụ thực tế)

### 1.1. Khái niệm cốt lõi

**Component** = Khối LEGO thông minh có thể tái sử dụng

🧩 **Ví dụ thực tế:** Trang Facebook

```jsx
// Facebook = Tổ hợp nhiều components
function FacebookPage() {
  return (
    <div>
      <NavigationBar /> {/* Thanh menu trên */}
      <UserProfile /> {/* Thông tin user */}
      <PostList /> {/* Danh sách bài post */}
      <ChatWindow /> {/* Cửa sổ chat */}
      <Advertisement /> {/* Quảng cáo bên phải */}
    </div>
  );
}

// Mỗi component có thể chia nhỏ tiếp
function PostList() {
  return (
    <div>
      <PostItem author="Nguyễn A" content="Hôm nay trời đẹp!" />
      <PostItem author="Trần B" content="Học React vui quá!" />
      <PostItem author="Lê C" content="Weekend plans anyone?" />
    </div>
  );
}
```

### 1.2. Component Types - Chọn loại nào?

| Loại                   | Khi nào dùng                       | Ví dụ                                     |
| ---------------------- | ---------------------------------- | ----------------------------------------- |
| **Function Component** | 99% trường hợp                     | `function Header() {}`                    |
| **Class Component**    | Legacy code, hoặc Error Boundaries | `class Header extends React.Component {}` |

⚡ **Recommendation:** Dùng Function Component + Hooks (học từ Day 4)

### 1.3. Function Components - 3 cách viết

```jsx
// ❤️ Cách 1: Function Declaration (Recommend for beginners)
function WelcomeMessage() {
  return <h1>Xin chào React!</h1>;
}

// 🔥 Cách 2: Arrow Function (Recommend for pros)
const WelcomeMessage = () => {
  return <h1>Xin chào React!</h1>;
};

// ⚡ Cách 3: One-liner (Chỉ khi JSX đơn giản)
const WelcomeMessage = () => <h1>Xin chào React!</h1>;
```

### 1.4. Component Naming Rules (Quan trọng!)

```jsx
// ✅ ĐÚNG - PascalCase
function UserProfile() {}
function ProductCard() {}
function ShoppingCart() {}
function NavigationBar() {}

// ❌ SAI - sẽ bị lỗi hoặc không hoạt động
function userProfile() {}    // lowerCase
function product_card() {}   // snake_case
function shopping-cart() {}  // kebab-case
function NAVBAR() {}         // UPPERCASE
```

🚨 **Tại sao phải PascalCase?** React phân biệt component vs HTML element bằng chữ cái đầu!

```jsx
<div>         {/* HTML element */}
<MyComponent> {/* React component */}
```

## 2. Props - Cách Components "nói chuyện" với nhau

### 2.1. Props là gì? (Ví dụ dễ hiểu)

**Props** = Parameters của function, nhưng cho React components

```jsx
// JavaScript function thông thường
function greetPerson(name, age) {
  return `Xin chào ${name}, bạn ${age} tuổi`;
}
greetPerson("An", 25); // "Xin chào An, bạn 25 tuổi"

// React component với props
function GreetPerson({ name, age }) {
  return (
    <h1>
      Xin chào {name}, bạn {age} tuổi
    </h1>
  );
}
<GreetPerson name="An" age={25} />; // Render: "Xin chào An, bạn 25 tuổi"
```

### 2.2. Truyền Props - Nhiều cách khác nhau

**Cách 1: Static props**

```jsx
function App() {
  return (
    <div>
      <UserCard
        name="Nguyễn Văn A"
        age={28}
        job="Frontend Developer"
        isOnline={true}
      />
    </div>
  );
}
```

**Cách 2: Dynamic props từ variables**

```jsx
function App() {
  const userData = {
    name: "Trần Thị B",
    age: 26,
    job: "UI/UX Designer",
    isOnline: false,
    avatar: "/images/user-b.jpg",
  };

  return (
    <UserCard
      name={userData.name}
      age={userData.age}
      job={userData.job}
      isOnline={userData.isOnline}
      avatar={userData.avatar}
    />
  );
}
```

**Cách 3: Spread operator (Pro tip)**

```jsx
function App() {
  const userData = {
    name: "Lê Văn C",
    age: 30,
    job: "Backend Developer",
    isOnline: true,
  };

  return <UserCard {...userData} />; // Spread all properties
}
```

### 2.3. Nhận Props - 3 patterns phổ biến

**Pattern 1: Destructuring (Recommend)**

```jsx
function UserCard({ name, age, job, isOnline, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>Tuổi: {age}</p>
      <p>Công việc: {job}</p>
      <span className={isOnline ? "online" : "offline"}>
        {isOnline ? "🟢 Online" : "🔴 Offline"}
      </span>
    </div>
  );
}
```

**Pattern 2: Props object**

```jsx
function UserCard(props) {
  return (
    <div className="user-card">
      <img src={props.avatar} alt={props.name} />
      <h3>{props.name}</h3>
      <p>Tuổi: {props.age}</p>
      <p>Công việc: {props.job}</p>
      <span className={props.isOnline ? "online" : "offline"}>
        {props.isOnline ? "🟢 Online" : "🔴 Offline"}
      </span>
    </div>
  );
}
```

**Pattern 3: Mixed (Khi cần cả props object và destructuring)**

```jsx
function UserCard({ name, age, ...otherProps }) {
  console.log("Other props:", otherProps); // {job, isOnline, avatar}

  return (
    <div className="user-card">
      <h3>
        {name} ({age} tuổi)
      </h3>
      {/* Sử dụng otherProps khi cần */}
    </div>
  );
}
```

### 2.4. Props Types - Những loại dữ liệu có thể truyền

```jsx
function ComponentShowcase() {
  return (
    <DataDisplayer
      // String
      message="Hello World"
      // Number
      count={42}
      // Boolean
      isVisible={true}
      isActive={false}
      // Array
      fruits={["táo", "cam", "xoài"]}
      numbers={[1, 2, 3, 4, 5]}
      // Object
      user={{
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      }}
      // Function
      onClick={() => alert("Clicked!")}
      onSubmit={(data) => console.log(data)}
      // JSX Element
      icon={<span>🎉</span>}
      headerContent={<h2>Custom Header</h2>}
      // Undefined (sẽ không pass prop này)
      undefinedProp={undefined}
      // Null
      nullProp={null}
    />
  );
}

function DataDisplayer({
  message,
  count,
  isVisible,
  fruits,
  user,
  onClick,
  icon,
  headerContent,
}) {
  return (
    <div>
      {headerContent}

      <p>{message}</p>
      <p>Count: {count}</p>

      {isVisible && <p>This is visible!</p>}

      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>
            {fruit} {icon}
          </li>
        ))}
      </ul>

      <div>
        <h4>User Info:</h4>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>

      <button onClick={onClick}>Click me!</button>
    </div>
  );
}
```

### 2.5. Default Props - Giá trị mặc định

**Cách 1: ES6 Default Parameters (Recommend)**

```jsx
function UserCard({
  name = "Anonymous",
  age = 0,
  avatar = "/default-avatar.png",
  theme = "light"
}) {
  return (
    <div className={`user-card ${theme}`}>
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{age} tuổi</p>
    </div>
  );
}

// Sử dụng
<UserCard name="John" />                    // age=0, avatar=default, theme=light
<UserCard name="Jane" age={25} />           // avatar=default, theme=light
<UserCard name="Bob" theme="dark" />        // age=0, avatar=default
```

**Cách 2: defaultProps (Legacy, nhưng vẫn dùng được)**

```jsx
function UserCard({ name, age, avatar, theme }) {
  return (
    <div className={`user-card ${theme}`}>
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{age} tuổi</p>
    </div>
  );
}

UserCard.defaultProps = {
  name: "Anonymous",
  age: 0,
  avatar: "/default-avatar.png",
  theme: "light",
};
```

## 3. Component Composition - Xây dựng UI phức tạp

### 3.1. Container vs Presentational Components

**Container Component (Smart Component):**

```jsx
// Chứa logic, state, API calls
function UserContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleUserDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  if (loading) return <LoadingSpinner />;

  return <UserList users={users} onUserDelete={handleUserDelete} />;
}
```

**Presentational Component (Dumb Component):**

```jsx
// Chỉ nhận props và render UI
function UserList({ users, onUserDelete }) {
  return (
    <div className="user-list">
      <h2>Danh sách người dùng ({users.length})</h2>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onDelete={() => onUserDelete(user.id)}
        />
      ))}
    </div>
  );
}

function UserItem({ user, onDelete }) {
  return (
    <div className="user-item">
      <img src={user.avatar} alt={user.name} />
      <div className="user-info">
        <h4>{user.name}</h4>
        <p>{user.email}</p>
      </div>
      <button onClick={onDelete} className="delete-btn">
        🗑️ Xóa
      </button>
    </div>
  );
}
```

### 3.2. Children Props - Component "bọc"

**Cơ bản về children:**

```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Sử dụng
function App() {
  return (
    <div>
      <Card title="User Profile">
        <img src="/avatar.jpg" alt="User" />
        <h4>John Doe</h4>
        <p>Frontend Developer</p>
        <button>Edit Profile</button>
      </Card>

      <Card title="Settings">
        <label>
          <input type="checkbox" /> Dark Mode
        </label>
        <label>
          <input type="checkbox" /> Notifications
        </label>
      </Card>
    </div>
  );
}
```

**Advanced children patterns:**

```jsx
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function Layout({ sidebar, header, footer, children }) {
  return (
    <div className="layout">
      <header className="layout-header">{header}</header>
      <div className="layout-body">
        <aside className="layout-sidebar">{sidebar}</aside>
        <main className="layout-content">{children}</main>
      </div>
      <footer className="layout-footer">{footer}</footer>
    </div>
  );
}

// Sử dụng Layout
function App() {
  return (
    <Layout
      header={<nav>Navigation</nav>}
      sidebar={<div>Sidebar content</div>}
      footer={<div>© 2024 My App</div>}
    >
      <h1>Main Content</h1>
      <p>This is the main content area</p>
    </Layout>
  );
}
```

## 4. Real-world Examples - Ví dụ thực tế

### 4.1. E-commerce Product Card

```jsx
function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}) {
  const {
    id,
    name,
    price,
    originalPrice,
    discount,
    image,
    rating,
    reviewCount,
    inStock,
    freeShipping,
  } = product;

  const discountedPrice = originalPrice ? originalPrice - discount : price;
  const discountPercent = originalPrice
    ? Math.round((discount / originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />

        {!inStock && <div className="out-of-stock-overlay">Hết hàng</div>}

        {discountPercent > 0 && (
          <div className="discount-badge">-{discountPercent}%</div>
        )}

        <button
          className={`wishlist-btn ${isInWishlist ? "active" : ""}`}
          onClick={() => onToggleWishlist(id)}
        >
          {isInWishlist ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>

        <div className="product-rating">
          <StarRating rating={rating} />
          <span className="review-count">({reviewCount} đánh giá)</span>
        </div>

        <div className="product-price">
          <span className="current-price">
            {discountedPrice.toLocaleString("vi-VN")}đ
          </span>
          {originalPrice && (
            <span className="original-price">
              {originalPrice.toLocaleString("vi-VN")}đ
            </span>
          )}
        </div>

        {freeShipping && (
          <div className="free-shipping">🚚 Miễn phí vận chuyển</div>
        )}

        <button
          className={`add-to-cart-btn ${!inStock ? "disabled" : ""}`}
          onClick={() => onAddToCart(product)}
          disabled={!inStock}
        >
          {inStock ? "Thêm vào giỏ" : "Hết hàng"}
        </button>
      </div>
    </div>
  );
}

function StarRating({ rating, maxStars = 5 }) {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className="star filled">
          ⭐
        </span>
      );
    } else if (i - 0.5 <= rating) {
      stars.push(
        <span key={i} className="star half">
          ⭐
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="star empty">
          ☆
        </span>
      );
    }
  }

  return <div className="star-rating">{stars}</div>;
}

// Sử dụng trong App
function ProductGrid({ products }) {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={wishlist.includes(product.id)}
        />
      ))}
    </div>
  );
}
```

### 4.2. Social Media Post Component

```jsx
function SocialPost({
  post,
  currentUser,
  onLike,
  onComment,
  onShare,
  onFollow,
}) {
  const {
    id,
    author,
    content,
    images,
    timestamp,
    likes,
    comments,
    shares,
    isLiked,
    isFollowing,
  } = post;

  const timeAgo = formatTimeAgo(timestamp);

  return (
    <article className="social-post">
      <PostHeader
        author={author}
        timestamp={timeAgo}
        isFollowing={isFollowing}
        onFollow={() => onFollow(author.id)}
        showFollowButton={currentUser.id !== author.id}
      />

      <PostContent content={content} />

      {images && images.length > 0 && <PostImages images={images} />}

      <PostStats likes={likes} comments={comments.length} shares={shares} />

      <PostActions
        isLiked={isLiked}
        onLike={() => onLike(id)}
        onComment={() => onComment(id)}
        onShare={() => onShare(id)}
      />

      <PostComments
        comments={comments.slice(0, 3)} // Show first 3 comments
        totalComments={comments.length}
        onViewAll={() => onComment(id)}
      />
    </article>
  );
}

function PostHeader({
  author,
  timestamp,
  isFollowing,
  onFollow,
  showFollowButton,
}) {
  return (
    <div className="post-header">
      <div className="author-info">
        <img src={author.avatar} alt={author.name} className="author-avatar" />
        <div className="author-details">
          <h4 className="author-name">{author.name}</h4>
          <span className="post-timestamp">{timestamp}</span>
        </div>
      </div>

      {showFollowButton && (
        <button
          className={`follow-btn ${isFollowing ? "following" : ""}`}
          onClick={onFollow}
        >
          {isFollowing ? "Đang theo dõi" : "Theo dõi"}
        </button>
      )}
    </div>
  );
}

function PostContent({ content }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = content.length > 200;

  const displayContent =
    shouldTruncate && !isExpanded ? content.substring(0, 200) + "..." : content;

  return (
    <div className="post-content">
      <p>{displayContent}</p>
      {shouldTruncate && (
        <button
          className="read-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </button>
      )}
    </div>
  );
}

function PostImages({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 1) {
    return (
      <div className="post-images single">
        <img src={images[0]} alt="Post content" />
      </div>
    );
  }

  return (
    <div className="post-images multiple">
      <div className="image-carousel">
        <img
          src={images[currentIndex]}
          alt={`Post content ${currentIndex + 1}`}
        />

        {images.length > 1 && (
          <>
            <button
              className="carousel-btn prev"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              disabled={currentIndex === 0}
            >
              ‹
            </button>

            <button
              className="carousel-btn next"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              disabled={currentIndex === images.length - 1}
            >
              ›
            </button>

            <div className="image-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PostStats({ likes, comments, shares }) {
  return (
    <div className="post-stats">
      <span className="stat-item">{likes} lượt thích</span>
      <span className="stat-item">{comments} bình luận</span>
      <span className="stat-item">{shares} chia sẻ</span>
    </div>
  );
}

function PostActions({ isLiked, onLike, onComment, onShare }) {
  return (
    <div className="post-actions">
      <button
        className={`action-btn like ${isLiked ? "liked" : ""}`}
        onClick={onLike}
      >
        {isLiked ? "❤️" : "🤍"} Thích
      </button>

      <button className="action-btn comment" onClick={onComment}>
        💬 Bình luận
      </button>

      <button className="action-btn share" onClick={onShare}>
        📤 Chia sẻ
      </button>
    </div>
  );
}

function PostComments({ comments, totalComments, onViewAll }) {
  if (comments.length === 0) return null;

  return (
    <div className="post-comments">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <img src={comment.author.avatar} alt={comment.author.name} />
          <div className="comment-content">
            <strong>{comment.author.name}</strong>
            <span>{comment.text}</span>
          </div>
        </div>
      ))}

      {totalComments > 3 && (
        <button className="view-all-comments" onClick={onViewAll}>
          Xem tất cả {totalComments} bình luận
        </button>
      )}
    </div>
  );
}

// Helper function
function formatTimeAgo(timestamp) {
  const now = new Date();
  const postTime = new Date(timestamp);
  const diffInMs = now - postTime;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 1) return "Vừa xong";
  if (diffInHours < 24) return `${diffInHours} giờ trước`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} ngày trước`;

  return postTime.toLocaleDateString("vi-VN");
}
```

## 5. Component Best Practices

### 5.1. Component Structure & Organization

**📁 Tổ chức file theo feature:**

```
src/
├── components/
│   ├── common/              // Shared components
│   │   ├── Button.js
│   │   ├── Modal.js
│   │   └── LoadingSpinner.js
│   ├── layout/              // Layout components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── Sidebar.js
│   └── features/            // Feature-specific components
│       ├── auth/
│       │   ├── LoginForm.js
│       │   └── SignupForm.js
│       └── products/
│           ├── ProductCard.js
│           ├── ProductList.js
│           └── ProductDetails.js
```

**🏗️ Component naming conventions:**

```jsx
// ✅ Good naming
function UserProfile() {} // Clear purpose
function ProductCard() {} // Descriptive
function PaymentForm() {} // Specific function
function LoadingSpinner() {} // Action + UI element

// ❌ Bad naming
function Component1() {} // Generic
function Data() {} // Too vague
function Stuff() {} // Meaningless
function UserThing() {} // Unclear
```

### 5.2. Props Design Patterns

**✅ Good Props API:**

```jsx
// Clear, predictable props
function UserCard({
  user, // Object with all user data
  size = "medium", // Enum-like values
  showEmail = true, // Boolean with default
  onEdit, // Action handlers
  onDelete,
  className = "", // Allow styling extension
}) {
  return (
    <div className={`user-card user-card--${size} ${className}`}>
      {/* Component content */}
    </div>
  );
}

// Sử dụng
<UserCard
  user={userObject}
  size="large"
  showEmail={false}
  onEdit={handleEdit}
  onDelete={handleDelete}
  className="custom-styling"
/>;
```

**❌ Poor Props API:**

```jsx
// Unclear, unpredictable props
function UserCard({
  userName, // Should be grouped in user object
  userAge,
  userEmail,
  big, // Should be size="large"
  hideEmail, // Negative boolean (confusing)
  editCallback, // Inconsistent naming
  deleteFunc,
}) {
  // ...
}
```

### 5.3. Component Composition Patterns

**Higher-Order Component (HOC) Pattern:**

```jsx
// HOC for adding loading state
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };
}

// Usage
const UserListWithLoading = withLoading(UserList);

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <UserListWithLoading
      users={users}
      isLoading={loading}
      onUserSelect={handleUserSelect}
    />
  );
}
```

**Render Props Pattern:**

```jsx
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return children({ data, loading, error });
}

// Usage
function UserProfile({ userId }) {
  return (
    <DataFetcher url={`/api/users/${userId}`}>
      {({ data: user, loading, error }) => {
        if (loading) return <LoadingSpinner />;
        if (error) return <ErrorMessage error={error} />;
        if (!user) return <div>User not found</div>;

        return (
          <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        );
      }}
    </DataFetcher>
  );
}
```

### 5.4. Performance Optimization

**React.memo for expensive components:**

```jsx
// Expensive component that should only re-render when props change
const ExpensiveUserCard = React.memo(
  function UserCard({ user, onEdit }) {
    console.log("UserCard rendered for:", user.name);

    // Expensive calculations
    const processedData = useMemo(() => {
      return expensiveCalculation(user);
    }, [user]);

    return (
      <div className="user-card">
        <h3>{user.name}</h3>
        <p>{processedData}</p>
        <button onClick={() => onEdit(user.id)}>Edit</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function (optional)
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.updatedAt === nextProps.user.updatedAt
    );
  }
);
```

**useMemo and useCallback for optimization:**

```jsx
function ProductList({ products, filters }) {
  // Memoize expensive filtering
  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    return products.filter((product) => {
      return filters.every((filter) => filter(product));
    });
  }, [products, filters]);

  // Memoize event handlers
  const handleProductClick = useCallback((productId) => {
    console.log("Product clicked:", productId);
    // Handle click
  }, []);

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={handleProductClick}
        />
      ))}
    </div>
  );
}
```

## 6. Common Mistakes & How to Fix

### 6.1. Props Mutation (Lỗi phổ biến #1)

```jsx
// ❌ WRONG - Mutating props
function UserCard({ user }) {
  user.name = user.name.toUpperCase(); // Don't mutate props!
  return <h3>{user.name}</h3>;
}

// ✅ CORRECT - Create new object
function UserCard({ user }) {
  const displayName = user.name.toUpperCase();
  return <h3>{displayName}</h3>;
}

// ✅ CORRECT - For complex transformations
function UserCard({ user }) {
  const transformedUser = {
    ...user,
    name: user.name.toUpperCase(),
    email: user.email.toLowerCase(),
  };

  return (
    <div>
      <h3>{transformedUser.name}</h3>
      <p>{transformedUser.email}</p>
    </div>
  );
}
```

### 6.2. Missing Keys in Lists (Lỗi phổ biến #2)

```jsx
// ❌ WRONG - No key or index as key
function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <UserCard user={user} /> // Missing key!
      ))}

      {users.map((user, index) => (
        <UserCard key={index} user={user} /> // Index as key is bad!
      ))}
    </div>
  );
}

// ✅ CORRECT - Unique, stable keys
function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} /> // Unique ID as key
      ))}
    </div>
  );
}

// ✅ For arrays without IDs
function TagList({ tags }) {
  return (
    <div>
      {tags.map((tag) => (
        <Tag key={tag} text={tag} /> // Tag text as key (if unique)
      ))}
    </div>
  );
}
```

### 6.3. Inline Functions in JSX (Performance issue)

```jsx
// ❌ POOR PERFORMANCE - Creates new function on every render
function ProductList({ products }) {
  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={() => deleteProduct(product.id)} // New function each render!
        />
      ))}
    </div>
  );
}

// ✅ BETTER - Stable function reference
function ProductList({ products }) {
  const handleDelete = useCallback((productId) => {
    deleteProduct(productId);
  }, []);

  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={() => handleDelete(product.id)}
        />
      ))}
    </div>
  );
}

// ✅ BEST - Move logic to child component
function ProductCard({ product, onDelete }) {
  const handleDelete = () => onDelete(product.id);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
```

### 6.4. Over-Engineering Components

```jsx
// ❌ OVER-ENGINEERED - Too many props, too flexible
function SuperButton({
  children,
  variant,
  size,
  color,
  rounded,
  shadow,
  gradient,
  border,
  uppercase,
  italic,
  weight,
  spacing,
  animation,
  onClick,
  onHover,
  onFocus,
  disabled,
  loading,
  icon,
  iconPosition,
  tooltip,
  ...rest
}) {
  // 50+ lines of logic...
}

// ✅ SIMPLE - Focused responsibility
function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled,
}) {
  const className = `btn btn--${variant} btn--${size}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// Create specialized variants if needed
function PrimaryButton(props) {
  return <Button variant="primary" {...props} />;
}

function DangerButton(props) {
  return <Button variant="danger" {...props} />;
}
```

## 7. Testing Components

### 7.1. Basic Component Testing

```jsx
// UserCard.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from "./UserCard";

const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatar.jpg",
};

describe("UserCard", () => {
  test("renders user information correctly", () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByAltText("John Doe")).toHaveAttribute(
      "src",
      "/avatar.jpg"
    );
  });

  test("calls onEdit when edit button is clicked", () => {
    const mockOnEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={mockOnEdit} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockUser.id);
  });

  test("handles missing avatar gracefully", () => {
    const userWithoutAvatar = { ...mockUser, avatar: null };
    render(<UserCard user={userWithoutAvatar} />);

    const avatar = screen.getByAltText("John Doe");
    expect(avatar).toHaveAttribute("src", "/default-avatar.png");
  });
});
```

### 7.2. Testing Props and State

```jsx
// Counter.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter", () => {
  test("starts with initial value", () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("increments when plus button clicked", () => {
    render(<Counter initialValue={0} />);

    const plusButton = screen.getByText("+");
    fireEvent.click(plusButton);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("calls onChange when value changes", () => {
    const mockOnChange = jest.fn();
    render(<Counter initialValue={0} onChange={mockOnChange} />);

    const plusButton = screen.getByText("+");
    fireEvent.click(plusButton);

    expect(mockOnChange).toHaveBeenCalledWith(1);
  });
});
```

## 8. Real Project Exercise

### 8.1. Build a Comment System

**Requirements:**

- Display comments with author info
- Nested replies (up to 2 levels)
- Like/unlike functionality
- Add new comments
- Responsive design

**Component Structure:**

```jsx
function CommentSection({ postId }) {
  // Main container component
}

function CommentList({ comments, onReply, onLike }) {
  // List of comments
}

function CommentItem({ comment, onReply, onLike, level = 0 }) {
  // Individual comment with replies
}

function CommentForm({ onSubmit, placeholder = "Add a comment..." }) {
  // Form for adding comments
}

function CommentActions({ comment, onReply, onLike }) {
  // Like, reply, delete buttons
}
```

**Sample Implementation:**

```jsx
function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments(postId).then((data) => {
      setComments(data);
      setLoading(false);
    });
  }, [postId]);

  const handleNewComment = (text) => {
    const newComment = {
      id: Date.now(),
      text,
      author: getCurrentUser(),
      timestamp: new Date(),
      likes: 0,
      replies: [],
    };

    setComments((prev) => [newComment, ...prev]);
  };

  const handleReply = (parentId, text) => {
    // Add reply to parent comment
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>
      <CommentForm onSubmit={handleNewComment} />
      <CommentList
        comments={comments}
        onReply={handleReply}
        onLike={handleLike}
      />
    </div>
  );
}
```

**Styling với CSS Modules:**

```css
/* CommentSection.module.css */
.commentSection {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.commentItem {
  border-left: 2px solid #e1e8ed;
  padding-left: 16px;
  margin-bottom: 16px;
}

.commentItem.reply {
  margin-left: 40px;
  border-left-color: #657786;
}

.commentActions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.likeButton {
  background: none;
  border: none;
  color: #657786;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.likeButton.liked {
  color: #e0245e;
}
```

## 9. Next Steps - Chuẩn bị cho Day 4

### 9.1. Kiến thức đã học Day 3

✅ **Completed:**

- [ ] Hiểu rõ Component concept và patterns
- [ ] Master Props: truyền, nhận, default values
- [ ] Component composition và children props
- [ ] Real-world examples: ProductCard, SocialPost
- [ ] Best practices và performance optimization
- [ ] Common mistakes và cách tránh
- [ ] Testing strategies

### 9.2. Homework & Practice

**1. Component Refactoring:**

- Lấy code từ Day 1-2, chia thành nhiều components nhỏ
- Practice props drilling và lifting state up

**2. Build Mini Projects:**

- Todo List với components
- User Directory với search/filter
- Product Catalog với categories

**3. Experiment:**

- Try different prop patterns
- Create reusable UI components
- Practice component composition

### 9.3. Preview Day 4: State & Lifecycle

**Upcoming topics:**

- useState Hook deep dive
- Component lifecycle và useEffect preview
- State management patterns
- Event handling với state
- Performance optimization với state

**Mental preparation:** Hôm nay học "lego blocks" (components), ngày mai sẽ học cách làm chúng "sống động" với state! 🎭

````

### 3.1. Truyền props

```jsx
// Component cha
function App() {
  return (
    <div>
      <Welcome name="An" age={25} />
      <Welcome name="Bình" age={30} />
    </div>
  );
}

// Component con nhận props
function Welcome(props) {
  return (
    <div>
      <h1>Xin chào, {props.name}!</h1>
      <p>Bạn {props.age} tuổi.</p>
    </div>
  );
}
````

### 3.2. Destructuring props

```jsx
// Cách 1: Destructuring trong tham số
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Xin chào, {name}!</h1>
      <p>Bạn {age} tuổi.</p>
    </div>
  );
}

// Cách 2: Destructuring trong function body
function Welcome(props) {
  const { name, age } = props;
  return (
    <div>
      <h1>Xin chào, {name}!</h1>
      <p>Bạn {age} tuổi.</p>
    </div>
  );
}
```

### 3.3. Các kiểu dữ liệu props

```jsx
function UserCard({
  name, // string
  age, // number
  isActive, // boolean
  hobbies, // array
  address, // object
  onEdit, // function
}) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Tuổi: {age}</p>
      <p>Trạng thái: {isActive ? "Đang hoạt động" : "Không hoạt động"}</p>
      <p>Sở thích: {hobbies.join(", ")}</p>
      <p>
        Địa chỉ: {address.city}, {address.country}
      </p>
      <button onClick={onEdit}>Chỉnh sửa</button>
    </div>
  );
}

// Sử dụng
function App() {
  const user = {
    name: "Nguyễn Văn An",
    age: 25,
    isActive: true,
    hobbies: ["đọc sách", "chơi game"],
    address: { city: "Hà Nội", country: "Việt Nam" },
  };

  const handleEdit = () => {
    console.log("Chỉnh sửa thông tin user");
  };

  return (
    <UserCard
      name={user.name}
      age={user.age}
      isActive={user.isActive}
      hobbies={user.hobbies}
      address={user.address}
      onEdit={handleEdit}
    />
  );
}
```

### 3.4. Props mặc định (Default Props)

```jsx
// Cách 1: Default parameters
function Welcome({ name = "Khách", age = 0 }) {
  return (
    <div>
      <h1>Xin chào, {name}!</h1>
      <p>Bạn {age} tuổi.</p>
    </div>
  );
}

// Cách 2: defaultProps (ít dùng hơn)
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Xin chào, {name}!</h1>
      <p>Bạn {age} tuổi.</p>
    </div>
  );
}

Welcome.defaultProps = {
  name: "Khách",
  age: 0,
};
```

## 4. Props children

`children` là một prop đặc biệt cho phép bạn truyền JSX vào bên trong component:

```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-content">{children}</div>
    </div>
  );
}

// Sử dụng
function App() {
  return (
    <div>
      <Card title="Thông tin cá nhân">
        <p>Tên: Nguyễn Văn An</p>
        <p>Tuổi: 25</p>
        <button>Chỉnh sửa</button>
      </Card>

      <Card title="Sản phẩm">
        <img src="product.jpg" alt="Sản phẩm" />
        <h4>iPhone 15</h4>
        <p>Giá: 25,000,000 VNĐ</p>
      </Card>
    </div>
  );
}
```

## 5. Component composition (Kết hợp component)

```jsx
// Component Button
function Button({ children, onClick, variant = "primary" }) {
  const className = `btn btn-${variant}`;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

// Component Modal
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <Button onClick={onClose} variant="secondary">
            ×
          </Button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

// Sử dụng
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Mở Modal</Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Xác nhận"
      >
        <p>Bạn có chắc chắn muốn xóa item này?</p>
        <Button onClick={() => setIsModalOpen(false)} variant="danger">
          Xóa
        </Button>
        <Button onClick={() => setIsModalOpen(false)} variant="secondary">
          Hủy
        </Button>
      </Modal>
    </div>
  );
}
```

## 6. Luồng dữ liệu một chiều

React có luồng dữ liệu một chiều (unidirectional data flow):

- Dữ liệu được truyền từ component cha xuống component con qua props
- Component con không thể trực tiếp thay đổi props
- Để thay đổi dữ liệu, component con phải gọi hàm được truyền từ component cha

```jsx
function Counter({ count, onIncrement, onDecrement }) {
  return (
    <div>
      <h2>Số đếm: {count}</h2>
      <button onClick={onIncrement}>Tăng</button>
      <button onClick={onDecrement}>Giảm</button>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <Counter
      count={count}
      onIncrement={() => setCount(count + 1)}
      onDecrement={() => setCount(count - 1)}
    />
  );
}
```

## 7. Ví dụ thực tế: Danh sách sản phẩm

```jsx
// Component sản phẩm đơn lẻ
function ProductItem({ product, onAddToCart }) {
  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{product.price.toLocaleString()} VNĐ</p>
      <p className="description">{product.description}</p>
      <button onClick={() => onAddToCart(product)} disabled={!product.inStock}>
        {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
      </button>
    </div>
  );
}

// Component danh sách sản phẩm
function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-list">
      <h1>Danh sách sản phẩm</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

// Component chính
function App() {
  const products = [
    {
      id: 1,
      name: "iPhone 15",
      price: 25000000,
      image: "iphone15.jpg",
      description: "Điện thoại thông minh mới nhất",
      inStock: true,
    },
    // ... các sản phẩm khác
  ];

  const handleAddToCart = (product) => {
    console.log("Đã thêm vào giỏ:", product.name);
  };

  return <ProductList products={products} onAddToCart={handleAddToCart} />;
}
```

## 8. Lưu ý quan trọng

1. **Props là read-only:** Không bao giờ thay đổi props trực tiếp
2. **Pure functions:** Component nên là pure function - với cùng props, luôn render cùng kết quả
3. **Key prop:** Khi render danh sách, luôn sử dụng `key` prop duy nhất
4. **Prop drilling:** Khi truyền props qua nhiều cấp, cân nhắc sử dụng Context API
