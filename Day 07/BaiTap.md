# Ngày 7: Bài tập Lists and Keys

## Bài tập 1: Student Management System

Tạo hệ thống quản lý sinh viên với đầy đủ CRUD operations:

### Dữ liệu mẫu:

```javascript
const initialStudents = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    studentId: "SV001",
    email: "an.nguyen@email.com",
    phone: "0123456789",
    major: "Computer Science",
    year: 3,
    gpa: 3.8,
    status: "active", // active, graduated, suspended
    enrollmentDate: "2021-09-01",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    studentId: "SV002",
    email: "binh.tran@email.com",
    phone: "0987654321",
    major: "Business Administration",
    year: 2,
    gpa: 3.5,
    status: "active",
    enrollmentDate: "2022-09-01",
  },
  // ... thêm nhiều sinh viên
];
```

### Yêu cầu:

1. **Display List:** Hiển thị danh sách sinh viên trong table
2. **Search:** Tìm kiếm theo tên, mã SV, email
3. **Filter:** Lọc theo major, year, status
4. **Sort:** Sắp xếp theo tên, GPA, năm nhập học
5. **Add:** Thêm sinh viên mới
6. **Edit:** Chỉnh sửa thông tin sinh viên
7. **Delete:** Xóa sinh viên (có confirm)
8. **Bulk Actions:** Select multiple và delete selected
9. **Pagination:** Phân trang 10 items/page
10. **Statistics:** Hiển thị tổng số SV, GPA trung bình

### Components cần tạo:

- `StudentManagement` (main component)
- `StudentList` (display table)
- `StudentItem` (table row)
- `StudentForm` (add/edit form)
- `SearchBar`
- `FilterControls`
- `Pagination`
- `BulkActions`

## Bài tập 2: E-commerce Product Catalog

Tạo catalog sản phẩm với advanced filtering và sorting:

### Product data:

```javascript
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "smartphones",
    price: 25000000,
    originalPrice: 28000000,
    discount: 10,
    rating: 4.8,
    reviews: 245,
    inStock: true,
    quantity: 15,
    images: ["img1.jpg", "img2.jpg"],
    specs: {
      screen: "6.1 inch",
      storage: "128GB",
      ram: "8GB",
      camera: "48MP",
    },
    tags: ["new", "featured", "bestseller"],
    releaseDate: "2023-09-15",
  },
  // ... more products
];
```

### Features cần implement:

1. **Grid/List View Toggle:** Switch giữa grid và list layout
2. **Multi-level Filtering:**
   - Price range slider
   - Brand checkboxes
   - Category dropdown
   - Rating stars
   - In stock toggle
   - Tags (new, featured, bestseller)
3. **Sorting Options:**
   - Price (low to high, high to low)
   - Name (A-Z, Z-A)
   - Rating (best first)
   - Newest first
   - Bestseller first
4. **Search:** Tìm kiếm theo tên, brand, specs
5. **Wishlist:** Add/remove from wishlist
6. **Compare:** Select multiple products để so sánh
7. **Load More/Infinite Scroll:** Load 12 products mỗi lần
8. **Filter Summary:** Hiển thị active filters với remove option

## Bài tập 3: Social Media Feed

Tạo news feed giống Facebook/Instagram:

### Post data structure:

```javascript
const posts = [
  {
    id: 1,
    author: {
      id: 1,
      name: "Nguyễn Văn An",
      avatar: "avatar1.jpg",
      isVerified: true,
    },
    content: "Hôm nay thời tiết đẹp quá! 🌞",
    images: ["post1_1.jpg", "post1_2.jpg"],
    video: null,
    createdAt: "2024-01-15T10:30:00Z",
    likes: 25,
    comments: [
      {
        id: 1,
        author: { name: "Trần Bình", avatar: "avatar2.jpg" },
        content: "Đúng vậy, mình cũng đi dạo luôn!",
        createdAt: "2024-01-15T10:35:00Z",
        likes: 3,
      },
    ],
    shares: 5,
    isLiked: false,
    isBookmarked: true,
    privacy: "public",
    location: "Hà Nội",
    type: "post", // post, shared, photo, video
  },
];
```

### Yêu cầu:

1. **Infinite Scroll:** Load more posts khi scroll xuống cuối
2. **Post Types:** Hiển thị khác nhau cho text, photo, video, shared posts
3. **Interactions:** Like, comment, share, bookmark
4. **Comments System:**
   - Nested comments (replies)
   - Load more comments
   - Real-time comment updates
5. **Media Gallery:** Slideshow cho multiple images
6. **Time Stamps:** "5 phút trước", "Hôm qua", etc.
7. **Privacy Indicators:** Icons cho public/friends/private
8. **User Interactions:** Click avatar để xem profile

## Bài tập 4: Interactive Data Table

Tạo data table với advanced features:

### Data structure:

```javascript
const tableData = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an@email.com",
    role: "Admin",
    department: "IT",
    salary: 15000000,
    startDate: "2020-01-15",
    status: "active",
    projects: ["Project A", "Project B"],
    skills: ["React", "Node.js", "Python"],
  },
  // ... 100+ records
];
```

### Features:

1. **Column Features:**
   - Sortable columns (click header)
   - Resizable columns (drag border)
   - Hidden/visible toggle
   - Reorderable columns (drag & drop)
