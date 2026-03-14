// Shared Constants
export const ROLES = {
    STUDENT: 'student',
    TEACHER: 'teacher',
    ADMIN: 'admin'
};

export const CLASS_STATUS = {
    ACTIVE: 'active',
    ARCHIVED: 'archived',
    DRAFT: 'draft'
};

export const ENROLLMENT_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ENROLLED: 'enrolled'
};

export const SOCKET_EVENTS = {
    // Chat Events
    JOIN_ROOM: 'join-room',
    SEND_MESSAGE: 'send-message',
    RECEIVE_MESSAGE: 'receive-message',
    LEAVE_ROOM: 'leave-room',
    
    // Notification Events
    SEND_NOTIFICATION: 'send-notification',
    RECEIVE_NOTIFICATION: 'receive-notification',
    
    // User Events
    USER_ONLINE: 'user-online',
    USER_OFFLINE: 'user-offline',
    
    // Class Events
    CLASS_CREATED: 'class-created',
    CLASS_UPDATED: 'class-updated',
    CLASS_DELETED: 'class-deleted'
};

export const API_ENDPOINTS = {
    // Auth
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    
    // Users
    GET_PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    
    // Classrooms
    CREATE_CLASS: '/api/classrooms',
    GET_CLASSES: '/api/classrooms',
    GET_CLASS: '/api/classrooms/:id',
    UPDATE_CLASS: '/api/classrooms/:id',
    DELETE_CLASS: '/api/classrooms/:id',
    
    // Enrollment
    ENROLL_CLASS: '/api/classrooms/:id/enroll',
    APPROVE_ENROLLMENT: '/api/classrooms/:id/approve/:studentId',
    REJECT_ENROLLMENT: '/api/classrooms/:id/reject/:studentId'
};
