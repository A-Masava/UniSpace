// DOM Utility Functions
export const domUtils = {
    // Toggle element visibility
    toggle: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = element.style.display === 'none' ? 'block' : 'none';
        }
    },

    // Show element
    show: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = 'block';
        }
    },

    // Hide element
    hide: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = 'none';
        }
    },

    // Add class
    addClass: (elementId, className) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add(className);
        }
    },

    // Remove class
    removeClass: (elementId, className) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove(className);
        }
    },

    // Toggle class
    toggleClass: (elementId, className) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.toggle(className);
        }
    },

    // Get form data as object
    getFormData: (formId) => {
        const form = document.getElementById(formId);
        if (!form) return null;
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    },

    // Clear form
    clearForm: (formId) => {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
        }
    },

    // Show message
    showMessage: (elementId, message, type = 'info') => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.className = `message ${type}`;
            element.style.display = 'block';
        }
    },

    // Hide message
    hideMessage: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = 'none';
        }
    }
};
