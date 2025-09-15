# Ngày 5: Bài tập Event Handling

## Bài tập 1: Button Events

Tạo các button với event handlers khác nhau:

1. **Button Counter:** Mỗi lần click tăng counter, hiển thị số lần click
2. **Double Click Button:** Chỉ phản hồi khi double click
3. **Right Click Menu:** Hiển thị context menu khi right click
4. **Hover Button:** Thay đổi màu khi hover, hiển thị thời gian hover
5. **Keyboard Button:** Có thể trigger bằng Space hoặc Enter

## Bài tập 2: Form với Multiple Events

Tạo form đăng ký với các event handlers:

### Yêu cầu:

- **Real-time validation:** Validate khi user nhập (onChange)
- **Focus/Blur effects:** Highlight field khi focus, validate khi blur
- **Keyboard shortcuts:**
  - Enter: Submit form
  - Escape: Clear form
  - Tab: Navigate giữa các field
- **Copy/Paste handling:** Detect khi user paste dữ liệu
- **Auto-save:** Lưu draft mỗi 3 giây

### Fields:

```javascript
const formFields = {
  username: {
    required: true,
    minLength: 3,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    required: true,
    minLength: 8,
    mustHaveNumber: true,
    mustHaveSymbol: true,
  },
  confirmPassword: {
    required: true,
    mustMatch: "password",
  },
  phone: {
    pattern: /^[0-9]{10,11}$/,
  },
  birthDate: {
    required: true,
    minAge: 13,
  },
};
```

## Bài tập 3: Interactive Game - Simon Says

Tạo game Simon Says với event handling:

### Luật chơi:

- 4 nút màu: Đỏ, Xanh lá, Xanh dương, Vàng
- Máy hiển thị sequence màu
- Player phải click theo đúng thứ tự
- Mỗi level thêm 1 màu mới

### Events cần xử lý:

- Click buttons để chơi
- Keyboard: 1,2,3,4 tương ứng với 4 màu
- Mouse hover effects
- Touch events (mobile friendly)
- Start/Pause/Reset game

### State Management:

```javascript
const gameState = {
  sequence: [], // Sequence máy tạo
  playerSequence: [], // Sequence player nhập
  currentLevel: 1,
  gameStatus: "idle", // idle, playing, gameover
  score: 0,
  highScore: 0,
  isShowingSequence: false,
};
```

## Bài tập 4: Dynamic List với Event Delegation

Tạo Todo List sử dụng event delegation:

### Chức năng:

- Thêm todo (Enter hoặc click button)
- Edit todo (double click)
- Delete todo (click delete button)
- Toggle complete (click checkbox)
- Drag & drop để reorder
- Bulk actions (select multiple, delete selected)

### Event Delegation:

- Một event handler cho toàn bộ list
- Sử dụng data attributes để xác định action
- Handle multiple event types (click, dblclick, keydown)

```jsx
const handleListEvent = (event) => {
  const { target } = event;
  const action = target.dataset.action;
  const todoId = target.dataset.todoId;

  switch (action) {
    case "toggle":
      // Toggle todo
      break;
    case "delete":
      // Delete todo
      break;
    case "edit":
      // Start editing
      break;
    // ... other actions
  }
};
```

## Bài tập 5: File Upload với Events

Tạo component upload file với các event:

### Events:

- **Drop events:** Drag & drop file vào area
- **File change:** Select file từ input
- **Progress events:** Hiển thị progress upload (fake)
- **Error handling:** Validate file type, size
- **Preview:** Hiển thị preview image

### Features:

- Multiple file support
- Drag & drop visual feedback
- File type validation (image, pdf, doc)
- File size limit (5MB)
- Upload progress simulation
- Remove uploaded files

## Bài tập 6: Search với Advanced Events

Tạo search component nâng cao:

### Features:

- **Debounced search:** Delay search khi user ngừng gõ
- **Autocomplete:** Hiển thị suggestions
- **Keyboard navigation:** Up/Down để chọn suggestion, Enter để select
- **Click outside:** Đóng suggestions khi click bên ngoài
- **Search history:** Lưu và hiển thị lịch sử tìm kiếm
- **Clear search:** X button để xóa

### Events:

```javascript
const searchEvents = {
  onInputChange: (value) => {},
  onSearch: (query) => {},
  onSuggestionSelect: (suggestion) => {},
  onHistorySelect: (historyItem) => {},
  onClear: () => {},
  onFocus: () => {},
  onBlur: () => {},
};
```

## Bài tập 7: Interactive Canvas Drawing

Tạo ứng dụng vẽ đơn giản:

### Events:

- **Mouse events:** mousedown, mousemove, mouseup
- **Touch events:** Hỗ trợ mobile
- **Keyboard shortcuts:**
  - C: Clear canvas
  - Z: Undo
  - S: Save image

### Features:

- Brush size adjustment
- Color picker
- Eraser tool
- Undo/Redo
- Save drawing as image
- Load background image

### State:

```javascript
const drawingState = {
  isDrawing: false,
  tool: "brush", // brush, eraser
  brushSize: 5,
  color: "#000000",
  paths: [], // Array of drawing paths
  currentPath: [],
};
```

## Bài tập 8: Modal với Event Handling

Tạo Modal component với đầy đủ events:

### Events:

- **Keyboard:** ESC để đóng modal
- **Click outside:** Click overlay để đóng
- **Focus trap:** Tab chỉ di chuyển trong modal
- **Prevent scroll:** Không scroll background khi modal mở

### Features:

- Confirm dialog
- Form modal
- Image gallery modal
- Nested modals
- Animation open/close

## Kiểm tra kiến thức

1. ✅ Tôi hiểu SyntheticEvent trong React
2. ✅ Tôi biết cách xử lý các loại event khác nhau
3. ✅ Tôi có thể truyền tham số cho event handlers
4. ✅ Tôi hiểu về event delegation
5. ✅ Tôi biết khi nào dùng preventDefault() và stopPropagation()
6. ✅ Tôi có thể xử lý form events hiệu quả
7. ✅ Tôi biết tối ưu hóa event handlers (useCallback)
8. ✅ Tôi có thể xử lý keyboard và mouse events

## Challenge

Xây dựng một **Rich Text Editor** đơn giản với:

- Bold, Italic, Underline (Ctrl+B, Ctrl+I, Ctrl+U)
- Text alignment (Left, Center, Right)
- Font size và color
- Insert link, image
- Undo/Redo (Ctrl+Z, Ctrl+Y)
- Copy/Paste formatting
- Auto-save content
