# Day 6: Conditional Rendering & UI State Management

## 🎯 Overview

This directory contains comprehensive examples of conditional rendering patterns in React, covering everything from basic conditions to advanced state management and responsive design.

## 📁 Project Structure

```
src/
├── App.js                          # Main application entry point
├── ConditionalRenderingDemo.js     # Complete demo with 4 major examples
├── styles.css                      # Comprehensive styling for all demos
└── README.md                       # This documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- React knowledge (basic to intermediate)

### Installation & Running

```bash
# Navigate to Day 06 directory
cd "Day 06"

# Install dependencies
npm install react react-dom

# Create package.json if not exists
npm init -y

# Install additional development dependencies (optional)
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Start development server (you'll need to set this up)
# Or simply open the files in your preferred React development environment
```

## 🎨 Demo Components

### 1. Multi-State Dashboard (`MultiStateDashboard`)

**Purpose:** Demonstrates handling multiple UI states in a data dashboard.

**Features:**

- ✅ Loading state with skeleton UI animation
- ❌ Error state with retry functionality
- 📊 Empty state with call-to-action
- ✅ Success state with data visualization
- 📡 Offline state detection
- 🔄 State switching controls for testing

**Key Patterns:**

```jsx
// State machine approach
const DASHBOARD_STATES = {
  LOADING: "loading",
  ERROR: "error",
  EMPTY: "empty",
  SUCCESS: "success",
  OFFLINE: "offline",
};

// Switch statement for clean state handling
switch (state) {
  case DASHBOARD_STATES.LOADING:
    return <SkeletonLoader />;
  case DASHBOARD_STATES.ERROR:
    return <ErrorWithRetry />;
  // ... other states
}
```

**Learning Objectives:**

- Finite state machines in React
- Skeleton loading patterns
- Error boundary implementation
- Retry mechanisms with exponential backoff

---

### 2. Authentication System (`AuthenticationDemo`)

**Purpose:** Shows role-based access control with conditional rendering.

**Features:**

- 🔐 Multiple user roles (Admin, Moderator, User, Guest)
- 🛡️ Permission-based component rendering
- 🚫 Graceful fallbacks for unauthorized access
- ⏱️ Loading states for authentication flows
- 🎭 Role switching for testing different scenarios

**Key Patterns:**

```jsx
// Permission Guard component
const PermissionGuard = ({ permission, children, fallback }) => {
  if (!hasPermission(permission)) {
    return fallback || <AccessDenied />;
  }
  return children;
};

// Usage
<PermissionGuard permission={PERMISSIONS.WRITE}>
  <EditButton />
</PermissionGuard>;
```

**Learning Objectives:**

- Role-based access control (RBAC)
- Higher-order components for protection
- Authentication state management
- Graceful degradation for unauthorized users

---

### 3. Responsive Navigation (`ResponsiveNavDemo`)

**Purpose:** Demonstrates responsive conditional rendering based on screen size.

**Features:**

- 📱 Mobile navigation with hamburger menu
- 📟 Tablet navigation with compact layout
- 💻 Desktop navigation with full features
- 📐 Real-time window resize detection
- 🎨 Smooth transitions between layouts

**Key Patterns:**

```jsx
// Custom hook for media queries
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, [query]);

  return matches;
};

// Conditional rendering based on screen size
if (isMobile) return <MobileNav />;
if (isTablet) return <TabletNav />;
return <DesktopNav />;
```

**Learning Objectives:**

- Responsive design principles
- Media query hooks
- Progressive enhancement
- Mobile-first approach

---

### 4. Feature Flags System (`FeatureFlagsDemo`)

**Purpose:** Shows how to implement feature toggles for A/B testing and gradual rollouts.

**Features:**

- 🎛️ Toggle controls for different features
- 🧪 Beta feature gating
- 👑 Premium feature access
- 🔄 Real-time feature enabling/disabling
- 📊 Feature usage analytics (conceptual)

**Key Patterns:**

```jsx
// Feature flag hook
const useFeatureFlag = (flagName) => {
  const [flags, setFlags] = useState(initialFlags);

  const isEnabled = flags[flagName] ?? false;
  const toggle = () =>
    setFlags((prev) => ({
      ...prev,
      [flagName]: !prev[flagName],
    }));

  return { isEnabled, toggle };
};

