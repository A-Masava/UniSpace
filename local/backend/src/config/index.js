import dotenv from 'dotenv';

dotenv.config();

export default {
    server: {
        port: process.env.SERVER_PORT || 5000,
        env: process.env.NODE_ENV || 'development',
        corsOrigin: process.env.CLIENT_URL || 'http://localhost:3000'
    },
    database: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/unispace',
        user: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASSWORD
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'default_secret_key',
        expire: process.env.JWT_EXPIRE || '7d',
        refreshExpire: process.env.REFRESH_TOKEN_EXPIRE || '30d'
    },
    socket: {
        port: process.env.SOCKET_IO_PORT || 5000,
        cors: process.env.SOCKET_IO_CORS === 'true'
    },
    upload: {
        maxSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760,
        path: process.env.UPLOAD_PATH || 'apps/server/uploads'
    }
};
