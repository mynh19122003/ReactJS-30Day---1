import React, { useState } from 'react';
import ShoppingCart from './components/ShoppingCart';
import MultiStepForm from './components/MultiStepForm';
import QuizApp from './components/QuizApp';

function App() {
  const [activeDemo, setActiveDemo] = useState('cart');

  const demos = [
    {
      id: 'cart',
      title: '🛒 Shopping Cart',
      description: 'Demo useState với localStorage và array manipulation',
      component: ShoppingCart
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

  const ActiveComponent = demos.find(demo => demo.id === activeDemo)?.component;

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '20px 0',
        marginBottom: '30px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <h1 style={{
            textAlign: 'center',
            color: '#333',
            marginBottom: '15px',
            fontSize: '32px'
          }}>
            Day 4 - State & Lifecycle Demo
          </h1>
          <p style={{
            textAlign: 'center',
            color: '#666',
            fontSize: '18px',
            margin: 0
          }}>
            Học useState, useEffect và State Management thông qua các ví dụ thực tế
          </p>
        </div>
      </header>

      {/* Navigation */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 30px',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {demos.map(demo => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              style={{
                padding: '20px',
                backgroundColor: activeDemo === demo.id ? '#007bff' : 'white',
                color: activeDemo === demo.id ? 'white' : '#333',
                border: activeDemo === demo.id ? 'none' : '2px solid #007bff',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{
                margin: '0 0 10px 0',
                fontSize: '20px'
              }}>
                {demo.title}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14px',
                opacity: 0.8
              }}>
                {demo.description}
              </p>
            </button>
          ))}
        </div>

        {/* Demo Navigation Tips */}
        <div style={{
          backgroundColor: '#e3f2fd',
          border: '1px solid #2196f3',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px'
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

      {/* Active Demo */}
      <main>
        {ActiveComponent && <ActiveComponent />}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'white',
        padding: '40px 20px',
        marginTop: '50px',
        borderTop: '1px solid #eee'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#28a745', marginBottom: '15px' }}>
            ✅ Hoàn thành Day 4!
          </h3>
          <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
            Bạn đã học được cách sử dụng useState và useEffect để quản lý state phức tạp. 
            Thử chỉnh sửa code trong các components để hiểu rõ hơn về cách React re-render!
          </p>
          
          {/* Key Concepts */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'left'
            }}>
              <h4 style={{ color: '#007bff', marginBottom: '10px' }}>🎯 useState</h4>
              <ul style={{ fontSize: '14px', lineHeight: '1.5', paddingLeft: '15px' }}>
                <li>Primitive state (string, number, boolean)</li>
                <li>Object state với spread operator</li>
                <li>Array state với immutable updates</li>
                <li>Functional updates với prevState</li>
              </ul>
            </div>
            
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'left'
            }}>
              <h4 style={{ color: '#28a745', marginBottom: '10px' }}>⚡ useEffect</h4>
              <ul style={{ fontSize: '14px', lineHeight: '1.5', paddingLeft: '15px' }}>
                <li>Mount effect (componentDidMount)</li>
                <li>Update effect với dependencies</li>
                <li>Cleanup function (componentWillUnmount)</li>
                <li>Timer và interval management</li>
              </ul>
            </div>
            
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'left'
            }}>
              <h4 style={{ color: '#ffc107', marginBottom: '10px' }}>💾 Side Effects</h4>
              <ul style={{ fontSize: '14px', lineHeight: '1.5', paddingLeft: '15px' }}>
                <li>LocalStorage integration</li>
                <li>Form validation và error handling</li>
                <li>Timer và countdown features</li>
                <li>Dynamic UI updates</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;