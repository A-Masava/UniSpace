// API Service - Handle all HTTP requests
const API_URL = 'http://localhost:5000/api';

export const apiService = {
    // Auth endpoints
    register: async (data) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    },

    logout: async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    // User endpoints
    getProfile: async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/users/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    updateProfile: async (data) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/users/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    // Classroom endpoints
    getClassrooms: async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/classrooms`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    createClassroom: async (data) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/classrooms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    joinClass: async (classCode, studentId) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/classrooms/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ classCode, studentId })
        });
        return response.json();
    },

    // Enrollment endpoints
    getEnrollmentRequests: async (classroomId) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/classrooms/${classroomId}/enrollments`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    approveEnrollment: async (classroomId, studentId) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/classrooms/${classroomId}/approve/${studentId}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    // Messages endpoints
    getMessages: async (conversationId) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/messages/${conversationId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    sendMessage: async (data) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    // Resources endpoints
    uploadResource: async (formData) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        return response.json();
    },

    getClassResources: async (classroomId) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/classrooms/${classroomId}/resources`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    }
};
