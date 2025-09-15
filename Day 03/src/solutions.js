import React, { useState } from 'react';

// Bài tập 1: Component cơ bản

// Avatar component
const Avatar = ({ src, alt, size = "medium" }) => {
  const sizeMap = {
    small: "32px",
    medium: "64px", 
    large: "128px"
  };

  return (
    <img 
      src={src}
      alt={alt}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        borderRadius: "50%",
        objectFit: "cover"
      }}
    />
  );
};

// Badge component
const Badge = ({ text, color = "primary" }) => {
  const colorMap = {
    primary: "#007bff",
    success: "#28a745",
    warning: "#ffc107",
    danger: "#dc3545"
  };

  return (
    <span style={{
      backgroundColor: colorMap[color],
      color: color === "warning" ? "#000" : "#fff",
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "bold",
      margin: "2px"
    }}>
      {text}
    </span>
  );
};

// StatusIndicator component
const StatusIndicator = ({ isOnline, username }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: isOnline ? "#28a745" : "#6c757d"
      }} />
      <span>{username}</span>
      <small style={{ color: "#6c757d" }}>
        {isOnline ? "Đang online" : "Offline"}
      </small>
    </div>
  );
};

// Bài tập 2: Component với Props phức tạp
const UserProfile = ({ user }) => {
  return (
    <div style={{ 
      border: "1px solid #ddd", 
      borderRadius: "8px", 
      padding: "20px",
      maxWidth: "400px"
    }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Avatar src={user.avatar} alt={user.name} size="large" />
        <StatusIndicator isOnline={user.isOnline} username={user.name} />
      </div>
      
      <div>
        <h2>{user.name}</h2>
        <p style={{ color: "#6c757d" }}>{user.email}</p>
        <p>{user.bio}</p>
        
        <div style={{ marginBottom: "15px" }}>
          <h4>Kỹ năng:</h4>
          {user.skills.map(skill => (
            <Badge key={skill} text={skill} color="primary" />
          ))}
        </div>
        
        <p><strong>Tham gia:</strong> {new Date(user.joinDate).toLocaleDateString('vi-VN')}</p>
        
        <div>
          <h4>Mạng xã hội:</h4>
          <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {" | "}
          <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn  
          </a>
        </div>
      </div>
    </div>
  );
};

// Bài tập 3: Component với children
const Card = ({ title, footer, children }) => {
  return (
    <div style={{ 
      border: "1px solid #ddd", 
      borderRadius: "8px",
      overflow: "hidden"
    }}>
      {title && (
        <div style={{ 
          padding: "15px", 
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #ddd",
          fontWeight: "bold"
        }}>
          {title}
        </div>
      )}
      
      <div style={{ padding: "15px" }}>
        {children}
      </div>
      
      {footer && (
        <div style={{ 
          padding: "15px", 
          backgroundColor: "#f8f9fa",
          borderTop: "1px solid #ddd"
        }}>
          {footer}
        </div>
      )}
    </div>
  );
};

const Alert = ({ type = "info", dismissible = false, onClose, children }) => {
  const colorMap = {
    success: { bg: "#d4edda", border: "#c3e6cb", color: "#155724" },
    warning: { bg: "#fff3cd", border: "#ffeaa7", color: "#856404" },
    danger: { bg: "#f8d7da", border: "#f5c6cb", color: "#721c24" },
    info: { bg: "#d1ecf1", border: "#bee5eb", color: "#0c5460" }
  };

  const style = colorMap[type];

  return (
    <div style={{
      padding: "15px",
      backgroundColor: style.bg,
      border: `1px solid ${style.border}`,
      borderRadius: "4px",
      color: style.color,
      position: "relative"
    }}>
      {dismissible && (
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: style.color
          }}
        >
          ×
        </button>
      )}
      {children}
    </div>
  );
};

