# Dàn Ý Bài Giảng ReactJS 30 Ngày

## Slide 1: Tiêu đề

- Khóa học ReactJS trong 30 ngày
- Tên người hướng dẫn
- Ngày bắt đầu

## Tuần 1: Nền tảng

### Slide 2: Ngày 1 - Giới thiệu

- React là gì? (Thư viện UI, Component-based)
- Tại sao chọn React? (Hiệu năng cao với Virtual DOM, Cộng đồng lớn)
- Thiết lập môi trường (Node.js, Create React App)
- Demo: "Hello, World!"

### Slide 3: Ngày 2 - JSX

- JSX không phải HTML
- Quy tắc: Trả về một element duy nhất, `className` thay vì `class`.
- Nhúng JavaScript vào JSX với `{}`.

### Slide 4: Ngày 3 - Components & Props

- Component là gì? (Function & Class)
- Props: Dữ liệu chỉ đọc, truyền từ cha sang con.
- Sơ đồ minh họa luồng dữ liệu.

### Slide 5: Ngày 4 - State & Lifecycle

- State: Trạng thái nội tại của component.
- `useState` hook.
- Sơ đồ vòng đời: Mounting, Updating, Unmounting.

### Slide 6: Ngày 5 & 6 - Events & Conditional Rendering

- Xử lý sự kiện: `onClick`, `onChange`.
- Render có điều kiện: `if`, `&&`, toán tử ba ngôi.

### Slide 7: Ngày 7 - Lists & Keys

- Dùng `map()` để render danh sách.
- `key` là gì và tại sao nó quan trọng.

## Tuần 2: Hooks Nâng Cao

### Slide 8: Ngày 8 & 9 - `useEffect`

- Side Effects là gì? (API calls, timers)
- Cú pháp `useEffect`.
- Dependency Array (`[]`, `[dep]`, không có).
- Cleanup function.

### Slide 9: Ngày 10 - `useContext`

- Vấn đề "Prop Drilling".
- Sơ đồ minh họa.
- `createContext`, `Provider`, `useContext`.

### Slide 10: Ngày 11-13 - Các Hooks khác

- `useReducer`: Khi nào dùng?
- `useRef`: Truy cập DOM.
- `useCallback`, `useMemo`: Tối ưu hóa.
- Custom Hooks: Tái sử dụng logic.

## Tuần 3: Routing & Styling

### Slide 11: Ngày 15-17 - React Router

- SPA (Single Page Application) là gì?
- Các component chính: `BrowserRouter`, `Route`, `Link`.
- Nested Routes, URL Params.

### Slide 12: Ngày 18-20 - Styling

- Các phương pháp: CSS Modules, Styled-components.
- So sánh ưu/nhược điểm.
- Giới thiệu thư viện UI (Material-UI).

## Tuần 4: State Management & Deploy

### Slide 13: Ngày 22-24 - Redux & Redux Toolkit

- Khi nào cần Redux?
- Sơ đồ luồng dữ liệu Redux.
- Redux Toolkit: `createSlice`, `configureStore`.

### Slide 14: Ngày 25 - Async Redux

- Vấn đề bất đồng bộ.
- Giới thiệu Redux Thunk.

### Slide 15: Ngày 26-29 - Dự án cuối khóa

- Ý tưởng dự án (Todo App, E-commerce).
- Các bước thực hiện.

### Slide 16: Ngày 30 - Deploy & Tổng kết

- Build ứng dụng: `npm run build`.
- Deploy lên Netlify/Vercel.
- Hướng đi tiếp theo (Next.js, TypeScript).
- Q&A.
