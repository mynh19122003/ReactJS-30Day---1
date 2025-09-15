// =============================================================================
// SOCIAL FEED COMPONENT với detailed comments  
// =============================================================================
// Component này demo infinite scroll, virtual windowing, complex interactions
// Advanced state management, optimistic UI, real-time simulation patterns
// =============================================================================

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useVirtualization } from '../hooks/useVirtualization';

// =============================================================================
// 1. DATA GENERATION & UTILITIES
// =============================================================================
// Sample users data với realistic profiles
const generateUsers = () => [
  { 
    id: 'user_1', 
    name: 'Sarah Johnson', 
    username: 'sarah_dev',
    avatar: '👩‍💻', 
    verified: true,
    followers: 12500,
    bio: 'Full-stack developer | React enthusiast | Coffee lover ☕'
  },
  { 
    id: 'user_2', 
    name: 'Mike Chen', 
    username: 'mike_design',
    avatar: '👨‍🎨', 
    verified: false,
    followers: 8300,
    bio: 'UI/UX Designer | Creating beautiful experiences 🎨'
  },
  { 
    id: 'user_3', 
    name: 'Emily Rodriguez', 
    username: 'emily_tech',
    avatar: '👩‍🔬', 
    verified: true,
    followers: 15600,
    bio: 'Tech Lead | Building the future | Python & JavaScript 🚀'
  },
  { 
    id: 'user_4', 
    name: 'David Kim', 
    username: 'david_product',
    avatar: '👨‍💼', 
    verified: false,
    followers: 6750,
    bio: 'Product Manager | Data-driven decisions | Startup enthusiast 📊'
  },
  { 
    id: 'user_5', 
    name: 'Lisa Wang', 
    username: 'lisa_mobile',
    avatar: '👩‍🚀', 
    verified: true,
    followers: 9200,
    bio: 'Mobile App Developer | iOS & Android | Always learning 📱'
  }
];

// Post content templates cho realistic social media posts
const postTemplates = [
  {
    content: "Just shipped a new feature! 🚀 The team worked incredibly hard on this one. Infinite scroll is now 60% faster thanks to virtualization. #webdev #react #performance",
    hashtags: ['webdev', 'react', 'performance'],
    type: 'text'
  },
  {
    content: "Beautiful sunset from my workspace today 🌅 Sometimes the best debugging happens with a good view. What's your favorite coding environment?",
    hashtags: ['coding', 'workspace', 'motivation'],
    type: 'image',
    imageUrl: 'https://picsum.photos/600/400?random=1'
  },
  {
    content: "Hot take: TypeScript makes JavaScript development so much more enjoyable. The type safety catches so many bugs before they reach production. Thoughts? 🤔",
    hashtags: ['typescript', 'javascript', 'webdev'],
    type: 'text'
  },
  {
    content: "Check out this amazing component library I found! The documentation is top-notch and the components are so customizable. Link in bio 📚",
    hashtags: ['frontend', 'components', 'design'],
    type: 'link',
    linkUrl: 'https://example.com',
    linkTitle: 'Amazing Component Library'
  },
  {
    content: "Coffee shop coding session ☕ Working on a new side project - a social media dashboard for developers. Would love to get your feedback!",
    hashtags: ['sideproject', 'coding', 'coffee'],
    type: 'image',
    imageUrl: 'https://picsum.photos/600/400?random=2'
  }
];