// Bài tập 4: Props drilling và Event handling
const ShoppingApp = () => {
  const [cart, setCart] = useState([]);
  
  const products = [
    { id: 1, name: "Laptop", price: 20000000, image: "laptop.jpg" },
    { id: 2, name: "Mouse", price: 500000, image: "mouse.jpg" },
    { id: 3, name: "Keyboard", price: 1500000, image: "keyboard.jpg" }
  ];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Header totalItems={getTotalItems()} />
      <div style={{ display: "flex", gap: "20px" }}>
        <ProductList products={products} onAddToCart={addToCart} />
        <Cart 
          items={cart} 
          onRemoveFromCart={removeFromCart}
          totalPrice={getTotalPrice()}
        />
      </div>
    </div>
  );
};

const Header = ({ totalItems }) => {
  return (
    <header style={{ 
      padding: "20px", 
      backgroundColor: "#007bff", 
      color: "white",
      marginBottom: "20px"
    }}>
      <h1>Cửa hàng điện tử</h1>
      <p>Giỏ hàng: {totalItems} sản phẩm</p>
    </header>
  );
};

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div style={{ flex: 2 }}>
      <h2>Sản phẩm</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
        {products.map(product => (
          <ProductCardSimple 
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

const ProductCardSimple = ({ product, onAddToCart }) => {
  return (
    <div style={{ 
      border: "1px solid #ddd", 
      borderRadius: "8px", 
      padding: "15px",
      textAlign: "center"
    }}>
      <div style={{ 
        width: "100%", 
        height: "150px", 
        backgroundColor: "#f8f9fa",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        📱 {/* Placeholder icon */}
      </div>
      <h3>{product.name}</h3>
      <p style={{ color: "#007bff", fontWeight: "bold" }}>
        {product.price.toLocaleString()} VNĐ
      </p>
      <button 
        onClick={() => onAddToCart(product)}
        style={{
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Thêm vào giỏ
      </button>
    </div>
  );
};

const Cart = ({ items, onRemoveFromCart, totalPrice }) => {
  return (
    <div style={{ flex: 1, minWidth: "300px" }}>
      <h2>Giỏ hàng</h2>
      {items.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          {items.map(item => (
            <CartItem 
              key={item.id}
              item={item}
              onRemove={onRemoveFromCart}
            />
          ))}
          <div style={{ 
            borderTop: "2px solid #ddd", 
            paddingTop: "15px",
            fontWeight: "bold",
            fontSize: "18px"
          }}>
            Tổng: {totalPrice.toLocaleString()} VNĐ
          </div>
        </>
      )}
    </div>
  );
};

const CartItem = ({ item, onRemove }) => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      padding: "10px",
      borderBottom: "1px solid #eee"
    }}>
      <div>
        <h4>{item.name}</h4>
        <p>Số lượng: {item.quantity}</p>
        <p>{(item.price * item.quantity).toLocaleString()} VNĐ</p>
      </div>
      <button 
        onClick={() => onRemove(item.id)}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Xóa
      </button>
    </div>
  );
};

// Bài tập 5: Button component tái sử dụng
const Button = ({ 
  children, 
  variant = "primary", 
  size = "medium", 
  disabled = false, 
  loading = false,
  onClick,
  type = "button",
  fullWidth = false 
}) => {
  const variantStyles = {
    primary: { bg: "#007bff", color: "#fff" },
    secondary: { bg: "#6c757d", color: "#fff" },
    success: { bg: "#28a745", color: "#fff" },
    danger: { bg: "#dc3545", color: "#fff" },
    warning: { bg: "#ffc107", color: "#000" },
    info: { bg: "#17a2b8", color: "#fff" }
  };

  const sizeStyles = {
    small: { padding: "4px 8px", fontSize: "12px" },
    medium: { padding: "8px 16px", fontSize: "14px" },
    large: { padding: "12px 24px", fontSize: "16px" }
  };

  const style = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    border: "none",
    borderRadius: "4px",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled || loading ? 0.6 : 1,
    width: fullWidth ? "100%" : "auto",
    position: "relative"
  };

  return (
    <button 
      type={type}
      style={style}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "..." : children}
    </button>
  );
};

// Export components để sử dụng
export {
  Avatar, Badge, StatusIndicator, UserProfile,
  Card, Alert, ShoppingApp, Button
};