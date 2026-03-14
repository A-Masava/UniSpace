// Utility Functions
export const utils = {
    generateClassCode: () => {
        return 'CLASS-' + Math.random().toString(36).substring(2, 11).toUpperCase();
    },

    formatDate: (date) => {
        return new Date(date).toLocaleDateString();
    },

    validateEmail: (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
};
