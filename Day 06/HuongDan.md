# Ngày 6: Conditional Rendering và UI State Management

## 🎯 Mục tiêu học tập

Sau khi hoàn thành ngày 6, bạn sẽ:

- Nắm vững các patterns conditional rendering trong React
- Hiểu cách quản lý complex UI states
- Biết cách handle loading, error, và empty states
- Thực hành với advanced conditional patterns
- Optimize performance với conditional rendering

---

## 📚 Conditional Rendering Fundamentals

### 1. Tại sao cần Conditional Rendering?

Conditional rendering cho phép bạn:

- ✅ Hiển thị UI khác nhau dựa trên user state
- ✅ Handle loading và error states elegantly
- ✅ Tạo dynamic user experiences
- ✅ Optimize performance bằng cách không render unnecessary components
- ✅ Implement feature flags và A/B testing

### 2. Các Pattern cơ bản

#### 2.1. If/Else Pattern

```jsx
function WelcomeMessage({ isLoggedIn, user }) {
  // Early return pattern - Best for simple conditions
  if (isLoggedIn) {
    return (
      <div className="welcome-container">
        <h1>Chào mừng trở lại, {user.name}! 👋</h1>
        <p>Bạn có {user.notifications} thông báo mới</p>
      </div>
    );
  }

  return (
    <div className="login-prompt">
      <h1>Vui lòng đăng nhập 🔐</h1>
      <p>Đăng nhập để trải nghiệm đầy đủ tính năng</p>
    </div>
  );
}

// Guard pattern - Prevent rendering entirely
function ProtectedComponent({ hasPermission, children }) {
  if (!hasPermission) {
    return null; // Component sẽ không render gì cả
  }

  return <div className="protected-content">{children}</div>;
}
```

#### 2.2. Ternary Operator Pattern

```jsx
function StatusIndicator({ isOnline, lastSeen }) {
  return (
    <div className="status-indicator">
      <span className={`status-dot ${isOnline ? "online" : "offline"}`} />
      <span className="status-text">
        {isOnline
          ? "Đang hoạt động"
          : `Hoạt động lần cuối: ${formatTime(lastSeen)}`}
      </span>
    </div>
  );
}

// Nested ternary - Use sparingly
function UserBadge({ user }) {
  return (
    <div className="user-badge">
      {user ? (
        user.isPremium ? (
          <span className="premium-badge">👑 Premium</span>
        ) : user.isVerified ? (
          <span className="verified-badge">✅ Verified</span>
        ) : (
          <span className="basic-badge">👤 Basic</span>
        )
      ) : (
        <span className="guest-badge">👻 Guest</span>
      )}
    </div>
  );
}
```

#### 2.3. Logical && Operator

```jsx
function NotificationBell({ notifications }) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notification-bell">
      <span className="bell-icon">🔔</span>
      {unreadCount > 0 && (
        <span className="notification-badge">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </div>
  );
}

function ErrorMessage({ error, showDetails }) {
  return (
    <div className="error-container">
      {error && (
        <div className="error-message">
          <span className="error-icon">❌</span>
          <span>{error.message}</span>
          {showDetails && (
            <details className="error-details">
              <summary>Chi tiết lỗi</summary>
              <pre>{error.stack}</pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## 🔄 Complex State Management Patterns

### 3.1. Finite State Machines

```jsx
const STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