// Generate sample posts với realistic engagement data
const generateSamplePosts = (count = 50) => {
  const users = generateUsers();
  
  return Array.from({ length: count }, (_, index) => {
    const user = users[Math.floor(Math.random() * users.length)];
    const template = postTemplates[Math.floor(Math.random() * postTemplates.length)];
    const postId = `post_${String(index + 1).padStart(3, '0')}`;
    
    // Generate realistic engagement numbers
    const baseEngagement = Math.floor(Math.random() * user.followers * 0.1); // 0-10% of followers
    const likes = Math.floor(baseEngagement * (0.7 + Math.random() * 0.3)); // 70-100% of engagement
    const shares = Math.floor(likes * (0.05 + Math.random() * 0.15)); // 5-20% of likes
    const comments = Math.floor(likes * (0.02 + Math.random() * 0.08)); // 2-10% of likes
    
    return {
      id: postId,
      author: user,
      content: template.content,
      hashtags: template.hashtags,
      type: template.type,
      imageUrl: template.imageUrl,
      linkUrl: template.linkUrl,
      linkTitle: template.linkTitle,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Last 7 days
      likes,
      shares,
      comments,
      isLiked: Math.random() > 0.8, // 20% chance user already liked
      isShared: Math.random() > 0.95, // 5% chance user already shared
      isBookmarked: Math.random() > 0.9, // 10% chance user bookmarked
      commentsData: [], // Will be populated later
      engagement: {
        totalReactions: likes + shares + comments,
        reactionTypes: {
          like: likes,
          love: Math.floor(likes * 0.15),
          laugh: Math.floor(likes * 0.08),
          wow: Math.floor(likes * 0.05),
          sad: Math.floor(likes * 0.02),
          angry: Math.floor(likes * 0.01)
        }
      }
    };
  }).sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first
};

