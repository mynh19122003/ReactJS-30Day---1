# Ngày 2: Cú pháp JSX (JavaScript XML)

## 1. JSX là gì? - Hiểu sâu về "ma thuật" React

### 1.1. Định nghĩa và so sánh

**JSX (JavaScript XML)** là cú pháp đặc biệt cho phép viết HTML trong JavaScript.

🤔 **Tại sao cần JSX?**

**Cách cũ (JavaScript thuần):**

```javascript
// Tạo element phức tạp
const container = document.createElement("div");
container.className = "user-card";

const title = document.createElement("h1");
title.textContent = "Xin chào, " + userName;
container.appendChild(title);

const description = document.createElement("p");
description.textContent = "Bạn có " + messageCount + " tin nhắn mới";
container.appendChild(description);

document.body.appendChild(container);
```

**Với JSX:**

```jsx
const userCard = (
  <div className="user-card">
    <h1>Xin chào, {userName}</h1>
    <p>Bạn có {messageCount} tin nhắn mới</p>
  </div>
);
```

💡 **JSX = HTML + JavaScript siêu mạnh!**

### 1.2. JSX được chuyển đổi như thế nào?

**Code JSX bạn viết:**

```jsx
const element = <h1 className="greeting">Xin chào!</h1>;
```

**Babel chuyển thành:**

```javascript
const element = React.createElement(
  "h1", // tag name
  { className: "greeting" }, // props
  "Xin chào!" // children
);
```

**Kết quả cuối cùng:**

```javascript
// Object mô tả element
{
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Xin chào!'
  }
}
```

🔥 **Vậy JSX chỉ là "đường syntax" để viết React.createElement() dễ đọc hơn!**

### 1.3. JSX vs HTML - Những điểm khác biệt cốt lõi

| Khía cạnh           | HTML                   | JSX                      |
| ------------------- | ---------------------- | ------------------------ |
| **Môi trường**      | Chạy trong browser     | Chạy trong JavaScript    |
| **Dynamic content** | Cần JavaScript riêng   | Nhúng trực tiếp với `{}` |
| **Attributes**      | `class`, `for`         | `className`, `htmlFor`   |
| **Events**          | `onclick="function()"` | `onClick={function}`     |
| **Styles**          | `style="color: red"`   | `style={{color: 'red'}}` |

## 2. Quy tắc vàng của JSX (Phải nhớ!)

### 2.1. Quy tắc #1: Một parent element duy nhất

🚨 **Lỗi phổ biến nhất của newbie:**

```jsx
// ❌ SẼ BÁO LỖI!
function WrongComponent() {
  return (
    <h1>Tiêu đề</h1>
    <p>Nội dung</p>
  );
}
```

**Lỗi:** `Adjacent JSX elements must be wrapped in an enclosing tag`

✅ **Cách sửa:**

**Option 1: Dùng div wrapper**

```jsx
function CorrectComponent() {
  return (
    <div>
      <h1>Tiêu đề</h1>
      <p>Nội dung</p>
    </div>
  );
}
```

**Option 2: React Fragment (Khuyên dùng)**

```jsx
function BetterComponent() {
  return (
    <React.Fragment>
      <h1>Tiêu đề</h1>
      <p>Nội dung</p>
    </React.Fragment>
  );
}

// Hoặc cú pháp ngắn:
function BestComponent() {
  return (
    <>
      <h1>Tiêu đề</h1>
      <p>Nội dung</p>
    </>
  );
}
```

🤔 **Tại sao cần Fragment?**

- Không tạo extra DOM node
- Keeps HTML structure clean
- Better performance

**So sánh DOM output:**

```jsx
// Với div wrapper
<div>
  <h1>Tiêu đề</h1>  ← Extra div trong DOM
  <p>Nội dung</p>
</div>

// Với Fragment
<h1>Tiêu đề</h1>    ← Clean DOM
<p>Nội dung</p>
```

### 2.2. Quy tắc #2: className thay vì class

🚨 **Lỗi thường gặp:**

```jsx
// ❌ LỖI - 'class' là keyword của JavaScript
<div class="container">Content</div>

// ✅ ĐÚNG
<div className="container">Content</div>
```

**Tại sao?** Vì JSX là JavaScript, và `class` là từ khóa để tạo class trong JS.

**Ví dụ thực tế:**

