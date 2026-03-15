/**
 * Classroom API
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const classroomApi = {
  createClass: async (classData) => {
    const response = await fetch(`${API_BASE_URL}/classrooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(classData)
    });
    return response.json();
  },

  getMyClasses: async () => {
    const response = await fetch(`${API_BASE_URL}/classrooms/my-classes`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  },

  joinClass: async (classCode) => {
    const response = await fetch(`${API_BASE_URL}/classrooms/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ classCode })
    });
    return response.json();
  }
};
