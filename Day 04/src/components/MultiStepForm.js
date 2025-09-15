import React, { useState } from 'react';

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    
    // Step 2: Address
    address: '',
    city: '',
    district: '',
    ward: '',
    zipCode: '',
    
    // Step 3: Preferences
    interests: [],
    newsletter: false,
    notifications: true,
    preferredContact: 'email'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Validation functions
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
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
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

    return newErrors;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (formData.interests.length === 0) {
      newErrors.interests = 'Vui lòng chọn ít nhất một sở thích';
    }

    return newErrors;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  // Navigation
  const nextStep = () => {
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

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Đăng ký thành công! 🎉');
    setIsSubmitting(false);
    
    // Reset form
    setCurrentStep(1);
    setFormData({
      fullName: '', email: '', phone: '', birthDate: '',
      address: '', city: '', district: '', ward: '', zipCode: '',
      interests: [], newsletter: false, notifications: true, preferredContact: 'email'
    });
  };

  const renderProgressBar = () => (
    <div style={{ marginBottom: '30px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
      }}>
        {steps.map((step, index) => (
          <div
            key={step.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: currentStep >= step.id ? '#007bff' : '#e9ecef',
              color: currentStep >= step.id ? 'white' : '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              {currentStep > step.id ? '✓' : step.icon}
            </div>
            <span style={{
              fontSize: '12px',
              textAlign: 'center',
              color: currentStep >= step.id ? '#007bff' : '#666'
            }}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
      
      <div style={{
        height: '4px',
        backgroundColor: '#e9ecef',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          backgroundColor: '#007bff',
          width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>👤 Thông tin cá nhân</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
          Họ và tên *
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: errors.fullName ? '2px solid #dc3545' : '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '16px'
          }}
          placeholder="Nhập họ và tên của bạn"
        />
        {errors.fullName && (
          <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.fullName}</span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: errors.email ? '2px solid #dc3545' : '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            placeholder="email@example.com"
          />
          {errors.email && (
            <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.email}</span>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Số điện thoại *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: errors.phone ? '2px solid #dc3545' : '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            placeholder="0123456789"
          />
          {errors.phone && (
            <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.phone}</span>
          )}
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
          Ngày sinh *
        </label>
        <input
          type="date"
          value={formData.birthDate}
          onChange={(e) => handleInputChange('birthDate', e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: errors.birthDate ? '2px solid #dc3545' : '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '16px'
          }}
        />
        {errors.birthDate && (
          <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.birthDate}</span>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>📍 Địa chỉ liên hệ</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
          Địa chỉ *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: errors.address ? '2px solid #dc3545' : '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '16px'
          }}
          placeholder="Số nhà, tên đường"
        />
        {errors.address && (
          <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.address}</span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Thành phố *
          </label>
          <select
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: errors.city ? '2px solid #dc3545' : '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          >
            <option value="">Chọn thành phố</option>
            <option value="hanoi">Hà Nội</option>
            <option value="hcm">TP. Hồ Chí Minh</option>
            <option value="danang">Đà Nẵng</option>
            <option value="haiphong">Hải Phòng</option>
          </select>
          {errors.city && (
            <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.city}</span>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Quận/Huyện *
          </label>
          <select
            value={formData.district}
            onChange={(e) => handleInputChange('district', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: errors.district ? '2px solid #dc3545' : '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          >
            <option value="">Chọn quận/huyện</option>
            <option value="ba-dinh">Ba Đình</option>
            <option value="hoan-kiem">Hoàn Kiếm</option>
            <option value="dong-da">Đống Đa</option>
            <option value="hai-ba-trung">Hai Bà Trưng</option>
          </select>
          {errors.district && (
            <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.district}</span>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Phường/Xã
          </label>
          <input
            type="text"
            value={formData.ward}
            onChange={(e) => handleInputChange('ward', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            placeholder="Phường/Xã"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Mã bưu điện
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
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

  const renderStep3 = () => (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>⚙️ Sở thích và cài đặt</h2>
      
      <div style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
          Sở thích của bạn * (chọn ít nhất 1)
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '10px'
        }}>
          {interestOptions.map(interest => (
            <label
              key={interest}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                border: formData.interests.includes(interest) 
                  ? '2px solid #007bff' 
                  : '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: formData.interests.includes(interest) 
                  ? '#e3f2fd' 
                  : 'white'
              }}
            >
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestToggle(interest)}
                style={{ marginRight: '8px' }}
              />
              {interest}
            </label>
          ))}
        </div>
        {errors.interests && (
          <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.interests}</span>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
          Phương thức liên hệ ưa thích
        </label>
        <div style={{ display: 'flex', gap: '15px' }}>
          {['email', 'phone', 'sms'].map(method => (
            <label key={method} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="preferredContact"
                value={method}
                checked={formData.preferredContact === method}
                onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                style={{ marginRight: '8px' }}
              />
              {method === 'email' ? 'Email' : method === 'phone' ? 'Điện thoại' : 'SMS'}
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => handleInputChange('newsletter', e.target.checked)}
            style={{ marginRight: '10px' }}
          />
          Đăng ký nhận bản tin qua email
        </label>

        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={formData.notifications}
            onChange={(e) => handleInputChange('notifications', e.target.checked)}
            style={{ marginRight: '10px' }}
          />
          Nhận thông báo về các cập nhật mới
        </label>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>✅ Xác nhận thông tin</h2>
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#007bff' }}>Thông tin cá nhân</h3>
        <p><strong>Họ tên:</strong> {formData.fullName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Điện thoại:</strong> {formData.phone}</p>
        <p><strong>Ngày sinh:</strong> {new Date(formData.birthDate).toLocaleDateString('vi-VN')}</p>
      </div>

      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#007bff' }}>Địa chỉ</h3>
        <p><strong>Địa chỉ:</strong> {formData.address}</p>
        <p><strong>Thành phố:</strong> {formData.city}</p>
        <p><strong>Quận/Huyện:</strong> {formData.district}</p>
        {formData.ward && <p><strong>Phường/Xã:</strong> {formData.ward}</p>}
        {formData.zipCode && <p><strong>Mã bưu điện:</strong> {formData.zipCode}</p>}
      </div>

      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#007bff' }}>Sở thích & Cài đặt</h3>
        <p><strong>Sở thích:</strong> {formData.interests.join(', ')}</p>
        <p><strong>Liên hệ qua:</strong> {
          formData.preferredContact === 'email' ? 'Email' :
          formData.preferredContact === 'phone' ? 'Điện thoại' : 'SMS'
        }</p>
        <p><strong>Nhận bản tin:</strong> {formData.newsletter ? 'Có' : 'Không'}</p>
        <p><strong>Nhận thông báo:</strong> {formData.notifications ? 'Có' : 'Không'}</p>
      </div>
    </div>
  );

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        padding: '30px'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '30px',
          fontSize: '28px'
        }}>
          📝 Form đăng ký nhiều bước
        </h1>

        {renderProgressBar()}

        <div style={{ minHeight: '400px' }}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #eee'
        }}>
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            style={{
              padding: '12px 24px',
              backgroundColor: currentStep === 1 ? '#e9ecef' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            ← Quay lại
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              style={{
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Tiếp theo →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                padding: '12px 24px',
                backgroundColor: isSubmitting ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {isSubmitting ? (
                <>
                  <span>⏳</span>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <span>🎉</span>
                  Hoàn thành đăng ký
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MultiStepForm;