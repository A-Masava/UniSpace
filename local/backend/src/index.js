import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Initialize Express and HTTP Server
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: process.env.SOCKET_IO_CORS === 'true' ? '*' : process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'UniSpace API Server', version: '1.0.0' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Socket.IO Connection
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Example events
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });

    socket.on('message', (data) => {
        console.log('Message received:', data);
        io.emit('message', data);
    });

    socket.on('join-room', (data) => {
        socket.join(data.room);
        console.log(`User joined room: ${data.room}`);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Connect to database and start server
connectDB().then(() => {
    const PORT = process.env.SERVER_PORT || 5000;
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
});

export { app, io };
