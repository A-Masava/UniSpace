/**
 * Helper Functions
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

export const getStoredToken = () => {
  return localStorage.getItem('token');
};

export const setStoredToken = (token) => {
  localStorage.setItem('token', token);
};

export const clearStoredToken = () => {
  localStorage.removeItem('token');
};

export const getUserRole = () => {
  return localStorage.getItem('userRole');
};