function DataFetcher({ url }) {
  const [state, setState] = useState(STATES.IDLE);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setState(STATES.LOADING);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      setData(result);
      setState(STATES.SUCCESS);
    } catch (err) {
      setError(err);
      setState(STATES.ERROR);
    }
  };

  const renderContent = () => {
    switch (state) {
      case STATES.IDLE:
        return (
          <div className="idle-state">
            <p>Nhấn nút để tải dữ liệu</p>
            <button onClick={fetchData}>Tải dữ liệu</button>
          </div>
        );

      case STATES.LOADING:
        return (
          <div className="loading-state">
            <div className="spinner">⏳</div>
            <p>Đang tải dữ liệu...</p>
          </div>
        );

      case STATES.SUCCESS:
        return (
          <div className="success-state">
            <h3>✅ Dữ liệu đã tải thành công!</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <button onClick={() => setState(STATES.IDLE)}>Reset</button>
          </div>
        );

      case STATES.ERROR:
        return (
          <div className="error-state">
            <h3>❌ Có lỗi xảy ra</h3>
            <p>{error.message}</p>
            <button onClick={fetchData}>Thử lại</button>
            <button onClick={() => setState(STATES.IDLE)}>Reset</button>
          </div>
        );

      default:
        return <div>Unknown state</div>;
    }
  };

  return (
    <div className="data-fetcher">
      <h2>Data Fetcher với State Machine</h2>
      {renderContent()}
    </div>
  );
}
```

### 3.2. Multi-step Conditional Flow

```jsx
function MultiStepWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    preferences: {},
    confirmation: {},
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: "Thông tin cá nhân", component: PersonalInfoStep },
    { id: 2, title: "Tùy chọn", component: PreferencesStep },
    { id: 3, title: "Xác nhận", component: ConfirmationStep },
  ];

  const currentStepData = steps.find((step) => step.id === currentStep);
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length;

  const canProceed = () => {
    // Complex validation logic based on current step
    switch (currentStep) {
      case 1:
        return formData.personalInfo.name && formData.personalInfo.email;
      case 2:
        return Object.keys(formData.preferences).length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (canProceed() && !isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const StepComponent = currentStepData.component;

  return (
    <div className="multi-step-wizard">
      {/* Progress Indicator */}
      <div className="progress-indicator">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`step ${
              step.id === currentStep
                ? "active"
                : step.id < currentStep
                ? "completed"
                : "pending"
            }`}
          >
            <span className="step-number">{step.id}</span>
            <span className="step-title">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      <div className="step-content">
        <StepComponent
          data={formData}
          onChange={setFormData}
          errors={errors}
          onError={setErrors}
        />
      </div>

      {/* Navigation */}
      <div className="step-navigation">
        {!isFirstStep && (
          <button
            type="button"
            onClick={prevStep}
            className="btn btn-secondary"
          >
            ← Quay lại
          </button>
        )}

        <div className="spacer" />

        {!isLastStep ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canProceed()}
            className="btn btn-primary"
          >
            Tiếp theo →
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canProceed()}
            className="btn btn-success"
          >
            Hoàn thành ✓
          </button>
        )}
      </div>
    </div>
  );
}
```

### 3.3. Permission-based Rendering

```jsx
const PERMISSIONS = {
  READ: "read",
  WRITE: "write",
  DELETE: "delete",
  ADMIN: "admin",
};

function PermissionGuard({ permission, userPermissions, children, fallback }) {
  const hasPermission =
    userPermissions.includes(permission) ||
    userPermissions.includes(PERMISSIONS.ADMIN);

  if (!hasPermission) {
    return (
      fallback || (
        <div className="permission-denied">
          <span>🚫</span>
          <p>Bạn không có quyền truy cập tính năng này</p>
        </div>
      )
    );
  }

  return children;
}

function DocumentActions({ document, userPermissions }) {
  return (
    <div className="document-actions">
      {/* Always visible */}
      <PermissionGuard
        permission={PERMISSIONS.READ}
        userPermissions={userPermissions}
      >
        <button className="btn btn-info">👁️ Xem</button>
      </PermissionGuard>

      {/* Conditional based on permissions */}
      <PermissionGuard
        permission={PERMISSIONS.WRITE}
        userPermissions={userPermissions}
      >
        <button className="btn btn-warning">✏️ Chỉnh sửa</button>
      </PermissionGuard>

      <PermissionGuard
        permission={PERMISSIONS.DELETE}
        userPermissions={userPermissions}
        fallback={
          <span className="disabled-action">🗑️ Xóa (Không có quyền)</span>
        }
      >
        <button className="btn btn-danger">🗑️ Xóa</button>
      </PermissionGuard>

      {/* Admin only features */}
      <PermissionGuard
        permission={PERMISSIONS.ADMIN}
        userPermissions={userPermissions}
      >
        <div className="admin-actions">
          <button className="btn btn-dark">⚙️ Cài đặt nâng cao</button>
          <button className="btn btn-secondary">📊 Thống kê</button>
        </div>
      </PermissionGuard>
    </div>
  );
}
```

---

## 🎨 Advanced Conditional Patterns

### 4.1. Render Props Pattern

```jsx
function ConditionalRenderer({ condition, children }) {
  if (typeof children === "function") {
    return children(condition);
  }

  return condition ? children : null;
}

