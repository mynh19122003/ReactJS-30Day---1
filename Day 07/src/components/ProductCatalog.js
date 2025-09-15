// =============================================================================
// PRODUCT CATALOG COMPONENT với detailed comments
// =============================================================================
// Component này demo advanced list patterns: filtering, sorting, search, pagination
// Performance optimization với memoization và virtual rendering concepts
// =============================================================================

import React, { useState, useMemo, useCallback } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './ProductCatalog.css';

// =============================================================================
// 1. DATA GENERATION UTILITIES
// =============================================================================
// Function để generate sample data cho demo purposes
const generateSampleProducts = () => {
  // Define categories và brands arrays cho realistic data
  const categories = ['smartphones', 'laptops', 'tablets', 'accessories', 'smart-home'];
  const brands = ['Apple', 'Samsung', 'Google', 'Sony', 'Dell', 'HP', 'Asus', 'Xiaomi'];
  const productTypes = {
    smartphones: ['iPhone', 'Galaxy', 'Pixel', 'Xperia'],
    laptops: ['MacBook', 'ThinkPad', 'Surface', 'Inspiron'],
    tablets: ['iPad', 'Galaxy Tab', 'Surface Pro', 'MediaPad'],
    accessories: ['AirPods', 'Mouse', 'Keyboard', 'Charger'],
    'smart-home': ['Echo', 'Nest', 'Ring', 'SmartTV']
  };
  
  // Generate array of 100 products với realistic data
  return Array.from({ length: 100 }, (_, index) => {
    // Random category selection
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const productType = productTypes[category][Math.floor(Math.random() * productTypes[category].length)];
    
    // Calculate prices với realistic ranges
    const basePrice = Math.floor(Math.random() * 50000000) + 1000000; // 1M - 50M VND
    const originalPrice = Math.floor(basePrice * (1 + Math.random() * 0.5)); // Up to 50% markup
    
    return {
      id: `prod_${String(index + 1).padStart(3, '0')}`, // Formatted ID: prod_001, prod_002, etc.
      name: `${brand} ${productType} ${index + 1}`, // Realistic product names
      category,
      brand,
      price: basePrice,
      originalPrice,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 - 5.0 rating
      reviewCount: Math.floor(Math.random() * 2000) + 10, // 10 - 2010 reviews
      image: `https://picsum.photos/300/300?random=${index + 1}`, // Random product images
      inStock: Math.random() > 0.1, // 90% products in stock
      isNew: Math.random() > 0.8, // 20% new products
      isSale: Math.random() > 0.7, // 30% products on sale
      description: `High-quality ${category} from ${brand} with premium features and excellent performance`,
      features: [`${brand} Technology`, 'Premium Quality', 'Fast Performance'], // Dynamic features
      addedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Random dates within last year
      popularity: Math.floor(Math.random() * 1000) + 1 // Popularity score for sorting
    };
  });
};

