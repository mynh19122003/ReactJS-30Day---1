# Ngày 6: Rendering có điều kiện (Conditional Rendering)

## 1. Conditional Rendering là gì?

Conditional rendering cho phép bạn hiển thị các component hoặc element khác nhau dựa trên các điều kiện cụ thể, tương tự như câu lệnh if trong JavaScript.

## 2. Các cách thực hiện

### 2.1. Sử dụng if/else

```jsx
function WelcomeMessage({ isLoggedIn, user }) {
  if (isLoggedIn) {
    return <h1>Chào mừng trở lại, {user.name}!</h1>;
  } else {
    return <h1>Vui lòng đăng nhập.</h1>;
  }
}

// Hoặc có thể viết ngắn gọn hơn
function WelcomeMessage({ isLoggedIn, user }) {
  if (isLoggedIn) {
    return <h1>Chào mừng trở lại, {user.name}!</h1>;
  }

  return <h1>Vui lòng đăng nhập.</h1>;
}
```

### 2.2. Toán tử ba ngôi (Ternary Operator)

```jsx
function StatusMessage({ isLoading, error, data }) {
  return (
    <div>
      {isLoading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Lỗi: {error}</p>
      ) : (
        <p>Dữ liệu: {data}</p>
      )}
    </div>
  );
}

// Nested ternary (nên tránh nếu phức tạp)
function UserStatus({ user }) {
  return (
    <div>
      {user ? (
        user.isActive ? (
          <span className="online">🟢 {user.name} đang online</span>
        ) : (
          <span className="offline">⚫ {user.name} đang offline</span>
        )
      ) : (
        <span>Không có thông tin user</span>
      )}
    </div>
  );
}
```

### 2.3. Toán tử && (Logical AND)

```jsx
function NotificationBadge({ count }) {
  return (
    <div>
      <span>🔔</span>
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
}

function ErrorMessage({ error }) {
  return (
    <div>
      {error && (
        <div className="alert alert-danger">
          <strong>Lỗi!</strong> {error}
        </div>
      )}
    </div>
  );
}

// Lưu ý: Cẩn thận với falsy values
function ProblematicExample({ items }) {
  return (
    <div>
      {/* ❌ Nếu items.length = 0, sẽ render "0" */}
      {items.length && <p>Có {items.length} items</p>}

      {/* ✅ Cách đúng */}
      {items.length > 0 && <p>Có {items.length} items</p>}
    </div>
  );
}
```

### 2.4. Toán tử || (Logical OR)

```jsx
function Avatar({ user }) {
  return (
    <img
      src={user.avatar || "/default-avatar.png"}
      alt={user.name || "Unknown User"}
    />
  );
}

function UserGreeting({ user }) {
  return <h1>{user.displayName || user.username || user.email || "Guest"}</h1>;
}
```

## 3. Rendering Lists với điều kiện

```jsx
function ProductList({ products, showOutOfStock = false }) {
  const filteredProducts = showOutOfStock
    ? products
    : products.filter((product) => product.inStock);

  return (
    <div>
      <h2>Sản phẩm ({filteredProducts.length})</h2>

      {filteredProducts.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price.toLocaleString()} VNĐ
              {!product.inStock && (
                <span style={{ color: "red" }}> (Hết hàng)</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## 4. Component có điều kiện phức tạp

```jsx
function Dashboard({ user, permissions }) {
  // Helper functions để kiểm tra quyền
  const canViewUsers = permissions.includes("view_users");
  const canViewReports = permissions.includes("view_reports");
  const isAdmin = user.role === "admin";
  const isPremium = user.subscription === "premium";

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Always show */}
      <section className="overview">
        <h2>Tổng quan</h2>
        <p>Chào mừng {user.name}</p>
      </section>

      {/* Conditional sections */}
      {canViewUsers && (
        <section className="users">
          <h2>Quản lý người dùng</h2>
          {isAdmin ? <AdminUserList /> : <BasicUserList />}
        </section>
      )}

      {canViewReports && (
        <section className="reports">
          <h2>Báo cáo</h2>
          {isPremium ? <AdvancedReports /> : <BasicReports />}
        </section>
      )}

      {!isPremium && (
        <section className="upgrade-banner">
          <h3>Nâng cấp lên Premium</h3>
          <p>Mở khóa thêm nhiều tính năng!</p>
          <button>Nâng cấp ngay</button>
        </section>
      )}
    </div>
  );
}
```

## 5. Switch-like rendering

```jsx
function StatusIndicator({ status }) {
  const renderStatus = () => {
    switch (status) {
      case "loading":
        return <span className="spinner">⏳ Đang tải...</span>;
      case "success":
        return <span className="success">✅ Thành công</span>;
      case "error":
        return <span className="error">❌ Lỗi</span>;
      case "warning":
        return <span className="warning">⚠️ Cảnh báo</span>;
      default:
        return <span className="idle">⚪ Chờ</span>;
    }
  };

  return <div className="status">{renderStatus()}</div>;
}

