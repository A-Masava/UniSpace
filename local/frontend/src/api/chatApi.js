/**
 * Chat API
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const chatApi = {
  sendMessage: async (conversationId, message) => {
    const response = await fetch(`${API_BASE_URL}/chat/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ conversationId, message })
    });
    return response.json();
  },

  getConversations: async () => {
    const response = await fetch(`${API_BASE_URL}/chat/conversations`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  },

  getMessages: async (conversationId) => {
    const response = await fetch(`${API_BASE_URL}/chat/messages/${conversationId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  }
};