// =============================================================================
// 2. PRODUCT CARD COMPONENT
// =============================================================================
// Memoized component để render individual product với optimization
const ProductCard = React.memo(({ product, viewMode, onToggleWishlist, isWishlisted }) => {
  // ============== HELPER FUNCTIONS ==============
  // Function để format price theo locale Vietnam
  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(price);
  }, []);

  // Function để format rating với stars
  const formatRating = useCallback((rating) => {
    const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    return `${stars} ${rating}`;
  }, []);

  // ============== COMPUTED VALUES ==============
  // Calculate discount percentage
  const discountPercent = useMemo(() => {
    if (product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  }, [product.originalPrice, product.price]);

  // Check if product has significant discount
  const hasDiscount = discountPercent > 0;

  // ============== EVENT HANDLERS ==============
  // Handler cho wishlist toggle với useCallback optimization
  const handleWishlistToggle = useCallback((e) => {
    e.preventDefault(); // Prevent event bubbling
    e.stopPropagation();
    onToggleWishlist(product.id);
  }, [product.id, onToggleWishlist]);

  // Handler cho product view/click
  const handleProductClick = useCallback(() => {
    console.log(`👀 Viewing product: ${product.name}`);
    // Trong thực tế sẽ navigate to product detail page
  }, [product.name]);

  // ============== MAIN RENDER ==============
  return (
    <div 
      className={`product-card ${viewMode} ${!product.inStock ? 'out-of-stock' : ''} ${product.isNew ? 'new-product' : ''}`}
      onClick={handleProductClick}
      role="button" // Accessibility
      tabIndex={0} // Keyboard navigation
    >
      {/* Product Image Container với badges */}
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy" // Performance optimization
          className="product-image"
        />
        
        {/* Product badges - conditional rendering */}
        <div className="product-badges">
          {/* New product badge */}
          {product.isNew && (
            <span className="badge badge-new">NEW</span>
          )}
          
          {/* Sale badge với discount percentage */}
          {product.isSale && hasDiscount && (
            <span className="badge badge-sale">-{discountPercent}%</span>
          )}
          
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="out-of-stock-overlay">
              <span>Hết hàng</span>
            </div>
          )}
        </div>
        
        {/* Wishlist button */}
        <button
          className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Product Info Section */}
      <div className="product-info">
        {/* Brand và Category */}
        <div className="product-meta">
          <span className="product-brand">{product.brand}</span>
          <span className="product-category">{product.category}</span>
        </div>
        
        {/* Product Name */}
        <h3 className="product-name" title={product.name}>
          {product.name}
        </h3>
        
        {/* Product Description - chỉ hiện trong grid view */}
        {viewMode === 'grid' && (
          <p className="product-description">
            {product.description.length > 80 
              ? `${product.description.substring(0, 80)}...` 
              : product.description
            }
          </p>
        )}
        
        {/* Rating và Reviews */}
        <div className="product-rating">
          <span className="rating-stars" title={`Rating: ${product.rating}/5`}>
            {formatRating(product.rating)}
          </span>
          <span className="review-count">({product.reviewCount} reviews)</span>
        </div>
        
        {/* Price Section */}
        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          
          {/* Original price nếu có discount */}
          {hasDiscount && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
          
          {/* Discount percentage */}
          {hasDiscount && (
            <span className="discount-percent">Tiết kiệm {discountPercent}%</span>
          )}
        </div>
        
        {/* Features list - chỉ hiện trong list view */}
        {viewMode === 'list' && (
          <div className="product-features">
            <ul>
              {/* Map qua features array */}
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="product-actions">
          <button 
            className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
            disabled={!product.inStock}
          >
            {product.inStock ? '🛒 Thêm vào giỏ' : '❌ Hết hàng'}
          </button>
          
          {/* Quick view button cho grid mode */}
          {viewMode === 'grid' && (
            <button className="quick-view-btn">
              👁️ Xem nhanh
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

// Set display name cho React DevTools
ProductCard.displayName = 'ProductCard';

// =============================================================================
// 3. MAIN PRODUCT CATALOG COMPONENT
// =============================================================================
const ProductCatalog = () => {
  // ============== STATE MANAGEMENT ==============
  // Products data state - sử dụng useMemo để avoid unnecessary re-generation
  const [products] = useState(() => generateSampleProducts());
  
  // Search và filter states
  const [searchTerm, setSearchTerm] = useState(''); // Raw search input
  const [selectedCategory, setSelectedCategory] = useState('all'); // Category filter
  const [selectedBrand, setSelectedBrand] = useState('all'); // Brand filter
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000000 }); // Price filter
  const [sortBy, setSortBy] = useState('name'); // Sort criteria
  const [sortOrder, setSortOrder] = useState('asc'); // Sort direction
  const [viewMode, setViewMode] = useLocalStorage('product-view-mode', 'grid'); // Grid or list view
  const [showOnlyInStock, setShowOnlyInStock] = useState(false); // Stock filter
  const [showOnlyOnSale, setShowOnlyOnSale] = useState(false); // Sale filter
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  // Wishlist state với localStorage persistence
  const [wishlist, setWishlist] = useLocalStorage('product-wishlist', []);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  
  // Use debounced search để improve performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay

  // ============== COMPUTED VALUES ==============
  // Extract unique categories và brands từ products data
  const categories = useMemo(() => {
    return [...new Set(products.map(product => product.category))].sort();
  }, [products]);

  const brands = useMemo(() => {
    return [...new Set(products.map(product => product.brand))].sort();
  }, [products]);

  // Filtered và sorted products với complex logic
  const filteredAndSortedProducts = useMemo(() => {
    console.log('🔄 Recomputing filtered products...'); // Debug log
    
    let filtered = products;

    // 1. SEARCH FILTER - search trong name, brand, category, description
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    // 2. CATEGORY FILTER
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // 3. BRAND FILTER
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // 4. PRICE RANGE FILTER
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // 5. STOCK FILTER
    if (showOnlyInStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // 6. SALE FILTER
    if (showOnlyOnSale) {
      filtered = filtered.filter(product => product.isSale);
    }

    // 7. SORTING LOGIC với multiple criteria
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = b.rating - a.rating; // Higher rating first
          break;
        case 'popularity':
          comparison = b.popularity - a.popularity; // More popular first
          break;
        case 'newest':
          comparison = new Date(b.addedDate) - new Date(a.addedDate); // Newest first
          break;
        case 'brand':
          comparison = a.brand.localeCompare(b.brand);
          break;
        default:
          comparison = 0;
      }
      
      // Apply sort order (asc/desc)
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [
    products, 
    debouncedSearchTerm, 
    selectedCategory, 
    selectedBrand, 
    priceRange, 
    sortBy, 
    sortOrder, 
    showOnlyInStock, 
    showOnlyOnSale
  ]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  // ============== EVENT HANDLERS ==============
  // Search handler với useCallback optimization
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination khi search
  }, []);

  // Category filter handler
  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset pagination
  }, []);

  // Brand filter handler
  const handleBrandChange = useCallback((e) => {
    setSelectedBrand(e.target.value);
    setCurrentPage(1); // Reset pagination
  }, []);

  // Price range handler với debouncing
  const handlePriceRangeChange = useCallback((field, value) => {
    setPriceRange(prev => ({
      ...prev,
      [field]: parseInt(value, 10) || 0
    }));
    setCurrentPage(1); // Reset pagination
  }, []);

  // Sort handler
  const handleSortChange = useCallback((newSortBy) => {
    if (newSortBy === sortBy) {
      // Toggle sort order nếu same criteria
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new criteria với default order
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  }, [sortBy]);

  // View mode toggle
  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, [setViewMode]);

  // Wishlist handlers
  const handleToggleWishlist = useCallback((productId) => {
    setWishlist(prev => {
      const isAlreadyWishlisted = prev.includes(productId);
      if (isAlreadyWishlisted) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  }, [setWishlist]);

  // Pagination handlers
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Scroll to top khi change page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Clear all filters handler
  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange({ min: 0, max: 50000000 });
    setShowOnlyInStock(false);
    setShowOnlyOnSale(false);
    setCurrentPage(1);
  }, []);

  // ============== MAIN COMPONENT RENDER ==============
  return (
    <div className="product-catalog">
      {/* Header với title và stats */}
      <div className="catalog-header">
        <h1>🛍️ Product Catalog</h1>
        <div className="catalog-stats">
          <span>
            Hiển thị {currentProducts.length} / {filteredAndSortedProducts.length} sản phẩm
          </span>
          <span>
            📋 Tổng cộng: {products.length} sản phẩm
          </span>
          {wishlist.length > 0 && (
            <span>❤️ Yêu thích: {wishlist.length}</span>
          )}
        </div>
      </div>

      {/* Filters và Controls Section */}
      <div className="catalog-controls">
        {/* Search Bar */}
        <div className="search-section">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm sản phẩm, thương hiệu, danh mục..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {/* Clear search button */}
            {searchTerm && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ❌
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="filter-section">
          {/* Category Filter */}
          <div className="filter-group">
            <label htmlFor="category-filter">📂 Danh mục:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div className="filter-group">
            <label htmlFor="brand-filter">🏢 Thương hiệu:</label>
            <select
              id="brand-filter"
              value={selectedBrand}
              onChange={handleBrandChange}
            >
              <option value="all">Tất cả thương hiệu</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group price-range">
            <label>💰 Giá:</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Giá từ"
                value={priceRange.min}
                onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                min="0"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Giá đến"
                value={priceRange.max}
                onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                min="0"
              />
            </div>
          </div>

          {/* Checkbox Filters */}
          <div className="checkbox-filters">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showOnlyInStock}
                onChange={(e) => setShowOnlyInStock(e.target.checked)}
              />
              ✅ Chỉ hàng còn trong kho
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showOnlyOnSale}
                onChange={(e) => setShowOnlyOnSale(e.target.checked)}
              />
              🏷️ Chỉ hàng đang sale
            </label>
          </div>

          {/* Clear Filters Button */}
          <button 
            className="clear-filters-btn"
            onClick={handleClearFilters}
          >
            🗑️ Xóa bộ lọc
          </button>
        </div>

        {/* Sort và View Controls */}
        <div className="control-section">
          {/* Sort Controls */}
          <div className="sort-section">
            <label>📊 Sắp xếp:</label>
            <div className="sort-buttons">
              {[
                { key: 'name', label: '📝 Tên' },
                { key: 'price', label: '💰 Giá' },
                { key: 'rating', label: '⭐ Đánh giá' },
                { key: 'popularity', label: '🔥 Phổ biến' },
                { key: 'newest', label: '🆕 Mới nhất' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`sort-btn ${sortBy === key ? 'active' : ''}`}
                  onClick={() => handleSortChange(key)}
                >
                  {label}
                  {sortBy === key && (
                    <span className="sort-indicator">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Controls */}
          <div className="view-controls">
            <label>👀 Hiển thị:</label>
            <div className="view-buttons">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => handleViewModeChange('grid')}
              >
                ⚏ Grid
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => handleViewModeChange('list')}
              >
                ☰ List
              </button>
            </div>
          </div>

          {/* Items Per Page */}
          <div className="pagination-controls">
            <label htmlFor="items-per-page">📄 Hiển thị:</label>
            <select
              id="items-per-page"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value, 10));
                setCurrentPage(1); // Reset to first page
              }}
            >
              <option value={6}>6 sản phẩm</option>
              <option value={12}>12 sản phẩm</option>
              <option value={24}>24 sản phẩm</option>
              <option value={48}>48 sản phẩm</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid/List Container */}
      <div className={`products-container ${viewMode}`}>
        {/* Loading State */}
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner">⏳ Đang tải...</div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && currentProducts.length === 0 && (
          <div className="empty-state">
            <h3>😔 Không tìm thấy sản phẩm nào</h3>
            <p>Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
            <button onClick={handleClearFilters}>
              🔄 Xóa tất cả bộ lọc
            </button>
          </div>
        )}

        {/* Products List */}
        {!isLoading && currentProducts.length > 0 && (
          <div className={`products-grid ${viewMode}`}>
            {/* Map qua current products và render ProductCard */}
            {currentProducts.map(product => (
              <ProductCard
                key={product.id} // Unique key cho React reconciliation
                product={product}
                viewMode={viewMode}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="pagination-section">
          <div className="pagination-info">
            <span>
              Trang {currentPage} / {totalPages} 
              (Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts.length)} 
              trong số {filteredAndSortedProducts.length} sản phẩm)
            </span>
          </div>
          
          <div className="pagination-controls">
            {/* Previous Page Button */}
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ⬅️ Trước
            </button>

            {/* Page Numbers */}
            <div className="page-numbers">
              {/* Logic để hiện page numbers xung quanh current page */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isVisible = (
                  pageNumber === 1 || // First page
                  pageNumber === totalPages || // Last page
                  Math.abs(pageNumber - currentPage) <= 2 // Within 2 pages of current
                );

                if (!isVisible && pageNumber !== 2 && pageNumber !== totalPages - 1) {
                  // Show ellipsis for gaps
                  if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                    return <span key={pageNumber} className="pagination-ellipsis">...</span>;
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNumber}
                    className={`pagination-btn page-number ${pageNumber === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            {/* Next Page Button */}
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Sau ➡️
            </button>
          </div>
        </div>
      )}

      {/* Debug Info (chỉ hiện trong development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <details>
            <summary>🐛 Debug Info</summary>
            <pre>
              {JSON.stringify({
                searchTerm: debouncedSearchTerm,
                selectedCategory,
                selectedBrand,
                priceRange,
                sortBy,
                sortOrder,
                currentPage,
                totalProducts: products.length,
                filteredProducts: filteredAndSortedProducts.length,
                currentProducts: currentProducts.length,
                wishlist: wishlist.length
              }, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

// Export component
export default ProductCatalog;