// Hoặc sử dụng object mapping
function StatusIndicatorAlt({ status }) {
  const statusMap = {
    loading: <span className="spinner">⏳ Đang tải...</span>,
    success: <span className="success">✅ Thành công</span>,
    error: <span className="error">❌ Lỗi</span>,
    warning: <span className="warning">⚠️ Cảnh báo</span>,
    idle: <span className="idle">⚪ Chờ</span>,
  };

  return <div className="status">{statusMap[status] || statusMap.idle}</div>;
}
```

## 6. Conditional CSS Classes

```jsx
function Button({ variant, size, disabled, active, children }) {
  const getClassName = () => {
    let classes = ["btn"];

    if (variant) classes.push(`btn-${variant}`);
    if (size) classes.push(`btn-${size}`);
    if (disabled) classes.push("btn-disabled");
    if (active) classes.push("btn-active");

    return classes.join(" ");
  };

  // Hoặc sử dụng template literal
  const className = `
    btn
    ${variant ? `btn-${variant}` : ""}
    ${size ? `btn-${size}` : ""}
    ${disabled ? "btn-disabled" : ""}
    ${active ? "btn-active" : ""}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <button className={getClassName()} disabled={disabled}>
      {children}
    </button>
  );
}
```

## 7. Conditional Styles

```jsx
function ProgressBar({ progress, variant = "primary" }) {
  const getBarStyle = () => ({
    width: `${progress}%`,
    backgroundColor:
      variant === "success"
        ? "#28a745"
        : variant === "warning"
        ? "#ffc107"
        : variant === "danger"
        ? "#dc3545"
        : "#007bff",
    transition: "width 0.3s ease",
  });

  const getTextColor = () => {
    return progress > 50 ? "white" : "black";
  };

  return (
    <div className="progress-container">
      <div className="progress-bar" style={getBarStyle()}>
        {progress > 10 && (
          <span style={{ color: getTextColor() }}>{progress}%</span>
        )}
      </div>
    </div>
  );
}
```

## 8. Higher-Order Components cho điều kiện

```jsx
// HOC để wrap conditional rendering
function withConditionalRendering(WrappedComponent, condition) {
  return function ConditionalComponent(props) {
    if (!condition(props)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

// Sử dụng
const AdminOnlyPanel = withConditionalRendering(
  AdminPanel,
  (props) => props.user.role === "admin"
);

// Component tái sử dụng cho conditional rendering
function ConditionalRender({ condition, children, fallback = null }) {
  return condition ? children : fallback;
}

// Sử dụng
function App({ user, isLoading }) {
  return (
    <div>
      <ConditionalRender
        condition={isLoading}
        fallback={<MainContent user={user} />}
      >
        <LoadingSpinner />
      </ConditionalRender>

      <ConditionalRender condition={user.isPremium}>
        <PremiumFeatures />
      </ConditionalRender>
    </div>
  );
}
```

## 9. Ví dụ thực tế: Authentication Flow

```jsx
function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Kiểm tra authentication status
    checkAuthStatus()
      .then(setUser)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="loading-screen">
        <h2>Đang tải...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-screen">
        <h2>Có lỗi xảy ra</h2>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Thử lại</button>
      </div>
    );
  }

  // Main app based on auth status
  return (
    <div className="app">
      {user ? (
        <AuthenticatedApp user={user} onLogout={() => setUser(null)} />
      ) : (
        <UnauthenticatedApp onLogin={setUser} />
      )}
    </div>
  );
}

function AuthenticatedApp({ user, onLogout }) {
  return (
    <div>
      <Header user={user} onLogout={onLogout} />

      {user.isFirstTime && <WelcomeTour />}

      <main>
        {user.role === "admin" ? (
          <AdminDashboard />
        ) : user.role === "moderator" ? (
          <ModeratorDashboard />
        ) : (
          <UserDashboard />
        )}
      </main>

      {user.hasUnreadNotifications && <NotificationPanel />}
    </div>
  );
}
```

## 10. Best Practices

1. **Tránh nested ternary quá sâu** - Sử dụng helper functions thay thế
2. **Cẩn thận với falsy values** - `0`, `""`, `null`, `undefined` có thể render
3. **Sử dụng early return** - Để code dễ đọc hơn
4. **Tách logic phức tạp** - Đưa vào helper functions
5. **Consistent pattern** - Sử dụng cùng một pattern trong dự án
