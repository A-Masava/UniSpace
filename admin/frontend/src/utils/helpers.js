/**
 * Admin Utilities
 * Helper functions for DOM manipulation and authentication
 */

export const adminUtils = {
  dom: {
    querySelector: (selector) => document.querySelector(selector),
    addEventListener: (selector, event, handler) => { /* implement */ },
  },
  auth: {
    getToken: () => localStorage.getItem('adminToken'),
    setToken: (token) => localStorage.setItem('adminToken', token),
  },
};