```jsx
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">{product.price.toLocaleString()} VNĐ</p>
      <button className="btn btn-primary">Mua ngay</button>
    </div>
  );
}
```

### 2.3. Quy tắc #3: Tự đóng tags (Self-closing)

```jsx
// ❌ HTML style - không hoạt động trong JSX
<img src="photo.jpg" alt="Photo">
<br>
<hr>
<input type="text">

// ✅ JSX style - phải có />
<img src="photo.jpg" alt="Photo" />
<br />
<hr />
<input type="text" />
```

### 2.4. Quy tắc #4: camelCase cho attributes

```jsx
// HTML attributes → JSX props
onclick      → onClick
onchange     → onChange
onfocus      → onFocus
tabindex     → tabIndex
maxlength    → maxLength
readonly     → readOnly
```

**Ví dụ:**

```jsx
<input
  type="email"
  maxLength={50}
  readOnly={false}
  onClick={handleClick}
  onChange={handleChange}
  onFocus={handleFocus}
/>
```

## 3. Nhúng JavaScript trong JSX với { }

### 3.1. Cú pháp cơ bản

Sử dụng dấu ngoặc nhọn `{}` để nhúng bất kỳ biểu thức JavaScript nào:

```jsx
const name = "React Developer";
const age = 25;
const skills = ["JavaScript", "React", "Node.js"];

function Profile() {
  return (
    <div className="profile">
      <h1>Xin chào, {name}!</h1>
      <p>Tuổi: {age}</p>
      <p>Kinh nghiệm: {age - 22} năm</p>
      <p>Số kỹ năng: {skills.length}</p>
      <p>Kỹ năng chính: {skills[0]}</p>
    </div>
  );
}
```

### 3.2. Expressions vs Statements

🟢 **Có thể dùng (Expressions):**

```jsx
{
  userName;
} // Variable
{
  user.firstName;
} // Property access
{
  2 + 3;
} // Arithmetic
{
  user.age >= 18;
} // Comparison
{
  user.isActive ? "Active" : "Inactive";
} // Ternary
{
  users.map((u) => u.name);
} // Array methods
{
  getUserName();
} // Function calls
{
  new Date().getFullYear();
} // Object methods
```

🔴 **KHÔNG thể dùng (Statements):**

```jsx
{if (user.isActive) { ... }}     // ❌ if statement
{for (let i = 0; i < 5; i++) { }}  // ❌ for loop
{let x = 5}                      // ❌ variable declaration
{return something}               // ❌ return statement
```

### 3.3. Ví dụ thực tế - Hiển thị thông tin sản phẩm

```jsx
function ProductCard({ product }) {
  const discountedPrice = product.price * (1 - product.discount / 100);
  const isOnSale = product.discount > 0;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <div className="price-section">
        {isOnSale ? (
          <>
            <span className="original-price">
              {product.price.toLocaleString()}
            </span>
            <span className="discounted-price">
              {discountedPrice.toLocaleString()}
            </span>
            <span className="discount">-{product.discount}%</span>
          </>
        ) : (
          <span className="regular-price">
            {product.price.toLocaleString()}
          </span>
        )}
      </div>

      <p className="description">
        {product.description.length > 100
          ? product.description.substring(0, 100) + "..."
          : product.description}
      </p>

      <div className="rating">
        Đánh giá: {product.rating}/5 ⭐ ({product.reviewCount} reviews)
      </div>

      <button
        className={`btn ${product.inStock ? "btn-primary" : "btn-disabled"}`}
        disabled={!product.inStock}
      >
        {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
      </button>
    </div>
  );
}

// Sử dụng component
const sampleProduct = {
  id: 1,
  name: "iPhone 15 Pro",
  price: 29990000,
  discount: 10,
  description: "iPhone 15 Pro với chip A17 Pro mạnh mẽ, camera ProRAW...",
  image: "/images/iphone15pro.jpg",
  rating: 4.8,
  reviewCount: 1250,
  inStock: true,
};

<ProductCard product={sampleProduct} />;
```

### 3.4. Xử lý Arrays trong JSX

**Hiển thị danh sách:**

```jsx
function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={todo.completed ? "completed" : ""}>
          <span className="todo-text">{todo.text}</span>
          <span className="todo-date">
            {new Date(todo.createdAt).toLocaleDateString("vi-VN")}
          </span>
        </li>
      ))}
    </ul>
  );
}
```

**Conditional rendering với arrays:**

