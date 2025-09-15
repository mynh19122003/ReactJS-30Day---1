# Ngày 4: Bài tập State và Lifecycle

## Bài tập 1: Counter cơ bản và nâng cao

### Phần A: Counter đơn giản

Tạo component Counter với các chức năng:

- Hiển thị số đếm hiện tại
- Nút tăng (+1)
- Nút giảm (-1)
- Nút reset về 0

### Phần B: Counter nâng cao

Mở rộng Counter với:

- Nút tăng/giảm 5 đơn vị
- Nút tăng/giảm 10 đơn vị
- Input để nhập bước nhảy tùy chỉnh
- Hiển thị lịch sử 5 giá trị gần nhất
- Màu sắc thay đổi theo giá trị (âm=đỏ, 0=xám, dương=xanh)

## Bài tập 2: Form đăng ký người dùng

Tạo form đăng ký với các trường:

- Họ tên (required, min 2 ký tự)
- Email (required, valid email)
- Mật khẩu (required, min 6 ký tự)
- Xác nhận mật khẩu (phải khớp với mật khẩu)
- Ngày sinh (không được quá 13 tuổi)
- Giới tính (Nam/Nữ/Khác)
- Sở thích (checkbox multiple: đọc sách, xem phim, du lịch, thể thao)
- Đồng ý điều khoản (checkbox required)

Yêu cầu:

- Validate realtime khi user nhập
- Hiển thị lỗi dưới mỗi trường
- Disable nút submit khi form không hợp lệ
- Hiển thị loading khi submit
- Reset form sau khi submit thành công

## Bài tập 3: Todo List với filter và stats

### Yêu cầu cơ bản:

- Thêm todo mới
- Đánh dấu hoàn thành/chưa hoàn thành
- Xóa todo
- Chỉnh sửa todo (double click để edit)

### Yêu cầu nâng cao:

- Filter: Tất cả, Đang làm, Hoàn thành
- Search todos theo tên
- Bulk actions: Đánh dấu tất cả, Xóa hoàn thành
- Thống kê: Tổng số, Hoàn thành, Còn lại
- Sort theo: Tên, Ngày tạo, Trạng thái
- Categories cho todo (Công việc, Cá nhân, Học tập)
- Due date cho todo
- Priority (Cao, Trung bình, Thấp)

## Bài tập 4: Shopping Cart

Tạo giỏ hàng với state phức tạp:

### Dữ liệu mẫu:

```javascript
const products = [
  {
    id: 1,
    name: "iPhone 15",
    price: 25000000,
    image: "iphone.jpg",
    category: "phone",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 22000000,
    image: "samsung.jpg",
    category: "phone",
  },
  {
    id: 3,
    name: "MacBook Pro",
    price: 50000000,
    image: "macbook.jpg",
    category: "laptop",
  },
  {
    id: 4,
    name: "Dell XPS 13",
    price: 30000000,
    image: "dell.jpg",
    category: "laptop",
  },
];
```

### Chức năng:

- Hiển thị danh sách sản phẩm
- Thêm vào giỏ hàng (tăng quantity nếu đã có)
- Hiển thị giỏ hàng với quantity và subtotal
- Thay đổi quantity trong giỏ hàng
- Xóa sản phẩm khỏi giỏ hàng
- Hiển thị tổng tiền
- Apply mã giảm giá (SAVE10 = 10%, SAVE20 = 20%)
- Tính shipping fee (free nếu > 30M, ngược lại 50K)
- Clear toàn bộ giỏ hàng

## Bài tập 5: Weather App với Multiple States

Tạo ứng dụng thời tiết:

### State cần quản lý:

- Current weather data
- Loading state
- Error state
- City input
- Search history (5 thành phố gần nhất)
- Favorite cities
- Temperature unit (C/F)
- Background theme dựa trên thời tiết

### Mock Data:

```javascript
const weatherData = {
  hanoi: {
    city: "Hà Nội",
    temperature: 28,
    condition: "sunny",
    humidity: 65,
    windSpeed: 12,
    description: "Trời nắng",
  },
  hochiminh: {
    city: "Hồ Chí Minh",
    temperature: 32,
    condition: "cloudy",
    humidity: 78,
    windSpeed: 8,
    description: "Nhiều mây",
  },
};
```

### Chức năng:

- Search thành phố (giả lập với setTimeout)
- Toggle C/F
- Add/remove favorite cities
- Click vào history để search lại
- Auto-refresh mỗi 30s (dùng setInterval)

## Bài tập 6: Game "Guess the Number"

Tạo game đoán số:

### Luật chơi:

- Máy random số từ 1-100
- User nhập số để đoán
- Hiển thị "Cao hơn", "Thấp hơn", hoặc "Chính xác"
- Giới hạn 10 lần đoán
- Hiển thị lịch sử các lần đoán
- Score system (ít lần đoán = điểm cao hơn)

### State cần quản lý:

- Số cần đoán
- Input user
- Số lần đoán đã sử dụng
- Lịch sử đoán
- Game state (playing, won, lost)
- Score hiện tại
- High score (lưu trong localStorage - bonus)

## Bài tập 7: Timer/Stopwatch App

Tạo ứng dụng đồng hồ đa chức năng:

### Timer:

- Set minutes và seconds
- Start/Pause/Reset
- Countdown hiển thị
- Alert khi hết giờ

### Stopwatch:

- Start/Pause/Reset
- Lap times (ghi nhận thời gian tại thời điểm bấm)
- Hiển thị best lap và worst lap

### State Management:

- Current time
- Is running
- Start time
- Pause time
- Lap times array
- Mode (timer/stopwatch)

## Kiểm tra kiến thức

Sau khi hoàn thành bài tập:

1. ✅ Tôi hiểu useState hook và cách sử dụng
2. ✅ Tôi biết cách cập nhật state với các kiểu dữ liệu khác nhau
3. ✅ Tôi hiểu tại sao phải tạo object/array mới khi cập nhật state
4. ✅ Tôi biết khi nào nên dùng function trong setState
5. ✅ Tôi có thể quản lý multiple states trong một component
6. ✅ Tôi hiểu về lifecycle của function component
7. ✅ Tôi biết cách validate form với state
8. ✅ Tôi có thể xử lý async operations với state

## Tips và Best Practices

1. **Đặt tên state rõ ràng:** `isLoading`, `hasError`, `userList`
2. **Nhóm related state:** Nếu 2 state luôn thay đổi cùng nhau, cân nhặc dùng object
3. **Tránh deep nesting:** State object không nên quá sâu và phức tạp
4. **Sử dụng functional updates:** Khi state mới phụ thuộc state cũ
5. **State colocate:** Đặt state gần nơi sử dụng nhất
