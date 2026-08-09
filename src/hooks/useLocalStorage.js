import { useState, useEffect } from "react";

/**
 * Custom hook generic để đọc/ghi dữ liệu vào localStorage.
 * Tự động sync state ↔ localStorage với error handling.
 *
 * @param {string} key - Key lưu trong localStorage
 * @param {*} initialValue - Giá trị mặc định nếu localStorage chưa có data
 * @returns {[any, Function]} - [storedValue, setStoredValue]
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Lỗi đọc dữ liệu từ localStorage (key: "${key}"):`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Lỗi ghi dữ liệu vào localStorage (key: "${key}"):`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
