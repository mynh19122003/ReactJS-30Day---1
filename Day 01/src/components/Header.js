import React from 'react';

function Header({ user, onMenuClick }) {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      background: '#282c34',
      color: 'white'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={user.avatar} 
          alt="User" 
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            marginRight: '15px'
          }}
        />
        <span>Xin chào, {user.name}!</span>
      </div>
      
      <nav>
        <button 
          onClick={() => onMenuClick('home')}
          style={{
            background: 'transparent',
            border: '1px solid white',
            color: 'white',
            padding: '8px 16px',
            margin: '0 5px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Trang chủ
        </button>
        <button 
          onClick={() => onMenuClick('profile')}
          style={{
            background: 'transparent',
            border: '1px solid white',
            color: 'white',
            padding: '8px 16px',
            margin: '0 5px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Hồ sơ
        </button>
      </nav>
    </header>
  );
}

export default Header;