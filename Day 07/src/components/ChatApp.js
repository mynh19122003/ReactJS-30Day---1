// =============================================================================
// CHAT APPLICATION COMPONENT với detailed comments
// =============================================================================
// Component này demo advanced messaging patterns: threading, reactions, real-time
// Advanced state management, virtualization concepts, và complex UI interactions
// =============================================================================

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import './ChatApp.css';

// =============================================================================
// 1. DATA GENERATION UTILITIES
// =============================================================================
// Function để generate sample users với realistic data
const generateUsers = () => [
  { 
    id: 'user_1', 
    name: 'Alice Johnson', 
    avatar: '👩‍💻', 
    isOnline: true, 
    status: 'Available',
    role: 'Developer' 
  },
  { 
    id: 'user_2', 
    name: 'Bob Smith', 
    avatar: '👨‍🎨', 
    isOnline: true, 
    status: 'Busy',
    role: 'Designer' 
  },
  { 
    id: 'user_3', 
    name: 'Charlie Brown', 
    avatar: '👨‍🚀', 
    isOnline: false, 
    status: 'Away',
    role: 'Product Manager' 
  },
  { 
    id: 'user_4', 
    name: 'Diana Prince', 
    avatar: '👩‍⚕️', 
    isOnline: true, 
    status: 'Available',
    role: 'QA Engineer' 
  },
  { 
    id: 'user_5', 
    name: 'Eve Wilson', 
    avatar: '👩‍🔬', 
    isOnline: false, 
    status: 'Do not disturb',
    role: 'Data Scientist' 
  }
];

// Function để generate sample messages với threading support
const generateSampleMessages = () => {
  const users = generateUsers();
  const messages = [];
  let messageId = 1;

  // Sample message templates cho realistic content
  const messageTemplates = [
    "Hey team! How's everyone doing today? 🌟",
    "Just finished the Sprint review. Great work everyone! 🎉",
    "Quick question about the new feature implementation...",
    "Can someone help me with this CSS issue? 🤔",
    "Meeting in 15 minutes! Don't forget 📅",
    "Found a interesting article about React patterns 📖",
    "Coffee break anyone? ☕",
    "The deployment went smoothly! 🚀",
    "Working on the new dashboard design 🎨",
    "Code review is ready for the team 👀"
  ];

  // Generate root messages (không có parentId)
  for (let i = 0; i < 20; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const template = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
    
    const message = {
      id: `msg_${messageId++}`,
      content: `${template} - Message ${i + 1}`,
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000), // Random within last 24h
      reactions: {},
      parentId: null, // Root message
      replies: [], // Sẽ được populate sau
      isEdited: Math.random() > 0.9, // 10% chance of being edited
      editedAt: null,
      messageType: 'text', // text, image, file, system
      attachments: []
    };

    // Add random reactions to messages
    if (Math.random() > 0.5) { // 50% chance có reactions
      const reactions = ['👍', '❤️', '😂', '😮', '👏', '🔥'];
      const selectedReactions = reactions.slice(0, Math.floor(Math.random() * 3) + 1);
      
      selectedReactions.forEach(emoji => {
        message.reactions[emoji] = {
          count: Math.floor(Math.random() * 5) + 1, // 1-5 reactions
          users: [user.id] // Simplified - trong thực tế sẽ có multiple users
        };
      });
    }

    messages.push(message);
  }

  // Generate replies cho một số messages (threading)
  messages.forEach(message => {
    if (Math.random() > 0.7) { // 30% chance có replies
      const replyCount = Math.floor(Math.random() * 3) + 1; // 1-3 replies
      
      for (let j = 0; j < replyCount; j++) {
        const replyUser = users[Math.floor(Math.random() * users.length)];
        const reply = {
          id: `msg_${messageId++}`,
          content: `Reply ${j + 1} to: "${message.content.substring(0, 30)}..."`,
          authorId: replyUser.id,
          authorName: replyUser.name,
          authorAvatar: replyUser.avatar,
          timestamp: new Date(message.timestamp.getTime() + (j + 1) * 60000), // Replies after original
          reactions: {},
          parentId: message.id, // Reference to parent message
          replies: [], // Nested replies có thể được implement
          isEdited: false,
          editedAt: null,
          messageType: 'text',
          attachments: []
        };
        
        message.replies.push(reply);
        messages.push(reply); // Add to main messages array for search
      }
    }
  });

  // Sort messages by timestamp
  return messages.sort((a, b) => a.timestamp - b.timestamp);
};

