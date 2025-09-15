# Ngày 6: Bài tập Conditional Rendering

## Bài tập 1: User Authentication Flow

Tạo ứng dụng với flow đăng nhập hoàn chỉnh:

### Các trạng thái:

- **Loading:** Đang kiểm tra auth status
- **Unauthenticated:** Hiển thị form đăng nhập/đăng ký
- **Authenticated:** Hiển thị dashboard dựa trên role

### User roles:

```javascript
const USER_ROLES = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
  GUEST: "guest",
};
```

### Yêu cầu:

- Admin: Xem dashboard quản trị, quản lý users
- Moderator: Xem dashboard vừa phải, quản lý content
- User: Xem dashboard cá nhân
- Guest: Chỉ xem public content
- First-time user: Hiển thị welcome tour
- Unverified email: Hiển thị banner xác nhận email

## Bài tập 2: E-commerce Product Display

Tạo component hiển thị sản phẩm với nhiều điều kiện:

### Product data:

```javascript
const product = {
  id: 1,
  name: "iPhone 15 Pro",
  price: 25000000,
  originalPrice: 28000000,
  discount: 10,
  inStock: true,
  quantity: 5,
  isNew: true,
  isFeatured: true,
  category: "smartphones",
  rating: 4.5,
  reviews: 128,
  shipping: {
    free: true,
    fastDelivery: true,
    estimatedDays: 2,
  },
};
```

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
```

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