```jsx
function NotificationList({ notifications }) {
  return (
    <div className="notifications">
      <h3>Thông báo ({notifications.length})</h3>

      {notifications.length === 0 ? (
        <p className="empty-state">Không có thông báo nào</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification ${notification.type}`}
          >
            <strong>{notification.title}</strong>
            <p>{notification.message}</p>
            <small>{notification.timeAgo}</small>
          </div>
        ))
      )}
    </div>
  );
}
```

## 4. Attributes và Props trong JSX

### 4.1. Static vs Dynamic Attributes

**Static attributes:**

```jsx
<img src="/logo.png" alt="Company Logo" />
<input type="email" placeholder="Nhập email của bạn" />
<button className="btn btn-primary">Gửi</button>
```

**Dynamic attributes:**

```jsx
function UserAvatar({ user, size = "medium" }) {
  const sizeClasses = {
    small: "avatar-sm",
    medium: "avatar-md",
    large: "avatar-lg",
  };

  return (
    <img
      src={user.avatar || "/default-avatar.png"}
      alt={`${user.firstName} ${user.lastName}`}
      className={`avatar ${sizeClasses[size]}`}
      title={`${user.firstName} ${user.lastName} - ${user.role}`}
    />
  );
}
```

### 4.2. Style attribute đặc biệt

HTML style: `style="color: red; font-size: 16px"`

JSX style: `style={{color: 'red', fontSize: '16px'}}`

**❗ Double curly braces:** `{{}}` = outer `{}` for JavaScript + inner `{}` for object

```jsx
function StyledComponent({ theme, isActive }) {
  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#333" : "#fff",
    color: theme === "dark" ? "#fff" : "#333",
    border: isActive ? "2px solid blue" : "1px solid gray",
    padding: "10px 15px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  };

  return (
    <div style={dynamicStyles}>
      <h3
        style={{
          margin: 0,
          fontSize: isActive ? "18px" : "16px",
          fontWeight: isActive ? "bold" : "normal",
        }}
      >
        Dynamic Styled Component
      </h3>
    </div>
  );
}

// CSS-in-JS với template strings (nâng cao)
const getButtonStyles = (variant, size) => {
  const baseStyles = "px-4 py-2 rounded transition-colors duration-200";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  const sizes = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  return `${baseStyles} ${variants[variant]} ${sizes[size]}`;
};

function Button({ children, variant = "primary", size = "md", onClick }) {
  return (
    <button className={getButtonStyles(variant, size)} onClick={onClick}>
      {children}
    </button>
  );
}
```

### 4.3. Event Handlers trong JSX

**Cú pháp cơ bản:**

```jsx
function InteractiveForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn form reload page

    if (!formData.agreeToTerms) {
      alert("Vui lòng đồng ý với điều khoản");
      return;
    }

    console.log("Form data:", formData);
    // Gửi dữ liệu lên server...
  };

  const handleResetForm = () => {
    setFormData({
      email: "",
      password: "",
      agreeToTerms: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onFocus={() => console.log("Email field focused")}
          onBlur={() => console.log("Email field blurred")}
          placeholder="example@email.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Mật khẩu:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === "Enter" && e.ctrlKey) {
              handleSubmit(e);
            }
          }}
          placeholder="Ít nhất 6 ký tự"
          minLength={6}
          required
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
          />
          Tôi đồng ý với điều khoản sử dụng
        </label>
      </div>

      <div className="form-actions">
        <button type="submit">Đăng nhập</button>
        <button type="button" onClick={handleResetForm}>
          Reset
        </button>
      </div>
    </form>
  );
}
```

## 5. Những lỗi JSX thường gặp và cách fix

### 5.1. Lỗi #1: Quên return

```jsx
// ❌ Thiếu return
function WelcomeMessage({ name }) {
  <h1>Xin chào {name}!</h1>;
}

// ✅ Có return
function WelcomeMessage({ name }) {
  return <h1>Xin chào {name}!</h1>;
}

// ✅ Implicit return với arrow function
const WelcomeMessage = ({ name }) => <h1>Xin chào {name}!</h1>;
```

### 5.2. Lỗi #2: Quên key prop trong lists

```jsx
// ❌ Thiếu key - React sẽ warning
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li>{user.name}</li> // ← Missing key!
      ))}
    </ul>
  );
}

