# Ngày 1: Giới thiệu về React và Thiết lập môi trường

## 1. React là gì? (Hiểu đơn giản)

### 1.1. Định nghĩa cơ bản

**React** là một thư viện JavaScript được tạo ra bởi Facebook (nay là Meta) để xây dựng giao diện người dùng (UI - User Interface).

🤔 **Hãy tưởng tượng:** Nếu trang web là một ngôi nhà, thì React giúp bạn xây dựng phần mà người dùng nhìn thấy và tương tác - như cửa ra vào, cửa sổ, nút bấm, form đăng nhập...

### 1.2. React vs HTML thông thường

**HTML thông thường:**

```html
<div>
  <h1>Xin chào!</h1>
  <p>Bạn có 5 tin nhắn mới</p>
  <button onclick="showMessages()">Xem tin nhắn</button>
</div>
```

- Khi có tin nhắn mới, bạn phải tự cập nhật số lượng
- Phải viết JavaScript riêng để xử lý

**Với React:**

```jsx
function MessageWidget({ messageCount }) {
  return (
    <div>
      <h1>Xin chào!</h1>
      <p>Bạn có {messageCount} tin nhắn mới</p>
      <button onClick={showMessages}>Xem tin nhắn</button>
    </div>
  );
}
```

- Số lượng tin nhắn tự động cập nhật
- Code gọn gàng, dễ hiểu hơn

### 1.3. React không phải là Framework

🚨 **Lưu ý quan trọng:** React chỉ là **thư viện**, không phải **framework**

**Sự khác biệt:**

- **Thư viện (Library)**: Như một bộ công cụ, bạn chọn công cụ nào cần dùng
- **Framework**: Như một khuôn mẫu, bạn phải làm theo quy tắc có sẵn

**React chỉ lo việc hiển thị giao diện**, bạn cần thêm:

- React Router (để chuyển trang)
- Redux hoặc Context API (để quản lý dữ liệu)
- Axios (để gọi API)
- Styled-components (để trang trí)

### 1.4. Component-Based - Tư duy xây dựng như LEGO

React sử dụng **Component** - hãy nghĩ như các khối LEGO:

🧱 **Ví dụ thực tế:**

```
Trang Facebook = Header + Sidebar + NewsFeed + Footer
├── Header = Logo + SearchBox + UserMenu
├── Sidebar = FriendList + Shortcuts + Ads
├── NewsFeed = Post + Post + Post...
│   └── Post = Avatar + Content + Reactions + Comments
└── Footer = Links + Copyright
```

**Ưu điểm:**

- Tái sử dụng: Component `Post` có thể dùng ở nhiều nơi
- Dễ bảo trì: Sửa `Header` không ảnh hưởng đến `NewsFeed`
- Làm việc nhóm: Mỗi người làm một component khác nhau

## 2. Tại sao nên học React? (Động lực học tập)

### 2.1. Virtual DOM - Hiệu năng vượt trội

🔥 **Vấn đề với JavaScript thông thường:**

```javascript
// Code cũ - chậm
document.getElementById("counter").innerHTML = "5";
document.getElementById("message").innerHTML = "Đã cập nhật";
document.getElementById("timestamp").innerHTML = new Date();
// Mỗi dòng đều thao tác trực tiếp với DOM -> CHẬM
```

🚀 **React với Virtual DOM:**

```jsx
// React - nhanh
function Counter({ count }) {
  return (
    <div>
      <span id="counter">{count}</span>
      <span id="message">Đã cập nhật</span>
      <span id="timestamp">{new Date().toLocaleString()}</span>
    </div>
  );
}
// React tự động tối ưu hóa, chỉ cập nhật phần thay đổi
```

**Virtual DOM hoạt động như thế nào:**

1. React tạo bản copy của DOM trong bộ nhớ (Virtual DOM)
2. Khi có thay đổi, React so sánh Virtual DOM cũ vs mới
3. Chỉ cập nhật những phần khác biệt lên DOM thật
4. Kết quả: Tốc độ nhanh hơn 10-100 lần!

### 2.2. Thị trường việc làm

📈 **Thống kê việc làm React (2024):**

- React Developer: 25-45 triệu VNĐ/tháng
- 60% các công ty công nghệ sử dụng React
- Hơn 40,000 việc làm React trên toàn cầu

🏢 **Các công ty lớn sử dụng React:**

