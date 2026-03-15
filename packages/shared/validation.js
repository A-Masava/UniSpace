/**
 * Shared Validation
 */

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateClassCode = (code) => {
  return code && code.length === 9 && /^[A-Z0-9]+$/.test(code);
};

const validateClassroom = (classroom) => {
  return {
    name: classroom.name && typeof classroom.name === 'string',
    description: classroom.description && typeof classroom.description === 'string',
    subject: classroom.subject && typeof classroom.subject === 'string'
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateClassCode,
  validateClassroom
};
