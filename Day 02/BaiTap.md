# Ngày 2: Bài tập JSX - Thực hành Cú pháp và Expressions

## 🎯 Mục tiêu bài tập

Thực hành chuyển đổi HTML sang JSX, sử dụng JavaScript expressions, và hiểu rõ những điểm khác biệt quan trọng.

---

## 📋 Bài tập 1: Chuyển đổi HTML sang JSX ⭐

### Yêu cầu:

Chuyển đổi đoạn HTML sau thành JSX hợp lệ trong React component

### HTML gốc cần chuyển đổi:

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

### Template để bắt đầu:

```jsx
import React from 'react';

function ProductList() {
  // TODO: Thêm function addToCart
  const addToCart = () => {
    console.log('Đã thêm sản phẩm vào giỏ hàng!');
  };

  return (
    // TODO: Chuyển đổi HTML thành JSX
    // Chú ý:
    // 1. class -> className
    // 2. onclick -> onClick
    // 3. Self-closing tags: <img />, <hr />
    // 4. Event handler: onClick={addToCart} hoặc onClick={() => addToCart()}
  );
}

export default ProductList;
```

### 🔍 Điểm cần chú ý khi chuyển đổi:

1. **`class` → `className`** (vì `class` là keyword trong JS)
2. **`onclick` → `onClick`** (camelCase trong React)
3. **Self-closing tags**: `<img />`, `<hr />` thay vì `<img>`, `<hr>`
4. **Event handlers**: `onClick={function}` thay vì `onclick="function()"`

### ✅ Solution kiểm tra:

```jsx
function ProductList() {
  const addToCart = () => {
    console.log("Đã thêm sản phẩm vào giỏ hàng!");
  };

  return (
    <div className="container">
      <h1>Danh sách sản phẩm</h1>
      <div className="product">
        <img src="product1.jpg" alt="Sản phẩm 1" />
        <h3>iPhone 15</h3>
        <p className="price">25,000,000 VNĐ</p>
        <button onClick={addToCart}>Thêm vào giỏ hàng</button>
      </div>
      <hr />
      <footer>
        <p>&copy; 2024 Cửa hàng điện thoại</p>
      </footer>
    </div>
  );
}
```

---

## 📋 Bài tập 2: JavaScript Expressions trong JSX ⭐⭐

### Yêu cầu:

Tạo component hiển thị thông tin cá nhân sử dụng JavaScript expressions và conditional rendering

### Data object để sử dụng:

```javascript
const person = {
  firstName: "Nguyễn",
  lastName: "Minh",
  age: 23,
  email: "minh.nguyen@email.com",
  hobbies: ["đọc sách", "nghe nhạc", "du lịch"],
  isStudent: true,
  profilePicture: "https://via.placeholder.com/150x150/4CAF50/white?text=NM",
};
```

### Template để bắt đầu:

```jsx
import React from 'react';

function PersonInfo() {
  const person = {
    firstName: "Nguyễn",
    lastName: "Minh",
    age: 23,
    email: "minh.nguyen@email.com",
    hobbies: ["đọc sách", "nghe nhạc", "du lịch"],
    isStudent: true,
    profilePicture: "https://via.placeholder.com/150x150/4CAF50/white?text=NM"
  };

  // TODO: Tạo helper variables
  const fullName = /* Kết hợp firstName và lastName */;
  const birthYear = /* Tính năm sinh từ age */;
  const hobbyCount = /* Đếm số sở thích */;

  return (
    <div className="person-card" style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '400px',
      margin: '20px auto'
    }}>
      {/* TODO: Thêm profile picture */}

      {/* TODO: Hiển thị họ tên từ fullName */}

      {/* TODO: Hiển thị tuổi và năm sinh */}

      {/* TODO: Hiển thị email */}

      {/* TODO: Sử dụng conditional rendering cho trạng thái sinh viên */}

      {/* TODO: Hiển thị số lượng sở thích */}
    </div>
  );
}

export default PersonInfo;
```

### 🎯 Yêu cầu cụ thể:

1. **Hiển thị ảnh profile** với `src={person.profilePicture}`
2. **Kết hợp tên**: Sử dụng template literal để tạo `fullName`
3. **Tính năm sinh**: `2024 - person.age`
4. **Conditional rendering**:
   - Nếu `isStudent = true` → "Sinh viên"
   - Nếu `isStudent = false` → "Đi làm"
5. **Array length**: Hiển thị `person.hobbies.length`

### 💡 Hints:

```jsx
// Template literal
const fullName = `${person.firstName} ${person.lastName}`;

// Conditional rendering
{person.isStudent ? "Sinh viên" : "Đi làm"}

// Array length
{person.hobbies.length} sở thích

// Nested expressions
{2024 - person.age} // Tính năm sinh
```

### ✅ Expected Output:

Component sẽ hiển thị:

- Ảnh profile picture
- "Họ tên: Nguyễn Minh"
- "Tuổi: 23 (sinh năm 2001)"
- "Email: minh.nguyen@email.com"
- "Trạng thái: Sinh viên"
- "Số sở thích: 3"

---

## 📋 Bài tập 3: Dynamic Styling với JSX ⭐⭐⭐

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