// ✅ Có key prop
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li> // ← Good!
      ))}
    </ul>
  );
}

// 🚨 TRÁNH dùng index làm key khi list có thể thay đổi
{
  users.map((user, index) => (
    <li key={index}>{user.name}</li> // ← Có thể gây bug!
  ));
}
```

### 5.3. Lỗi #3: Đặt event handler sai cách

```jsx
// ❌ Gọi function ngay lập tức
<button onClick={handleClick()}>Click me</button>

// ✅ Truyền reference
<button onClick={handleClick}>Click me</button>

// ✅ Truyền arrow function nếu cần arguments
<button onClick={() => handleClick(userId)}>Delete user</button>

// ✅ Bind method cho class components
<button onClick={this.handleClick.bind(this)}>Click me</button>
```

### 5.4. Lỗi #4: Conditional rendering sai

```jsx
// ❌ Có thể render "0" thay vì ẩn
{
  users.length && <UserList users={users} />;
}

// ✅ Explicit boolean conversion
{
  users.length > 0 && <UserList users={users} />;
}

// ✅ Ternary operator
{
  users.length > 0 ? <UserList users={users} /> : null;
}

// ✅ Early return pattern
function UserSection({ users }) {
  if (users.length === 0) {
    return <div>Không có người dùng nào</div>;
  }

  return <UserList users={users} />;
}
```

### 5.5. Lỗi #5: Nhầm lẫn về naming

```jsx
// ❌ Dùng tên HTML thay vì React
<label for="email">Email</label>          // → htmlFor
<div class="container">                   // → className
<input readonly />                        // → readOnly
<img onclick="handler" />                 // → onClick

