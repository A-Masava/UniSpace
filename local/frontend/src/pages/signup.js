// Signup Page Logic
import { apiService } from '../api/client.js';
import { authUtils } from '../utils/auth.js';
import { domUtils } from '../utils/dom.js';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);

        // Validate password match on blur
        confirmPasswordInput?.addEventListener('blur', () => {
            if (passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.setCustomValidity('Passwords do not match');
            } else {
                confirmPasswordInput.setCustomValidity('');
            }
        });
    }
});

async function handleSignup(event) {
    event.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.querySelector('input[name="role"]:checked')?.value;
    const messageElement = document.getElementById('signupMessage');

    // Validate passwords match
    if (password !== confirmPassword) {
        domUtils.showMessage('signupMessage', 'Passwords do not match.', 'error');
        return;
    }

    try {
        messageElement.textContent = 'Creating account...';
        messageElement.className = 'message info';
        messageElement.style.display = 'block';

        const response = await apiService.register({
            fullname,
            email,
            password,
            role
        });

        if (response.error) {
            throw new Error(response.error);
        }

        // Save auth data
        authUtils.saveAuthData(response.token, response.user);

        // Show success message
        domUtils.showMessage('signupMessage', 'Account created successfully! Redirecting...', 'success');

        // Redirect to dashboard
        setTimeout(() => {
            authUtils.redirectToDashboard();
        }, 1500);

    } catch (error) {
        console.error('Signup error:', error);
        domUtils.showMessage('signupMessage', error.message || 'Signup failed. Please try again.', 'error');
    }
}
