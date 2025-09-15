# Day 3 - Components & Props Examples

Các file code mẫu cho ngày 3 về Components và Props:

## Cấu trúc thư mục

```
src/
├── App.js                    # Component chính kết hợp tất cả
└── components/
    ├── ProductCard.js        # Component hiển thị sản phẩm
    └── SocialPost.js         # Component bài viết mạng xã hội
```

## Cách chạy code

1. **Khởi tạo project React mới:**

```bash
npx create-react-app day03-demo
cd day03-demo
```

2. **Copy các file từ thư mục src/ này vào project:**

   - Thay thế nội dung file `src/App.js`
   - Tạo thư mục `src/components/`
   - Copy `ProductCard.js` và `SocialPost.js` vào thư mục components

3. **Chạy ứng dụng:**

```bash
npm start
```

## Tính năng của từng component

### ProductCard.js

**Props nhận vào:**

- `product`: Object chứa thông tin sản phẩm
  - `id`, `name`, `description`, `image`
  - `originalPrice`, `discount`, `rating`, `reviewCount`
  - `stock`, `isNew`
- `onAddToCart`: Function xử lý thêm vào giỏ hàng
- `onViewDetails`: Function xử lý xem chi tiết

**Tính năng:**

- Hiển thị hình ảnh sản phẩm với badges (giảm giá, mới)
- Rating system với sao vàng
- Tính toán giá sau giảm giá
- Kiểm tra tồn kho và disable button khi hết hàng
- Hover effects và responsive design
- Event handling với stopPropagation

### SocialPost.js

**Props nhận vào:**

- `post`: Object chứa thông tin bài viết
  - `id`, `content`, `image`, `timestamp`, `location`
  - `author` (name, avatar, verified)
  - `hashtags`, `likes`, `comments`, `shares`
  - `userLiked`
- `onLike`, `onComment`, `onShare`: Functions xử lý tương tác

**Tính năng:**

- Hiển thị thông tin tác giả với avatar và verified badge
- Format thời gian relative (vừa xong, X giờ trước...)
- Hiển thị hashtags clickable
- Engagement stats (likes, comments, shares)
- Interactive buttons với hover effects
- Conditional rendering cho các elements tùy chọn

### App.js

**Chức năng chính:**

- Quản lý state cho products và posts
- Quản lý shopping cart với localStorage
- Event handlers cho tất cả interactions
- Layout responsive với sections riêng biệt
- Real-time updates cho likes và cart

## Concepts học được

### 1. **Props Destructuring**

```javascript
function ProductCard({ product, onAddToCart, onViewDetails }) {
  // Destructuring props ngay trong parameter
}
```

### 2. **Conditional Rendering**

```javascript
{
  product.discount > 0 && <span>-{discountPercent}%</span>;
}

{
  product.stock > 0 ? "Thêm vào giỏ" : "Hết hàng";
}
```

### 3. **Event Handling with Parameters**

```javascript
onClick={() => onAddToCart(product)}
onClick={(e) => {
  e.stopPropagation();
  onViewDetails(product);
}}
```

### 4. **Dynamic Styling**

```javascript
color: post.userLiked ? "#e74c3c" : "#666";
backgroundColor: product.stock > 0 ? "#007bff" : "#ccc";
```

### 5. **Array Mapping & Conditional Classes**

```javascript
{
  [...Array(5)].map((_, index) => (
    <span
      key={index}
      style={{
        color: index < product.rating ? "#ffc107" : "#e0e0e0",
      }}
    >
      ★
    </span>
  ));
}
```

### 6. **Complex State Management**

```javascript
const handleLike = (postId) => {
  setPosts((prev) =>
    prev.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          userLiked: !post.userLiked,
          likes: post.userLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    })
  );
};
```

## Bài tập mở rộng

1. **Thêm filter/search cho ProductCard:**

   - Tìm kiếm theo tên
   - Lọc theo giá, rating, tồn kho

2. **Enhanced SocialPost:**

   - Comment system với nested replies
   - Image gallery với multiple photos
   - Emoji reactions thay vì chỉ like

3. **Shopping Cart:**

   - Persist cart trong localStorage
   - Quantity controls (+/-)
   - Checkout flow

4. **Performance:**

   - React.memo cho components
   - useMemo cho expensive calculations
   - useCallback cho functions

5. **Accessibility:**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

Hãy thử chỉnh sửa props data và xem components re-render như thế nào!