// Usage
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div>
      <ConditionalRenderer condition={isLoggedIn}>
        {(loggedIn) =>
          loggedIn ? (
            <div>
              <h1>Welcome {user?.name}!</h1>
              <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            </div>
          ) : (
            <div>
              <h1>Please login</h1>
              <button onClick={() => setIsLoggedIn(true)}>Login</button>
            </div>
          )
        }
      </ConditionalRenderer>
    </div>
  );
}
```

### 4.2. Feature Flag System

```jsx
const useFeatureFlag = (flagName) => {
  const [flags, setFlags] = useState({
    newDashboard: true,
    betaFeatures: false,
    darkMode: true,
    advancedSearch: false,
  });

  const isEnabled = flags[flagName] ?? false;

  const toggle = () => {
    setFlags((prev) => ({
      ...prev,
      [flagName]: !prev[flagName],
    }));
  };

  return { isEnabled, toggle };
};

function FeatureFlag({ flag, children, fallback }) {
  const { isEnabled } = useFeatureFlag(flag);

  return isEnabled ? children : fallback || null;
}

// Usage in components
function Dashboard() {
  return (
    <div className="dashboard">
      <FeatureFlag flag="newDashboard" fallback={<LegacyDashboard />}>
        <NewDashboard />
      </FeatureFlag>

      <FeatureFlag flag="advancedSearch">
        <AdvancedSearchBox />
      </FeatureFlag>

      <FeatureFlag flag="betaFeatures">
        <div className="beta-features">
          <h3>🧪 Beta Features</h3>
          <ExperimentalComponent />
        </div>
      </FeatureFlag>
    </div>
  );
}
```

### 4.3. Responsive Conditional Rendering

```jsx
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);

    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, [query]);

  return matches;
};

function ResponsiveNavigation() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isMobile) {
    return (
      <nav className="mobile-nav">
        <button
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <MobileMenuItems />
          </div>
        )}
      </nav>
    );
  }

  if (isTablet) {
    return (
      <nav className="tablet-nav">
        <CompactMenuItems />
      </nav>
    );
  }

  if (isDesktop) {
    return (
      <nav className="desktop-nav">
        <FullMenuItems />
        <UserActions />
        <SearchBar />
      </nav>
    );
  }

  return null;
}
```

---

## ⚡ Performance Optimization

### 5.1. Lazy Loading Components

```jsx
const LazyComponent = lazy(() => import("./HeavyComponent"));