- Facebook, Instagram, WhatsApp
- Netflix, Uber, Airbnb
- Shopee, Tiki, VNG (Việt Nam)

### 2.3. Cộng đồng và tài nguyên

🌟 **Tại sao React "hot":**

- 200,000+ Stars trên GitHub
- 3+ triệu downloads mỗi tuần
- Cộng đồng Việt Nam 50,000+ thành viên
- Tài liệu phong phú bằng tiếng Việt

## 3. Thiết lập môi trường phát triển (Step by step)

### 3.1. Cài đặt Node.js và npm

**Node.js là gì?**

- Node.js cho phép chạy JavaScript ngoài trình duyệt
- npm (Node Package Manager) là "cửa hàng ứng dụng" cho JavaScript

📥 **Các bước cài đặt:**

**Bước 1:** Truy cập [https://nodejs.org/](https://nodejs.org/)
**Bước 2:** Tải phiên bản LTS (Long Term Support) - ổn định nhất
**Bước 3:** Chạy file cài đặt, bấm Next liên tục
**Bước 4:** Kiểm tra cài đặt thành công

```bash
# Mở Command Prompt hoặc Terminal và gõ:
node -v
# Kết quả mong đợi: v18.17.0 (hoặc cao hơn)

npm -v
# Kết quả mong đợi: 9.6.7 (hoặc cao hơn)
```

🚨 **Lỗi thường gặp:**

- "node không được nhận diện": Khởi động lại máy tính
- "npm không hoạt động": Cài lại Node.js với quyền Administrator

### 3.2. Cài đặt VS Code và Extensions

**Visual Studio Code - Editor tốt nhất cho React**

📥 **Cài đặt VS Code:**

1. Truy cập [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Tải về và cài đặt
3. Mở VS Code lần đầu

🔌 **Extensions bắt buộc cho React:**

**1. ES7+ React/Redux/React-Native snippets**

- Tự động tạo code React
- Gõ `rfc` → tự động tạo React Function Component

**2. Prettier - Code formatter**

- Tự động format code đẹp
- File → Preferences → Settings → tìm "format on save" → bật

**3. Auto Rename Tag**

- Đổi tên tag HTML tự động
- Đổi `<div>` thành `<span>` → tag đóng cũng tự đổi

**4. Bracket Pair Colorizer**

- Tô màu cặp ngoặc
- Dễ nhận biết ngoặc mở/đóng

**Cách cài Extensions:**

1. Bấm Ctrl + Shift + X
2. Tìm tên extension
3. Bấm Install

### 3.3. Hiểu về Terminal/Command Line

**Terminal là gì?**

- Cách giao tiếp với máy tính bằng text
- Thay vì click chuột, bạn gõ lệnh

🖥️ **Mở Terminal:**

- **Windows**: Win + R → gõ `cmd` → Enter
- **Mac**: Cmd + Space → gõ `terminal` → Enter
- **VS Code**: Ctrl + ` (dấu backtick)

📚 **Lệnh cơ bản cần biết:**

```bash
# Xem thư mục hiện tại
pwd                    # Mac/Linux
cd                     # Windows

# Liệt kê files/folders
ls                     # Mac/Linux
dir                    # Windows

# Chuyển thư mục
cd Desktop             # Vào thư mục Desktop
cd ..                  # Lùi lại 1 cấp
cd /                   # Về thư mục gốc

# Tạo thư mục mới
mkdir my-project       # Tạo thư mục "my-project"

# Xóa files/folders (THẬN TRỌNG!)
rm filename            # Xóa file
rm -rf foldername      # Xóa thư mục
```

## 4. Tạo ứng dụng React đầu tiên (Chi tiết từng bước)

### 4.1. Create React App - Công cụ thần thánh

**Create React App (CRA) là gì?**

- Công cụ chính thức từ Facebook
- Tự động cài đặt và cấu hình mọi thứ
- Không cần setup phức tạp

### 4.2. Tạo dự án từng bước

**Bước 1: Chọn vị trí lưu dự án**

```bash
# Ví dụ: Tạo dự án trên Desktop
cd Desktop
# Hoặc tạo thư mục riêng cho các dự án React
mkdir ReactProjects
cd ReactProjects
```

**Bước 2: Tạo ứng dụng React**

```bash
npx create-react-app my-first-react-app
```

🔍 **Giải thích lệnh:**

- `npx`: Chạy package mà không cần cài đặt global
- `create-react-app`: Tên tool
- `my-first-react-app`: Tên dự án (không dấu, không space)

⏰ **Thời gian chờ:** 3-5 phút (tùy tốc độ mạng)

**Bước 3: Vào thư mục dự án**

```bash
cd my-first-react-app
```

**Bước 4: Mở dự án bằng VS Code**

```bash
code .
# Lệnh này mở VS Code tại thư mục hiện tại
```

### 4.3. Cấu trúc thư mục React

📁 **Cấu trúc sau khi tạo:**

```
my-first-react-app/
├── public/           # Files tĩnh (HTML, images, icons)
│   ├── index.html    # File HTML chính
│   └── favicon.ico   # Icon trang web
├── src/              # Source code React
│   ├── App.js        # Component chính
│   ├── App.css       # Styles cho App
│   ├── index.js      # Entry point
│   └── index.css     # Styles global
├── package.json      # Thông tin dự án & dependencies
└── README.md         # Hướng dẫn dự án
```

🔍 **Files quan trọng nhất:**

- **src/App.js**: Nơi bạn viết code React chính
- **src/index.js**: Điểm khởi đầu của ứng dụng
- **public/index.html**: Template HTML
- **package.json**: Danh sách thư viện sử dụng

### 4.4. Chạy ứng dụng lần đầu

**Khởi động development server:**

```bash
npm start
```

🎉 **Kết quả mong đợi:**

- Terminal hiện: "webpack compiled successfully"
- Trình duyệt tự động mở http://localhost:3000
- Thấy logo React xoay xoay với text "Edit src/App.js and save to reload"

🚨 **Lỗi thường gặp:**

- **Port 3000 đã được sử dụng**: Bấm Y để dùng port khác
- **ENOSPC**: Linux/Mac thiếu dung lượng disk
- **Permission denied**: Chạy với sudo (Mac/Linux)

### 4.5. Thử nghiệm đầu tiên

**Bước 1:** Mở file `src/App.js` trong VS Code
**Bước 2:** Tìm dòng:

```jsx
Edit <code>src/App.js</code> and save to reload.
```

**Bước 3:** Đổi thành:

```jsx
Xin chào! Đây là ứng dụng React đầu tiên của tôi! 🎉
```

**Bước 4:** Bấm Ctrl + S để lưu
**Bước 5:** Xem trình duyệt tự động cập nhật!

🔥 **Hot Reload:** React tự động cập nhật khi bạn sửa code

## 5. Khám phá code React đầu tiên

### 5.1. Phân tích file App.js

```jsx
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

🔍 **Giải thích từng phần:**

**1. Import statements:**

```jsx
import logo from "./logo.svg"; // Import hình ảnh
import "./App.css"; // Import CSS
```

**2. Function Component:**

```jsx
function App() {
  // Đây là React Function Component
  // Giống như một function JavaScript thông thường
  // Nhưng return về JSX (HTML + JS)
}
```

**3. JSX Return:**

```jsx
return (
  <div className="App">
    {/* Đây là JSX - trông như HTML nhưng là JavaScript */}
    {/* className thay vì class */}
    {/* Có thể nhúng JavaScript bằng {} */}
  </div>
);
```

**4. Export:**

```jsx
export default App;
// Cho phép file khác import component này
```

### 5.2. So sánh React vs HTML thuần

**HTML thuần:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Website</title>
  </head>
  <body>
    <div id="header">
      <h1>Welcome</h1>
      <p id="user-name">Guest</p>
    </div>

    <script>
      // Phải viết JavaScript riêng để cập nhật
      document.getElementById("user-name").innerHTML = "John";
    </script>
  </body>
</html>
```

**React:**

```jsx
function App() {
  const userName = "John"; // Dữ liệu

  return (
    <div id="header">
      <h1>Welcome</h1>
      <p>{userName}</p> {/* Tự động hiển thị */}
    </div>
  );
}
```

## 6. Troubleshooting - Xử lý lỗi thường gặp

### 6.1. Lỗi khi cài đặt

**❌ "npx không được nhận diện"**

```bash
# Kiểm tra npm có hoạt động không
npm -v

# Nếu không hoạt động, cài lại Node.js
# Hoặc dùng yarn thay thế
npm install -g yarn
yarn create react-app my-app
```

**❌ "Permission denied"**

```bash
# Mac/Linux: Dùng sudo
sudo npx create-react-app my-app

# Windows: Chạy Command Prompt as Administrator
```

**❌ "Network error"**

```bash
# Sử dụng npm registry khác
npx create-react-app my-app --registry https://registry.npmmirror.com
```

### 6.2. Lỗi khi chạy ứng dụng

**❌ "Port 3000 already in use"**

- Bấm `Y` để sử dụng port khác (3001, 3002...)
- Hoặc tắt ứng dụng đang chạy port 3000

**❌ "Module not found"**

```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
npm start
```

**❌ Trình duyệt không tự mở**

- Tự mở http://localhost:3000
- Kiểm tra firewall/antivirus

### 6.3. Tips thành công

✅ **Đặt tên dự án:**

- Chỉ dùng chữ thường, số, và dấu gạch ngang
- ❌ `My Project`, `my_project`
- ✅ `my-project`, `todo-app`

✅ **Quản lý dự án:**

- Tạo thư mục riêng cho React projects
- Đặt tên có ý nghĩa
- Backup code thường xuyên

✅ **Learning path:**

1. Tạo được ứng dụng React ✓
2. Hiểu cấu trúc project ✓
3. Sửa được code và thấy thay đổi ✓
4. Ngày mai: Học JSX syntax 📚

## 7. Bài tập thực hành

### Bài tập 1: Tạo profile card

Sửa file `App.js` để hiển thị thông tin cá nhân:

- Tên, tuổi, nghề nghiệp
- Ảnh đại diện (có thể dùng placeholder)
- Sở thích

### Bài tập 2: Tạo landing page đơn giản

- Header với logo và menu
- Hero section với slogan
- Footer với thông tin liên hệ

### Bài tập 3: Khám phá và thử nghiệm

- Thay đổi màu sắc trong App.css
- Thêm hình ảnh vào public/
- Thử thêm nhiều đoạn text khác nhau

💡 **Tip:** Đừng lo lắng nếu chưa hiểu hết! Ngày mai chúng ta sẽ học JSX chi tiết.

## 8. Troubleshooting - Giải quyết các vấn đề thường gặp

### 8.1. Lỗi khi chạy npx create-react-app

**Lỗi #1: "npm ERR! network timeout"**

```bash
# Giải pháp: Thay đổi registry npm
npm config set registry https://registry.npmjs.org/
npm cache clean --force
npx create-react-app my-app
```

**Lỗi #2: "You are running create-react-app X.X.X, which is behind the latest release"**

```bash
# Giải pháp: Cài đặt version mới nhất
npm uninstall -g create-react-app
npx create-react-app@latest my-app
```

**Lỗi #3: "Permission denied" (MacOS/Linux)**

```bash
# Giải pháp: Sử dụng sudo hoặc fix npm permissions
sudo npm install -g npm
# Hoặc
npx create-react-app my-app
```

**Lỗi #4: "Command not found: npx" (Windows)**

```bash
# Kiểm tra Node.js version
node --version
npm --version

# Nếu không có npx, cài đặt thủ công:
npm install -g npx
```

### 8.2. Lỗi khi chạy npm start

**Lỗi #1: "Port 3000 is already in use"**

```bash
# Windows - Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <process_id> /F

# Hoặc chạy trên port khác
set PORT=3001 && npm start
```

**Lỗi #2: "Module not found"**

```bash
# Xóa node_modules và cài lại
rm -rf node_modules
rm package-lock.json
npm install
npm start
```

**Lỗi #3: Browser không tự động mở**

```bash
# Mở thủ công: http://localhost:3000
# Hoặc set environment variable
set BROWSER=chrome
npm start
```

### 8.3. Debug với Browser DevTools

**Chrome DevTools cho React:**

1. **Cài đặt React Developer Tools extension**

   - Mở Chrome Web Store
   - Search "React Developer Tools"
   - Click "Add to Chrome"

2. **Sử dụng React DevTools:**

   ```jsx
   // Trong component, add tên để dễ debug
   function MyComponent() {
     console.log("MyComponent rendered");
     return <div>Hello World</div>;
   }

   // Đặt displayName để hiển thị trong DevTools
   MyComponent.displayName = "MyComponent";
   ```

3. **Console logging trong React:**
   ```jsx
   function App() {
     console.log("App component rendered");

     useEffect(() => {
       console.log("App component mounted");
       return () => console.log("App component unmounted");
     }, []);

     return <div>My App</div>;
   }
   ```

### 8.4. Performance monitoring cơ bản

**Đo thời gian render:**

```jsx
function ExpensiveComponent() {
  console.time("ExpensiveComponent render");

  // Expensive calculations
  const result = heavyCalculation();

  console.timeEnd("ExpensiveComponent render");

  return <div>{result}</div>;
}
```

**Memory usage tracking:**

```jsx
function App() {
  useEffect(() => {
    // Log memory usage every 5 seconds
    const interval = setInterval(() => {
      if (performance.memory) {
        console.log("Memory usage:", {
          used: Math.round(performance.memory.usedJSHeapSize / 1048576),
          total: Math.round(performance.memory.totalJSHeapSize / 1048576),
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576),
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <div>App with memory monitoring</div>;
}
```

## 9. Code Examples thực tế cho Day 1

### 9.1. Cấu trúc project đầy đủ

```
my-first-react-app/
├── public/
│   ├── index.html          ← Entry point HTML
│   ├── favicon.ico         ← Website icon
│   ├── manifest.json       ← Web app manifest
│   └── robots.txt          ← SEO robots file
├── src/
│   ├── components/         ← Custom components (tạo thêm)
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── UserProfile.js
│   ├── styles/            ← CSS files (tạo thêm)
│   │   ├── App.css
│   │   └── components.css
│   ├── utils/             ← Helper functions (tạo thêm)
│   │   └── helpers.js
│   ├── App.js             ← Main component
│   ├── App.css            ← App styles
│   ├── index.js           ← Entry point JS
│   ├── index.css          ← Global styles
│   └── reportWebVitals.js ← Performance measuring
├── package.json           ← Dependencies và scripts
├── package-lock.json      ← Dependency tree lock
└── README.md             ← Project documentation
```

### 9.2. Hiểu từng file quan trọng

**public/index.html (Trang HTML chính):**

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Ứng dụng React đầu tiên của tôi" />
    <title>React App của tôi</title>
  </head>
  <body>
    <noscript>Bạn cần bật JavaScript để chạy ứng dụng này.</noscript>
    <!-- React sẽ render vào div này -->
    <div id="root"></div>
  </body>
</html>
```

**src/index.js (Điểm bắt đầu của React):**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Tạo root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render App component vào root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Đo hiệu suất ứng dụng (optional)
reportWebVitals(console.log);
```

**src/App.js (Component chính):**

```jsx
import React from "react";
import "./App.css";

function App() {
  // Data mẫu
  const user = {
    name: "Nguyễn Văn A",
    avatar: "https://via.placeholder.com/100",
    role: "React Developer",
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="App">
      {/* Header Section */}
      <header className="App-header">
        <img src={user.avatar} className="App-logo" alt="User avatar" />
        <h1>Chào mừng đến với React!</h1>
        <p>
          Xin chào <strong>{user.name}</strong>
        </p>
        <p>Vai trò: {user.role}</p>

        {/* Conditional rendering */}
        {user.role === "React Developer" && <p>🎉 Bạn đang học React!</p>}
      </header>

      {/* Main Content */}
      <main className="App-main">
        <section className="stats">
          <h2>Thống kê học tập</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="number">1</span>
              <span className="label">Ngày học</span>
            </div>
            <div className="stat-item">
              <span className="number">30</span>
              <span className="label">Ngày còn lại</span>
            </div>
            <div className="stat-item">
              <span className="number">100</span>
              <span className="label">% Nhiệt huyết</span>
            </div>
          </div>
        </section>

        <section className="learning-path">
          <h2>Lộ trình học React (30 ngày)</h2>
          <div className="week-grid">
            {/* Week 1 */}
            <div className="week-card active">
              <h3>Tuần 1: React Cơ bản</h3>
              <ul>
                <li className="completed">Giới thiệu React ✅</li>
                <li>JSX Syntax</li>
                <li>Components & Props</li>
                <li>State & Lifecycle</li>
                <li>Event Handling</li>
                <li>Conditional Rendering</li>
                <li>Lists & Keys</li>
              </ul>
            </div>

            {/* Week 2 */}
            <div className="week-card">
              <h3>Tuần 2: React Hooks</h3>
              <ul>
                <li>useState Hook</li>
                <li>useEffect Hook</li>
                <li>useContext Hook</li>
                <li>useReducer Hook</li>
                <li>Custom Hooks</li>
                <li>Forms Handling</li>
                <li>Performance Optimization</li>
              </ul>
            </div>

            {/* Week 3 */}
            <div className="week-card">
              <h3>Tuần 3: Routing & Styling</h3>
              <ul>
                <li>React Router</li>
                <li>Navigation</li>
                <li>CSS Modules</li>
                <li>Styled Components</li>
                <li>UI Libraries</li>
                <li>Responsive Design</li>
                <li>Blog Project</li>
              </ul>
            </div>

            {/* Week 4 */}
            <div className="week-card">
              <h3>Tuần 4: State Management</h3>
              <ul>
                <li>Redux Basics</li>
                <li>React Redux</li>
                <li>Redux Toolkit</li>
                <li>Async Actions</li>
                <li>Final Project</li>
                <li>Deployment</li>
                <li>Portfolio Setup</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="App-footer">
        <p>&copy; {currentYear} - React Learning Journey</p>
        <p>Bạn có thể làm được! 💪</p>
      </footer>
    </div>
  );
}

export default App;
```

**src/App.css (Styling cho App):**

```css
.App {
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.App-header {
  padding: 40px 20px;
  flex-shrink: 0;
}

.App-logo {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 3px solid white;
  margin-bottom: 20px;
  object-fit: cover;
}

.App-main {
  flex: 1;
  padding: 0 20px 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.stats {
  margin-bottom: 60px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 30px 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-item .number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffd700;
}

.stat-item .label {
  font-size: 1rem;
  opacity: 0.9;
}

.learning-path h2 {
  margin-bottom: 40px;
  font-size: 2rem;
}

.week-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.week-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 25px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  text-align: left;
}

.week-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.week-card.active {
  border: 2px solid #ffd700;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.week-card h3 {
  margin-bottom: 20px;
  color: #ffd700;
  border-bottom: 2px solid rgba(255, 215, 0, 0.3);
  padding-bottom: 10px;
}

.week-card ul {
  list-style: none;
  padding: 0;
}

.week-card li {
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: color 0.3s ease;
}

.week-card li:hover {
  color: #ffd700;
}

.week-card li.completed {
  color: #4ade80;
  font-weight: 500;
}

.App-footer {
  background: rgba(0, 0, 0, 0.2);
  padding: 30px 20px;
  margin-top: 40px;
  backdrop-filter: blur(10px);
}

.App-footer p {
  margin: 5px 0;
  opacity: 0.8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .App-header {
    padding: 20px;
  }

  .App-main {
    padding: 0 15px 30px;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
  }

  .week-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .stat-item .number {
    font-size: 2rem;
  }

  .learning-path h2 {
    font-size: 1.5rem;
  }
}

/* Animation cho loading */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.week-card {
  animation: fadeIn 0.6s ease-out forwards;
}

.week-card:nth-child(1) {
  animation-delay: 0.1s;
}
.week-card:nth-child(2) {
  animation-delay: 0.2s;
}
.week-card:nth-child(3) {
  animation-delay: 0.3s;
}
.week-card:nth-child(4) {
  animation-delay: 0.4s;
}
```

### 9.3. Custom Components đầu tiên

**src/components/Header.js:**

```jsx
import React from "react";

function Header({ user, onMenuClick }) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        background: "#282c34",
        color: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={user.avatar}
          alt="User"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "15px",
          }}
        />
        <span>Xin chào, {user.name}!</span>
      </div>

      <nav>
        <button
          onClick={() => onMenuClick("home")}
          style={{
            background: "transparent",
            border: "1px solid white",
            color: "white",
            padding: "8px 16px",
            margin: "0 5px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Trang chủ
        </button>
        <button
          onClick={() => onMenuClick("profile")}
          style={{
            background: "transparent",
            border: "1px solid white",
            color: "white",
            padding: "8px 16px",
            margin: "0 5px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Hồ sơ
        </button>
      </nav>
    </header>
  );
}

export default Header;
```

**src/components/ProgressCard.js:**

```jsx
import React from "react";

function ProgressCard({ day, title, completed, total }) {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        margin: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h3 style={{ margin: 0, color: "#333" }}>Ngày {day}</h3>
        <span
          style={{
            background: percentage === 100 ? "#4CAF50" : "#FF9800",
            color: "white",
            padding: "4px 8px",
            borderRadius: "12px",
            fontSize: "12px",
          }}
        >
          {percentage}%
        </span>
      </div>

      <h4 style={{ margin: "0 0 10px 0", color: "#666" }}>{title}</h4>

      <div
        style={{
          background: "#f0f0f0",
          borderRadius: "10px",
          height: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: percentage === 100 ? "#4CAF50" : "#2196F3",
            height: "100%",
            width: `${percentage}%`,
            transition: "width 0.3s ease",
          }}
        ></div>
      </div>

      <p
        style={{
          margin: "10px 0 0 0",
          fontSize: "14px",
          color: "#888",
        }}
      >
        {completed}/{total} bài tập hoàn thành
      </p>
    </div>
  );
}

export default ProgressCard;
```

### 9.4. Event Handling cơ bản

**src/components/InteractiveDemo.js:**

```jsx
import React, { useState } from "react";

function InteractiveDemo() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Nhấn nút để bắt đầu!");
  const [color, setColor] = useState("#3498db");

  const handleButtonClick = () => {
    const newCount = count + 1;
    setCount(newCount);

    if (newCount === 1) {
      setMessage("Tuyệt vời! Bạn vừa trigger event đầu tiên!");
      setColor("#2ecc71");
    } else if (newCount === 5) {
      setMessage("Wow! Bạn đã click 5 lần rồi! 🎉");
      setColor("#e74c3c");
    } else if (newCount === 10) {
      setMessage("Bạn là cao thủ click chuột! 🏆");
      setColor("#f39c12");
    } else {
      setMessage(`Số lần click: ${newCount}`);
    }
  };

  const handleReset = () => {
    setCount(0);
    setMessage("Nhấn nút để bắt đầu!");
    setColor("#3498db");
  };

  const handleColorChange = () => {
    const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        textAlign: "center",
        margin: "20px",
      }}
    >
      <h3 style={{ color: "#333", marginBottom: "20px" }}>
        Demo Tương tác đầu tiên
      </h3>

      <div
        style={{
          background: color,
          color: "white",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          transition: "all 0.3s ease",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {message}
      </div>

      <div
        style={{
          background: "#ecf0f1",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <span
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: color,
          }}
        >
          {count}
        </span>
        <p style={{ margin: "5px 0 0 0", color: "#7f8c8d" }}>Số lần click</p>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          onClick={handleButtonClick}
          style={{
            background: color,
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "transform 0.1s ease",
          }}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
        >
          Click me! 🎯
        </button>

        <button
          onClick={handleColorChange}
          style={{
            background: "#95a5a6",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Đổi màu 🎨
        </button>

        <button
          onClick={handleReset}
          style={{
            background: "#e74c3c",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Reset 🔄
        </button>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#f8f9fa",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#6c757d",
        }}
      >
        💡 <strong>Bạn đã học:</strong> useState hook, event handling,
        conditional rendering, và inline styling!
      </div>
    </div>
  );
}

export default InteractiveDemo;
```

## 10. Next Steps - Chuẩn bị cho ngày mai

### 10.1. Checklist kiến thức Day 1

✅ **Bạn đã hoàn thành:**

- [ ] Hiểu React là gì và tại sao cần học
- [ ] Cài đặt thành công Node.js và npm
- [ ] Tạo được project React đầu tiên
- [ ] Chạy được development server
- [ ] Hiểu cấu trúc project cơ bản
- [ ] Biết cách debug với DevTools
- [ ] Tạo được component đơn giản

### 10.2. Homework cho tối nay

1. **Thực hành cài đặt lại:** Tạo thêm 2-3 project React với tên khác nhau
2. **Khám phá code:** Đọc và hiểu từng dòng code trong App.js
3. **Thử nghiệm styling:** Thay đổi màu sắc, font chữ trong App.css
4. **Tạo component mới:** Copy InteractiveDemo và tùy chỉnh theo ý thích

### 10.3. Preview Day 2: JSX Mastery

**Ngày mai bạn sẽ học:**

- JSX syntax từ cơ bản đến nâng cao
- Cách nhúng JavaScript trong JSX
- Conditional rendering patterns
- Event handling chi tiết
- Common JSX mistakes và cách tránh

**Tip chuẩn bị:** Ôn lại HTML và JavaScript cơ bản!

    ```bash
    cd my-app
    ```

4.  Khởi động server phát triển:
    ```bash
    npm start
    ```
    - Lệnh này sẽ mở một tab mới trên trình duyệt (thường là `http://localhost:3000`) và hiển thị ứng dụng React của bạn.
    - Server sẽ tự động tải lại trang mỗi khi bạn lưu thay đổi trong code.
