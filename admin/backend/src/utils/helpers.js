/**
 * Admin Utilities
 * Helper functions for admin backend
 */

export const adminHelpers = {
  formatDate: (date) => new Date(date).toLocaleDateString(),
  generateId: () => Math.random().toString(36).substr(2, 9),
  validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
};
