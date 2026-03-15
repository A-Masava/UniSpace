/**
 * Admin User Management API
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const adminUserApi = {
  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  },

  getUserById: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  },

  updateUser: async (userId, userData) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  deactivateUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/deactivate`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  }
};
