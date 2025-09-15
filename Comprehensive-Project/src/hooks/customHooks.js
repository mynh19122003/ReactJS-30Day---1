import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLocalStorage
 * 
 * Concepts từ Day 1-7:
 * - Custom Hooks (Advanced): Tái sử dụng logic
 * - State Management (Day 4): Quản lý state với localStorage persistence
 * - useEffect Hook: Sync với localStorage
 * - Event Handling (Day 5): Handle storage events
 */

export const useLocalStorage = (key, initialValue) => {
  /**
   * State Management (Day 4): State với localStorage
   */
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Lấy giá trị từ localStorage
      const item = window.localStorage.getItem(key);
      // Parse JSON hoặc return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Function để set value và sync với localStorage
   */
  const setValue = (value) => {
    try {
      // Cho phép value là function như useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save to state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  /**
   * useEffect Hook: Listen for changes từ other tabs/windows
   */
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage key "${key}":`, error);
        }
      }
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
};

/**
 * Custom Hook: useDebounce
 * 
 * Concepts từ Day 1-7:
 * - Custom Hooks (Advanced): Debounce logic
 * - useEffect Hook: Cleanup và timing
 * - Performance Optimization: Prevent excessive API calls
 */

export const useDebounce = (value, delay) => {
  /**
   * State Management (Day 4): Debounced value state
   */
  const [debouncedValue, setDebouncedValue] = useState(value);

  /**
   * useEffect Hook: Debounce logic với cleanup
   */
  useEffect(() => {
    // Set debounced value sau delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function để clear timeout nếu value thay đổi
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Chỉ re-run nếu value hoặc delay thay đổi

  return debouncedValue;
};

/**
 * Custom Hook: useToggle
 * 
 * Concepts từ Day 1-7:
 * - Custom Hooks (Advanced): Boolean state logic
 * - State Management (Day 4): Toggle state pattern
 * - Event Handling (Day 5): Toggle functions
 */

export const useToggle = (initialValue = false) => {
  /**
   * State Management (Day 4): Boolean state
   */
  const [value, setValue] = useState(initialValue);

  /**
   * Toggle function - Event Handling (Day 5)
   */
  const toggle = () => setValue(prev => !prev);
  
  /**
   * Set to true
   */
  const setTrue = () => setValue(true);
  
  /**
   * Set to false
   */
  const setFalse = () => setValue(false);

  return [value, { toggle, setTrue, setFalse, setValue }];
};

/**
 * Custom Hook: useApi
 * 
 * Concepts từ Day 1-7:
 * - Custom Hooks (Advanced): API call logic
 * - State Management (Day 4): Loading, error, data states
 * - useEffect Hook: API calls với dependency array
 * - Error Handling: Try-catch patterns
 */

export const useApi = (apiFunction, dependencies = []) => {
  /**
   * State Management (Day 4): API states
   */
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Function để call API
   */
  const executeApi = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunction(...args);
      setData(result);
      
      return result;
    } catch (err) {
      setError(err);
      console.error('API Error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * useEffect Hook: Auto execute khi dependencies thay đổi
   */
  useEffect(() => {
    if (dependencies.length > 0) {
      executeApi();
    }
  }, dependencies);

  /**
   * Reset function
   */
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    execute: executeApi,
    reset
  };
};

/**
 * Custom Hook: useForm
 * 
 * Concepts từ Day 1-7:
 * - Custom Hooks (Advanced): Form handling logic
 * - State Management (Day 4): Form state và validation
 * - Event Handling (Day 5): Input change handlers
 * - Forms (Advanced): Validation patterns
 */

export const useForm = (initialValues = {}, validationRules = {}) => {
  /**
   * State Management (Day 4): Form states
   */
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Event Handling (Day 5): Handle input changes
   */
  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error khi user type
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Event Handling (Day 5): Handle field blur
   */
  const handleBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field khi blur
    validateField(name, values[name]);
  };

  /**
   * Validation function
   */
  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return true;

    let error = '';

    // Required validation
    if (rule.required && (!value || value.toString().trim() === '')) {
      error = rule.requiredMessage || `${name} is required`;
    }
    
    // Min length validation
    else if (rule.minLength && value.toString().length < rule.minLength) {
      error = rule.minLengthMessage || `${name} must be at least ${rule.minLength} characters`;
    }
    
    // Max length validation
    else if (rule.maxLength && value.toString().length > rule.maxLength) {
      error = rule.maxLengthMessage || `${name} must be no more than ${rule.maxLength} characters`;
    }
    
    // Pattern validation
    else if (rule.pattern && !rule.pattern.test(value)) {
      error = rule.patternMessage || `${name} format is invalid`;
    }
    
    // Custom validation
    else if (rule.custom && typeof rule.custom === 'function') {
      const customError = rule.custom(value, values);
      if (customError) {
        error = customError;
      }
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return !error;
  };

  /**
   * Validate toàn bộ form
   */
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    Object.keys(validationRules).forEach(fieldName => {
      const fieldValue = values[fieldName];
      const fieldValid = validateField(fieldName, fieldValue);
      
      if (!fieldValid) {
        isValid = false;
      }
    });

    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    return isValid;
  };

  /**
   * Reset form
   */
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  /**
   * Set field value programmatically
   */
  const setFieldValue = (name, value) => {
    handleChange(name, value);
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFieldValue,
    isValid: Object.keys(errors).length === 0
  };
};

/**
 * Custom Hook: useWindowSize
 * 
 * Concepts từ Day 1-7:
 * - Custom Hooks (Advanced): Window resize logic
 * - useEffect Hook: Event listeners và cleanup
 * - Responsive Design: Detect screen size changes
 */

export const useWindowSize = () => {
  /**
   * State Management (Day 4): Window size state
   */
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  /**
   * useEffect Hook: Listen for window resize
   */
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

/**
 * Custom Hook: usePrevious
 * 
 * Concepts từ Day 1-7:
 * - Custom Hooks (Advanced): Previous value tracking
 * - useEffect Hook: Ref để lưu previous value
 * - useRef Hook: Persistent value across renders
 */

export const usePrevious = (value) => {
  const ref = React.useRef();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
};