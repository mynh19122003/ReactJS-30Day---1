import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import SocialPost from './components/SocialPost';

function App() {
  // Sample data cho ProductCard
  const [products] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      description: 'Smartphone cao cấp với chip A17 Pro và camera tuyệt vời',
      image: 'https://via.placeholder.com/300x200/007bff/white?text=iPhone+15',
      originalPrice: 29990000,
      discount: 2000000,
      rating: 5,
      reviewCount: 128,
      stock: 15,
      isNew: true
    },
    {
      id: 2,
      name: 'MacBook Air M2',
      description: 'Laptop mỏng nhẹ với hiệu năng mạnh mẽ cho công việc',
      image: 'https://via.placeholder.com/300x200/6c757d/white?text=MacBook+Air',
      originalPrice: 31990000,
      discount: 1500000,
      rating: 4,
      reviewCount: 89,
      stock: 8,
      isNew: false
    },
    {
      id: 3,
      name: 'AirPods Pro 2',
      description: 'Tai nghe không dây với chống ồn chủ động',
      image: 'https://via.placeholder.com/300x200/28a745/white?text=AirPods',
      originalPrice: 6990000,
      discount: 0,
      rating: 5,
      reviewCount: 256,
      stock: 0,
      isNew: false
    }
  ]);

  // Sample data cho SocialPost
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'Nguyễn Văn A',
        avatar: 'https://via.placeholder.com/48x48/007bff/white?text=NVA',
        verified: true
      },
      content: 'Hôm nay thật là một ngày tuyệt vời! Vừa hoàn thành dự án React đầu tiên 🎉\n\nCảm ơn các bạn đã ủng hộ và giúp đỡ mình trong suốt quá trình học tập.',
      image: 'https://via.placeholder.com/500x300/28a745/white?text=Project+Demo',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      location: 'Hà Nội, Việt Nam',
      hashtags: ['React', 'WebDevelopment', 'Coding'],
      likes: 42,
      comments: 8,
      shares: 3,
      userLiked: false
    },
    {
      id: 2,
      author: {
        name: 'Trần Thị B',
        avatar: 'https://via.placeholder.com/48x48/e74c3c/white?text=TTB',
        verified: false
      },
      content: 'Chia sẻ một số tips học React cho người mới bắt đầu:\n\n1. Bắt đầu với functional components\n2. Học useState trước khi học useEffect\n3. Thực hành nhiều với các project nhỏ\n4. Đọc documentation chính thức\n\nChúc các bạn học tốt! 💪',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      hashtags: ['ReactTips', 'Learning', 'Programming'],
      likes: 67,
      comments: 12,
      shares: 15,
      userLiked: true
    }
  ]);

  const [cart, setCart] = useState([]);

  // Handler functions cho ProductCard
  const handleAddToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleViewDetails = (product) => {
    alert(`Xem chi tiết sản phẩm: ${product.name}`);
  };

  // Handler functions cho SocialPost
  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          userLiked: !post.userLiked,
          likes: post.userLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleComment = (postId) => {
    alert(`Mở form bình luận cho bài viết ${postId}`);
  };

  const handleShare = (postId) => {
    alert(`Chia sẻ bài viết ${postId}`);
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
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

        {/* Shopping Cart Summary */}
        {cart.length > 0 && (
          <div style={{
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#155724' }}>
              🛒 Giỏ hàng ({cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)
            </h3>
            {cart.map(item => (
              <div key={item.id} style={{ marginBottom: '5px' }}>
                • {item.name} - SL: {item.quantity}
              </div>
            ))}
          </div>
        )}

        {/* Products Section */}
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
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px'
          }}>
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>

        {/* Social Posts Section */}
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
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {posts.map(post => (
              <SocialPost
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
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
}

export default App;