function ConditionalLazyLoader({ shouldLoad, loading = "Đang tải..." }) {
  if (!shouldLoad) {
    return null;
  }

  return (
    <Suspense fallback={<div>{loading}</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Advanced lazy loading with error boundary
function SmartLazyLoader({
  condition,
  componentPath,
  fallback,
  errorFallback,
}) {
  const [error, setError] = useState(null);

  if (!condition) return null;

  if (error) {
    return (
      errorFallback || (
        <div className="lazy-load-error">
          <p>❌ Không thể tải component</p>
          <button onClick={() => setError(null)}>Thử lại</button>
        </div>
      )
    );
  }

  return (
    <ErrorBoundary onError={setError}>
      <Suspense fallback={fallback || <div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### 5.2. Memoization with Conditions

```jsx
const ExpensiveComponent = memo(({ data, threshold }) => {
  const processedData = useMemo(() => {
    // Heavy computation only when necessary
    if (!data || data.length < threshold) {
      return [];
    }

    return data
      .filter((item) => item.active)
      .map((item) => ({
        ...item,
        processed: expensiveCalculation(item),
      }))
      .sort((a, b) => b.priority - a.priority);
  }, [data, threshold]);

  // Don't render if no data to show
  if (processedData.length === 0) {
    return (
      <div className="no-data">
        <span>📊</span>
        <p>Không có dữ liệu để hiển thị</p>
      </div>
    );
  }

  return (
    <div className="expensive-component">
      {processedData.map((item) => (
        <div key={item.id} className="data-item">
          {/* Complex rendering logic */}
        </div>
      ))}
    </div>
  );
});
```

---

## 🛠️ Best Practices & Common Patterns

### 6.1. Error Boundaries với Conditional Rendering

```jsx
class ConditionalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Conditional rendering error:", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return fallback ? (
        fallback(error)
      ) : (
        <div className="error-boundary">
          <h2>⚠️ Có lỗi xảy ra</h2>
          <details>
            <summary>Chi tiết lỗi</summary>
            <pre>{error?.toString()}</pre>
          </details>
        </div>
      );
    }

    return children;
  }
}

// Usage
function App() {
  return (
    <ConditionalErrorBoundary
      fallback={(error) => <CustomErrorPage error={error} />}
    >
      <ConditionalComponent />
    </ConditionalErrorBoundary>
  );
}
```

### 6.2. Testing Patterns

```jsx
// Component dễ test với clear conditions
function TestableConditionalComponent({ isLoading, hasError, data, user }) {
  // Early returns make testing easier
  if (isLoading) return <LoadingSpinner data-testid="loading" />;
  if (hasError) return <ErrorMessage data-testid="error" />;
  if (!user) return <LoginPrompt data-testid="login-prompt" />;
  if (!data?.length) return <EmptyState data-testid="empty-state" />;

  return (
    <div data-testid="main-content">
      <UserGreeting user={user} />
      <DataList data={data} />
    </div>
  );
}

// Test examples
test("shows loading state", () => {
  render(<TestableConditionalComponent isLoading={true} />);
  expect(screen.getByTestId("loading")).toBeInTheDocument();
});

test("shows error state", () => {
  render(<TestableConditionalComponent hasError={true} />);
  expect(screen.getByTestId("error")).toBeInTheDocument();
});
```

### 6.3. Accessibility Considerations

```jsx
function AccessibleConditionalContent({
  isVisible,
  children,
  announceChanges = true,
}) {
  const [announced, setAnnounced] = useState(false);

  useEffect(() => {
    if (isVisible && announceChanges && !announced) {
      // Announce to screen readers
      const announcement = document.createElement("div");
      announcement.textContent = "Nội dung mới đã được hiển thị";
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.style.position = "absolute";
      announcement.style.left = "-10000px";

      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);

      setAnnounced(true);
    }
  }, [isVisible, announceChanges, announced]);

  if (!isVisible) {
    return null;
  }

  return (
    <div role="region" aria-label="Nội dung có điều kiện" tabIndex="-1">
      {children}
    </div>
  );
}
```

---

## 📝 Summary & Next Steps

### Key Takeaways:

1. **Conditional Rendering Patterns:**

   - If/else cho logic đơn giản
   - Ternary operator cho inline conditions
   - Logical && cho optional rendering
   - Switch statements cho multiple states

2. **Advanced Techniques:**

   - State machines cho complex flows
   - Feature flags cho A/B testing
   - Responsive rendering cho multiple devices
   - Permission-based rendering cho security

3. **Performance Optimization:**

   - Lazy loading cho heavy components
   - Memoization cho expensive calculations
   - Early returns để tránh unnecessary renders

4. **Best Practices:**
   - Error boundaries cho error handling
   - Clear testing patterns
   - Accessibility considerations
   - Readable và maintainable code

### Chuẩn bị cho ngày tiếp theo:

- **Ngày 7:** Lists và Keys - Rendering dynamic content
- Hiểu về key props và performance implications
- Advanced list patterns và optimization techniques
- Virtual scrolling và infinite loading

---

## 🔗 Tài liệu tham khảo

- [React Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)
- [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
- [React.lazy và Suspense](https://reactjs.org/docs/code-splitting.html)
- [Testing Library Best Practices](https://testing-library.com/docs/guiding-principles)

```
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
