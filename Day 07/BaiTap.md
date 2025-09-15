# Ngày 7: Bài tập Lists & Keys - Advanced Dynamic Rendering

## 🎯 Mục tiêu bài tập

Thực hành rendering danh sách từ cơ bản đến nâng cao, bao gồm performance optimization, virtual scrolling, infinite loading, và complex list interactions.

---

## 📋 Bài tập 1: E-commerce Product Catalog ⭐⭐

### Yêu cầu:

Tạo catalog sản phẩm với tính năng search, filter, và sort:

- Hiển thị grid/list view switchable
- Real-time search với debouncing
- Multiple filters (category, price range, rating)
- Sort functionality (price, name, rating, date)
- Responsive design cho mobile/desktop

### Acceptance Criteria:

- [ ] Ít nhất 50+ sample products với complete data
- [ ] Search hoạt động real-time với debouncing 300ms
- [ ] Multiple filters có thể combine
- [ ] Sort functionality with ascending/descending
- [ ] Grid và list view modes
- [ ] Responsive breakpoints (<768px, >768px)
- [ ] Empty states cho các scenarios khác nhau

### Sample Data Structure:

```jsx
const sampleProducts = [
  {
    id: "prod_001",
    name: "iPhone 15 Pro Max",
    category: "smartphones",
    brand: "Apple",
    price: 29999000,
    originalPrice: 32999000,
    rating: 4.8,
    reviewCount: 1205,
    image: "https://example.com/iphone15.jpg",
    inStock: true,
    isNew: true,
    isSale: true,
    description: "Latest iPhone with titanium design",
    features: ["A17 Pro chip", "48MP camera", "Titanium build"],
    addedDate: "2024-01-15",
  },
  // ... more products
];
```

### Bonus features:

- Compare functionality (select multiple products)
- Recently viewed products
- Wishlist toggle
- Quick view modal
- Product recommendations

---

## 📋 Bài tập 2: Real-time Chat với Message Threading ⭐⭐⭐

### Yêu cầu:

Xây dựng chat interface với nested message threads:

- Message list với real-time updates
- Thread replies (nested comments)
- Message reactions và emoji picker
- User typing indicators
- Message search và filtering
- Infinite scroll cho message history

### Acceptance Criteria:

- [ ] Message threading tối đa 3 levels deep
- [ ] Real-time message updates (simulate with intervals)
- [ ] Message reactions với emoji picker
- [ ] Typing indicators cho multiple users
- [ ] Search messages với highlighting
- [ ] Infinite scroll loading older messages
- [ ] Message status indicators (sent, delivered, read)
- [ ] Auto-scroll to bottom cho new messages

### Core Components:

```jsx
function ChatApp() {
  // Main chat container
}

function MessageList({ messages, onReply, onReact }) {
  // Virtualized message list
}

function MessageThread({ message, level, maxLevel }) {
  // Recursive thread rendering
}

function MessageItem({ message, onReply, onReact, level }) {
  // Individual message với actions
}

function MessageInput({ onSend, replyTo, onCancelReply }) {
  // Compose new messages
}

function EmojiPicker({ onEmojiSelect, onClose }) {
  // Emoji selection overlay
}
```

### Advanced Features:

- Message editing và deletion
- File attachments preview
- Message formatting (bold, italic, code)
- @mentions với autocomplete
- Message timestamps với relative formatting

---

## 📋 Bài tập 3: Virtual Data Table với Advanced Features ⭐⭐⭐⭐

### Yêu cầu:

Tạo data table performance cao cho large datasets:

- Virtual scrolling cho 10,000+ rows
- Column sorting và filtering
- Column resizing và reordering
- Row selection (single/multiple)
- Inline editing capabilities
- Export functionality (CSV, JSON)
- Custom cell renderers

### Acceptance Criteria:

- [ ] Handle ít nhất 10,000 rows smoothly
- [ ] Virtual scrolling với variable row heights
- [ ] All columns sortable với visual indicators
- [ ] Advanced filtering (text, number, date, select)
- [ ] Drag-to-resize columns
- [ ] Drag-to-reorder columns
- [ ] Row selection với keyboard navigation
- [ ] Bulk actions cho selected rows
- [ ] Inline editing với validation
- [ ] Export selected/filtered data

### Sample Implementation:

```jsx
function VirtualDataTable({ data, columns, onRowSelect, onCellEdit }) {
  // Virtual table implementation
}

function TableHeader({ columns, onSort, onResize, onReorder }) {
  // Sortable, resizable, reorderable headers
}

function VirtualizedRows({ visibleData, rowHeight, onRowClick, selectedRows }) {
  // Virtualized row rendering
}

function TableCell({ value, column, rowData, isEditing, onEdit, onSave }) {
  // Custom cell rendering với editing
}

function TableFilters({ columns, filters, onFilterChange }) {
  // Advanced filtering controls
}
```

### Performance Requirements:

- Smooth scrolling with 60fps
- Memory efficient (không load all DOM nodes)
- Fast filtering và sorting
- Efficient re-rendering with memoization

---

## 📋 Bài tập 4: Kanban Board với Drag & Drop ⭐⭐⭐⭐

### Yêu cầu:

Xây dựng Kanban board interactive với advanced features:

- Multi-column task management
- Drag & drop between columns
- Task cards với rich content
- Real-time collaboration simulation
- Task filtering và search
- Column customization
- Progress tracking

### Acceptance Criteria:

- [ ] Ít nhất 4 customizable columns (Todo, In Progress, Review, Done)
- [ ] Drag & drop tasks between columns
- [ ] Drag & drop để reorder trong cùng column
- [ ] Task cards với complete information
- [ ] Real-time updates simulation
- [ ] Filter tasks by assignee, priority, tags
- [ ] Search tasks với highlighting
- [ ] Column limits và warnings
- [ ] Progress charts và analytics
- [ ] Keyboard accessibility

### Core Features:

```jsx
function KanbanBoard({
  columns,
  tasks,
  onTaskMove,
  onTaskUpdate,
  onColumnUpdate,
}) {
  // Main board layout
}

function KanbanColumn({ column, tasks, onTaskDrop, onTaskReorder }) {
  // Droppable column container
}

function TaskCard({ task, onEdit, onDelete, isDragging }) {
  // Draggable task card với rich content
}

function TaskDetailModal({ task, onSave, onClose }) {
  // Detailed task editing
}

function BoardFilters({ filters, onFilterChange, users, tags }) {
  // Advanced filtering options
}
```

### Advanced Features:

- Task dependencies visualization
- Time tracking
- Comment threads on tasks
- File attachments
- Activity history
- Board templates
- Custom fields

---

## 📋 Bài tập 5: Social Media Feed với Infinite Scroll ⭐⭐⭐⭐⭐

### Yêu cầu:

Tạo social feed comprehensive với advanced interactions:

- Infinite scrolling feed
- Post types (text, image, video, poll)
- Like, comment, share functionality
- Real-time engagement updates
- User mentions và hashtags
- Content filtering
- Performance optimization

### Acceptance Criteria:

- [ ] Infinite scroll với smooth loading
- [ ] Multiple post types với rich media
- [ ] Nested comments system
- [ ] Real-time like/comment counts
- [ ] @mentions với user suggestions
- [ ] #hashtag linking và trending
- [ ] Content filtering (friends, public, etc.)
- [ ] Image/video lazy loading
- [ ] Optimistic UI updates
- [ ] Error handling với retry mechanisms

### Complex Implementation:

```jsx
function SocialFeed({ user, feedType, onPostCreate, onPostInteract }) {
  // Main feed container với infinite scroll
}

function FeedPost({ post, currentUser, onLike, onComment, onShare }) {
  // Individual post với all interactions
}

function PostComments({ postId, comments, onAddComment, onReplyComment }) {
  // Nested comments với pagination
}

function PostCreator({ onPostSubmit, mentionSuggestions }) {
  // Rich post creation với media upload
}

function MediaViewer({ media, onClose }) {
  // Full-screen media viewing
}

function HashtagProcessor({ text, onHashtagClick }) {
  // Process và highlight hashtags/mentions
}
```

### Performance Challenges:

- Virtual scrolling cho large feeds
- Image optimization và lazy loading
- Efficient state management
- Memory leak prevention
- Network request optimization
- Cache management

### Real-time Features:

- Live like/comment updates
- Typing indicators trong comments
- New post notifications
- Online status indicators
- Real-time follower counts

---

## 🎯 Deliverables

### Cho mỗi bài tập, tạo:

1. **Core Implementation:**

   - Main components với full functionality
   - Custom hooks cho reusable logic
   - Utility functions cho data processing
   - Performance optimizations

2. **Styling & UX:**

   - Responsive CSS/SCSS
   - Smooth animations và transitions
   - Loading states và skeletons
   - Error states với retry options

3. **Testing:**

   - Unit tests cho key functionality
   - Integration tests cho user flows
   - Performance benchmarks
   - Accessibility testing

4. **Documentation:**
   - Component API documentation
   - Usage examples và demos
   - Performance optimization notes
   - Deployment instructions

---

## 🏆 Evaluation Criteria

### Technical Implementation (30%):

- Proper key usage và list optimization
- Performance với large datasets
- Memory efficient rendering
- Clean, maintainable code
- Error handling và edge cases

### User Experience (25%):

- Smooth interactions và animations
- Responsive design
- Intuitive navigation
- Loading states và feedback
- Accessibility compliance

### Advanced Features (25%):

- Virtual scrolling implementation
- Drag & drop functionality
- Real-time updates simulation
- Complex state management
- Custom hooks và utilities

### Code Quality (20%):

- Component composition
- Reusable patterns
- Performance optimizations
- Testing coverage
- Documentation quality

---

## 📚 Technical Requirements

### Performance Benchmarks:

- Lists với 1000+ items: <100ms render time
- Virtual scrolling: 60fps scrolling
- Search debouncing: 300ms delay
- Memory usage: <100MB cho large datasets

### Browser Support:

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Touch support cho drag & drop

### Accessibility Standards:

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Focus management

---

## 🛠️ Suggested Tools & Libraries

### Core:

- React 18+ với Hooks
- react-window/react-virtualized (virtual scrolling)
- react-beautiful-dnd (drag & drop)
- Intersection Observer API (infinite scroll)

### Optional Enhancements:

- Framer Motion (animations)
- React Query (data fetching)
- Zustand/Redux (state management)
- React Hook Form (forms)

### Testing:

- Jest & React Testing Library
- Cypress (E2E testing)
- Lighthouse (performance)
- axe-core (accessibility)

---

## 📈 Bonus Challenges

### Performance Optimization:

- Implement custom virtual scrolling
- Add service worker caching
- Optimize bundle size
- Memory profiling và optimization

### Advanced Features:

- WebSocket integration cho real-time
- Offline support với sync
- Progressive Web App features
- Advanced animations với spring physics

Chúc các bạn coding vui vẻ! 🚀

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
