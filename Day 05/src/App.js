// =============================================================================
// DAY 5: LISTS & KEYS - Advanced Array Rendering & Performance
// =============================================================================
// Component này demo các patterns quan trọng của list rendering:
// - Key prop requirements và best practices
// - Array manipulation với immutable updates
// - Performance optimization cho large lists
// - Different list rendering patterns
// =============================================================================

import React, { useState, useMemo, useCallback } from 'react';

function App() {
  // =============================================================================
  // 1. TODO LIST STATE - Array manipulation demo
  // =============================================================================
  // Simple todo array để demo basic list operations
  const [todos, setTodos] = useState([
    { id: 1, text: 'Học React Lists & Keys', completed: false, priority: 'high', category: 'learning' },
    { id: 2, text: 'Thực hành array methods', completed: true, priority: 'medium', category: 'practice' },
    { id: 3, text: 'Build todo app', completed: false, priority: 'high', category: 'project' },
    { id: 4, text: 'Review performance tips', completed: false, priority: 'low', category: 'review' }
  ]);

  // =============================================================================
  // 2. USERS LIST STATE - Complex objects array demo
  // =============================================================================
  const [users] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'admin', active: true, avatar: '👨‍💼' },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com', role: 'user', active: true, avatar: '👩‍🎨' },
    { id: 3, name: 'Lê Văn C', email: 'c@example.com', role: 'user', active: false, avatar: '👨‍🔧' },
    { id: 4, name: 'Phạm Thị D', email: 'd@example.com', role: 'moderator', active: true, avatar: '👩‍🏫' },
    { id: 5, name: 'Hoàng Văn E', email: 'e@example.com', role: 'user', active: true, avatar: '👨‍🎓' }
  ]);

  // =============================================================================
  // 3. PRODUCTS LIST STATE - Large dataset demo
  // =============================================================================
  const [products] = useState(
    // Tạo large dataset để demo performance
    Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      name: `Sản phẩm ${index + 1}`,
      price: Math.floor(Math.random() * 1000000) + 50000,
      category: ['Electronics', 'Clothing', 'Books', 'Home'][Math.floor(Math.random() * 4)],
      inStock: Math.random() > 0.3, // 70% chance có hàng
      rating: Math.floor(Math.random() * 5) + 1,
      image: `https://via.placeholder.com/200x150/007bff/white?text=Product+${index + 1}`
    }))
  );

  // =============================================================================
  // 4. FILTER & SEARCH STATE - List filtering demo
  // =============================================================================
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // name, price, rating
  const [selectedCategory, setSelectedCategory] = useState('');

  // =============================================================================
  // 5. TODO CRUD OPERATIONS - Array manipulation methods
  // =============================================================================
  
  // ADD TODO - Thêm item vào array
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      // CREATE new todo object
      const todo = {
        id: Date.now(), // Simple ID generation (trong thực tế dùng uuid)
        text: newTodo.trim(),
        completed: false,
        priority: 'medium',
        category: 'general'
      };
      
      // IMMUTABLE UPDATE - Không mutate array gốc
      setTodos(prev => [...prev, todo]); // Spread operator để add item
      setNewTodo(''); // Clear input
    }
  };

  // TOGGLE TODO - Update item trong array
  const handleToggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed } // Update specific item
        : todo                                      // Keep other items unchanged
    ));
  }, []); // Empty dependency array - function không thay đổi

  // DELETE TODO - Remove item khỏi array
  const handleDeleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id)); // Filter out item
  }, []);

  // BATCH DELETE - Xóa multiple items
  const handleDeleteCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed)); // Keep only non-completed
  };

  // =============================================================================
  // 6. COMPUTED VALUES với useMemo - Performance optimization
  // =============================================================================
  
  // FILTERED TODOS - Chỉ tính lại khi todos hoặc filter thay đổi
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]); // Dependencies array

  // SEARCHED PRODUCTS - Filter products dựa trên search term
  const searchedProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory)
    );
  }, [products, searchTerm, selectedCategory]);

  // SORTED PRODUCTS - Sort products dựa trên sortBy
  const sortedProducts = useMemo(() => {
    return [...searchedProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating; // Descending
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [searchedProducts, sortBy]);

  // STATISTICS - Computed stats
  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    completionRate: todos.length > 0 ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0
  }), [todos]);

  // =============================================================================
  // 7. RENDER HELPER FUNCTIONS - Component composition patterns
  // =============================================================================
  
  // Render individual todo item
  const renderTodoItem = (todo) => (
    <div 
      key={todo.id} // KEY PROP - BẮT BUỘC và phải UNIQUE
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: todo.completed ? '#f8f9fa' : 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '6px',
        marginBottom: '8px'
      }}
    >
      {/* CHECKBOX - Toggle completed state */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleToggleTodo(todo.id)} // Callback với ID
        style={{ marginRight: '12px' }}
      />
      
      {/* TODO TEXT với conditional styling */}
      <span 
        style={{
          flex: 1,
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? '#666' : '#333',
          fontSize: '16px'
        }}
      >
        {todo.text}
      </span>
      
      {/* PRIORITY BADGE */}
      <span 
        style={{
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          backgroundColor: todo.priority === 'high' ? '#ff4444' : 
                          todo.priority === 'medium' ? '#ffa500' : '#28a745',
          color: 'white',
          marginRight: '8px'
        }}
      >
        {todo.priority}
      </span>
      
      {/* DELETE BUTTON */}
      <button
        onClick={() => handleDeleteTodo(todo.id)}
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        Xóa
      </button>
    </div>
  );

  // Render user item với complex object
  const renderUserItem = (user) => (
    <div 
      key={user.id} // Key prop cho user list
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        marginBottom: '10px'
      }}
    >
      {/* USER AVATAR */}
      <span style={{ fontSize: '32px', marginRight: '15px' }}>
        {user.avatar}
      </span>
      
      {/* USER INFO */}
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>
          {user.name}
        </h4>
        <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>
          {user.email}
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* ROLE BADGE */}
          <span style={{
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            backgroundColor: user.role === 'admin' ? '#007bff' : 
                            user.role === 'moderator' ? '#ffc107' : '#28a745',
            color: 'white'
          }}>
            {user.role}
          </span>
          
          {/* STATUS BADGE */}
          <span style={{
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            backgroundColor: user.active ? '#28a745' : '#dc3545',
            color: 'white'
          }}>
            {user.active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  );

  // Render product item
  const renderProductItem = (product) => (
    <div 
      key={product.id} // Key prop cho large list
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: 'white',
        textAlign: 'center'
      }}
    >
      <img 
        src={product.image} 
        alt={product.name}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '6px',
          marginBottom: '10px'
        }}
      />
      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
        {product.name}
      </h4>
      <p style={{ margin: '0 0 8px 0', color: '#007bff', fontWeight: 'bold' }}>
        {product.price.toLocaleString('vi-VN')}đ
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ 
          fontSize: '12px',
          color: product.inStock ? '#28a745' : '#dc3545' 
        }}>
          {product.inStock ? 'Còn hàng' : 'Hết hàng'}
        </span>
        <span style={{ fontSize: '14px' }}>
          {'⭐'.repeat(product.rating)}
        </span>
      </div>
    </div>
  );

  // =============================================================================
  // 8. MAIN RENDER - Layout với multiple list sections
  // =============================================================================
  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      
      {/* ===================================================================== */}
      {/* HEADER SECTION */}
      {/* ===================================================================== */}
      <header style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#333', marginBottom: '10px', fontSize: '32px' }}>
          Day 5 - Lists & Keys Demo
        </h1>
        <p style={{ color: '#666', fontSize: '18px', margin: 0 }}>
          Học cách render arrays, sử dụng key props và optimize performance
        </p>
      </header>

      {/* ===================================================================== */}
      {/* TODO SECTION - Basic list operations */}
      {/* ===================================================================== */}
      <section style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>
          🗒️ Todo List - Array CRUD Operations
        </h2>
        
        {/* STATISTICS ROW */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px',
          marginBottom: '25px'
        }}>
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>{stats.total}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Tổng cộng</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>{stats.completed}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Hoàn thành</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>{stats.pending}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Chưa hoàn thành</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#fce4ec', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#c2185b' }}>{stats.completionRate}%</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Tỷ lệ hoàn thành</div>
          </div>
        </div>

        {/* ADD TODO FORM */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '25px'
        }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder="Thêm todo mới..."
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          />
          <button
            onClick={handleAddTodo}
            style={{
              padding: '12px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Thêm
          </button>
        </div>

        {/* FILTER BUTTONS */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px'
        }}>
          {['all', 'pending', 'completed'].map(filterType => (
            <button
              key={filterType} // Key prop cho filter buttons
              onClick={() => setFilter(filterType)}
              style={{
                padding: '8px 16px',
                backgroundColor: filter === filterType ? '#007bff' : '#f8f9fa',
                color: filter === filterType ? 'white' : '#333',
                border: '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {filterType === 'all' ? 'Tất cả' : 
               filterType === 'pending' ? 'Chưa hoàn thành' : 'Đã hoàn thành'}
              ({filterType === 'all' ? stats.total : 
                filterType === 'pending' ? stats.pending : stats.completed})
            </button>
          ))}
          
          {stats.completed > 0 && (
            <button
              onClick={handleDeleteCompleted}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginLeft: 'auto'
              }}
            >
              Xóa đã hoàn thành
            </button>
          )}
        </div>

        {/* TODO LIST - Map qua filtered todos */}
        <div>
          {filteredTodos.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#666',
              fontSize: '18px'
            }}>
              {filter === 'all' ? 'Chưa có todo nào' :
               filter === 'pending' ? 'Không có todo chưa hoàn thành' :
               'Không có todo đã hoàn thành'}
            </div>
          ) : (
            filteredTodos.map(renderTodoItem) // Map qua array với render function
          )}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* USERS SECTION - Complex object rendering */}
      {/* ===================================================================== */}
      <section style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>
          👥 Users List - Complex Object Rendering
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '15px'
        }}>
          {/* MAP qua users array với complex objects */}
          {users.map(renderUserItem)}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* PRODUCTS SECTION - Large dataset với filtering */}
      {/* ===================================================================== */}
      <section style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>
          🛍️ Products ({sortedProducts.length}/100) - Performance Demo
        </h2>
        
        {/* SEARCH & FILTER CONTROLS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '25px'
        }}>
          {/* SEARCH INPUT */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
          
          {/* CATEGORY FILTER */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            <option value="">Tất cả danh mục</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
          </select>
          
          {/* SORT SELECT */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            <option value="name">Sắp xếp theo tên</option>
            <option value="price">Sắp xếp theo giá</option>
            <option value="rating">Sắp xếp theo rating</option>
          </select>
        </div>

        {/* PRODUCTS GRID - Large list rendering */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {/* MAP qua sorted and filtered products */}
          {sortedProducts.map(renderProductItem)}
        </div>
        
        {/* EMPTY STATE */}
        {sortedProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            color: '#666'
          }}>
            <h3>Không tìm thấy sản phẩm nào</h3>
            <p>Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* FOOTER với key learning points */}
      {/* ===================================================================== */}
      <footer style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        marginTop: '30px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#28a745', marginBottom: '20px' }}>
          ✅ Hoàn thành Day 5 - Lists & Keys!
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px',
          textAlign: 'left'
        }}>
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ color: '#007bff', marginBottom: '10px' }}>🔑 Key Props</h4>
            <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <li>Key phải unique và stable</li>
              <li>Không dùng index làm key khi list thay đổi</li>
              <li>Key giúp React identify elements</li>
              <li>Performance optimization với key</li>
            </ul>
          </div>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ color: '#28a745', marginBottom: '10px' }}>📋 Array Methods</h4>
            <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <li>map() - Render list items</li>
              <li>filter() - Remove/show items</li>
              <li>find() - Locate specific item</li>
              <li>reduce() - Calculate aggregates</li>
            </ul>
          </div>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ color: '#ffc107', marginBottom: '10px' }}>⚡ Performance</h4>
            <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <li>useMemo cho expensive calculations</li>
              <li>useCallback cho event handlers</li>
              <li>Immutable updates với spread</li>
              <li>Virtual scrolling cho large lists</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
  // =============================================================================
  // KẾT THÚC COMPONENT - Key Learning Points:
  // =============================================================================
  // 1. ARRAY RENDERING: map() method để render list items
  // 2. KEY PROPS: Unique và stable keys cho performance
  // 3. ARRAY MANIPULATION: CRUD operations với immutable updates
  // 4. PERFORMANCE: useMemo, useCallback cho optimization
  // 5. FILTERING & SORTING: Real-time list manipulation
  // 6. COMPLEX OBJECTS: Nested property access trong arrays
  // =============================================================================
}

export default App;