// =============================================================================
// DAY 4: STATE & LIFECYCLE DEMO - Advanced State Management & useEffect
// =============================================================================
// Component này demo cách tổ chức một app với multiple demos
// và quản lý state để switch between different components
// =============================================================================

import React, { useState } from 'react';
import ShoppingCart from './components/ShoppingCart';    // Demo localStorage + array state
import MultiStepForm from './components/MultiStepForm';  // Demo object state + validation
import QuizApp from './components/QuizApp';              // Demo useEffect + timers

function App() {
  // =============================================================================
  // 1. DEMO SELECTION STATE - Quản lý component nào đang được hiển thị
  // =============================================================================
  // Simple string state để track active demo
  const [activeDemo, setActiveDemo] = useState('cart'); // Default: shopping cart

  // =============================================================================
  // 2. DEMO CONFIGURATION - Array of objects để define available demos
  // =============================================================================
  // Tại sao dùng array? Dễ dàng thêm/xóa demos, render dynamic navigation
  const demos = [
    {
      id: 'cart',                        // Unique identifier
      title: '🛒 Shopping Cart',         // Display title
      description: 'Demo useState với localStorage và array manipulation', // Description
      component: ShoppingCart            // React component reference (not JSX!)
    },
    {
      id: 'form',
      title: '📝 Multi-Step Form',
      description: 'Form nhiều bước với validation và object state',
      component: MultiStepForm
    },
    {
      id: 'quiz',
      title: '🧠 Quiz App', 
      description: 'Ứng dụng quiz với timer và useEffect',
      component: QuizApp
    }
  ];

  // =============================================================================
  // 3. DYNAMIC COMPONENT RESOLUTION - Tìm component để render
  // =============================================================================
  // Find matching demo và lấy component reference
  // Optional chaining (?.) để tránh error nếu không tìm thấy
  const ActiveComponent = demos.find(demo => demo.id === activeDemo)?.component;

  // =============================================================================
  // 4. RENDER JSX - Layout structure với navigation
  // =============================================================================
  return (
    <div style={{
      backgroundColor: '#f5f5f5',         // Light gray background
      minHeight: '100vh',                 // Full viewport height
      fontFamily: 'Arial, sans-serif'     // Font family
    }}>
      
      {/* ===================================================================== */}
      {/* HEADER SECTION - Static branding và title */}
      {/* ===================================================================== */}
      <header style={{
        backgroundColor: 'white',          // White background
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', // Drop shadow
        padding: '20px 0',                 // Vertical padding
        marginBottom: '30px'               // Bottom margin
      }}>
        <div style={{
          maxWidth: '1200px',              // Max width constraint
          margin: '0 auto',                // Center horizontally
          padding: '0 20px'                // Horizontal padding
        }}>
          <h1 style={{
            textAlign: 'center',           // Center alignment
            color: '#333',                 // Dark text
            marginBottom: '15px',          // Bottom spacing
            fontSize: '32px'               // Large font size
          }}>
            Day 4 - State & Lifecycle Demo
          </h1>
          <p style={{
            textAlign: 'center',           // Center alignment
            color: '#666',                 // Gray text
            fontSize: '18px',              // Medium font size
            margin: 0                      // Remove default margin
          }}>
            Học useState, useEffect và State Management thông qua các ví dụ thực tế
          </p>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* NAVIGATION SECTION - Dynamic demo selection */}
      {/* ===================================================================== */}
      <div style={{
        maxWidth: '1200px',              // Container max width
        margin: '0 auto 30px',           // Center với bottom margin
        padding: '0 20px'                // Horizontal padding
      }}>
        
        {/* DEMO SELECTION BUTTONS - Map qua demos array */}
        <div style={{
          display: 'grid',                          // CSS Grid layout
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive columns
          gap: '20px',                              // Gap between items
          marginBottom: '30px'                      // Bottom spacing
        }}>
          {/* MAP qua demos để tạo navigation buttons */}
          {demos.map(demo => (                      // Loop qua từng demo
            <button
              key={demo.id}                         // Unique key cho list
              onClick={() => setActiveDemo(demo.id)} // Event handler để switch demo
              style={{
                padding: '20px',                    // Button padding
                // CONDITIONAL STYLING dựa trên activeDemo state
                backgroundColor: activeDemo === demo.id ? '#007bff' : 'white', // Active vs inactive
                color: activeDemo === demo.id ? 'white' : '#333',             // Text color
                border: activeDemo === demo.id ? 'none' : '2px solid #007bff', // Border style
                borderRadius: '12px',               // Rounded corners
                cursor: 'pointer',                  // Pointer cursor
                textAlign: 'left',                  // Left align text
                transition: 'all 0.2s ease',       // Smooth transitions
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)' // Drop shadow
              }}
            >
              <h3 style={{
                margin: '0 0 10px 0',               // Remove default margin, add bottom
                fontSize: '20px'                    // Font size
              }}>
                {demo.title}                        {/* Demo title từ array */}
              </h3>
              <p style={{
                margin: 0,                          // Remove margin
                fontSize: '14px',                   // Small font
                opacity: 0.8                       // Slightly transparent
              }}>
                {demo.description}                  {/* Demo description từ array */}
              </p>
            </button>
          ))}
        </div>

        {/* ================================================================= */}
        {/* USER GUIDANCE SECTION - Instructions cho user */}
        {/* ================================================================= */}
        <div style={{
          backgroundColor: '#e3f2fd',              // Light blue background
          border: '1px solid #2196f3',             // Blue border
          borderRadius: '8px',                     // Rounded corners
          padding: '15px',                         // Inner padding
          marginBottom: '20px'                     // Bottom margin
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>
            💡 Hướng dẫn sử dụng
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#333' }}>
            <li><strong>Shopping Cart:</strong> Thêm sản phẩm, thay đổi số lượng, xóa items. Data được lưu trong localStorage</li>
            <li><strong>Multi-Step Form:</strong> Điền form nhiều bước với validation, progress bar và preview</li>
            <li><strong>Quiz App:</strong> Làm quiz có timer, xem kết quả chi tiết và explanation</li>
          </ul>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* DYNAMIC COMPONENT RENDERING - Render component được chọn */}
      {/* ===================================================================== */}
      <main>
        {/* CONDITIONAL RENDERING với dynamic component */}
        {ActiveComponent && <ActiveComponent />}
        {/* 
          Cách hoạt động:
          1. ActiveComponent là component reference từ demos array
          2. && operator kiểm tra component có tồn tại không
          3. <ActiveComponent /> render component dưới dạng JSX
          4. Khi activeDemo thay đổi → component khác được render
        */}
      </main>

      {/* ===================================================================== */}
      {/* FOOTER SECTION - Summary và key concepts */}
      {/* ===================================================================== */}
      <footer style={{
        backgroundColor: 'white',          // White background
        padding: '40px 20px',              // Generous padding
        marginTop: '50px',                 // Top margin
        borderTop: '1px solid #eee'        // Top border
      }}>
        <div style={{
          maxWidth: '800px',               // Content max width
          margin: '0 auto',                // Center container
          textAlign: 'center'              // Center text
        }}>
          <h3 style={{ color: '#28a745', marginBottom: '15px' }}>
            ✅ Hoàn thành Day 4!
          </h3>
          <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
            Bạn đã học được cách sử dụng useState và useEffect để quản lý state phức tạp. 
            Thử chỉnh sửa code trong các components để hiểu rõ hơn về cách React re-render!
          </p>
          
          {/* ================================================================= */}
          {/* KEY CONCEPTS GRID - Educational summary */}
          {/* ================================================================= */}
          <div style={{
            display: 'grid',                        // CSS Grid layout
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Responsive columns
            gap: '20px',                            // Gap between items
            marginTop: '30px'                       // Top margin
          }}>
            
            {/* useState CONCEPTS */}
            <div style={{
              backgroundColor: '#f8f9fa',           // Light background
              padding: '20px',                      // Inner padding
              borderRadius: '8px',                  // Rounded corners
              textAlign: 'left'                     // Left align content
            }}>
              <h4 style={{ color: '#007bff', marginBottom: '10px' }}>🎯 useState</h4>
              <ul style={{ fontSize: '14px', lineHeight: '1.5', paddingLeft: '15px' }}>
                <li>Primitive state (string, number, boolean)</li>      {/* Basic data types */}
                <li>Object state với spread operator</li>               {/* Complex objects */}
                <li>Array state với immutable updates</li>              {/* Array manipulation */}
                <li>Functional updates với prevState</li>               {/* Previous state access */}
              </ul>
            </div>
            
            {/* useEffect CONCEPTS */}
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'left'
            }}>
              <h4 style={{ color: '#28a745', marginBottom: '10px' }}>⚡ useEffect</h4>
              <ul style={{ fontSize: '14px', lineHeight: '1.5', paddingLeft: '15px' }}>
                <li>Mount effect (componentDidMount)</li>               {/* Initial load */}
                <li>Update effect với dependencies</li>                 {/* Re-run conditions */}
                <li>Cleanup function (componentWillUnmount)</li>        {/* Memory cleanup */}
                <li>Timer và interval management</li>                   {/* Time-based effects */}
              </ul>
            </div>
            
            {/* SIDE EFFECTS CONCEPTS */}
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'left'
            }}>
              <h4 style={{ color: '#ffc107', marginBottom: '10px' }}>💾 Side Effects</h4>
              <ul style={{ fontSize: '14px', lineHeight: '1.5', paddingLeft: '15px' }}>
                <li>LocalStorage integration</li>                       {/* Data persistence */}
                <li>Form validation và error handling</li>              {/* User input */}
                <li>Timer và countdown features</li>                    {/* Time management */}
                <li>Dynamic UI updates</li>                             {/* Interface changes */}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
  // =============================================================================
  // KẾT THÚC COMPONENT - Key Learning Points:
  // =============================================================================
  // 1. APP ARCHITECTURE: Tổ chức app với multiple demo components
  // 2. DYNAMIC RENDERING: Render components dựa trên state
  // 3. CONFIGURATION: Sử dụng arrays để config navigation
  // 4. CONDITIONAL STYLING: Style dựa trên active state
  // 5. COMPONENT REFERENCES: Store và sử dụng component references
  // 6. STATE MANAGEMENT: Simple state cho complex UI logic
  // =============================================================================
}

export default App;