// Feature Flag component
const FeatureFlag = ({ flag, children, fallback }) => {
  const { isEnabled } = useFeatureFlag(flag);
  return isEnabled ? children : fallback || null;
};
```

**Learning Objectives:**

- Feature flag implementation
- A/B testing infrastructure
- Gradual feature rollouts
- Configuration-driven UI

## 🎯 Key Conditional Rendering Patterns Covered

### 1. **If/Else Statements**

- Early returns for clean code
- Guard clauses for validation
- Complex branching logic

### 2. **Ternary Operators**

- Inline conditional rendering
- Nested ternary (use sparingly)
- Default value assignment

### 3. **Logical && Operator**

- Optional component rendering
- Conditional prop assignment
- Short-circuit evaluation

### 4. **Switch Statements**

- State machine implementation
- Multiple condition handling
- Exhaustive case coverage

### 5. **Higher-Order Components (HOCs)**

- Permission wrapping
- Conditional enhancement
- Reusable logic extraction

### 6. **Custom Hooks**

- Media query detection
- Feature flag management
- Authentication state

## 🛠️ Advanced Techniques

### Error Boundaries

```jsx
class ConditionalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error);
    }
    return this.props.children;
  }
}
```

### Render Props Pattern

```jsx
function ConditionalRenderer({ condition, children }) {
  if (typeof children === "function") {
    return children(condition);
  }
  return condition ? children : null;
}
```

### Lazy Loading with Conditions

```jsx
const LazyComponent = lazy(() => import("./HeavyComponent"));

function ConditionalLazyLoader({ shouldLoad }) {
  if (!shouldLoad) return null;

  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
```

## 🧪 Testing Patterns

### Component Testing

```jsx
// Test different states
test("shows loading state", () => {
  render(<Component isLoading={true} />);
  expect(screen.getByTestId("loading")).toBeInTheDocument();
});

test("shows error state", () => {
  render(<Component hasError={true} />);
  expect(screen.getByTestId("error")).toBeInTheDocument();
});
```

### Permission Testing

```jsx
test("hides admin content for regular users", () => {
  render(<Component user={{ role: "user" }} />);
  expect(screen.queryByTestId("admin-panel")).not.toBeInTheDocument();
});
```

## 🎨 Styling Approach

### CSS Organization

- **Component-specific styles:** Each demo has isolated styling
- **Responsive design:** Mobile-first approach with media queries
- **Animation:** Smooth transitions for state changes
- **Accessibility:** Focus states and screen reader support

### Key CSS Features

- Grid and Flexbox layouts
- CSS animations and transitions
- Responsive breakpoints
- Modern CSS properties (custom properties, grid)

## 📚 Learning Resources

### React Documentation

- [Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)
- [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
- [Code Splitting](https://reactjs.org/docs/code-splitting.html)

### Design Patterns

- [React Patterns](https://reactpatterns.com/)
- [Component Patterns](https://www.patterns.dev/posts/react-component-patterns/)

### Accessibility

- [React Accessibility](https://reactjs.org/docs/accessibility.html)
- [ARIA Guidelines](https://www.w3.org/WAI/ARIA/apg/)

## 🔧 Customization

### Adding New Demos

1. Create new component in `ConditionalRenderingDemo.js`
2. Add styles in `styles.css`
3. Include in demo navigation
4. Update this README

### Extending Existing Demos

- Add new states to the dashboard
- Include more user roles
- Add breakpoints for responsive nav
- Create more feature flags

## 🚀 Next Steps

### Day 7 Preview

Tomorrow we'll cover **Lists and Keys**, building on conditional rendering:

- Dynamic list rendering
- Key prop optimization
- Virtual scrolling
- Infinite loading patterns

### Advanced Topics to Explore

- React Suspense for data fetching
- Concurrent rendering patterns
- State machines with XState
- Advanced animation libraries

## 💡 Best Practices Summary

1. **Keep conditions simple:** Use early returns over nested conditions
2. **Handle loading states:** Always provide feedback during async operations
3. **Plan for errors:** Implement error boundaries and fallbacks
4. **Test all paths:** Ensure every conditional branch is tested
5. **Consider accessibility:** Make conditional content accessible to all users
6. **Performance matters:** Use lazy loading for heavy components
7. **Progressive enhancement:** Start with basic functionality, add features conditionally

---

**Happy Coding! 🎉**

This demo provides a comprehensive foundation for understanding conditional rendering in React. Experiment with different patterns and see how they apply to your real-world projects!
