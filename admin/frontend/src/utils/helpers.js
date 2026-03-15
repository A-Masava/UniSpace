/**
 * Admin Frontend Helper Functions
 */

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const truncateText = (text, length = 50) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

export const getStoredToken = () => {
  return localStorage.getItem('adminToken');
};

export const setStoredToken = (token) => {
  localStorage.setItem('adminToken', token);
};

export const clearStoredToken = () => {
  localStorage.removeItem('adminToken');
};
