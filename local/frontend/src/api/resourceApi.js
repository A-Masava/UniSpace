/**
 * Resource API
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const resourceApi = {
  uploadResource: async (classId, formData) => {
    const response = await fetch(`${API_BASE_URL}/resources`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData
    });
    return response.json();
  },

  getClassResources: async (classId) => {
    const response = await fetch(`${API_BASE_URL}/resources/${classId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  },

  deleteResource: async (resourceId) => {
    const response = await fetch(`${API_BASE_URL}/resources/${resourceId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  }
};
