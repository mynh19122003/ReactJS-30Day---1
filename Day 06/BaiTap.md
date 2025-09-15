# Ngày 6: Bài tập Conditional Rendering & UI State Management

## 🎯 Mục tiêu bài tập

Thực hành các patterns conditional rendering từ cơ bản đến nâng cao, bao gồm state management, loading states, error handling và responsive rendering.

---

## 📋 Bài tập 1: Dashboard với Multiple States ⭐⭐

### Yêu cầu:

Tạo một dashboard component có thể hiển thị các trạng thái khác nhau:

- Loading state với skeleton UI
- Error state với retry functionality
- Empty state khi không có data
- Success state với data visualization
- Offline state khi mất kết nối

### Acceptance Criteria:

- [ ] Component có ít nhất 5 states khác nhau
- [ ] Smooth transitions giữa các states
- [ ] Retry mechanism cho error state
- [ ] Skeleton loading animation
- [ ] Responsive design cho mobile/desktop

### Gợi ý implementation:

```jsx
const DASHBOARD_STATES = {
  LOADING: "loading",
  ERROR: "error",
  EMPTY: "empty",
  SUCCESS: "success",
  OFFLINE: "offline",
};

function Dashboard() {
  // State management cho multiple conditions
  // Loading skeleton components
  // Error retry logic
  // Offline detection
  // Data visualization components
}
```

### Bonus points:

- Thêm progress indicator cho loading
- Custom error messages dựa vào error type
- Smooth fade transitions giữa states
- Auto-retry mechanism với exponential backoff

---

## 📋 Bài tập 2: Authentication & Permission System ⭐⭐⭐

### Yêu cầu:

Xây dựng hệ thống authentication và permission với conditional rendering:

- Login/Logout functionality
- Role-based access control (Admin, User, Guest)
- Protected routes và components
- Permission guards cho các features
- Session timeout handling

### Acceptance Criteria:

- [ ] Multiple user roles với different permissions
- [ ] Protected components chỉ hiển thị với proper permissions
- [ ] Graceful fallbacks cho unauthorized access
- [ ] Session management với automatic logout
- [ ] Login form với validation và error handling

### Components cần tạo:

```jsx
// Core authentication components
function LoginForm() {}
function AuthProvider() {}
function PermissionGuard() {}
function ProtectedRoute() {}

// User role examples
const USER_ROLES = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
  GUEST: "guest",
};

const PERMISSIONS = {
  READ: "read",
  WRITE: "write",
  DELETE: "delete",
  ADMIN: "admin",
};
```

### Bonus points:

- Two-factor authentication flow
- Remember me functionality
- Password strength indicator
- Account lockout after failed attempts

---

## 📋 Bài tập 3: Responsive E-commerce Product Grid ⭐⭐⭐⭐

### Yêu cầu:

Tạo product grid responsive với advanced filtering và conditional rendering:

- Responsive layout (1-2-3-4 columns dựa vào screen size)
- Advanced filtering system (price, category, rating, availability)
- Search functionality với real-time results
- Loading states cho từng operation
- Error handling cho network requests
- Empty states cho different scenarios

### Acceptance Criteria:

- [ ] Responsive grid layout với media queries
- [ ] Multiple filter combinations
- [ ] Search với debouncing
- [ ] Loading states cho filtering/search
- [ ] Different empty states (no results, no products, network error)
- [ ] Infinite scroll hoặc pagination
- [ ] Product quick view modal

### Core Components:

```jsx
function ProductGrid() {
  // Responsive logic
  // Filter management
  // Search functionality
  // Loading states
  // Error handling
}

function ProductCard({ product, isLoading }) {
  // Skeleton loading state
  // Conditional product info display
  // Action buttons based on availability
}

function FilterSidebar() {
  // Multiple filter types
  // Clear filters functionality
  // Applied filters display
}
```

### Advanced Features:

- Sort functionality (price, rating, newest)
- Wishlist toggle với heart animation
- Quick add to cart
- Price comparison với competitors

---

## 📋 Bài tập 4: Multi-step Form Wizard ⭐⭐⭐⭐

### Yêu cầu:

Xây dựng form wizard phức tạp với conditional logic:

- Multi-step navigation với progress indicator
- Dynamic step validation
- Conditional fields dựa vào previous answers
- Save draft functionality
- Review step trước khi submit
- Error handling cho từng step

### Acceptance Criteria:

- [ ] Ít nhất 4 steps với different form types
- [ ] Progress indicator với step validation status
- [ ] Conditional fields based on user input
- [ ] Navigation với validation checks
- [ ] Draft saving với localStorage
- [ ] Comprehensive review step
- [ ] Submit với loading và success states

### Form Steps Example:

```jsx
const FORM_STEPS = [
  {
    id: 1,
    title: "Personal Information",
    component: PersonalInfoStep,
    validation: personalInfoSchema,
  },
  {
    id: 2,
    title: "Address Details",
    component: AddressStep,
    validation: addressSchema,
    conditional: (data) => data.personalInfo.needsShipping,
  },
  {
    id: 3,
    title: "Preferences",
    component: PreferencesStep,
    validation: preferencesSchema,
  },
  {
    id: 4,
    title: "Review & Submit",
    component: ReviewStep,
    isReview: true,
  },
];
```

### Advanced Features:

- Step branching logic (skip steps based on conditions)
- Real-time field validation
- Auto-save every 30 seconds
- Form analytics tracking

---

## 📋 Bài tập 5: Real-time Notification System ⭐⭐⭐⭐⭐

### Yêu cầu:

Tạo hệ thống notification real-time với complex conditional rendering:

- Multiple notification types (success, error, warning, info)
- Different display positions (top-right, bottom-left, center, etc.)
- Auto-dismiss với countdown
- Action buttons trong notifications
- Queue management cho multiple notifications
- Persistent vs temporary notifications
- Do not disturb mode
- Notification history

### Acceptance Criteria:

- [ ] Ít nhất 5 loại notifications khác nhau
- [ ] Multiple display positions và animations
- [ ] Queue system với priority handling
- [ ] Auto-dismiss với customizable timeouts
- [ ] Action buttons (Undo, View Details, etc.)
- [ ] Notification persistence across page reloads
- [ ] Sound notifications với volume control
- [ ] Accessibility compliance (screen readers)

### Core System:

```jsx
const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  PROMOTIONAL: "promotional",
};

const POSITIONS = {
  TOP_RIGHT: "top-right",
  TOP_LEFT: "top-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
  CENTER: "center",
};

function NotificationSystem() {
  // Queue management
  // Position rendering
  // Auto-dismiss logic
  // Animation handling
  // Accessibility features
}

function NotificationProvider() {
  // Context for global notification state
  // Add/remove notification methods
  // Settings management
}
```

### Advanced Features:

- Notification templates cho different scenarios
- Rich content support (images, videos, links)
- Notification grouping và stacking
- Real-time từ WebSocket/Server-Sent Events
- Notification scheduling
- A/B testing cho notification content

---

## 🎯 Deliverables

### Cho mỗi bài tập, tạo:

1. **Component Files:**

   - Main component với full implementation
   - Supporting components và utilities
   - Style files (CSS/SCSS)

2. **Documentation:**

   - README với setup instructions
   - Component API documentation
   - Usage examples

3. **Testing:**

   - Unit tests cho main functionality
   - Integration tests cho user flows
   - Accessibility tests

4. **Demo:**
   - Working demo với sample data
   - Interactive examples
   - Mobile responsive testing

---

## 🏆 Evaluation Criteria

### Code Quality (25%):

- Clean, readable code với proper naming
- Proper separation of concerns
- Error handling và edge cases
- Performance optimization

### Functionality (25%):

- All requirements implemented correctly
- Smooth user experience
- Responsive design
- Accessibility compliance

### UI/UX Design (25%):

- Intuitive user interface
- Consistent design system
- Smooth animations và transitions
- Mobile-first approach

### Advanced Features (25%):

- Creative solutions cho complex problems
- Performance optimizations
- Enhanced user experience
- Scalable architecture

---

## 📚 Tài liệu hỗ trợ

