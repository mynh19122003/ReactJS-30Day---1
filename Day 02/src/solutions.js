// Bài tập 1: Chuyển đổi HTML sang JSX
function ProductList() {
  return (
    <div className="container">
      <h1>Danh sách sản phẩm</h1>
      <div className="product">
        <img src="product1.jpg" alt="Sản phẩm 1" />
        <h3>iPhone 15</h3>
        <p className="price">25,000,000 VNĐ</p>
        <button onClick={() => console.log('Thêm vào giỏ hàng')}>
          Thêm vào giỏ hàng
        </button>
      </div>
      <hr />
      <footer>
        <p>&copy; 2024 Cửa hàng điện thoại</p>
      </footer>
    </div>
  );
}

// Bài tập 2: Thông tin cá nhân
function PersonInfo() {
  const person = {
    firstName: "Nguyễn",
    lastName: "Minh",
    age: 23,
    email: "minh.nguyen@email.com",
    hobbies: ["đọc sách", "nghe nhạc", "du lịch"],
    isStudent: true
  };

  return (
    <div className="person-card">
      <h2>Thông tin cá nhân</h2>
      <p><strong>Họ tên:</strong> {person.firstName} {person.lastName}</p>
      <p><strong>Tuổi:</strong> {person.age} (sinh năm {2024 - person.age})</p>
      <p><strong>Email:</strong> {person.email}</p>
      <p><strong>Trạng thái:</strong> {person.isStudent ? "Sinh viên" : "Đi làm"}</p>
      <p><strong>Số sở thích:</strong> {person.hobbies.length}</p>
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