# Ngày 2: Bài tập JSX

## Bài tập 1: Chuyển đổi HTML sang JSX

Hãy chuyển đổi đoạn HTML sau thành JSX hợp lệ:

```html
<div class="container">
  <h1>Danh sách sản phẩm</h1>
  <div class="product">
    <img src="product1.jpg" alt="Sản phẩm 1" />
    <h3>iPhone 15</h3>
    <p class="price">25,000,000 VNĐ</p>
    <button onclick="addToCart()">Thêm vào giỏ hàng</button>
  </div>
  <hr />
  <footer>
    <p>&copy; 2024 Cửa hàng điện thoại</p>
  </footer>
</div>
```

**Gợi ý:** Chú ý các điểm cần thay đổi:

- `class` → `className`
- `onclick` → `onClick`
- Đóng tag `<img>` và `<hr>`

## Bài tập 2: Sử dụng biểu thức JavaScript trong JSX

Tạo một component hiển thị thông tin cá nhân với dữ liệu sau:

```javascript
const person = {
  firstName: "Nguyễn",
  lastName: "Minh",
  age: 23,
  email: "minh.nguyen@email.com",
  hobbies: ["đọc sách", "nghe nhạc", "du lịch"],
  isStudent: true,
};
```

Yêu cầu:

1. Hiển thị họ tên đầy đủ
2. Hiển thị tuổi và năm sinh (2024 - tuổi)
3. Hiển thị email
4. Hiển thị trạng thái (sinh viên/đi làm)
5. Hiển thị số lượng sở thích

## Bài tập 3: Render có điều kiện đơn giản

Tạo component hiển thị thông báo chào dựa trên thời gian trong ngày:

```javascript
const currentHour = new Date().getHours();
```

Yêu cầu:

- 5-12h: "Chào buổi sáng!"
- 12-18h: "Chào buổi chiều!"
- 18-22h: "Chào buổi tối!"
- 22h-5h: "Chúc ngủ ngon!"

Sử dụng toán tử ba ngôi để hiển thị thông báo phù hợp.

## Bài tập 4: Styling với JSX

Tạo một card sản phẩm với styling inline và className:

```javascript
const product = {
  name: "Laptop Dell XPS 13",
  price: 35000000,
  image: "https://via.placeholder.com/300x200",
  inStock: true,
  discount: 10,
};
```

Yêu cầu:

1. Sử dụng styling inline cho:
   - Màu xanh cho giá gốc
   - Màu đỏ và gạch ngang cho giá cũ (nếu có giảm giá)
   - Màu xám cho sản phẩm hết hàng
2. Sử dụng className cho layout cơ bản
3. Hiển thị phần trăm giảm giá (nếu có)
4. Hiển thị trạng thái "Còn hàng" hoặc "Hết hàng"

## Bài tập 5: Component phức tạp

Tạo component `WeatherCard` hiển thị thông tin thời tiết:

```javascript
const weatherData = {
  city: "Hà Nội",
  temperature: 28,
  condition: "sunny", // có thể là: sunny, cloudy, rainy
  humidity: 65,
  windSpeed: 12,
};
```

Yêu cầu:

1. Hiển thị icon thời tiết dựa vào điều kiện (có thể dùng emoji: ☀️ 🌤️ 🌧️)
2. Hiển thị nhiệt độ với đơn vị °C
3. Hiển thị độ ẩm và tốc độ gió
4. Thay đổi màu nền card dựa vào điều kiện thời tiết:
   - Sunny: màu vàng nhạt
   - Cloudy: màu xám nhạt
   - Rainy: màu xanh nhạt

## Đáp án mẫu

Tham khảo file trong thư mục `src/` để xem các đáp án mẫu cho từng bài tập.

## Kiểm tra kiến thức

Sau khi hoàn thành các bài tập, hãy tự kiểm tra:

1. ✅ Tôi có thể chuyển đổi HTML sang JSX đúng cách
2. ✅ Tôi hiểu cách nhúng JavaScript vào JSX với `{}`
3. ✅ Tôi biết sự khác biệt giữa HTML và JSX (className, htmlFor, etc.)
4. ✅ Tôi có thể sử dụng biểu thức điều kiện trong JSX
5. ✅ Tôi biết cách áp dụng styling trong JSX
