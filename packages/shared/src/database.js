// Database Configuration
export const DB_CONFIG = {
    development: {
        uri: 'mongodb://localhost:27017/unispace_dev',
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    test: {
        uri: 'mongodb://localhost:27017/unispace_test',
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    production: {
        uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};

// MongoDB Collection Names
export const COLLECTIONS = {
    USERS: 'users',
    STUDENTS: 'students',
    TEACHERS: 'teachers',
    CLASSROOMS: 'classrooms',
    MESSAGES: 'messages',
    RESOURCES: 'resources',
    ENROLLMENTS: 'enrollments',
    NOTIFICATIONS: 'notifications'
};
