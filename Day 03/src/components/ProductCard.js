import React from 'react';

function ProductCard({ product, onAddToCart, onViewDetails }) {
  const discountPrice = product.originalPrice - product.discount;
  const discountPercent = Math.round((product.discount / product.originalPrice) * 100);

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '16px',
      margin: '10px',
      maxWidth: '300px',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
    onMouseLeave={(e) => e.target.style.transform = 'translateY(0px)'}
    >
      <div style={{ position: 'relative' }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px'
          }}
        />
        {product.discount > 0 && (
          <span style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#ff4444',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            -{discountPercent}%
          </span>
        )}
        {product.isNew && (
          <span style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: '#28a745',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            MỚI
          </span>
        )}
      </div>

      <div style={{ padding: '12px 0' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          margin: '0 0 8px 0',
          color: '#333',
          lineHeight: '1.3'
        }}>
          {product.name}
        </h3>

        <p style={{
          color: '#666',
          fontSize: '14px',
          margin: '0 0 12px 0',
          lineHeight: '1.4'
        }}>
          {product.description}
        </p>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(5)].map((_, index) => (
              <span 
                key={index}
                style={{
                  color: index < product.rating ? '#ffc107' : '#e0e0e0',
                  fontSize: '16px',
                  marginRight: '2px'
                }}
              >
                ★
              </span>
            ))}
          </div>
          <span style={{
            marginLeft: '8px',
            fontSize: '14px',
            color: '#666'
          }}>
            ({product.reviewCount} đánh giá)
          </span>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#e74c3c'
            }}>
              {discountPrice.toLocaleString('vi-VN')}đ
            </span>
            {product.discount > 0 && (
              <span style={{
                fontSize: '16px',
                color: '#999',
                textDecoration: 'line-through',
                marginLeft: '8px'
              }}>
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>
          
          <div style={{
            fontSize: '12px',
            color: product.stock > 0 ? '#28a745' : '#dc3545',
            marginTop: '4px'
          }}>
            {product.stock > 0 
              ? `Còn ${product.stock} sản phẩm`
              : 'Hết hàng'
            }
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '8px'
        }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={product.stock === 0}
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: product.stock > 0 ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
          >
            {product.stock > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            style={{
              padding: '10px 16px',
              backgroundColor: 'transparent',
              color: '#007bff',
              border: '1px solid #007bff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
          >
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;