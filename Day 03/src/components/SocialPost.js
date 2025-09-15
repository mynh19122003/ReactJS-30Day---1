import React from 'react';

function SocialPost({ post, onLike, onComment, onShare }) {
  const formatTime = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} ngày trước`;
    return postTime.toLocaleDateString('vi-VN');
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      margin: '16px 0',
      overflow: 'hidden',
      transition: 'transform 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <img
          src={post.author.avatar}
          alt={post.author.name}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            marginRight: '12px',
            objectFit: 'cover'
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{
            fontWeight: '600',
            fontSize: '16px',
            color: '#333',
            marginBottom: '2px'
          }}>
            {post.author.name}
            {post.author.verified && (
              <span style={{
                color: '#1da1f2',
                marginLeft: '4px',
                fontSize: '14px'
              }}>
                ✓
              </span>
            )}
          </div>
          <div style={{
            fontSize: '13px',
            color: '#666',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span>{formatTime(post.timestamp)}</span>
            {post.location && (
              <>
                <span style={{ margin: '0 6px' }}>•</span>
                <span>📍 {post.location}</span>
              </>
            )}
          </div>
        </div>
        <button style={{
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          color: '#666',
          padding: '4px'
        }}>
          ⋯
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: post.image ? '16px 16px 0' : '16px' }}>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.5',
          color: '#333',
          margin: '0 0 12px 0',
          whiteSpace: 'pre-line'
        }}>
          {post.content}
        </p>

        {post.hashtags && post.hashtags.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            {post.hashtags.map((tag, index) => (
              <span
                key={index}
                style={{
                  color: '#1da1f2',
                  fontSize: '15px',
                  marginRight: '8px',
                  cursor: 'pointer'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image */}
      {post.image && (
        <div style={{ padding: '0 16px 16px' }}>
          <img
            src={post.image}
            alt="Post content"
            style={{
              width: '100%',
              borderRadius: '8px',
              objectFit: 'cover',
              maxHeight: '400px',
              cursor: 'pointer'
            }}
            onClick={() => {
              // Open image in modal/lightbox
              console.log('Open image viewer');
            }}
          />
        </div>
      )}

      {/* Engagement Stats */}
      <div style={{
        padding: '8px 16px',
        borderTop: '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0',
        fontSize: '14px',
        color: '#666',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <span>
          {post.likes > 0 && `${post.likes.toLocaleString()} lượt thích`}
        </span>
        <div>
          {post.comments > 0 && (
            <span style={{ marginRight: '16px' }}>
              {post.comments} bình luận
            </span>
          )}
          {post.shares > 0 && (
            <span>{post.shares} lượt chia sẻ</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'space-around'
      }}>
        <button
          onClick={() => onLike(post.id)}
          style={{
            flex: 1,
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
            color: post.userLiked ? '#e74c3c' : '#666',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <span style={{ marginRight: '8px' }}>
            {post.userLiked ? '❤️' : '🤍'}
          </span>
          Thích
        </button>

        <button
          onClick={() => onComment(post.id)}
          style={{
            flex: 1,
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

        <button
          onClick={() => onShare(post.id)}
          style={{
            flex: 1,
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
}

export default SocialPost;