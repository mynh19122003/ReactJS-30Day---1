// =============================================================================
// SOCIALPOST COMPONENT - Component phức tạp với Nested Props
// =============================================================================
// Component này demo cách xử lý props object phức tạp có nested properties
// và cách implement multiple event handlers
// =============================================================================

import React from 'react';

// =============================================================================
// FUNCTION COMPONENT với DESTRUCTURED PROPS
// =============================================================================
function SocialPost({ post, onLike, onComment, onShare }) {
  // =============================================================================
  // 1. UTILITY FUNCTION - Xử lý logic phức tạp
  // =============================================================================
  // Function để format timestamp thành text dễ đọc
  const formatTime = (timestamp) => {
    const now = new Date();                    // Current time
    const postTime = new Date(timestamp);      // Post timestamp từ props
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60)); // Calculate hours
    
    // Conditional logic để return appropriate text
    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} ngày trước`;
    return postTime.toLocaleDateString('vi-VN'); // Default to date
  };

  // =============================================================================
  // 2. RENDER JSX - Complex component structure
  // =============================================================================
  return (
    <div style={{
      backgroundColor: 'white',            // White background
      borderRadius: '12px',               // Rounded corners
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)', // Drop shadow
      margin: '16px 0',                   // Vertical margin
      overflow: 'hidden',                 // Hide overflow
      transition: 'transform 0.2s ease'   // Smooth animations
    }}>
      
      {/* ===================================================================== */}
      {/* POST HEADER - Author info với nested object props */}
      {/* ===================================================================== */}
      <div style={{
        padding: '16px',                  // Inner spacing
        display: 'flex',                  // Flexbox layout
        alignItems: 'center',             // Vertical center
        borderBottom: '1px solid #f0f0f0' // Bottom border
      }}>
        
        {/* AUTHOR AVATAR - Nested prop: post.author.avatar */}
        <img
          src={post.author.avatar}        // Nested object property
          alt={post.author.name}          // Alt text cho accessibility
          style={{
            width: '48px',                // Fixed size
            height: '48px',
            borderRadius: '50%',          // Circle shape
            marginRight: '12px',          // Right spacing
            objectFit: 'cover'            // Crop to fit
          }}
        />
        
        {/* AUTHOR INFO SECTION */}
        <div style={{ flex: 1 }}>        {/* Take remaining space */}
          <div style={{
            fontWeight: '600',            // Semi-bold
            fontSize: '16px',             // Font size
            color: '#333',                // Dark color
            marginBottom: '2px'           // Bottom spacing
          }}>
            {post.author.name}            {/* Nested prop: author name */}
            
            {/* CONDITIONAL RENDERING - Verified badge chỉ hiển thị nếu verified = true */}
            {post.author.verified && (   // Boolean check
              <span style={{
                marginLeft: '8px',        // Left spacing
                color: '#1da1f2',         // Twitter blue
                fontSize: '14px'          // Smaller font
              }}>
                ✓                         {/* Verified checkmark */}
              </span>
            )}
          </div>
          
          {/* POST METADATA */}
          <div style={{
            fontSize: '14px',             // Small font
            color: '#666'                 // Gray color
          }}>
            <span>{formatTime(post.timestamp)}</span> {/* Computed time */}
            
            {/* CONDITIONAL RENDERING - Location chỉ hiển thị nếu có */}
            {post.location && (           // Check if location exists
              <>
                <span style={{ margin: '0 8px' }}>•</span> {/* Separator */}
                <span>📍 {post.location}</span> {/* Location với icon */}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* POST CONTENT - Text và hashtags */}
      {/* ===================================================================== */}
      <div style={{ padding: post.image ? '16px 16px 0' : '16px' }}> {/* Conditional padding */}
        
        {/* POST TEXT CONTENT */}
        <p style={{
          fontSize: '16px',               // Readable font size
          lineHeight: '1.5',              // Line height cho readability
          color: '#333',                  // Dark text
          margin: '0 0 12px 0',           // Bottom margin
          whiteSpace: 'pre-line'          // Preserve line breaks từ \n
        }}>
          {post.content}                  {/* Props: post content */}
        </p>

        {/* HASHTAGS SECTION - Array mapping */}
        {post.hashtags && post.hashtags.length > 0 && ( // Check if hashtags exist
          <div style={{ marginBottom: '12px' }}>
            {/* MAP qua hashtags array */}
            {post.hashtags.map((tag, index) => ( // Loop qua từng hashtag
              <span
                key={index}               // Key cho list items
                style={{
                  color: '#1da1f2',       // Blue color
                  fontSize: '15px',       // Font size
                  marginRight: '8px',     // Right spacing
                  cursor: 'pointer'       // Pointer cursor
                }}
              >
                #{tag}                    {/* Hashtag với # prefix */}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* POST IMAGE - Conditional rendering */}
      {/* ===================================================================== */}
      {post.image && (                    // Chỉ render nếu có image
        <div style={{ padding: '0 16px 16px' }}>
          <img
            src={post.image}              // Props: image URL
            alt="Post content"            // Alt text
            style={{
              width: '100%',              // Full width
              borderRadius: '8px',        // Rounded corners
              objectFit: 'cover',         // Crop to fit
              maxHeight: '400px',         // Max height
              cursor: 'pointer'           // Clickable cursor
            }}
            onClick={() => {
              // Image click handler - có thể mở modal/lightbox
              console.log('Open image viewer');
            }}
          />
        </div>
      )}

      {/* ===================================================================== */}
      {/* ENGAGEMENT STATS - Hiển thị số liệu tương tác */}
      {/* ===================================================================== */}
      <div style={{
        padding: '8px 16px',             // Padding
        borderTop: '1px solid #f0f0f0',  // Top border
        borderBottom: '1px solid #f0f0f0', // Bottom border
        fontSize: '14px',                // Small font
        color: '#666',                   // Gray color
        display: 'flex',                 // Flexbox layout
        justifyContent: 'space-between'  // Space between items
      }}>
        
        {/* LIKES COUNT */}
        <span>
          {post.likes > 0 && `${post.likes.toLocaleString()} lượt thích`} {/* Conditional display */}
        </span>
        
        {/* COMMENTS & SHARES COUNT */}
        <div>
          {post.comments > 0 && (         // Conditional comments
            <span style={{ marginRight: '16px' }}>
              {post.comments} bình luận
            </span>
          )}
          {post.shares > 0 && (           // Conditional shares
            <span>{post.shares} lượt chia sẻ</span>
          )}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTION BUTTONS - Event handlers thông qua props */}
      {/* ===================================================================== */}
      <div style={{
        padding: '8px 16px',             // Padding
        display: 'flex',                 // Flexbox layout
        justifyContent: 'space-around'   // Even spacing
      }}>
        
        {/* LIKE BUTTON */}
        <button
          onClick={() => onLike(post.id)} // Gọi callback props với post ID
          style={{
            flex: 1,                      // Equal width
            display: 'flex',              // Flexbox
            alignItems: 'center',         // Center items
            justifyContent: 'center',     // Center content
            padding: '12px',              // Button padding
            background: 'none',           // No background
            border: 'none',               // No border
            borderRadius: '8px',          // Rounded corners
            cursor: 'pointer',            // Pointer cursor
            fontSize: '15px',             // Font size
            fontWeight: '500',            // Medium weight
            color: post.userLiked ? '#e74c3c' : '#666', // Conditional color
            transition: 'background-color 0.2s' // Smooth transition
          }}
          // Hover effects với inline event handlers
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <span style={{ marginRight: '8px' }}>
            {post.userLiked ? '❤️' : '🤍'} {/* Conditional icon */}
          </span>
          Thích
        </button>

        {/* COMMENT BUTTON */}
        <button
          onClick={() => onComment(post.id)} // Gọi callback props
          style={{
            flex: 1,                      // Equal width
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            background: 'none',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '500',
            color: '#666',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <span style={{ marginRight: '8px' }}>💬</span>
          Bình luận
        </button>

        {/* SHARE BUTTON */}
        <button
          onClick={() => onShare(post.id)} // Gọi callback props
          style={{
            flex: 1,                      // Equal width
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            background: 'none',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '500',
            color: '#666',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <span style={{ marginRight: '8px' }}>📤</span>
          Chia sẻ
        </button>
      </div>
    </div>
  );
  // =============================================================================
  // KẾT THÚC COMPONENT - Key Learning Points:
  // =============================================================================
  // 1. NESTED PROPS: post.author.name, post.author.verified, post.author.avatar
  // 2. ARRAY PROPS: post.hashtags.map() để render danh sách
  // 3. CONDITIONAL RENDERING: && operator cho optional elements
  // 4. EVENT HANDLING: Multiple callback props (onLike, onComment, onShare)
  // 5. COMPUTED VALUES: formatTime() function tính toán từ props
  // 6. COMPLEX STYLING: Conditional styles dựa trên props state
  // =============================================================================
}

export default SocialPost;