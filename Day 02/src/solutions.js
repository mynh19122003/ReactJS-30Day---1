// =============================================================================
// DAY 2: JSX SYNTAX - CODE MẪU VỚI CHÚ THÍCH CHI TIẾT
// =============================================================================

// 1. IMPORT REACT (cần thiết để sử dụng JSX)
import React from 'react';

// =============================================================================
// BÀI TẬP 1: CHUYỂN ĐỔI HTML SANG JSX
// =============================================================================

function ProductList() {
  // 2. RETURN JSX - LƯU Ý CÁC ĐIỂM KHÁC BIỆT VỚI HTML
  return (
    // 3. PHẢI CÓ MỘT PARENT ELEMENT (hoặc React Fragment)
    <div className="container"> {/* class -> className */}
      
      {/* 4. TIÊU ĐỀ CHÍNH */}
      <h1>Danh sách sản phẩm</h1>
      
      {/* 5. PRODUCT CARD */}
      <div className="product">
        {/* 6. IMG TAG - PHẢI TỰ ĐÓNG (self-closing) */}
        <img 
          src="product1.jpg"      // src attribute
          alt="Sản phẩm 1"        // alt cho accessibility
        /> {/* Lưu ý: <img /> chứ không phải <img> */}
        
        {/* 7. PRODUCT INFO */}
        <h3>iPhone 15</h3>
        
        {/* 8. PRICE với className thay vì class */}
        <p className="price">25,000,000 VNĐ</p>
        
        {/* 9. BUTTON với EVENT HANDLER */}
        <button 
          onClick={() => console.log('Thêm vào giỏ hàng')} // onClick (camelCase)
        >
          Thêm vào giỏ hàng
        </button>
      </div>
      
      {/* 10. HR TAG - PHẢI TỰ ĐÓNG */}
      <hr /> {/* <hr /> chứ không phải <hr> */}
      
      {/* 11. FOOTER */}
      <footer>
        {/* 12. SPECIAL CHARACTERS - sử dụng HTML entities hoặc Unicode */}
        <p>&copy; 2024 Cửa hàng điện thoại</p>
      </footer>
    </div>
  );
}

// =============================================================================
// BÀI TẬP 2: SỬ DỤNG BIẾN VÀ EXPRESSIONS TRONG JSX
// =============================================================================

function PersonInfo() {
  // 13. ĐỊNH NGHĨA DATA OBJECT
  // Trong thực tế, data này có thể đến từ API, props, hoặc state
  const person = {
    firstName: "Nguyễn",
    lastName: "Minh", 
    age: 23,
    email: "minh.nguyen@email.com",
    hobbies: ["đọc sách", "nghe nhạc", "du lịch"], // Array
    isStudent: true  // Boolean
  };

  // 14. CÁC HELPER FUNCTIONS (có thể tính toán trước khi render)
  const fullName = `${person.firstName} ${person.lastName}`;
  const birthYear = 2024 - person.age;
  const hobbyCount = person.hobbies.length;

  return (
    // 15. CONTAINER với className
    <div className="person-card">
      
      {/* 16. TIÊU ĐỀ */}
      <h2>Thông tin cá nhân</h2>
      
      {/* 17. SỬ DỤNG BIẾN TRONG JSX với {} */}
      <p>
        <strong>Họ tên:</strong> {fullName} 
        {/* Hoặc có thể viết: {person.firstName} {person.lastName} */}
      </p>
      
      {/* 18. EXPRESSION TÍNH TOÁN TRỰC TIẾP */}
      <p>
        <strong>Tuổi:</strong> {person.age} (sinh năm {birthYear})
      </p>
      
      {/* 19. EMAIL */}
      <p>
        <strong>Email:</strong> {person.email}
      </p>
      
      {/* 20. CONDITIONAL (TERNARY) OPERATOR */}
      <p>
        <strong>Trạng thái:</strong> {person.isStudent ? "Sinh viên" : "Đi làm"}
        {/* Cú pháp: condition ? trueValue : falseValue */}
      </p>
      
      {/* 21. SỬ DỤNG ARRAY.LENGTH */}
      <p>
        <strong>Số sở thích:</strong> {hobbyCount}
      </p>
    </div>
  );
}