// ✅ React naming convention
<label htmlFor="email">Email</label>
<div className="container">
<input readOnly />
<img onClick={handler} />
```

## 6. Best Practices & Tips

### 6.1. Tổ chức JSX code

**❌ Khó đọc:**

```jsx
function MessyComponent() {
  return (
    <div className="card">
      <div className="header">
        <h1>Title</h1>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="toggle-btn"
        >
          {showDetails ? "Hide" : "Show"}
        </button>
      </div>
      <div className="body">
        {showDetails && (
          <div className="details">
            <p>Some details here</p>
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
```

**✅ Dễ đọc:**

```jsx
function CleanComponent() {
  const toggleButtonText = showDetails ? "Hide" : "Show";

  return (
    <div className="card">
      <div className="header">
        <h1>Title</h1>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="toggle-btn"
        >
          {toggleButtonText}
        </button>
      </div>

      <div className="body">
        {showDetails && (
          <div className="details">
            <p>Some details here</p>
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 6.2. Extract components khi cần

**❌ Component quá phức tạp:**

```jsx
function MegaComponent() {
  return (
    <div className="dashboard">
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>My App</span>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
          </ul>
        </nav>
        <div className="user-menu">
          <img src={user.avatar} alt={user.name} />
          <span>{user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="main">{/* Hundreds of lines more... */}</main>
    </div>
  );
}
```

**✅ Chia nhỏ components:**

```jsx
function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <Main />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <Logo />
      <Navigation />
      <UserMenu />
    </header>
  );
}

function Logo() {
  return (
    <div className="logo">
      <img src="/logo.png" alt="Logo" />
      <span>My App</span>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </nav>
  );
}

function UserMenu() {
  return (
    <div className="user-menu">
      <img src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 6.3. Performance tips

```jsx
// ✅ Extract static content outside render
const NAVIGATION_ITEMS = [
  { href: '/home', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

function NavigationComponent() {
  return (
    <nav>
      {NAVIGATION_ITEMS.map(item => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

// ✅ Use React.memo for expensive components
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  const processedData = useMemo(() => {
    return data.map(item => /* expensive calculation */);
  }, [data]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.result}</div>
      ))}
    </div>
  );
});
```

## 7. Debugging JSX

### 7.1. Console logs trong JSX

```jsx
function DebuggingComponent({ items }) {
  return (
    <div>
      {console.log("Rendering items:", items) || null}
      {items.map((item) => {
        console.log("Processing item:", item);
        return <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
}

// Hoặc dùng useEffect cho debugging
function BetterDebuggingComponent({ items }) {
  useEffect(() => {
    console.log("Items changed:", items);
  }, [items]);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### 7.2. React Developer Tools

**Cài đặt:** Chrome Extension "React Developer Tools"

**Cách dùng:**

1. Mở DevTools (F12)
2. Tab "Components" để xem component tree
3. Tab "Profiler" để analyze performance
4. Click vào component để xem props/state

**Pro tips:**

- Đặt `displayName` cho components để dễ debug
- Dùng `console.log` trong useEffect để track re-renders
- Sử dụng React.StrictMode để catch potential issues

Ngày mai chúng ta sẽ học về **Components và Props** - cách chia nhỏ UI thành các mảnh ghép có thể tái sử dụng! 🧩
onfocus → onFocus
tabindex → tabIndex
maxlength → maxLength
readonly → readOnly

````

**Ví dụ:**
```jsx
<input
  type="email"
  maxLength={50}
  readOnly={false}
  onClick={handleClick}
  onChange={handleChange}
  onFocus={handleFocus}
/>
````

    <h1>Tiêu đề</h1>
    <p>Đây là một đoạn văn.</p>

</>
);

````

### 2.2. Sử dụng `className` thay vì `class`

Vì `class` là từ khóa của JavaScript, JSX sử dụng `className`:

```jsx
// ✅ Đúng
const element = <div className="container">Nội dung</div>;

// ❌ Sai
const element = <div class="container">Nội dung</div>;
````

### 2.3. Đóng tag đầy đủ

Mọi tag đều phải được đóng:

```jsx
// ✅ Đúng
<img src="image.jpg" alt="Hình ảnh" />
<br />

// ❌ Sai
<img src="image.jpg" alt="Hình ảnh">
<br>
```

## 3. Nhúng biểu thức JavaScript vào JSX

Sử dụng dấu ngoặc nhọn `{}` để nhúng JavaScript vào JSX:

```jsx
const name = "An";
const age = 25;

const element = (
  <div>
    <h1>Xin chào, {name}!</h1>
    <p>Bạn {age} tuổi.</p>
    <p>Năm sau bạn sẽ {age + 1} tuổi.</p>
  </div>
);
```

### 3.1. Các biểu thức hợp lệ

```jsx
const user = {
  firstName: "Nguyễn",
  lastName: "An",
};

const element = (
  <div>
    {/* Gọi hàm */}
    <h1>{user.firstName + " " + user.lastName}</h1>

    {/* Biểu thức điều kiện */}
    <p>{age >= 18 ? "Đã trưởng thành" : "Còn nhỏ"}</p>

    {/* Gọi phương thức */}
    <p>{new Date().toLocaleDateString()}</p>
  </div>
);
```

## 4. Thuộc tính trong JSX

### 4.1. Thuộc tính với giá trị chuỗi

```jsx
const element = <img src="avatar.jpg" alt="Avatar" />;
```

### 4.2. Thuộc tính với biểu thức JavaScript

```jsx
const imageUrl = "https://example.com/image.jpg";
const element = <img src={imageUrl} alt="Hình ảnh" />;
```

### 4.3. Thuộc tính camelCase

JSX sử dụng camelCase cho các thuộc tính:

```jsx
// HTML: onclick, tabindex
// JSX: onClick, tabIndex
const button = (
  <button onClick={handleClick} tabIndex="1">
    Click me
  </button>
);
```

## 5. JSX vs HTML - Những khác biệt chính

| HTML       | JSX         |
| ---------- | ----------- |
| `class`    | `className` |
| `for`      | `htmlFor`   |
| `onclick`  | `onClick`   |
| `tabindex` | `tabIndex`  |
| `<input>`  | `<input />` |

## 6. Bình luận trong JSX

```jsx
const element = (
  <div>
    {/* Đây là bình luận trong JSX */}
    <h1>Tiêu đề</h1>
    {/* 
      Bình luận 
      nhiều dòng 
    */}
    <p>Nội dung</p>
  </div>
);
```

## 7. Ví dụ thực tế

```jsx
function App() {
  const user = {
    name: "Nguyễn Văn An",
    avatar: "https://example.com/avatar.jpg",
    isOnline: true,
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Chào mừng đến với ứng dụng React!</h1>
      </header>

      <div className="user-profile">
        <img src={user.avatar} alt={user.name} className="avatar" />
        <h2>{user.name}</h2>
        <span className={user.isOnline ? "status online" : "status offline"}>
          {user.isOnline ? "Đang online" : "Offline"}
        </span>
      </div>
    </div>
  );
}
```
