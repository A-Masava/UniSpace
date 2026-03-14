// Shared Validation Functions
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
    return password && password.length >= 6;
};

export const validateStudentId = (studentId) => {
    return /^\d+$/.test(studentId);
};

export const validateClassCode = (code) => {
    return /^[A-Z0-9\-]+$/.test(code);
};

export const validateIdRange = (minId, maxId) => {
    return !isNaN(minId) && !isNaN(maxId) && minId <= maxId;
};
