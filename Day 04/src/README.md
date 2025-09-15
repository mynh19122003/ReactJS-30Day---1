# Day 4 - State & Lifecycle Examples

Các file code mẫu cho ngày 4 về State Management và useEffect:

## Cấu trúc thư mục

```
src/
├── App.js                         # Component chính với navigation
└── components/
    ├── ShoppingCart.js            # Demo useState với localStorage
    ├── MultiStepForm.js           # Form nhiều bước với validation
    └── QuizApp.js                 # Quiz app với timer useEffect
```

## Cách chạy code

1. **Khởi tạo project React mới:**

```bash
npx create-react-app day04-demo
cd day04-demo
```

2. **Copy các file từ thư mục src/ này vào project:**

   - Thay thế nội dung file `src/App.js`
   - Tạo thư mục `src/components/`
   - Copy tất cả 3 components vào thư mục components

3. **Chạy ứng dụng:**

```bash
npm start
```

## Chi tiết từng component

### 1. ShoppingCart.js - Quản lý giỏ hàng

**State được sử dụng:**

- `items`: Array chứa các sản phẩm trong giỏ
- `products`: Array sản phẩm có sẵn

**Hooks và patterns:**

```javascript
// useState với array state
const [items, setItems] = useState([]);

// useEffect với localStorage
useEffect(() => {
  const savedCart = localStorage.getItem("shopping-cart");
  if (savedCart) {
    setItems(JSON.parse(savedCart));
  }
}, []);

// useEffect để sync với localStorage
useEffect(() => {
  localStorage.setItem("shopping-cart", JSON.stringify(items));
}, [items]);

// Immutable array updates
const addToCart = (product) => {
  setItems((prevItems) => {
    const existingItem = prevItems.find((item) => item.id === product.id);

    if (existingItem) {
      return prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }

    return [...prevItems, { ...product, quantity: 1 }];
  });
};
```

**Tính năng:**

- Thêm/xóa sản phẩm
- Cập nhật số lượng
- Tính tổng tiền tự động
- Lưu trữ persistent với localStorage
- Clear cart functionality

### 2. MultiStepForm.js - Form nhiều bước

**State được sử dụng:**

- `currentStep`: Number cho bước hiện tại
- `formData`: Object chứa tất cả dữ liệu form
- `errors`: Object validation errors
- `isSubmitting`: Boolean loading state

**Form validation pattern:**

```javascript
const [formData, setFormData] = useState({
  // Step 1: Personal Info
  fullName: "",
  email: "",
  phone: "",
  birthDate: "",

  // Step 2: Address
  address: "",
  city: "",
  district: "",

  // Step 3: Preferences
  interests: [],
  newsletter: false,
  notifications: true,
});

const validateStep1 = () => {
  const newErrors = {};

  if (!formData.fullName.trim()) {
    newErrors.fullName = "Vui lòng nhập họ tên";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Vui lòng nhập email";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email không hợp lệ";
  }

  return newErrors;
};
```

**Tính năng:**

- 4-step wizard với progress bar
- Real-time validation
- Conditional field requirements
- Multi-select checkboxes
- Radio buttons và toggles
- Form preview và confirmation
- Loading state simulation

### 3. QuizApp.js - Ứng dụng quiz

**State được sử dụng:**

- `currentQuestion`: Number index câu hỏi
- `selectedAnswers`: Object mapping câu trả lời
- `showResults`: Boolean hiển thị kết quả
- `timeLeft`: Number countdown timer
- `isActive`: Boolean trạng thái quiz

**Timer với useEffect:**

```javascript
const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
const [isActive, setIsActive] = useState(false);

useEffect(() => {
  let interval = null;

  if (isActive && timeLeft > 0 && !showResults) {
    interval = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          setShowResults(true);
          setIsActive(false);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
  } else {
    clearInterval(interval);
  }

  return () => clearInterval(interval);
}, [isActive, timeLeft, showResults]);
```

**Tính năng:**

- Multiple choice questions
- 5-minute countdown timer
- Progress tracking
- Score calculation
- Detailed results với explanations
- Auto-submit khi hết thời gian
- Restart functionality
- Copy results to clipboard

## State Management Patterns học được

### 1. **Object State Updates**

```javascript
// ❌ Mutating state directly
formData.fullName = "New Name";

// ✅ Immutable update với spread
setFormData((prev) => ({
  ...prev,
  fullName: "New Name",
}));
```

### 2. **Array State Updates**

```javascript
// Add item
setItems((prev) => [...prev, newItem]);

// Update item
setItems((prev) =>
  prev.map((item) =>
    item.id === targetId ? { ...item, quantity: item.quantity + 1 } : item
  )
);

// Remove item
setItems((prev) => prev.filter((item) => item.id !== targetId));
```

### 3. **Conditional State Updates**

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

### 4. **Side Effects với useEffect**

```javascript
// Mount effect
useEffect(() => {
  console.log("Component mounted");
}, []);

// Update effect với dependencies
useEffect(() => {
  localStorage.setItem("data", JSON.stringify(data));
}, [data]);

// Cleanup effect
useEffect(() => {
  const timer = setInterval(() => {
    // timer logic
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

## Performance Tips

1. **Functional Updates:** Sử dụng functional updates khi state mới phụ thuộc vào state cũ
2. **Dependency Arrays:** Luôn khai báo đúng dependencies trong useEffect
3. **Cleanup Functions:** Luôn cleanup timers, subscriptions, event listeners
4. **Immutable Updates:** Không mutate state directly, luôn tạo objects/arrays mới

## Bài tập mở rộng

1. **Shopping Cart nâng cao:**

   - Thêm coupon/discount system
   - Multiple payment methods
   - Order history
   - Product search và filter

2. **Form validation nâng cao:**

   - Async validation (check email exists)
   - File upload với preview
   - Auto-save draft
   - Form wizard với conditional steps

3. **Quiz app nâng cao:**

   - Different question types (multi-select, text input)
   - Difficulty levels
   - Category-based questions
   - Progress analytics

4. **Performance optimization:**
   - React.memo cho expensive components
   - useMemo cho calculations
   - useCallback cho functions
   - Virtual scrolling cho long lists

Hãy thử chỉnh sửa state và xem component re-render như thế nào!
