# Ngày 3: Bài tập Components và Props

## Bài tập 1: Tạo Component cơ bản

Tạo các component sau:

1. **`Avatar` component:** Hiển thị ảnh đại diện với props:

   - `src`: đường dẫn ảnh
   - `alt`: text thay thế
   - `size`: kích thước (small, medium, large)

2. **`Badge` component:** Hiển thị nhãn với props:

   - `text`: nội dung nhãn
   - `color`: màu sắc (primary, success, warning, danger)

3. **`StatusIndicator` component:** Hiển thị trạng thái online/offline với props:
   - `isOnline`: boolean
   - `username`: tên người dùng

## Bài tập 2: Component với Props phức tạp

Tạo component `UserProfile` nhận props là object user:

```javascript
const user = {
  id: 1,
  name: "Nguyễn Văn An",
  email: "an.nguyen@email.com",
  avatar: "https://via.placeholder.com/100",
  bio: "Lập trình viên React với 3 năm kinh nghiệm",
  skills: ["JavaScript", "React", "Node.js", "MongoDB"],
  isOnline: true,
  joinDate: "2021-03-15",
  socialLinks: {
    github: "https://github.com/anvn",
    linkedin: "https://linkedin.com/in/anvn",
  },
};
```

Component cần hiển thị:

- Avatar và trạng thái online
- Thông tin cơ bản (tên, email, bio)
- Danh sách kỹ năng (dùng Badge component từ bài 1)
- Ngày tham gia (format đẹp)
- Links mạng xã hội

## Bài tập 3: Component với Props children

1. **`Card` component:** Container có header, body, footer

```jsx
<Card title="Thông tin cá nhân" footer={<button>Chỉnh sửa</button>}>
  <p>Nội dung trong card</p>
</Card>
```

2. **`Alert` component:** Hiển thị thông báo

```jsx
<Alert type="success" dismissible onClose={handleClose}>
  <h4>Thành công!</h4>
  <p>Dữ liệu đã được lưu.</p>
</Alert>
```

## Bài tập 4: Props drilling và Event handling

Tạo ứng dụng quản lý giỏ hàng đơn giản:

```
App
├── Header (hiển thị tổng số sản phẩm trong giỏ)
├── ProductList
│   └── ProductCard (có nút "Thêm vào giỏ")
└── Cart
    └── CartItem (có nút "Xóa khỏi giỏ")
```

Dữ liệu mẫu:

```javascript
const products = [
  { id: 1, name: "Laptop", price: 20000000, image: "laptop.jpg" },
  { id: 2, name: "Mouse", price: 500000, image: "mouse.jpg" },
  { id: 3, name: "Keyboard", price: 1500000, image: "keyboard.jpg" },
];
```

Yêu cầu:

- State giỏ hàng được quản lý ở component `App`
- Truyền hàm `addToCart` và `removeFromCart` xuống các component con
- Hiển thị tổng tiền trong giỏ hàng

## Bài tập 5: Component tái sử dụng

Tạo component `Button` linh hoạt với props:

```javascript
const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  fullWidth = false,
}) => {
  // Implementation here
};
```

Variants: primary, secondary, success, danger, warning, info
Sizes: small, medium, large

Sử dụng component này trong các trường hợp:

```jsx
<Button>Mặc định</Button>
<Button variant="danger" size="large">Xóa</Button>
<Button loading={true}>Đang xử lý...</Button>
<Button disabled={true}>Không khả dụng</Button>
<Button fullWidth={true}>Nút toàn bộ chiều rộng</Button>
```

## Bài tập 6: Form Components

Tạo các form component tái sử dụng:

1. **`Input` component:**

```jsx
<Input
  label="Email"
  type="email"
  placeholder="Nhập email của bạn"
  value={email}
  onChange={setEmail}
  error={emailError}
  required={true}
/>
```

2. **`Select` component:**

```jsx
<Select
  label="Thành phố"
  options={cities}
  value={selectedCity}
  onChange={setSelectedCity}
  placeholder="Chọn thành phố"
/>
```

3. **`Checkbox` component:**

```jsx
<Checkbox
  label="Tôi đồng ý với điều khoản"
  checked={agreed}
  onChange={setAgreed}
/>
```

Tạo form đăng ký sử dụng các component này.

## Bài tập 7: Component với Default Props

Tạo component `ProductCard` với nhiều props tùy chọn:

```jsx
const ProductCard = ({
  product,
  showDescription = true,
  showPrice = true,
  showAddToCart = true,
  imageSize = "medium",
  priceColor = "primary",
  onAddToCart,
  onViewDetails,
}) => {
  // Implementation
};
```

Sử dụng component này theo nhiều cách khác nhau để hiển thị sản phẩm trong:

- Danh sách sản phẩm chính (đầy đủ thông tin)
- Sidebar sản phẩm gợi ý (chỉ tên và giá)
- Modal xem nhanh (không có nút thêm vào giỏ)

## Kiểm tra kiến thức

Sau khi hoàn thành bài tập:

1. ✅ Tôi hiểu cách tạo và sử dụng function component
2. ✅ Tôi biết cách truyền và nhận props
3. ✅ Tôi có thể sử dụng destructuring với props
4. ✅ Tôi hiểu về props children
5. ✅ Tôi biết cách xử lý events thông qua props
6. ✅ Tôi có thể tạo component tái sử dụng
7. ✅ Tôi hiểu luồng dữ liệu một chiều trong React

## Thử thách nâng cao

Xây dựng một ứng dụng "Todo List" hoàn chỉnh với các component:

- `TodoApp`: Component chính quản lý state
- `TodoForm`: Form thêm todo mới
- `TodoList`: Danh sách todos
- `TodoItem`: Item todo đơn lẻ
- `TodoFilter`: Bộ lọc (All, Active, Completed)
- `TodoStats`: Thống kê số lượng todo

Mỗi todo có: id, text, completed, createdAt
