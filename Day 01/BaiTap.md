# Ngày 1: Bài tập

# Ngày 1: Bài tập thực hành React Basics

## 🎯 Mục tiêu bài tập

Thực hành tạo components cơ bản, sử dụng props, và xây dựng ứng dụng React đầu tiên hoàn chỉnh.

---

## 📋 Bài tập 1: Cài đặt môi trường (Bắt buộc)

### Yêu cầu:

1. Cài đặt Node.js và npm
2. Tạo React app đầu tiên
3. Hiểu cấu trúc thư mục cơ bản

### Hướng dẫn chi tiết:

**Bước 1: Cài đặt Node.js**

1. Truy cập [Node.js](https://nodejs.org/) và tải phiên bản LTS
2. Cài đặt và kiểm tra:
   ```bash
   node -v    # Kiểm tra phiên bản Node.js
   npm -v     # Kiểm tra phiên bản npm
   ```

**Bước 2: Tạo React App**

```bash
# Tạo project mới
npx create-react-app day01-react-basics
cd day01-react-basics

# Khởi động development server
npm start
```

**Bước 3: Khám phá cấu trúc**

```
day01-react-basics/
├── public/
│   ├── index.html      # HTML template
│   └── favicon.ico     # Icon trang web
├── src/
│   ├── index.js        # Entry point
│   ├── App.js          # Component chính
│   ├── App.css         # Styles cho App
│   └── index.css       # Global styles
├── package.json        # Dependencies và scripts
└── README.md          # Hướng dẫn project
```

**✅ Kiểm tra:** App hiển thị logo React đang quay tại `http://localhost:3000`

---

## 📋 Bài tập 2: Tạo Header Component với Props

### Yêu cầu:

Tạo component Header hiển thị:

- Logo/tên trang web
- Thông tin user (tên + avatar)
- Menu navigation (2-3 buttons)

### Code mẫu để bắt đầu:

**File: `src/components/Header.js`**

```jsx
import React from "react";

function Header(props) {
  // TODO: Destructure props {user, siteName, onMenuClick}

  return (
    <header
      style={{
        // TODO: Thêm styling cho header
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        background: "#282c34",
        color: "white",
      }}
    >
      {/* TODO: Logo section */}
      <div>
        <h1>{/* Hiển thị siteName từ props */}</h1>
      </div>

      {/* TODO: User info section */}
      <div>{/* Hiển thị avatar và tên user */}</div>

      {/* TODO: Navigation menu */}
      <nav>{/* Tạo 2-3 buttons với onClick handlers */}</nav>
    </header>
  );
}

export default Header;
```

### Hướng dẫn thực hiện:

1. **Tạo thư mục components:**

   ```bash
   mkdir src/components
   ```

2. **Destructure props:** Thay `props` bằng `{user, siteName, onMenuClick}`

3. **Thêm user info section:**

   ```jsx
   <div style={{ display: "flex", alignItems: "center" }}>
     <img
       src={user.avatar}
       alt={user.name}
       style={{
         width: "40px",
         height: "40px",
         borderRadius: "50%",
         marginRight: "10px",
       }}
     />
     <span>Xin chào, {user.name}!</span>
   </div>
   ```

4. **Thêm navigation menu:**
   ```jsx
   <nav>
     <button onClick={() => onMenuClick("home")}>Trang chủ</button>
     <button onClick={() => onMenuClick("about")}>Giới thiệu</button>
   </nav>
   ```

**✅ Test:** Header hiển thị đầy đủ logo, user info, và menu buttons

---

## 📋 Bài tập 3: Tạo Interactive Demo Component

### Yêu cầu:

Tạo component cho phép user:

- Nhập tên vào input field
- Click button để hiển thị lời chào
- Clear message khi input rỗng

### Template để bắt đầu:

**File: `src/components/InteractiveDemo.js`**

```jsx
import React, { useState } from "react";

function InteractiveDemo() {
  // TODO: Tạo state cho name và message
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Xử lý submit form
    // Nếu name không rỗng, set message = "Xin chào [name]!"
    // Nếu name rỗng, hiển thị thông báo lỗi
  };

  const handleInputChange = (e) => {
    // TODO: Update name state khi user type
    // TODO: Clear message nếu input rỗng
  };

  return (
    <section
      style={{
        background: "#f8f9fa",
        padding: "20px",
        borderRadius: "8px",
        margin: "20px 0",
      }}
    >
      <h2>🎮 Demo Tương Tác</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Nhập tên của bạn:
          </label>
          <input
            type="text"
            value={name}
            onChange={handleInputChange}
            placeholder="Ví dụ: Nguyễn Văn A"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Gửi lời chào
        </button>
      </form>

      {/* TODO: Hiển thị message nếu có */}
      {message && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            background: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "4px",
            color: "#155724",
          }}
        >
          {message}
        </div>
      )}
    </section>
  );
}

export default InteractiveDemo;
```

### Gợi ý implementation:

1. **handleInputChange:**

   ```jsx
   const handleInputChange = (e) => {
     const value = e.target.value;
     setName(value);

     // Clear message nếu input rỗng
     if (!value.trim()) {
       setMessage("");
     }
   };
   ```

2. **handleSubmit:**
   ```jsx
   const handleSubmit = (e) => {
     e.preventDefault();

     if (name.trim()) {
       setMessage(`Xin chào ${name}! Chào mừng bạn đến với React!`);
     } else {
       setMessage("Vui lòng nhập tên của bạn!");
     }
   };
   ```

**✅ Test:** Form hoạt động, hiển thị message khi submit

---

## 📋 Bài tập 4: Kết hợp tất cả trong App.js

### Yêu cầu:

Sử dụng tất cả components đã tạo trong App.js với props phù hợp

### Template App.js:

```jsx
import React from "react";
import Header from "./components/Header";
import InteractiveDemo from "./components/InteractiveDemo";
import "./App.css";

function App() {
  // TODO: Tạo userData object
  const userData = {
    name: "Học viên React",
    avatar: "https://via.placeholder.com/40x40/007bff/white?text=HV",
  };

  // TODO: Tạo handleMenuClick function
  const handleMenuClick = (page) => {
    alert(`Điều hướng đến trang: ${page}`);
  };

  return (
    <div className="App">
      {/* TODO: Sử dụng Header component với props */}
      <Header
        user={userData}
        siteName="React Learning"
        onMenuClick={handleMenuClick}
      />

      {/* Main content */}
      <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Chào mừng đến với React - Day 1</h1>

        <section
          style={{
            background: "#e8f4ff",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h2>🎯 Mục tiêu hôm nay</h2>
          <ul>
            <li>Tạo components cơ bản</li>
            <li>Sử dụng props để truyền data</li>
            <li>Xử lý events và state</li>
            <li>Kết hợp components thành app hoàn chỉnh</li>
          </ul>
        </section>

        {/* TODO: Sử dụng InteractiveDemo component */}
        <InteractiveDemo />

        <section
          style={{
            background: "#e8f5e8",
            padding: "20px",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <h2>✅ Hoàn thành!</h2>
          <p>
            Chúc mừng! Bạn đã tạo ra ứng dụng React đầu tiên với: Header
            component, Interactive demo, và prop handling!
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
```

**✅ Kiểm tra cuối:** App hiển thị Header, main content, và interactive demo hoạt động

---

## 🏆 Bonus Challenges (Tùy chọn)

### Challenge 1: Footer Component

Tạo Footer component hiển thị:

- Năm hiện tại (sử dụng `new Date().getFullYear()`)
- Thông tin bản quyền
- Links social media

### Challenge 2: Welcome Card Component

Tạo component WelcomeCard với props:

- `title`: Tiêu đề card
- `description`: Mô tả
- `icon`: Emoji icon
- `bgColor`: Màu background

### Challenge 3: Counter Component

Tạo component Counter với:

- State để lưu số đếm
- Buttons tăng/giảm
- Reset button
- Hiển thị màu khác nhau khi số âm/dương

### Challenge 4: Theme Toggle

Thêm dark/light mode toggle:

- State để lưu theme hiện tại
- Button toggle theme
- Apply theme colors cho toàn bộ app

---

## 📚 Kiến thức cần nắm

### React Concepts:

- ✅ **Functional Components**: Tạo component bằng function
- ✅ **Props**: Truyền data từ cha sang con
- ✅ **useState Hook**: Quản lý state trong component
- ✅ **Event Handling**: onClick, onChange, onSubmit
- ✅ **Conditional Rendering**: `{condition && <Element>}`
- ✅ **JSX**: Viết HTML trong JavaScript

### JavaScript ES6+:

- ✅ **Destructuring**: `{user, onMenuClick}`
- ✅ **Arrow Functions**: `() => {}`
- ✅ **Template Literals**: `` `Hello ${name}` ``
- ✅ **Object Properties**: `{name, avatar}`

### Best Practices:

- ✅ Component names viết PascalCase
- ✅ Props destructuring thay vì props.something
- ✅ Event handlers có prefix 'handle'
- ✅ State updates qua setter functions

---

## ✅ Checklist hoàn thành

- [ ] Cài đặt Node.js và tạo React app thành công
- [ ] Tạo Header component với props hoạt động
- [ ] Tạo InteractiveDemo với useState và events
- [ ] Kết hợp components trong App.js
- [ ] App hiển thị đúng và interactive demo hoạt động
- [ ] Hiểu cách props truyền data giữa components
- [ ] Nắm vững useState để quản lý state
- [ ] Code có comments rõ ràng và cấu trúc tốt

🎉 **Chúc mừng bạn đã hoàn thành Day 1!**

## Bài tập 3: Chỉnh sửa nội dung đầu tiên

1.  Mở thư mục dự án `hello-react` bằng VS Code.
2.  Tìm và mở file `src/App.js`.
3.  Tìm đến đoạn văn bản `<p>Edit <code>src/App.js</code> and save to reload.</p>`.
4.  Thay đổi nó thành: `<p>Xin chào, đây là ứng dụng React đầu tiên của tôi!</p>`.
5.  Lưu file lại (Ctrl + S hoặc Cmd + S).
6.  Quay lại trình duyệt và xem sự thay đổi đã được tự động cập nhật chưa.

Chúc mừng! Bạn đã hoàn thành những bước đầu tiên trên hành trình chinh phục React.
