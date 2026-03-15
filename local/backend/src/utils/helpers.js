/**
 * Backend Helper Functions
 */

export const generateClassCode = () => {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatDateForDB = (date) => {
  return new Date(date).toISOString();
};