// =============================================================================
// 2. MESSAGE COMPONENT
// =============================================================================
// Individual message component với memoization
const Message = React.memo(({ 
  message, 
  currentUserId, 
  onReaction, 
  onReply, 
  onEdit, 
  onDelete,
  showReplies = true,
  isReply = false 
}) => {
  // ============== STATE MANAGEMENT ==============
  const [isHovered, setIsHovered] = useState(false); // Hover state cho actions
  const [showReactionPicker, setShowReactionPicker] = useState(false); // Reaction picker
  const [isEditing, setIsEditing] = useState(false); // Edit mode
  const [editContent, setEditContent] = useState(message.content); // Edit content

  // ============== COMPUTED VALUES ==============
  // Check if message is from current user
  const isOwnMessage = message.authorId === currentUserId;
  
  // Format timestamp
  const formattedTime = useMemo(() => {
    const now = new Date();
    const messageTime = new Date(message.timestamp);
    const timeDiff = now - messageTime;
    
    // Different format based on time difference
    if (timeDiff < 60000) { // Less than 1 minute
      return 'Vừa xong';
    } else if (timeDiff < 3600000) { // Less than 1 hour
      return `${Math.floor(timeDiff / 60000)} phút trước`;
    } else if (timeDiff < 86400000) { // Less than 1 day
      return `${Math.floor(timeDiff / 3600000)} giờ trước`;
    } else {
      return messageTime.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }, [message.timestamp]);

  // Calculate total reactions count
  const totalReactions = useMemo(() => {
    return Object.values(message.reactions).reduce((sum, reaction) => sum + reaction.count, 0);
  }, [message.reactions]);

  // ============== EVENT HANDLERS ==============
  // Reaction handler với useCallback optimization
  const handleReaction = useCallback((emoji) => {
    onReaction(message.id, emoji);
    setShowReactionPicker(false); // Close picker after selection
  }, [message.id, onReaction]);

  // Reply handler
  const handleReply = useCallback(() => {
    onReply(message.id);
  }, [message.id, onReply]);

  // Edit handlers
  const handleEditStart = useCallback(() => {
    setIsEditing(true);
    setEditContent(message.content);
  }, [message.content]);

  const handleEditSave = useCallback(() => {
    if (editContent.trim() !== message.content) {
      onEdit(message.id, editContent.trim());
    }
    setIsEditing(false);
  }, [message.id, editContent, message.content, onEdit]);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
    setEditContent(message.content);
  }, [message.content]);

  // Delete handler
  const handleDelete = useCallback(() => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')) {
      onDelete(message.id);
    }
  }, [message.id, onDelete]);

  // ============== MAIN RENDER ==============
  return (
    <div 
      className={`message ${isOwnMessage ? 'own-message' : 'other-message'} ${isReply ? 'reply-message' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar và User Info (chỉ hiện cho messages của others) */}
      {!isOwnMessage && !isReply && (
        <div className="message-avatar">
          <span className="avatar">{message.authorAvatar}</span>
        </div>
      )}

      {/* Message Content Container */}
      <div className="message-content-container">
        {/* Author name và timestamp (chỉ hiện cho others hoặc first message in thread) */}
        {(!isOwnMessage || !isReply) && (
          <div className="message-header">
            <span className="author-name">{message.authorName}</span>
            <span className="message-time">{formattedTime}</span>
            {message.isEdited && (
              <span className="edited-indicator">(đã chỉnh sửa)</span>
            )}
          </div>
        )}

        {/* Message Content */}
        <div className="message-content">
          {/* Edit Mode */}
          {isEditing ? (
            <div className="message-edit-container">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="message-edit-input"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleEditSave();
                  }
                  if (e.key === 'Escape') {
                    handleEditCancel();
                  }
                }}
              />
              <div className="message-edit-actions">
                <button onClick={handleEditSave} className="save-btn">💾 Lưu</button>
                <button onClick={handleEditCancel} className="cancel-btn">❌ Hủy</button>
              </div>
            </div>
          ) : (
            // Normal Display Mode
            <div className="message-text">
              {message.content}
            </div>
          )}

          {/* Message Attachments (nếu có) */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="message-attachments">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="attachment">
                  📎 {attachment.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reactions Display */}
        {totalReactions > 0 && (
          <div className="message-reactions">
            {Object.entries(message.reactions).map(([emoji, data]) => (
              <button
                key={emoji}
                className="reaction-item"
                onClick={() => handleReaction(emoji)}
                title={`${data.count} reactions`}
              >
                <span className="reaction-emoji">{emoji}</span>
                <span className="reaction-count">{data.count}</span>
              </button>
            ))}
          </div>
        )}

        {/* Message Actions (hiện khi hover) */}
        {isHovered && !isEditing && (
          <div className="message-actions">
            {/* Reaction Button */}
            <button 
              className="action-btn"
              onClick={() => setShowReactionPicker(!showReactionPicker)}
              title="Thêm reaction"
            >
              😊
            </button>
            
            {/* Reply Button */}
            <button 
              className="action-btn"
              onClick={handleReply}
              title="Trả lời"
            >
              💬
            </button>
            
            {/* Edit Button (chỉ cho own messages) */}
            {isOwnMessage && (
              <button 
                className="action-btn"
                onClick={handleEditStart}
                title="Chỉnh sửa"
              >
                ✏️
              </button>
            )}
            
            {/* Delete Button (chỉ cho own messages) */}
            {isOwnMessage && (
              <button 
                className="action-btn delete-btn"
                onClick={handleDelete}
                title="Xóa"
              >
                🗑️
              </button>
            )}
          </div>
        )}

        {/* Reaction Picker */}
        {showReactionPicker && (
          <div className="reaction-picker">
            {['👍', '❤️', '😂', '😮', '😢', '😡', '👏', '🔥'].map(emoji => (
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

        {/* Replies Section */}
        {showReplies && message.replies && message.replies.length > 0 && (
          <div className="message-replies">
            <div className="replies-header">
              <span>💬 {message.replies.length} phản hồi</span>
            </div>
            <div className="replies-list">
              {message.replies.map(reply => (
                <Message
                  key={reply.id}
                  message={reply}
                  currentUserId={currentUserId}
                  onReaction={onReaction}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  showReplies={false} // Prevent infinite nesting
                  isReply={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

// Set display name cho React DevTools
Message.displayName = 'Message';

// =============================================================================
// 3. MAIN CHAT APP COMPONENT
// =============================================================================
const ChatApp = () => {
  // ============== STATE MANAGEMENT ==============
  // Core chat data
  const [users] = useState(() => generateUsers());
  const [messages, setMessages] = useState(() => generateSampleMessages());
  const [currentUserId] = useState('user_1'); // Simulate current user
  
  // UI state
  const [newMessage, setNewMessage] = useState(''); // Message input
  const [searchTerm, setSearchTerm] = useState(''); // Search functionality
  const [selectedUserId, setSelectedUserId] = useState(null); // DM filter
  const [isTyping, setIsTyping] = useState(false); // Typing indicator
  const [replyToId, setReplyToId] = useState(null); // Reply target
  
  // View settings
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [messageFilter, setMessageFilter] = useState('all'); // all, mentions, threads
  
  // Refs for scroll management
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);
  
  // Debounced search để improve performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // ============== COMPUTED VALUES ==============
  // Filter messages based on search và user selection
  const filteredMessages = useMemo(() => {
    let filtered = messages.filter(msg => msg.parentId === null); // Only root messages
    
    // Search filter
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(msg =>
        msg.content.toLowerCase().includes(searchLower) ||
        msg.authorName.toLowerCase().includes(searchLower)
      );
    }
    
    // User filter (DM simulation)
    if (selectedUserId) {
      filtered = filtered.filter(msg => 
        msg.authorId === selectedUserId || msg.authorId === currentUserId
      );
    }
    
    // Message type filter
    switch (messageFilter) {
      case 'mentions':
        filtered = filtered.filter(msg => 
          msg.content.includes(`@${users.find(u => u.id === currentUserId)?.name}`)
        );
        break;
      case 'threads':
        filtered = filtered.filter(msg => msg.replies && msg.replies.length > 0);
        break;
      default:
        break;
    }
    
    return filtered.sort((a, b) => a.timestamp - b.timestamp);
  }, [messages, debouncedSearchTerm, selectedUserId, messageFilter, users, currentUserId]);

  // Online users list
  const onlineUsers = useMemo(() => {
    return users.filter(user => showOnlineOnly ? user.isOnline : true);
  }, [users, showOnlineOnly]);

  // Current user info
  const currentUser = useMemo(() => {
    return users.find(user => user.id === currentUserId);
  }, [users, currentUserId]);

  // Reply target message
  const replyToMessage = useMemo(() => {
    if (!replyToId) return null;
    return messages.find(msg => msg.id === replyToId);
  }, [replyToId, messages]);

  // ============== EVENT HANDLERS ==============
  // Send message handler
  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim()) return;
    
    const messageId = `msg_${Date.now()}`;
    const newMsg = {
      id: messageId,
      content: newMessage.trim(),
      authorId: currentUserId,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      timestamp: new Date(),
      reactions: {},
      parentId: replyToId, // Set parent if replying
      replies: [],
      isEdited: false,
      editedAt: null,
      messageType: 'text',
      attachments: []
    };
    
    setMessages(prev => {
      const updated = [...prev, newMsg];
      
      // If replying, add to parent's replies array
      if (replyToId) {
        const parentIndex = updated.findIndex(msg => msg.id === replyToId);
        if (parentIndex !== -1) {
          updated[parentIndex] = {
            ...updated[parentIndex],
            replies: [...updated[parentIndex].replies, newMsg]
          };
        }
      }
      
      return updated;
    });
    
    // Reset input và reply state
    setNewMessage('');
    setReplyToId(null);
    
    // Focus input
    messageInputRef.current?.focus();
  }, [newMessage, currentUserId, currentUser, replyToId]);

  // Reaction handler
  const handleReaction = useCallback((messageId, emoji) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions };
        
        if (reactions[emoji]) {
          // Toggle reaction
          reactions[emoji] = {
            ...reactions[emoji],
            count: reactions[emoji].count + 1
          };
        } else {
          // Add new reaction
          reactions[emoji] = {
            count: 1,
            users: [currentUserId]
          };
        }
        
        return { ...msg, reactions };
      }
      return msg;
    }));
  }, [currentUserId]);

  // Reply handler
  const handleReply = useCallback((messageId) => {
    setReplyToId(messageId);
    messageInputRef.current?.focus();
  }, []);

  // Edit message handler
  const handleEditMessage = useCallback((messageId, newContent) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          content: newContent,
          isEdited: true,
          editedAt: new Date()
        };
      }
      return msg;
    }));
  }, []);

  // Delete message handler
  const handleDeleteMessage = useCallback((messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);

  // User selection handler
  const handleUserSelect = useCallback((userId) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  }, [selectedUserId]);

  // Input handlers
  const handleMessageInputChange = useCallback((e) => {
    setNewMessage(e.target.value);
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // ============== EFFECTS ==============
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessages]);

  // Focus input on mount
  useEffect(() => {
    messageInputRef.current?.focus();
  }, []);

  // ============== MAIN RENDER ==============
  return (
    <div className="chat-app">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-title">
          <h2>💬 Team Chat</h2>
          <div className="chat-status">
            <span className="online-count">
              🟢 {users.filter(u => u.isOnline).length} online
            </span>
            {isTyping && (
              <span className="typing-indicator">
                ⌨️ Someone is typing...
              </span>
            )}
          </div>
        </div>
        
        {/* Chat Controls */}
        <div className="chat-controls">
          {/* Search Input */}
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm tin nhắn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          {/* Filter Controls */}
          <div className="filter-controls">
            <select
              value={messageFilter}
              onChange={(e) => setMessageFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">📨 Tất cả tin nhắn</option>
              <option value="mentions">@️⃣ Mentions</option>
              <option value="threads">🧵 Threads</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat-body">
        {/* Users Sidebar */}
        <div className="users-sidebar">
          <div className="sidebar-header">
            <h3>👥 Team Members</h3>
            <label className="online-filter">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
              />
              Online only
            </label>
          </div>
          
          <div className="users-list">
            {/* Current User */}
            <div className="user-item current-user">
              <span className="user-avatar">{currentUser.avatar}</span>
              <div className="user-info">
                <span className="user-name">{currentUser.name} (You)</span>
                <span className="user-status">{currentUser.status}</span>
              </div>
            </div>
            
            {/* Other Users */}
            {onlineUsers
              .filter(user => user.id !== currentUserId)
              .map(user => (
                <div
                  key={user.id}
                  className={`user-item ${selectedUserId === user.id ? 'selected' : ''}`}
                  onClick={() => handleUserSelect(user.id)}
                >
                  <span className="user-avatar">{user.avatar}</span>
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-role">{user.role}</span>
                    <span className={`user-status ${user.isOnline ? 'online' : 'offline'}`}>
                      {user.isOnline ? '🟢' : '⚫'} {user.status}
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* Messages Area */}
        <div className="messages-area">
          {/* Messages List */}
          <div className="messages-container">
            {/* Filter Info */}
            {(selectedUserId || searchTerm || messageFilter !== 'all') && (
              <div className="filter-info">
                <span>
                  {selectedUserId && `💬 Chat với ${users.find(u => u.id === selectedUserId)?.name}`}
                  {searchTerm && `🔍 Tìm kiếm: "${searchTerm}"`}
                  {messageFilter !== 'all' && `📋 Lọc: ${messageFilter}`}
                </span>
                <button 
                  onClick={() => {
                    setSelectedUserId(null);
                    setSearchTerm('');
                    setMessageFilter('all');
                  }}
                  className="clear-filter-btn"
                >
                  ❌ Xóa bộ lọc
                </button>
              </div>
            )}
            
            {/* Messages */}
            <div className="messages-list">
              {filteredMessages.length === 0 ? (
                <div className="empty-state">
                  <h3>💭 Chưa có tin nhắn nào</h3>
                  <p>Hãy bắt đầu cuộc trò chuyện!</p>
                </div>
              ) : (
                filteredMessages.map(message => (
                  <Message
                    key={message.id}
                    message={message}
                    currentUserId={currentUserId}
                    onReaction={handleReaction}
                    onReply={handleReply}
                    onEdit={handleEditMessage}
                    onDelete={handleDeleteMessage}
                  />
                ))
              )}
              
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input Area */}
          <div className="message-input-area">
            {/* Reply Preview */}
            {replyToMessage && (
              <div className="reply-preview">
                <div className="reply-info">
                  💬 Đang trả lời {replyToMessage.authorName}:
                  <span className="reply-content">
                    "{replyToMessage.content.substring(0, 50)}..."
                  </span>
                </div>
                <button 
                  onClick={() => setReplyToId(null)}
                  className="cancel-reply-btn"
                >
                  ❌
                </button>
              </div>
            )}
            
            {/* Input Container */}
            <div className="input-container">
              <textarea
                ref={messageInputRef}
                value={newMessage}
                onChange={handleMessageInputChange}
                onKeyPress={handleKeyPress}
                placeholder="💬 Nhập tin nhắn... (Enter để gửi, Shift+Enter để xuống dòng)"
                className="message-input"
                rows={1}
                style={{
                  minHeight: '40px',
                  maxHeight: '120px',
                  resize: 'none'
                }}
              />
              
              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="send-button"
                title="Gửi tin nhắn"
              >
                🚀 Gửi
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="quick-actions">
              <button className="quick-action-btn" title="Đính kèm file">
                📎 File
              </button>
              <button className="quick-action-btn" title="Thêm emoji">
                😊 Emoji
              </button>
              <button className="quick-action-btn" title="Ghi âm">
                🎤 Voice
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Info (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <details>
            <summary>🐛 Debug Info</summary>
            <pre>
              {JSON.stringify({
                totalMessages: messages.length,
                filteredMessages: filteredMessages.length,
                searchTerm: debouncedSearchTerm,
                selectedUser: selectedUserId,
                replyingTo: replyToId,
                messageFilter,
                onlineUsers: users.filter(u => u.isOnline).length
              }, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

// Export component
export default ChatApp;