- [React Conditional Rendering Guide](https://reactjs.org/docs/conditional-rendering.html)
- [State Management Patterns](https://kentcdodds.com/blog/application-state-management-with-react)
- [Accessibility Best Practices](https://web.dev/accessibility/)
- [Performance Optimization](https://web.dev/react/)
- [Responsive Design Guidelines](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/CSS_Grid_and_Progressive_Enhancement)

Chúc các bạn coding vui vẻ! 🚀
rating: 4.5,
reviews: 128,
shipping: {
free: true,
fastDelivery: true,
estimatedDays: 2,
},
};

````

### Conditional displays:

- **Discount badge:** Hiển thị % giảm giá nếu có
- **Stock status:** "Còn hàng", "Sắp hết" (<5), "Hết hàng"
- **Price display:** Giá gốc gạch ngang nếu có giảm giá
- **New badge:** Hiển thị "NEW" nếu sản phẩm mới
- **Featured ribbon:** Banner "FEATURED" cho sản phẩm nổi bật
- **Rating stars:** Hiển thị sao và số reviews
- **Shipping info:** Free shipping, fast delivery badges
- **Action buttons:**
  - "Thêm vào giỏ" nếu còn hàng
  - "Thông báo khi có hàng" nếu hết hàng
  - "Mua ngay" nếu còn hàng và featured

## Bài tập 3: Weather Dashboard

Tạo dashboard thời tiết với conditional rendering:

### Weather data:

```javascript
const weatherData = {
  current: {
    temperature: 28,
    condition: "sunny", // sunny, cloudy, rainy, stormy
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 6,
  },
  alerts: [
    { type: "warning", message: "Nắng nóng gay gắt" },
    { type: "info", message: "Khả năng có mưa chiều" },
  ],
  forecast: [], // 7 day forecast
  airQuality: {
    aqi: 85,
    level: "moderate", // good, moderate, unhealthy
  },
};
````

### Conditional elements:

- **Weather icon:** Dựa trên condition
- **Background color:** Thay đổi theo thời tiết
- **Temperature color:** Xanh (<20°C), Vàng (20-30°C), Đỏ (>30°C)
- **UV Warning:** Cảnh báo nếu UV index > 7
- **Air quality indicator:** Màu sắc dựa trên AQI
- **Weather alerts:** Hiển thị cảnh báo nếu có
- **Clothing suggestion:** Gợi ý trang phục dựa trên thời tiết
- **Activity recommendation:** Gợi ý hoạt động outdoor

## Bài tập 4: Social Media Post

Tạo component hiển thị post trên mạng xã hội:

### Post data:

```javascript
const post = {
  id: 1,
  author: {
    name: "Nguyễn Văn An",
    avatar: "avatar.jpg",
    isVerified: true,
    isOnline: true,
  },
  content: "Hôm nay thời tiết đẹp quá!",
  images: ["img1.jpg", "img2.jpg"],
  video: null,
  createdAt: "2024-01-15T10:30:00Z",
  likes: 25,
  comments: 8,
  shares: 3,
  isLiked: false,
  isBookmarked: true,
  privacy: "public", // public, friends, private
  location: "Hà Nội, Việt Nam",
  edited: true,
  sponsored: false,
};
```

### Conditional rendering:

- **Verified badge:** Tick xanh cho user verified
- **Online indicator:** Chấm xanh nếu online
- **Media display:** Hình ảnh, video, hoặc không có
- **Engagement stats:** Hiển thị likes, comments, shares nếu > 0
- **Action buttons:** Like (filled nếu đã like), Comment, Share
- **Privacy indicator:** Icon khóa nếu không public
- **Location:** Hiển thị nếu có
- **Edited label:** "Đã chỉnh sửa" nếu edited
- **Sponsored tag:** "Tài trợ" nếu sponsored
- **Bookmark:** Filled icon nếu đã bookmark

## Bài tập 5: Form Validation với Visual Feedback

Tạo form đăng ký với conditional validation display:

### Validation rules:

```javascript
const validationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
    messages: {
      required: "Tên đăng nhập là bắt buộc",
      minLength: "Tối thiểu 3 ký tự",
      maxLength: "Tối đa 20 ký tự",
      pattern: "Chỉ chấp nhận chữ, số và dấu gạch dưới",
    },
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      required: "Email là bắt buộc",
      pattern: "Email không hợp lệ",
    },
  },
  password: {
    required: true,
    minLength: 8,
    mustHaveNumber: true,
    mustHaveSymbol: true,
    messages: {
      required: "Mật khẩu là bắt buộc",
      minLength: "Tối thiểu 8 ký tự",
      mustHaveNumber: "Phải có ít nhất 1 số",
      mustHaveSymbol: "Phải có ít nhất 1 ký tự đặc biệt",
    },
  },
};
```

### Conditional feedback:

- **Field status icons:** ✅ (valid), ❌ (invalid), ⚠️ (warning)
- **Input border colors:** Green (valid), Red (invalid), Yellow (warning)
- **Error messages:** Hiển thị lỗi cụ thể
- **Progress indicators:** Password strength meter
- **Real-time validation:** Validate khi user typing
- **Success messages:** "Tên đăng nhập khả dụng"
- **Loading states:** Checking availability
- **Submit button:** Disabled cho đến khi form valid

## Bài tập 6: Gaming Leaderboard

Tạo bảng xếp hạng game với nhiều điều kiện:

### Player data:

```javascript
const players = [
  {
    id: 1,
    username: "ProGamer123",
    score: 9850,
    rank: 1,
    avatar: "avatar1.jpg",
    level: 45,
    isOnline: true,
    country: "VN",
    achievements: ["first_place", "high_scorer"],
    streak: 5,
    lastSeen: "2024-01-15T10:30:00Z",
  },
  // ... more players
];
```

### Conditional elements:

- **Rank badges:** 🥇🥈🥉 cho top 3, số thứ tự cho còn lại
- **Online status:** Màu xanh username nếu online
- **Country flags:** Flag emoji dựa trên country code
- **Achievement icons:** Hiển thị achievement badges
- **Streak indicator:** 🔥 nếu streak > 3
- **Level colors:** Bronze (<10), Silver (10-30), Gold (30-50), Diamond (50+)
- **Score formatting:** 1K, 1M notation cho số lớn
- **Last seen:** "Online", "5 phút trước", etc.
- **Player highlight:** Highlight hàng của current user

## Bài tập 7: File Manager Interface

Tạo giao diện quản lý file:

### File data:

```javascript
const files = [
  {
    id: 1,
    name: "document.pdf",
    type: "pdf",
    size: 2048000, // bytes
    modified: "2024-01-15T10:30:00Z",
    isShared: true,
    isStarred: false,
    permissions: "read-write",
    owner: "me",
    thumbnail: "thumb.jpg",
  },
];
```

### Conditional rendering:

- **File type icons:** 📄 PDF, 📊 Excel, 🖼️ Image, etc.
- **File size:** Format thành KB, MB, GB
- **Modified time:** "Vừa xong", "5 phút trước", "Hôm qua"
- **Permission indicators:** 🔒 Read-only, 👥 Shared
- **Owner info:** "Của bạn", "Được chia sẻ bởi [Name]"
- **Starred files:** ⭐ icon
- **Thumbnails:** Hiển thị preview cho images
- **Context menu:** Different options based on permissions
- **Selection state:** Checkbox và highlight khi selected

## Kiểm tra kiến thức

1. ✅ Tôi có thể sử dụng if/else cho conditional rendering
2. ✅ Tôi hiểu cách dùng toán tử ternary (? :)
3. ✅ Tôi biết khi nào dùng toán tử && và ||
4. ✅ Tôi cẩn thận với falsy values (0, "", null, undefined)
5. ✅ Tôi có thể render lists với điều kiện
6. ✅ Tôi biết tách logic phức tạp thành helper functions
7. ✅ Tôi có thể apply conditional CSS classes và styles
8. ✅ Tôi hiểu pattern switch-like rendering

## Challenge

Xây dựng một **Dashboard Analytics** với:

- Multiple widget types dựa trên user permissions
- Real-time data với loading/error states
- Customizable layout (user có thể ẩn/hiện widgets)
- Responsive design (mobile vs desktop layout)
- Dark/light theme với conditional styling
- Export options dựa trên data availability