// =============================================================================
// 2. POST COMPONENT
// =============================================================================
// Individual post component với full social media functionality
const Post = React.memo(({ 
  post, 
  onLike, 
  onShare, 
  onComment, 
  onBookmark,
  onUserClick,
  currentUserId = 'user_1' 
}) => {
  // ============== STATE MANAGEMENT ==============
  const [showComments, setShowComments] = useState(false); // Comments visibility
  const [commentText, setCommentText] = useState(''); // New comment input
  const [isExpanded, setIsExpanded] = useState(false); // Content expansion
  const [showReactions, setShowReactions] = useState(false); // Reaction picker
  const [imageLoaded, setImageLoaded] = useState(false); // Image loading state
  
  // Refs
  const commentInputRef = useRef(null);

  // ============== COMPUTED VALUES ==============
  // Format timestamp
  const formattedTime = useMemo(() => {
    const now = new Date();
    const postTime = new Date(post.timestamp);
    const timeDiff = now - postTime;
    
    if (timeDiff < 60000) { // Less than 1 minute
      return 'Vừa xong';
    } else if (timeDiff < 3600000) { // Less than 1 hour
      return `${Math.floor(timeDiff / 60000)} phút`;
    } else if (timeDiff < 86400000) { // Less than 1 day
      return `${Math.floor(timeDiff / 3600000)} giờ`;
    } else {
      return `${Math.floor(timeDiff / 86400000)} ngày`;
    }
  }, [post.timestamp]);

  // Check if content is long và needs truncation
  const isLongContent = post.content.length > 200;
  const displayContent = useMemo(() => {
    if (!isLongContent || isExpanded) {
      return post.content;
    }
    return `${post.content.substring(0, 200)}...`;
  }, [post.content, isLongContent, isExpanded]);

  // Process hashtags và mentions trong content
  const processedContent = useMemo(() => {
    let processed = displayContent;
    
    // Highlight hashtags
    processed = processed.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');
    
    // Highlight mentions
    processed = processed.replace(/@(\w+)/g, '<span class="mention">@$1</span>');
    
    return processed;
  }, [displayContent]);

  // Calculate engagement rate
  const engagementRate = useMemo(() => {
    const total = post.likes + post.shares + post.comments;
    const rate = (total / post.author.followers) * 100;
    return rate.toFixed(1);
  }, [post.likes, post.shares, post.comments, post.author.followers]);

  // ============== EVENT HANDLERS ==============
  // Like handler với optimistic UI
  const handleLike = useCallback(() => {
    onLike(post.id, !post.isLiked);
  }, [post.id, post.isLiked, onLike]);

  // Share handler
  const handleShare = useCallback(() => {
    onShare(post.id);
    // Simulate native share API
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.author.name}`,
        text: post.content.substring(0, 100) + '...',
        url: window.location.href + `/post/${post.id}`
      });
    }
  }, [post.id, post.author.name, post.content, onShare]);

  // Comment handlers
  const handleCommentSubmit = useCallback(() => {
    if (commentText.trim()) {
      onComment(post.id, commentText.trim());
      setCommentText('');
    }
  }, [post.id, commentText, onComment]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  }, [handleCommentSubmit]);

  // Bookmark handler
  const handleBookmark = useCallback(() => {
    onBookmark(post.id, !post.isBookmarked);
  }, [post.id, post.isBookmarked, onBookmark]);

  // User click handler
  const handleUserClick = useCallback(() => {
    onUserClick(post.author.id);
  }, [post.author.id, onUserClick]);

  // Reaction handler
  const handleReaction = useCallback((type) => {
    console.log(`Reacted with ${type} to post ${post.id}`);
    setShowReactions(false);
  }, [post.id]);

  // ============== EFFECTS ==============
  // Focus comment input when showing comments
  useEffect(() => {
    if (showComments && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [showComments]);

  // ============== MAIN RENDER ==============
  return (
    <article className="social-post">
      {/* Post Header */}
      <header className="post-header">
        {/* User Info */}
        <div className="user-info" onClick={handleUserClick}>
          <div className="user-avatar">
            <span className="avatar">{post.author.avatar}</span>
            {post.author.verified && (
              <span className="verified-badge" title="Verified account">✓</span>
            )}
          </div>
          
          <div className="user-details">
            <div className="user-name-line">
              <h3 className="user-name">{post.author.name}</h3>
              <span className="username">@{post.author.username}</span>
            </div>
            <div className="post-meta">
              <time className="post-time" title={post.timestamp.toLocaleString()}>
                {formattedTime}
              </time>
              <span className="engagement-rate" title="Engagement rate">
                📊 {engagementRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Post Actions Menu */}
        <div className="post-menu">
          <button 
            className={`bookmark-btn ${post.isBookmarked ? 'bookmarked' : ''}`}
            onClick={handleBookmark}
            title={post.isBookmarked ? 'Remove bookmark' : 'Bookmark post'}
          >
            {post.isBookmarked ? '🔖' : '📌'}
          </button>
          
          <button className="more-btn" title="More options">
            ⋯
          </button>
        </div>
      </header>

      {/* Post Content */}
      <div className="post-content">
        {/* Text Content */}
        <div 
          className="post-text"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
        
        {/* Expand/Collapse Button */}
        {isLongContent && (
          <button 
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Thu gọn' : 'Xem thêm'}
          </button>
        )}

        {/* Image Content */}
        {post.type === 'image' && post.imageUrl && (
          <div className="post-image-container">
            <img
              src={post.imageUrl}
              alt="Post content"
              className={`post-image ${imageLoaded ? 'loaded' : 'loading'}`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            {!imageLoaded && (
              <div className="image-placeholder">
                📷 Loading image...
              </div>
            )}
          </div>
        )}

        {/* Link Content */}
        {post.type === 'link' && post.linkUrl && (
          <div className="post-link-preview">
            <a 
              href={post.linkUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-card"
            >
              <div className="link-info">
                <h4 className="link-title">{post.linkTitle}</h4>
                <p className="link-url">{post.linkUrl}</p>
              </div>
              <div className="link-icon">🔗</div>
            </a>
          </div>
        )}

        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="post-hashtags">
            {post.hashtags.map(tag => (
              <span key={tag} className="hashtag-pill">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Engagement Stats */}
      <div className="engagement-stats">
        <div className="stats-summary">
          <span className="likes-count">
            👍 {post.likes.toLocaleString()} likes
          </span>
          <span className="comments-count">
            💬 {post.comments.toLocaleString()} comments
          </span>
          <span className="shares-count">
            🔄 {post.shares.toLocaleString()} shares
          </span>
        </div>
        
        {/* Top Reactions */}
        <div className="top-reactions">
          {Object.entries(post.engagement.reactionTypes)
            .filter(([_, count]) => count > 0)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([type, count]) => (
              <span key={type} className="reaction-item" title={`${count} ${type} reactions`}>
                {type === 'like' && '👍'}
                {type === 'love' && '❤️'}
                {type === 'laugh' && '😂'}
                {type === 'wow' && '😮'}
                {type === 'sad' && '😢'}
                {type === 'angry' && '😠'}
                {count > 0 && <span className="reaction-count">{count}</span>}
              </span>
            ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="post-actions">
        {/* Like Button với Reaction Picker */}
        <div className="action-with-reactions">
          <button 
            className={`action-btn like-btn ${post.isLiked ? 'liked' : ''}`}
            onClick={handleLike}
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
          >
            {post.isLiked ? '👍' : '🤍'} Thích
          </button>
          
          {/* Reaction Picker */}
          {showReactions && (
            <div 
              className="reaction-picker"
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              {['👍', '❤️', '😂', '😮', '😢', '😠'].map(emoji => (
                <button
                  key={emoji}
                  className="reaction-option"
                  onClick={() => handleReaction(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Comment Button */}
        <button 
          className="action-btn comment-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 Bình luận
        </button>

        {/* Share Button */}
        <button 
          className={`action-btn share-btn ${post.isShared ? 'shared' : ''}`}
          onClick={handleShare}
        >
          🔄 Chia sẻ
        </button>

        {/* Save Button */}
        <button 
          className={`action-btn save-btn ${post.isBookmarked ? 'saved' : ''}`}
          onClick={handleBookmark}
        >
          {post.isBookmarked ? '🔖' : '📌'} Lưu
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          {/* Add Comment */}
          <div className="add-comment">
            <div className="comment-avatar">
              <span>👤</span> {/* Current user avatar */}
            </div>
            <div className="comment-input-container">
              <textarea
                ref={commentInputRef}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Viết bình luận..."
                className="comment-input"
                rows={2}
              />
              <button 
                onClick={handleCommentSubmit}
                disabled={!commentText.trim()}
                className="comment-submit-btn"
              >
                Gửi
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="comments-list">
            {post.comments > 0 ? (
              <div className="comments-placeholder">
                <p>💬 {post.comments} bình luận</p>
                <p className="load-comments-hint">
                  Click để tải bình luận... (Feature coming soon)
                </p>
              </div>
            ) : (
              <div className="no-comments">
                <p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
});

// Set display name cho React DevTools
Post.displayName = 'Post';

// =============================================================================
// 3. MAIN SOCIAL FEED COMPONENT
// =============================================================================
const SocialFeed = () => {
  // ============== STATE MANAGEMENT ==============
  // Posts data với pagination
  const [posts, setPosts] = useState(() => generateSamplePosts(20));
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Infinite scroll state
  const [page, setPage] = useState(1); // Current page
  
  // UI state
  const [filter, setFilter] = useState('all'); // Post filter
  const [searchTerm, setSearchTerm] = useState(''); // Search
  const [sortBy, setSortBy] = useState('newest'); // Sort order
  
  // User interaction state
  const [selectedUser, setSelectedUser] = useState(null); // User filter
  
  // Refs for infinite scroll
  const feedRef = useRef(null);
  const observerRef = useRef(null);

  // ============== COMPUTED VALUES ==============
  // Filter và sort posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(post =>
        post.content.toLowerCase().includes(searchLower) ||
        post.author.name.toLowerCase().includes(searchLower) ||
        post.author.username.toLowerCase().includes(searchLower) ||
        post.hashtags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // User filter
    if (selectedUser) {
      filtered = filtered.filter(post => post.author.id === selectedUser);
    }
    
    // Content type filter
    switch (filter) {
      case 'images':
        filtered = filtered.filter(post => post.type === 'image');
        break;
      case 'links':
        filtered = filtered.filter(post => post.type === 'link');
        break;
      case 'popular':
        filtered = filtered.filter(post => post.likes > 100);
        break;
      default:
        break;
    }
    
    // Sort posts
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => a.timestamp - b.timestamp);
        break;
      case 'popular':
        filtered.sort((a, b) => b.engagement.totalReactions - a.engagement.totalReactions);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.timestamp - a.timestamp);
        break;
    }
    
    return filtered;
  }, [posts, searchTerm, selectedUser, filter, sortBy]);

  // Get unique users for filtering
  const availableUsers = useMemo(() => {
    const userMap = new Map();
    posts.forEach(post => {
      userMap.set(post.author.id, post.author);
    });
    return Array.from(userMap.values());
  }, [posts]);

  // ============== INFINITE SCROLL SETUP ==============
  // Load more posts function
  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate more posts
    const newPosts = generateSamplePosts(10);
    
    setPosts(prev => [...prev, ...newPosts]);
    setPage(prev => prev + 1);
    
    // Simulate end of data after 5 pages
    if (page >= 5) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [loading, hasMore, page]);

  // Intersection Observer cho infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMorePosts, hasMore, loading]);

  // ============== EVENT HANDLERS ==============
  // Post interaction handlers
  const handleLike = useCallback((postId, isLiked) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  }, []);

  const handleShare = useCallback((postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isShared: true,
          shares: post.shares + 1
        };
      }
      return post;
    }));
  }, []);

  const handleComment = useCallback((postId, commentText) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1
        };
      }
      return post;
    }));
    
    console.log(`Comment on ${postId}: ${commentText}`);
  }, []);

  const handleBookmark = useCallback((postId, isBookmarked) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked
        };
      }
      return post;
    }));
  }, []);

  const handleUserClick = useCallback((userId) => {
    setSelectedUser(selectedUser === userId ? null : userId);
  }, [selectedUser]);

  // Clear filters handler
  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedUser(null);
    setFilter('all');
    setSortBy('newest');
  }, []);

  // ============== MAIN RENDER ==============
  return (
    <div className="social-feed">
      {/* Feed Header */}
      <header className="feed-header">
        <div className="header-content">
          <h1 className="feed-title">📱 Social Feed</h1>
          <div className="feed-stats">
            <span>{posts.length} posts loaded</span>
            <span>{filteredPosts.length} showing</span>
          </div>
        </div>
      </header>

      {/* Feed Controls */}
      <div className="feed-controls">
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search posts, users, hashtags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filters */}
        <div className="filter-controls">
          {/* Content Type Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">📋 All Posts</option>
            <option value="images">🖼️ Images</option>
            <option value="links">🔗 Links</option>
            <option value="popular">🔥 Popular</option>
          </select>

          {/* User Filter */}
          <select
            value={selectedUser || ''}
            onChange={(e) => setSelectedUser(e.target.value || null)}
            className="filter-select"
          >
            <option value="">👥 All Users</option>
            {availableUsers.map(user => (
              <option key={user.id} value={user.id}>
                {user.avatar} {user.name}
              </option>
            ))}
          </select>

          {/* Sort Filter */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="newest">🆕 Newest</option>
            <option value="oldest">⏰ Oldest</option>
            <option value="popular">🔥 Most Popular</option>
          </select>

          {/* Clear Filters */}
          {(searchTerm || selectedUser || filter !== 'all' || sortBy !== 'newest') && (
            <button onClick={handleClearFilters} className="clear-filters-btn">
              🗑️ Clear
            </button>
          )}
        </div>
      </div>

      {/* Feed Content */}
      <main className="feed-content" ref={feedRef}>
        {/* Posts List */}
        <div className="posts-list">
          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <h3>📭 No posts found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <Post
                key={post.id}
                post={post}
                onLike={handleLike}
                onShare={handleShare}
                onComment={handleComment}
                onBookmark={handleBookmark}
                onUserClick={handleUserClick}
              />
            ))
          )}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="loading-indicator">
            <div className="loading-spinner">⏳</div>
            <p>Loading more posts...</p>
          </div>
        )}

        {/* Load More Trigger */}
        {hasMore && !loading && (
          <div ref={observerRef} className="load-more-trigger">
            <p>Scroll down for more posts...</p>
          </div>
        )}

        {/* End of Feed */}
        {!hasMore && (
          <div className="end-of-feed">
            <p>🎉 You've reached the end!</p>
            <p>Follow more users for more content</p>
          </div>
        )}
      </main>

      {/* Debug Info (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <details>
            <summary>🐛 Debug Info</summary>
            <pre>
              {JSON.stringify({
                totalPosts: posts.length,
                filteredPosts: filteredPosts.length,
                currentPage: page,
                hasMore,
                loading,
                filters: {
                  search: searchTerm,
                  user: selectedUser,
                  type: filter,
                  sort: sortBy
                }
              }, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

// Export component
export default SocialFeed;