2. **Row Features:**
   - Row selection (single/multiple)
   - Row actions (edit, delete, view)
   - Expandable rows (show details)
   - Row highlighting on hover
3. **Filtering:**
   - Column-specific filters
   - Global search
   - Advanced filter builder
   - Save/load filter presets
4. **Export/Import:**
   - Export to CSV, Excel
   - Print view
   - Copy selected rows
5. **Virtualization:** Render only visible rows (performance)

## Bài tập 5: File Explorer Interface

Tạo giao diện file explorer như Windows:

### File system data:

```javascript
const fileSystem = [
  {
    id: 1,
    name: "Documents",
    type: "folder",
    parentId: null,
    children: [
      {
        id: 2,
        name: "Work",
        type: "folder",
        parentId: 1,
        children: [
          {
            id: 3,
            name: "report.pdf",
            type: "file",
            size: 2048000,
            modified: "2024-01-15T10:30:00Z",
            parentId: 2,
          },
        ],
      },
    ],
  },
];
```

### Features:

1. **Tree Navigation:** Expandable folder tree
2. **Breadcrumb:** Current path navigation
3. **Multiple Views:**
   - List view (name, size, modified)
   - Grid view (thumbnails)
   - Details view (all metadata)
4. **File Operations:**
   - Create folder
   - Upload files
   - Rename, delete, copy, move
   - Right-click context menu
5. **Selection:**
   - Single/multiple selection
   - Drag and drop selection
   - Keyboard navigation (arrows, enter, space)
6. **Search:** Search within current folder or globally

## Bài tập 6: Music Player Playlist

Tạo playlist music player:

### Song data:

```javascript
const songs = [
  {
    id: 1,
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: 263, // seconds
    genre: "Pop",
    year: 2017,
    coverArt: "cover1.jpg",
    audioUrl: "song1.mp3",
    playCount: 1250000,
    isLiked: true,
    addedDate: "2024-01-01",
  },
];
```

### Features:

1. **Playlist Management:**
   - Create, rename, delete playlists
   - Add/remove songs from playlists
   - Reorder songs (drag & drop)
2. **Playback Controls:**
   - Play, pause, next, previous
   - Shuffle, repeat modes
   - Progress bar with seek
   - Volume control
3. **Queue Management:**
   - Current playing queue
   - Add to queue, remove from queue
   - Clear queue
4. **Filtering & Search:**
   - Search by title, artist, album
   - Filter by genre, year, liked
   - Sort by various criteria
5. **Visualizations:**
   - Now playing card
   - Waveform/spectrum analyzer
   - Lyrics display (if available)

## Bài tập 7: Kanban Board (Trello Clone)

Tạo Kanban board để quản lý tasks:

### Board data:

```javascript
const boardData = {
  id: 1,
  name: "Project Alpha",
  columns: [
    {
      id: 1,
      title: "To Do",
      color: "#FF6B6B",
      cards: [
        {
          id: 1,
          title: "Design homepage",
          description: "Create mockups for the new homepage",
          assignees: [{ id: 1, name: "An", avatar: "avatar1.jpg" }],
          labels: ["UI/UX", "High Priority"],
          dueDate: "2024-01-20",
          checklist: [
            { id: 1, text: "Research competitors", completed: true },
            { id: 2, text: "Create wireframes", completed: false },
          ],
          attachments: ["design.sketch", "requirements.pdf"],
          comments: [
            {
              id: 1,
              author: "Bình",
              content: "Looks good so far!",
              createdAt: "2024-01-15T10:30:00Z",
            },
          ],
          createdAt: "2024-01-14T09:00:00Z",
        },
      ],
    },
    {
      id: 2,
      title: "In Progress",
      color: "#4ECDC4",
      cards: [],
    },
    {
      id: 3,
      title: "Done",
      color: "#45B7D1",
      cards: [],
    },
  ],
};
```

### Features:

1. **Drag & Drop:**
   - Move cards between columns
   - Reorder cards within columns
   - Move columns to reorder
2. **Card Management:**
   - Add, edit, delete cards
   - Card details modal
   - Due date indicators
   - Progress indicators
3. **Collaboration:**
   - Assign members to cards
   - Add comments
   - File attachments
   - Activity history
4. **Organization:**
   - Labels with colors
   - Search and filter
   - Archive completed cards
   - Export board data

## Kiểm tra kiến thức

1. ✅ Tôi hiểu cách render arrays với map()
2. ✅ Tôi biết tầm quan trọng của keys
3. ✅ Tôi có thể chọn keys phù hợp (unique, stable)
4. ✅ Tôi hiểu vấn đề với index làm key
5. ✅ Tôi có thể filter và sort lists
6. ✅ Tôi biết handle empty states
7. ✅ Tôi có thể implement pagination
8. ✅ Tôi hiểu về performance optimization cho lists
9. ✅ Tôi có thể tạo nested lists
10. ✅ Tôi biết implement CRUD operations cho lists

## Challenge

Xây dựng một **Email Client Interface** hoàn chỉnh với:

- Folder tree (Inbox, Sent, Drafts, custom folders)
- Email list với virtual scrolling
- Threaded conversations
- Search với advanced filters
- Multiple selection và bulk actions
- Drag & drop để move emails
- Real-time updates
- Responsive design
