// =============================================================================
// PRODUCTCARD COMPONENT - Ví dụ về Props và Component Composition
// =============================================================================
// Component này nhận props từ component cha và hiển thị thông tin sản phẩm
// Đây là ví dụ perfect về cách sử dụng props trong React
// =============================================================================

import React from 'react';

// =============================================================================
// FUNCTION COMPONENT với PROPS DESTRUCTURING
// =============================================================================
// Thay vì nhận props object, ta destructure ngay trong parameter
// { product, onAddToCart, onViewDetails } thay vì props.product, props.onAddToCart
function ProductCard({ product, onAddToCart, onViewDetails }) {
  // =============================================================================
  // 1. COMPUTED VALUES - Tính toán dựa trên props
  // =============================================================================
  // Tính giá sau giảm - sử dụng data từ props
  const discountPrice = product.originalPrice - product.discount;
  
  // Tính phần trăm giảm giá - Math.round để làm tròn số
  const discountPercent = Math.round((product.discount / product.originalPrice) * 100);

  // =============================================================================
  // 2. RETURN JSX - Render giao diện dựa trên props
  // =============================================================================
  return (
    <div style={{
      border: '1px solid #e0e0e0',        // CSS border
      borderRadius: '12px',               // Rounded corners
      padding: '16px',                    // Inner spacing
      margin: '10px',                     // Outer spacing
      maxWidth: '300px',                  // Giới hạn width
      backgroundColor: 'white',           // Background color
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Shadow effect
      transition: 'transform 0.2s ease',  // Smooth animation
      cursor: 'pointer'                   // Pointer cursor
    }}
    // =============================================================================
    // EVENT HANDLERS - Inline functions cho hover effects
    // =============================================================================
    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} // Hover up
    onMouseLeave={(e) => e.target.style.transform = 'translateY(0px)'}  // Hover reset
    >
      {/* ===================================================================== */}
      {/* IMAGE SECTION với CONDITIONAL RENDERING */}
      {/* ===================================================================== */}
      <div style={{ position: 'relative' }}>  {/* Relative positioning cho badges */}
        <img 
          src={product.image}                  // Props: image URL
          alt={product.name}                   // Props: name cho accessibility
          style={{
            width: '100%',                     // Full width của container
            height: '200px',                   // Fixed height
            objectFit: 'cover',                // Crop image proportionally
            borderRadius: '8px'                // Rounded corners
          }}
        />
        
        {/* CONDITIONAL RENDERING - Chỉ hiển thị khi có discount */}
        {product.discount > 0 && (            // Logical AND operator
          <span style={{
            position: 'absolute',             // Absolute positioning
            top: '10px',                      // Position from top
            right: '10px',                    // Position from right
            background: '#ff4444',            // Red background
            color: 'white',                   // White text
            padding: '4px 8px',               // Inner spacing
            borderRadius: '12px',             // Pill shape
            fontSize: '12px',                 // Small font
            fontWeight: 'bold'                // Bold text
          }}>
            -{discountPercent}%               {/* Computed value */}
          </span>
        )}
        
        {/* CONDITIONAL RENDERING - Hiển thị badge "MỚI" nếu isNew = true */}
        {product.isNew && (                   // Boolean check
          <span style={{
            position: 'absolute',
            top: '10px',
            left: '10px',                     // Left side thay vì right
            background: '#28a745',            // Green background
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            MỚI                               {/* Static text */}
          </span>
        )}
      </div>

      {/* ===================================================================== */}
      {/* PRODUCT INFO SECTION */}
      {/* ===================================================================== */}
      <div style={{ padding: '12px 0' }}>   {/* Content container */}
        
        {/* PRODUCT NAME - String prop */}
        <h3 style={{
          fontSize: '18px',                  // Font size
          fontWeight: '600',                 // Semi-bold
          margin: '0 0 8px 0',               // Remove default margin, add bottom
          color: '#333',                     // Dark gray
          lineHeight: '1.3'                  // Line height for readability
        }}>
          {product.name}                     {/* Props: product name */}
        </h3>

        {/* PRODUCT DESCRIPTION - String prop */}
        <p style={{
          color: '#666',                     // Medium gray
          fontSize: '14px',                  // Smaller font
          margin: '0 0 12px 0',              // Bottom margin
          lineHeight: '1.4'                  // Line height
        }}>
          {product.description}              {/* Props: product description */}
        </p>

        {/* ===================================================================== */}
        {/* RATING SECTION - Array.map() để render stars */}
        {/* ===================================================================== */}
        <div style={{ 
          display: 'flex',                   // Flexbox layout
          alignItems: 'center',              // Vertical center alignment
          marginBottom: '12px'               // Bottom spacing
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* CREATE ARRAY và MAP để render stars */}
            {[...Array(5)].map((_, index) => ( // Tạo array 5 elements, map với index
              <span 
                key={index}                  // Key cho list items
                style={{
                  color: index < product.rating ? '#ffc107' : '#e0e0e0', // Conditional color
                  fontSize: '16px',          // Star size
                  marginRight: '2px'         // Spacing between stars
                }}
              >
                ★                            {/* Star character */}
              </span>
            ))}
          </div>
          
          {/* REVIEW COUNT - Number prop */}
          <span style={{
            marginLeft: '8px',               // Left spacing
            fontSize: '14px',                // Small font
            color: '#666'                    // Gray color
          }}>
            ({product.reviewCount} đánh giá) {/* Props: review count */}
          </span>
        </div>

        {/* ===================================================================== */}
        {/* PRICING SECTION - Computed values và conditional rendering */}
        {/* ===================================================================== */}
        <div style={{ marginBottom: '16px' }}> {/* Price container */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            
            {/* DISCOUNTED PRICE - Computed value từ props */}
            <span style={{
              fontSize: '20px',              // Large font cho main price
              fontWeight: 'bold',            // Bold text
              color: '#e74c3c'               // Red color
            }}>
              {discountPrice.toLocaleString('vi-VN')}đ {/* Format currency */}
            </span>
            
            {/* ORIGINAL PRICE - Conditional rendering chỉ khi có discount */}
            {product.discount > 0 && (       // Chỉ hiển thị khi có giảm giá
              <span style={{
                fontSize: '16px',            // Smaller font
                color: '#999',               // Gray color
                textDecoration: 'line-through', // Strikethrough effect
                marginLeft: '8px'            // Left spacing
              }}>
                {product.originalPrice.toLocaleString('vi-VN')}đ {/* Original price */}
              </span>
            )}
          </div>
          
          {/* STOCK STATUS - Conditional styling dựa trên stock */}
          <div style={{
            fontSize: '12px',                // Small font
            color: product.stock > 0 ? '#28a745' : '#dc3545', // Conditional color: green/red
            marginTop: '4px'                 // Top spacing
          }}>
            {/* TERNARY OPERATOR cho stock message */}
            {product.stock > 0 
              ? `Còn ${product.stock} sản phẩm`  // Trong kho
              : 'Hết hàng'                       // Out of stock
            }
          </div>
        </div>

        {/* ===================================================================== */}
        {/* ACTION BUTTONS - Event handlers thông qua props */}
        {/* ===================================================================== */}
        <div style={{ 
          display: 'flex',                   // Flexbox layout cho buttons
          gap: '8px'                         // Spacing between buttons
        }}>
          
          {/* ADD TO CART BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();           // Ngăn event bubbling
              onAddToCart(product);          // Gọi callback props với product data
            }}
            disabled={product.stock === 0}   // Disable khi hết hàng
            style={{
              flex: 1,                       // Take available space
              padding: '10px 16px',          // Button padding
              backgroundColor: product.stock > 0 ? '#007bff' : '#ccc', // Conditional background
              color: 'white',                // Text color
              border: 'none',                // Remove default border
              borderRadius: '6px',           // Rounded corners
              cursor: product.stock > 0 ? 'pointer' : 'not-allowed', // Conditional cursor
              fontSize: '14px',              // Font size
              fontWeight: '500',             // Font weight
              transition: 'background-color 0.2s' // Smooth transition
            }}
          >
            {/* CONDITIONAL TEXT dựa trên stock */}
            {product.stock > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}
          </button>
          
          {/* VIEW DETAILS BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();           // Ngăn event bubbling
              onViewDetails(product);        // Gọi callback props với product data
            }}
            style={{
              padding: '10px 16px',          // Button padding
              backgroundColor: 'transparent', // Transparent background
              color: '#007bff',              // Blue text
              border: '1px solid #007bff',   // Blue border
              borderRadius: '6px',           // Rounded corners
              cursor: 'pointer',             // Pointer cursor
              fontSize: '14px',              // Font size
              fontWeight: '500',             // Font weight
              transition: 'all 0.2s'         // Smooth transition cho hover effects
            }}
          >
            Chi tiết                         {/* Static text */}
          </button>
        </div>
      </div>
    </div>
  );
  // =============================================================================
  // KẾT THÚC COMPONENT - Những điều quan trọng:
  // =============================================================================
  // 1. Props được destructured để dễ sử dụng: {product, onAddToCart, onViewDetails}
  // 2. Computed values: discountPrice, discountPercent tính từ props
  // 3. Conditional rendering: discount badge, new badge, original price
  // 4. Event handling: onClick callbacks gọi props functions
  // 5. Styling: inline styles với conditional values
  // 6. Accessibility: alt text cho images, proper button states
  // =============================================================================
}

export default ProductCard;