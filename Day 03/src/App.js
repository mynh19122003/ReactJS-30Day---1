// =============================================================================
// DAY 3: COMPONENTS & PROPS - TẠO VÀ SỬ DỤNG PROPS TRONG REACT
// =============================================================================
// Props là cách truyền data từ component cha sang component con
// State là data nội bộ của component có thể thay đổi theo thời gian
// =============================================================================

import React, { useState } from 'react';
import ProductCard from './components/ProductCard';  // Import component con
import SocialPost from './components/SocialPost';   // Import component con

function App() {
  // =============================================================================
  // 1. STATE MANAGEMENT - Quản lý data của toàn bộ ứng dụng
  // =============================================================================
  
  // useState để tạo state cho danh sách sản phẩm
  // Tại sao dùng array? Vì chúng ta có nhiều sản phẩm cần hiển thị
  const [products] = useState([
    // =============================================================================
    // 2. PRODUCT DATA STRUCTURE - Cấu trúc dữ liệu sản phẩm
    // =============================================================================
    // Mỗi object trong array sẽ được truyền làm props cho ProductCard component
    {
      id: 1,                              // Unique identifier - bắt buộc cho key prop
      name: 'iPhone 15 Pro Max',          // String prop - tên sản phẩm
      description: 'Smartphone cao cấp với chip A17 Pro và camera tuyệt vời', // String prop - mô tả
      image: 'https://via.placeholder.com/300x200/007bff/white?text=iPhone+15', // String prop - URL hình ảnh
      originalPrice: 29990000,            // Number prop - giá gốc
      discount: 2000000,                  // Number prop - số tiền giảm giá
      rating: 5,                          // Number prop - đánh giá (1-5 sao)
      reviewCount: 128,                   // Number prop - số lượt đánh giá
      stock: 15,                          // Number prop - số lượng tồn kho
      isNew: true                         // Boolean prop - sản phẩm mới?
    },
    {
      id: 2,                              // ID khác để phân biệt
      name: 'MacBook Air M2',             // Props có thể có giá trị khác nhau
      description: 'Laptop mỏng nhẹ với hiệu năng mạnh mẽ cho công việc',
      image: 'https://via.placeholder.com/300x200/6c757d/white?text=MacBook+Air',
      originalPrice: 31990000,            // Giá khác với sản phẩm trước
      discount: 1500000,                  // Giảm giá khác
      rating: 4,                          // Rating thấp hơn
      reviewCount: 89,                    // Ít review hơn
      stock: 8,                           // Tồn kho ít hơn
      isNew: false                        // Không phải sản phẩm mới
    },
    {
      id: 3,
      name: 'AirPods Pro 2',
      description: 'Tai nghe không dây với chống ồn chủ động',
      image: 'https://via.placeholder.com/300x200/28a745/white?text=AirPods',
      originalPrice: 6990000,
      discount: 0,                        // Không có giảm giá
      rating: 5,
      reviewCount: 256,
      stock: 0,                           // Hết hàng - component sẽ hiển thị khác
      isNew: false
    }
  ]);

  // =============================================================================
  // 3. SOCIAL POSTS DATA - Cấu trúc dữ liệu phức tạp hơn
  // =============================================================================
  // State có thể thay đổi (setPosts) - khác với products chỉ đọc
  const [posts, setPosts] = useState([
    {
      id: 1,
      // =============================================================================
      // NESTED OBJECT PROPS - Props có thể là object phức tạp
      // =============================================================================
      author: {                           // Object prop - thông tin tác giả
        name: 'Nguyễn Văn A',            // String bên trong object
        avatar: 'https://via.placeholder.com/48x48/007bff/white?text=NVA', // URL avatar
        verified: true                    // Boolean - tài khoản đã xác thực?
      },
      content: 'Hôm nay thật là một ngày tuyệt vời! Vừa hoàn thành dự án React đầu tiên 🎉\n\nCảm ơn các bạn đã ủng hộ và giúp đỡ mình trong suốt quá trình học tập.',
      image: 'https://via.placeholder.com/500x300/28a745/white?text=Project+Demo', // Optional image
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // Date object prop - 2 hours ago
      location: 'Hà Nội, Việt Nam',      // String prop - địa điểm
      hashtags: ['React', 'WebDevelopment', 'Coding'], // Array prop - danh sách hashtags
      likes: 42,                          // Number prop - số lượt thích
      comments: 8,                        // Number prop - số bình luận  
      shares: 3,                          // Number prop - số lượt chia sẻ
      userLiked: false                    // Boolean prop - user đã thích chưa?
    },
    {
      id: 2,
      author: {
        name: 'Trần Thị B',              // Author object khác
        avatar: 'https://via.placeholder.com/48x48/e74c3c/white?text=TTB',
        verified: false                   // Không được verified
      },
      content: 'Chia sẻ một số tips học React cho người mới bắt đầu:\n\n1. Bắt đầu với functional components\n2. Học useState trước khi học useEffect\n3. Thực hành nhiều với các project nhỏ\n4. Đọc documentation chính thức\n\nChúc các bạn học tốt! 💪',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      hashtags: ['ReactTips', 'Learning', 'Programming'], // Array hashtags khác
      likes: 67,                          // Số liệu khác
      comments: 12,
      shares: 15,
      userLiked: true                     // User đã thích bài này
    }
  ]);

  // =============================================================================
  // 4. CART STATE - State có thể thay đổi thông qua user interaction
  // =============================================================================
  // Cart là array rỗng ban đầu, sẽ được update khi user thêm sản phẩm
  const [cart, setCart] = useState([]);  // Empty array initially

  // =============================================================================
  // 5. EVENT HANDLERS - Functions truyền làm props cho components
  // =============================================================================
  // Các function này sẽ được truyền xuống components con thông qua props
  
  // Handler cho ProductCard - nhận product object từ component con
  const handleAddToCart = (product) => {
    // setCart với function update - nhận previous state làm parameter
    setCart(prev => {
      // Kiểm tra sản phẩm đã có trong cart chưa
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // Nếu có rồi thì tăng quantity
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }  // Spread operator + update
            : item                                        // Giữ nguyên items khác
        );
      }
      
      // Nếu chưa có thì thêm mới với quantity = 1
      return [...prev, { ...product, quantity: 1 }];    // Spread operator thêm item
    });
    
    // Feedback cho user
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  // Handler đơn giản hơn - chỉ nhận data và xử lý
  const handleViewDetails = (product) => {
    alert(`Xem chi tiết sản phẩm: ${product.name}`);
  };

  // =============================================================================
  // 6. SOCIAL POST HANDLERS - Xử lý interactions phức tạp hơn
  // =============================================================================
  
  // Handler để like/unlike post
  const handleLike = (postId) => {
    // setPosts để update state của posts array
    setPosts(prev => prev.map(post => {
      // Chỉ update post có ID khớp
      if (post.id === postId) {
        return {
          ...post,                                        // Giữ nguyên tất cả props khác
          userLiked: !post.userLiked,                    // Toggle boolean
          likes: post.userLiked ? post.likes - 1 : post.likes + 1 // Conditional update
        };
      }
      return post;                                        // Giữ nguyên posts khác
    }));
  };

  // Handler mở form comment  
  const handleComment = (postId) => {
    alert(`Mở form bình luận cho bài viết ${postId}`);
  };

  // Handler chia sẻ
  const handleShare = (postId) => {
    alert(`Chia sẻ bài viết ${postId}`);
  };

  // =============================================================================
  // 7. RENDER JSX - Trả về giao diện component
  // =============================================================================
  return (
    <div style={{
      backgroundColor: '#f8f9fa',      // Inline styles - object với camelCase
      minHeight: '100vh',              // CSS properties thành camelCase
      padding: '20px'                  // String values cho CSS
    }}>
      <div style={{
        maxWidth: '1200px',            // Container width
        margin: '0 auto'               // Center container
      }}>
        
        {/* =================================================================== */}
        {/* HEADER SECTION - Static content không cần props */}
        {/* =================================================================== */}
        <header style={{
          textAlign: 'center',
          marginBottom: '40px',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            color: '#333',
            marginBottom: '10px',
            fontSize: '32px'
          }}>
            Day 3 - Components & Props Demo
          </h1>
          <p style={{
            color: '#666',
            fontSize: '18px',
            margin: 0
          }}>
            Học cách sử dụng Props với ProductCard và SocialPost
          </p>
        </header>

        {/* =================================================================== */}
        {/* CONDITIONAL RENDERING - Hiển thị cart chỉ khi có items */}
        {/* =================================================================== */}
        {cart.length > 0 && (                              // Conditional rendering với &&
          <div style={{
            backgroundColor: '#d4edda',                    // Success color
            border: '1px solid #c3e6cb',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#155724' }}>
              🛒 Giỏ hàng ({cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)
            </h3>
            {/* MAP qua cart array để hiển thị items */}
            {cart.map(item => (                           // Render danh sách items
              <div key={item.id} style={{ marginBottom: '5px' }}>
                • {item.name} - SL: {item.quantity}
              </div>
            ))}
          </div>
        )}

        {/* =================================================================== */}
        {/* PRODUCTS SECTION - Sử dụng map() để render nhiều components */}
        {/* =================================================================== */}
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{
            color: '#333',
            marginBottom: '20px',
            fontSize: '24px',
            textAlign: 'center'
          }}>
            🛍️ Sản phẩm nổi bật
          </h2>
          <div style={{
            display: 'flex',               // Flexbox layout
            flexWrap: 'wrap',              // Wrap xuống dòng
            justifyContent: 'center',      // Center items
            gap: '20px'                    // Khoảng cách giữa items
          }}>
            {/* =================================================================== */}
            {/* MAP OVER PRODUCTS - Render ProductCard cho mỗi product */}
            {/* =================================================================== */}
            {products.map(product => (                    // Loop qua products array
              <ProductCard
                key={product.id}                          // KEY prop - bắt buộc, unique
                product={product}                         // PRODUCT prop - pass entire object
                onAddToCart={handleAddToCart}             // FUNCTION prop - callback handler
                onViewDetails={handleViewDetails}         // FUNCTION prop - another callback
              />
              // Component ProductCard sẽ nhận 4 props:
              // 1. key (React internal - không truy cập được)
              // 2. product (object chứa tất cả thông tin sản phẩm)
              // 3. onAddToCart (function để gọi khi user click Add to Cart)
              // 4. onViewDetails (function để gọi khi user click View Details)
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* SOCIAL POSTS SECTION - Render posts với props phức tạp hơn */}
        {/* =================================================================== */}
        <section>
          <h2 style={{
            color: '#333',
            marginBottom: '20px',
            fontSize: '24px',
            textAlign: 'center'
          }}>
            📱 Bảng tin xã hội
          </h2>
          <div style={{
            maxWidth: '600px',           // Giới hạn width cho posts
            margin: '0 auto'             // Center container
          }}>
            {/* =================================================================== */}
            {/* MAP OVER POSTS - Render SocialPost components */}
            {/* =================================================================== */}
            {posts.map(post => (                        // Loop qua posts array
              <SocialPost
                key={post.id}                           // Unique key
                post={post}                             // POST prop - object với nhiều nested properties
                onLike={handleLike}                     // FUNCTION prop - like handler
                onComment={handleComment}               // FUNCTION prop - comment handler  
                onShare={handleShare}                   // FUNCTION prop - share handler
              />
              // SocialPost component nhận:
              // 1. post object chứa: author, content, image, timestamp, etc.
              // 2. 3 callback functions để handle user interactions
              // Component sẽ destructure post object để lấy các properties cần thiết
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* FOOTER - Static content với summary */}
        {/* =================================================================== */}
        <footer style={{
          textAlign: 'center',
          marginTop: '50px',
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#28a745', marginBottom: '15px' }}>
            ✅ Hoàn thành Day 3!
          </h3>
          <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>
            Bạn đã học cách tạo và sử dụng Props trong React. Thử chỉnh sửa dữ liệu 
            sản phẩm và bài viết để xem component thay đổi như thế nào!
          </p>
        </footer>
      </div>
    </div>
  );
  // =============================================================================
  // KẾT THÚC COMPONENT - Những điều cần nhớ:
  // =============================================================================
  // 1. Props là READ-ONLY - component con không thể thay đổi props
  // 2. State là MUTABLE - chỉ có thể thay đổi bằng setState function
  // 3. Event handlers được truyền xuống component con thông qua props
  // 4. Data flow là ONE-WAY - từ cha xuống con
  // 5. Component con gọi callback props để communicate với component cha
  // =============================================================================
}

export default App;