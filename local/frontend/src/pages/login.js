// Login Page Logic
import { apiService } from '../api/client.js';
import { authUtils } from '../utils/auth.js';
import { domUtils } from '../utils/dom.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('loginMessage');

    try {
        messageElement.textContent = 'Logging in...';
        messageElement.className = 'message info';
        messageElement.style.display = 'block';

        const response = await apiService.login(email, password);

        if (response.error) {
            throw new Error(response.error);
        }

        // Save auth data
        authUtils.saveAuthData(response.token, response.user);

        // Show success message
        domUtils.showMessage('loginMessage', 'Login successful! Redirecting...', 'success');

        // Redirect to dashboard
        setTimeout(() => {
            authUtils.redirectToDashboard();
        }, 1000);

    } catch (error) {
        console.error('Login error:', error);
        domUtils.showMessage('loginMessage', error.message || 'Login failed. Please try again.', 'error');
    }
}
