# 🚀 Day 1: React Basics - Hướng dẫn Build từng bước

## 📋 Mục tiêu học tập

Sau khi hoàn thành Day 1, bạn sẽ:

- ✅ Hiểu cấu trúc cơ bản của React app
- ✅ Biết cách tạo và sử dụng functional components
- ✅ Nắm vững concept về props và cách truyền data
- ✅ Có thể tạo interactive demo đầu tiên

## 🛠️ Setup môi trường

### Bước 1: Khởi tạo React App

```bash
# Tạo project mới
npx create-react-app day01-react-basics
cd day01-react-basics

# Hoặc sử dụng Vite (nhanh hơn)
npm create vite@latest day01-react-basics -- --template react
cd day01-react-basics
npm install
```

## Cấu trúc thư mục

```
src/
├── index.js          # Entry point của ứng dụng
├── App.js            # Component chính
└── components/
    ├── Header.js      # Component header với props
    ├── Footer.js      # Component footer
    └── InteractiveDemo.js  # Demo tương tác với useState
```

## Cách chạy code

1. **Khởi tạo project React mới:**

```bash
npx create-react-app day01-demo
cd day01-demo
```

2. **Copy các file từ thư mục src/ này vào project:**

   - Thay thế nội dung file `src/App.js`
   - Thay thế nội dung file `src/index.js`
   - Tạo thư mục `src/components/`
   - Copy các file component vào thư mục components

3. **Chạy ứng dụng:**

```bash
npm start
```

## Tính năng của code mẫu

### Header.js

- Hiển thị thông tin user với avatar
- Navigation menu với event handling
- Styling inline và responsive

### Footer.js

- Footer đầy đủ với links và social media
- Layout linh hoạt với flexbox
- Sử dụng props để truyền dữ liệu

### InteractiveDemo.js

- Demo useState với counter và màu sắc
- Event handling và conditional rendering
- Form input và state management

### App.js

- Kết hợp tất cả components
- Layout chính của ứng dụng
- Props passing và data flow

## Điểm học tập quan trọng

1. **Component Structure:** Mỗi component trong file riêng
2. **Props Usage:** Truyền dữ liệu giữa parent và child
3. **State Management:** useState hook cơ bản
4. **Event Handling:** onClick, onChange events
5. **Styling:** Inline styles và conditional styling
6. **Import/Export:** ES6 module system

## Bài tập mở rộng

1. Thêm state để track current page trong App.js
2. Tạo component Sidebar với menu items
3. Thêm LocalStorage để lưu user preferences
4. Tạo theme switcher (light/dark mode)
5. Thêm animation với CSS transitions

Hãy thử chỉnh sửa code và xem kết quả thay đổi!