// Bài tập 3: Chào theo thời gian
function TimeGreeting() {
  const currentHour = new Date().getHours();
  
  const greeting = currentHour >= 5 && currentHour < 12 
    ? "Chào buổi sáng!" 
    : currentHour >= 12 && currentHour < 18 
    ? "Chào buổi chiều!"
    : currentHour >= 18 && currentHour < 22
    ? "Chào buổi tối!"
    : "Chúc ngủ ngon!";

  return (
    <div>
      <h1>{greeting}</h1>
      <p>Hiện tại là {currentHour}h</p>
    </div>
  );
}

// Bài tập 4: Card sản phẩm với styling
function ProductCard() {
  const product = {
    name: "Laptop Dell XPS 13",
    price: 35000000,
    image: "https://via.placeholder.com/300x200",
    inStock: true,
    discount: 10
  };

  const originalPrice = product.price;
  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <div className="product-card" style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '300px',
      margin: '16px'
    }}>
      <img 
        src={product.image} 
        alt={product.name}
        style={{ width: '100%', borderRadius: '4px' }}
      />
      <h3>{product.name}</h3>
      
      <div>
        {product.discount > 0 ? (
          <>
            <span style={{ 
              color: 'red', 
              textDecoration: 'line-through',
              marginRight: '10px'
            }}>
              {originalPrice.toLocaleString()} VNĐ
            </span>
            <span style={{ color: 'blue', fontWeight: 'bold' }}>
              {discountedPrice.toLocaleString()} VNĐ
            </span>
            <span style={{ 
              backgroundColor: 'red', 
              color: 'white', 
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '12px',
              marginLeft: '10px'
            }}>
              -{product.discount}%
            </span>
          </>
        ) : (
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
            {originalPrice.toLocaleString()} VNĐ
          </span>
        )}
      </div>

      <p style={{ 
        color: product.inStock ? 'green' : 'gray',
        fontWeight: 'bold'
      }}>
        {product.inStock ? "Còn hàng" : "Hết hàng"}
      </p>
    </div>
  );
}

// Bài tập 5: WeatherCard
function WeatherCard() {
  const weatherData = {
    city: "Hà Nội",
    temperature: 28,
    condition: "sunny",
    humidity: 65,
    windSpeed: 12
  };

  const getWeatherIcon = (condition) => {
    switch(condition) {
      case 'sunny': return '☀️';
      case 'cloudy': return '🌤️';
      case 'rainy': return '🌧️';
      default: return '🌤️';
    }
  };

  const getBackgroundColor = (condition) => {
    switch(condition) {
      case 'sunny': return '#fff3cd';
      case 'cloudy': return '#f8f9fa';
      case 'rainy': return '#cff4fc';
      default: return '#f8f9fa';
    }
  };

  return (
    <div style={{
      backgroundColor: getBackgroundColor(weatherData.condition),
      padding: '20px',
      borderRadius: '12px',
      textAlign: 'center',
      maxWidth: '250px',
      margin: '20px auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2>{weatherData.city}</h2>
      <div style={{ fontSize: '48px', margin: '10px 0' }}>
        {getWeatherIcon(weatherData.condition)}
      </div>
      <div style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0' }}>
        {weatherData.temperature}°C
      </div>
      <div style={{ fontSize: '14px', color: '#666' }}>
        <p>Độ ẩm: {weatherData.humidity}%</p>
        <p>Tốc độ gió: {weatherData.windSpeed} km/h</p>
      </div>
    </div>
  );
}

export { ProductList, PersonInfo, TimeGreeting, ProductCard, WeatherCard };