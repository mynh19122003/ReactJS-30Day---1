import React from 'react';

function Footer({ year, company }) {
  return (
    <footer style={{
      background: '#f8f9fa',
      padding: '30px 20px',
      textAlign: 'center',
      marginTop: '40px',
      borderTop: '1px solid #dee2e6'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginBottom: '20px'
        }}>
          <div style={{ minWidth: '200px', marginBottom: '15px' }}>
            <h4 style={{ marginBottom: '10px', color: '#333' }}>Liên kết</h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '5px' }}>
                <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>
                  Về chúng tôi
                </a>
              </li>
              <li style={{ marginBottom: '5px' }}>
                <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>
                  Dịch vụ
                </a>
              </li>
              <li>
                <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          
          <div style={{ minWidth: '200px', marginBottom: '15px' }}>
            <h4 style={{ marginBottom: '10px', color: '#333' }}>Mạng xã hội</h4>
            <div>
              <button style={{
                background: '#3b5998',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                margin: '0 5px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Facebook
              </button>
              <button style={{
                background: '#1da1f2',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                margin: '0 5px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Twitter
              </button>
            </div>
          </div>
        </div>
        
        <hr style={{ border: 'none', borderTop: '1px solid #dee2e6', margin: '20px 0' }} />
        
        <p style={{ margin: 0, color: '#6c757d' }}>
          © {year} {company}. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </footer>
  );
}

export default Footer;