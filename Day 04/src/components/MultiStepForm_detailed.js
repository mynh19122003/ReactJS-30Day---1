// =============================================================================
// MULTISTEPFORM COMPONENT - Advanced Form State Management
// =============================================================================
// Component này demo cách quản lý form phức tạp với:
// - Multiple steps navigation
// - Object state với nested properties
// - Form validation và error handling
// - Progress tracking và user experience
// =============================================================================

import React, { useState } from 'react';

function MultiStepForm() {
  // =============================================================================
  // 1. FORM NAVIGATION STATE - Quản lý step hiện tại
  // =============================================================================
  const [currentStep, setCurrentStep] = useState(1);

  // =============================================================================
  // 2. COMPLEX FORM STATE - Object state với nhiều fields
  // =============================================================================
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    
    // Step 2: Address Information
    address: '',
    city: '',
    district: '',
    ward: '',
    zipCode: '',
    
    // Step 3: User Preferences
    interests: [],
    newsletter: false,
    notifications: true,
    preferredContact: 'email'
  });

  // =============================================================================
  // 3. VALIDATION & SUBMISSION STATE
  // =============================================================================
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =============================================================================
  // 4. CONFIGURATION DATA
  // =============================================================================
  const steps = [
    { id: 1, title: 'Thông tin cá nhân', icon: '👤' },
    { id: 2, title: 'Địa chỉ', icon: '📍' },
    { id: 3, title: 'Sở thích', icon: '⚙️' },
    { id: 4, title: 'Xác nhận', icon: '✅' }
  ];

  const interestOptions = [
    'Công nghệ', 'Du lịch', 'Ẩm thực', 'Thể thao', 
    'Âm nhạc', 'Phim ảnh', 'Đọc sách', 'Game'
  ];

  // =============================================================================
  // 5. VALIDATION FUNCTIONS
  // =============================================================================
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10-11 số)';
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'Vui lòng chọn ngày sinh';
    }
    
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'Vui lòng chọn thành phố';
    }
    
    if (!formData.district.trim()) {
      newErrors.district = 'Vui lòng chọn quận/huyện';
    }
    
    if (!formData.ward.trim()) {
      newErrors.ward = 'Vui lòng chọn phường/xã';
    }
    
    return newErrors;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (formData.interests.length === 0) {
      newErrors.interests = 'Vui lòng chọn ít nhất một sở thích';
    }
    
    return newErrors;
  };

  // =============================================================================
  // 6. INPUT CHANGE HANDLERS
  // =============================================================================
  
  // Generic input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error khi user typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Checkbox change handler
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Interest selection handler
  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(item => item !== interest)
        : [...prev.interests, interest]
    }));
    
    if (errors.interests) {
      setErrors(prev => ({ ...prev, interests: '' }));
    }
  };

  // =============================================================================
  // 7. NAVIGATION HANDLERS
  // =============================================================================
  const handleNext = () => {
    let stepErrors = {};
    
    switch (currentStep) {
      case 1:
        stepErrors = validateStep1();
        break;
      case 2:
        stepErrors = validateStep2();
        break;
      case 3:
        stepErrors = validateStep3();
        break;
      default:
        break;
    }
    
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(prev => prev + 1);
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  // =============================================================================
  // 8. FORM SUBMISSION
  // =============================================================================
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      alert('Đăng ký thành công!');
      
      // Reset form
      setCurrentStep(1);
      setFormData({
        fullName: '', email: '', phone: '', birthDate: '',
        address: '', city: '', district: '', ward: '', zipCode: '',
        interests: [], newsletter: false, notifications: true, preferredContact: 'email'
      });
      
    } catch (error) {
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // =============================================================================
  // 9. RENDER FUNCTIONS cho từng step
  // =============================================================================
  
  // Render Step 1: Personal Information
  const renderStep1 = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>
        👤 Thông tin cá nhân
      </h3>
      
      <div style={{ display: 'grid', gap: '15px', maxWidth: '400px', margin: '0 auto' }}>
        {/* Full Name Field */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Họ và tên *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.fullName ? '2px solid #e74c3c' : '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            placeholder="Nhập họ và tên"
          />
          {errors.fullName && (
            <span style={{ color: '#e74c3c', fontSize: '14px' }}>{errors.fullName}</span>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.email ? '2px solid #e74c3c' : '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            placeholder="example@email.com"
          />
          {errors.email && (
            <span style={{ color: '#e74c3c', fontSize: '14px' }}>{errors.email}</span>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Số điện thoại *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.phone ? '2px solid #e74c3c' : '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            placeholder="0123456789"
          />
          {errors.phone && (
            <span style={{ color: '#e74c3c', fontSize: '14px' }}>{errors.phone}</span>
          )}
        </div>

        {/* Birth Date Field */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Ngày sinh *
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.birthDate ? '2px solid #e74c3c' : '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          />
          {errors.birthDate && (
            <span style={{ color: '#e74c3c', fontSize: '14px' }}>{errors.birthDate}</span>
          )}
        </div>
      </div>
    </div>
  );

  // Render Step 2: Address Information
  const renderStep2 = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>
        📍 Thông tin địa chỉ
      </h3>
      
      <div style={{ display: 'grid', gap: '15px', maxWidth: '400px', margin: '0 auto' }}>
        {/* Address Field */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Địa chỉ chi tiết *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.address ? '2px solid #e74c3c' : '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            placeholder="Số nhà, tên đường..."
          />
          {errors.address && (
            <span style={{ color: '#e74c3c', fontSize: '14px' }}>{errors.address}</span>
          )}
        </div>

        {/* City Field */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Thành phố *
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.city ? '2px solid #e74c3c' : '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          >
            <option value="">Chọn thành phố</option>
            <option value="hanoi">Hà Nội</option>
            <option value="hcm">TP. Hồ Chí Minh</option>
            <option value="danang">Đà Nẵng</option>
            <option value="cantho">Cần Thơ</option>
          </select>
          {errors.city && (
            <span style={{ color: '#e74c3c', fontSize: '14px' }}>{errors.city}</span>
          )}
        </div>

        {/* District Field */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Quận/Huyện *
          </label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.district ? '2px solid #e74c3c' : '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            placeholder="Nhập quận/huyện"
          />
          {errors.district && (
            <span style={{ color: '#e74c3c', fontSize: '14px' }}>{errors.district}</span>
          )}
        </div>

        {/* Ward Field */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Phường/Xã *
          </label>
          <input
            type="text"
            name="ward"
            value={formData.ward}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.ward ? '2px solid #e74c3c' : '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            placeholder="Nhập phường/xã"
          />
          {errors.ward && (
            <span style={{ color: '#e74c3c', fontSize: '14px' }}>{errors.ward}</span>
          )}
        </div>

        {/* Zip Code Field */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Mã bưu điện
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            placeholder="100000"
          />
        </div>
      </div>
    </div>
  );

  // Render Step 3: Preferences
  const renderStep3 = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>
        ⚙️ Sở thích và thiết lập
      </h3>
      
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        {/* Interests Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
            Sở thích của bạn *
          </label>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '10px',
            border: errors.interests ? '2px solid #e74c3c' : '1px solid #ddd',
            padding: '15px',
            borderRadius: '6px'
          }}>
            {interestOptions.map(interest => (
              <label key={interest} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                  style={{ marginRight: '8px' }}
                />
                {interest}
              </label>
            ))}
          </div>
          {errors.interests && (
            <span style={{ color: '#e74c3c', fontSize: '14px' }}>{errors.interests}</span>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleCheckboxChange}
              style={{ marginRight: '8px' }}
            />
            Đăng ký nhận newsletter
          </label>
        </div>

        {/* Notifications */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleCheckboxChange}
              style={{ marginRight: '8px' }}
            />
            Nhận thông báo qua email
          </label>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Phương thức liên hệ ưu tiên
          </label>
          <select
            name="preferredContact"
            value={formData.preferredContact}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          >
            <option value="email">Email</option>
            <option value="phone">Điện thoại</option>
            <option value="sms">SMS</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Render Step 4: Confirmation
  const renderStep4 = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>
        ✅ Xác nhận thông tin
      </h3>
      
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
        {/* Personal Info Summary */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#007bff', marginBottom: '10px' }}>👤 Thông tin cá nhân</h4>
          <p><strong>Họ tên:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Điện thoại:</strong> {formData.phone}</p>
          <p><strong>Ngày sinh:</strong> {formData.birthDate}</p>
        </div>

        {/* Address Info Summary */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#007bff', marginBottom: '10px' }}>📍 Địa chỉ</h4>
          <p><strong>Địa chỉ:</strong> {formData.address}</p>
          <p><strong>Thành phố:</strong> {formData.city}</p>
          <p><strong>Quận/Huyện:</strong> {formData.district}</p>
          <p><strong>Phường/Xã:</strong> {formData.ward}</p>
          {formData.zipCode && <p><strong>Mã bưu điện:</strong> {formData.zipCode}</p>}
        </div>

        {/* Preferences Summary */}
        <div>
          <h4 style={{ color: '#007bff', marginBottom: '10px' }}>⚙️ Thiết lập</h4>
          <p><strong>Sở thích:</strong> {formData.interests.join(', ')}</p>
          <p><strong>Newsletter:</strong> {formData.newsletter ? 'Có' : 'Không'}</p>
          <p><strong>Thông báo:</strong> {formData.notifications ? 'Có' : 'Không'}</p>
          <p><strong>Liên hệ ưu tiên:</strong> {formData.preferredContact}</p>
        </div>
      </div>
    </div>
  );

  // =============================================================================
  // 10. MAIN RENDER - Component layout với progress bar và navigation
  // =============================================================================
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      
      {/* ===================================================================== */}
      {/* PROGRESS BAR - Visual indicator cho current step */}
      {/* ===================================================================== */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          {steps.map((step, index) => (
            <div key={step.id} style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1
            }}>
              {/* Step Circle */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: currentStep >= step.id ? '#007bff' : '#e0e0e0',
                color: currentStep >= step.id ? 'white' : '#666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                {step.icon}
              </div>
              
              {/* Step Title */}
              <span style={{
                marginLeft: '10px',
                fontSize: '14px',
                color: currentStep >= step.id ? '#007bff' : '#666',
                fontWeight: currentStep === step.id ? 'bold' : 'normal'
              }}>
                {step.title}
              </span>
              
              {/* Progress Line */}
              {index < steps.length - 1 && (
                <div style={{
                  flex: 1,
                  height: '2px',
                  backgroundColor: currentStep > step.id ? '#007bff' : '#e0e0e0',
                  marginLeft: '15px'
                }} />
              )}
            </div>
          ))}
        </div>
        
        {/* Progress Percentage */}
        <div style={{
          fontSize: '14px',
          color: '#666',
          textAlign: 'center'
        }}>
          Bước {currentStep} / {steps.length} ({Math.round((currentStep / steps.length) * 100)}%)
        </div>
      </div>

      {/* ===================================================================== */}
      {/* STEP CONTENT - Render current step content */}
      {/* ===================================================================== */}
      <div style={{ minHeight: '400px' }}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>

      {/* ===================================================================== */}
      {/* NAVIGATION BUTTONS - Previous, Next, Submit */}
      {/* ===================================================================== */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '30px',
        padding: '20px 0'
      }}>
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          style={{
            padding: '12px 24px',
            backgroundColor: currentStep === 1 ? '#f8f9fa' : '#6c757d',
            color: currentStep === 1 ? '#ccc' : 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          ← Quay lại
        </button>

        {/* Next/Submit Button */}
        <button
          onClick={currentStep === 4 ? handleSubmit : handleNext}
          disabled={isSubmitting}
          style={{
            padding: '12px 24px',
            backgroundColor: isSubmitting ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          {isSubmitting 
            ? 'Đang xử lý...' 
            : currentStep === 4 
              ? 'Hoàn tất đăng ký' 
              : 'Tiếp theo →'
          }
        </button>
      </div>
    </div>
  );
  // =============================================================================
  // KẾT THÚC COMPONENT - Key Learning Points:
  // =============================================================================
  // 1. COMPLEX STATE: Object state với nhiều nested properties
  // 2. STEP NAVIGATION: State-driven UI với conditional rendering
  // 3. FORM VALIDATION: Multi-step validation với error handling
  // 4. INPUT HANDLERS: Generic handlers cho different input types
  // 5. PROGRESS TRACKING: Visual feedback cho user experience
  // 6. ASYNC OPERATIONS: Form submission với loading states
  // =============================================================================
}

export default MultiStepForm;