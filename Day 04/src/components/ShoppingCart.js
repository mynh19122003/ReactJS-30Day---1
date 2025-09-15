import React, { useState, useEffect } from 'react';

function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [products] = useState([
    {
      id: 1,
      name: 'Laptop Gaming',
      price: 25000000,
      image: 'https://via.placeholder.com/80x80/007bff/white?text=Laptop'
    },
    {
      id: 2,
      name: 'Chuột không dây',
      price: 500000,
      image: 'https://via.placeholder.com/80x80/28a745/white?text=Mouse'
    },
    {
      id: 3,
      name: 'Bàn phím cơ',
      price: 1200000,
      image: 'https://via.placeholder.com/80x80/ffc107/white?text=Keyboard'
    }
  ]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        🛒 Giỏ hàng thông minh
      </h1>

      {/* Products to add */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#007bff', marginBottom: '20px' }}>Sản phẩm có sẵn</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {products.map(product => (
            <div
              key={product.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                backgroundColor: 'white'
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '80px', height: '80px', marginBottom: '10px' }}
              />
              <h3 style={{ margin: '10px 0', fontSize: '16px' }}>{product.name}</h3>
              <p style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '18px' }}>
                {product.price.toLocaleString('vi-VN')}đ
              </p>
              <button
                onClick={() => addToCart(product)}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Cart summary */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: '#333' }}>
            Giỏ hàng ({getTotalItems()} sản phẩm)
          </h2>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Xóa tất cả
            </button>
          )}
        </div>
      </div>

      {/* Cart items */}
      {items.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '2px dashed #ddd'
        }}>
          <p style={{ fontSize: '18px', margin: 0 }}>
            🛒 Giỏ hàng của bạn đang trống
          </p>
          <p style={{ margin: '10px 0 0 0' }}>
            Hãy thêm một số sản phẩm từ danh sách bên trên!
          </p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
          {items.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
                borderBottom: '1px solid #eee'
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '60px',
                  height: '60px',
                  marginRight: '15px',
                  borderRadius: '4px'
                }}
              />
              
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>
                  {item.name}
                </h3>
                <p style={{ color: '#e74c3c', fontWeight: 'bold', margin: 0 }}>
                  {item.price.toLocaleString('vi-VN')}đ
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  -
                </button>
                
                <span style={{
                  minWidth: '40px',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </button>

                <div style={{
                  minWidth: '120px',
                  textAlign: 'right',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginLeft: '20px'
                }}>
                  {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#dc3545',
                    cursor: 'pointer',
                    fontSize: '18px',
                    marginLeft: '10px',
                    padding: '5px'
                  }}
                  title="Xóa sản phẩm"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderTop: '2px solid #007bff'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              <span>Tổng cộng:</span>
              <span style={{ color: '#e74c3c' }}>
                {getTotalPrice().toLocaleString('vi-VN')}đ
              </span>
            </div>
            
            <button
              style={{
                width: '100%',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '15px',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '15px'
              }}
              onClick={() => alert('Chức năng thanh toán sẽ được phát triển!')}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      )}

      {/* Debug info */}
      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#e9ecef',
        borderRadius: '5px',
        fontSize: '14px'
      }}>
        <strong>🔍 Debug Info:</strong>
        <div>Số lượng items trong state: {items.length}</div>
        <div>Tổng số sản phẩm: {getTotalItems()}</div>
        <div>Dữ liệu được lưu trong localStorage với key: 'shopping-cart'</div>
      </div>
    </div>
  );
}

export default ShoppingCart;