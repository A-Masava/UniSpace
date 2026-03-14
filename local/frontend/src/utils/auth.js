// Authentication Utility
import { apiService } from '../api/client.js';

export const authUtils = {
    // Get token from localStorage
    getToken: () => localStorage.getItem('token'),

    // Get user from localStorage
    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Save token and user
    saveAuthData: (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },

    // Clear auth data
    clearAuthData: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return localStorage.getItem('token') !== null;
    },

    // Check user role
    hasRole: (role) => {
        const user = authUtils.getUser();
        return user && user.role === role;
    },

    // Redirect to login if not authenticated
    requireAuth: () => {
        if (!authUtils.isAuthenticated()) {
            window.location.href = '/pages/login.html';
        }
    },

    // Redirect to appropriate dashboard based on role
    redirectToDashboard: () => {
        const user = authUtils.getUser();
        if (user?.role === 'teacher') {
            window.location.href = '/pages/teacher-dashboard.html';
        } else {
            window.location.href = '/pages/student-dashboard.html';
        }
    }
};
