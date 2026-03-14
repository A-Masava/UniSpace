// Socket.IO Connection Manager
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

let socket = null;

export const socketManager = {
    // Initialize socket connection
    connect: (token) => {
        if (socket) return socket;

        socket = io(SOCKET_URL, {
            auth: { token },
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5
        });

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return socket;
    },

    // Disconnect socket
    disconnect: () => {
        if (socket) {
            socket.disconnect();
            socket = null;
        }
    },

    // Get socket instance
    getSocket: () => socket,

    // Emit event
    emit: (event, data) => {
        if (socket) {
            socket.emit(event, data);
        }
    },

    // Listen to event
    on: (event, callback) => {
        if (socket) {
            socket.on(event, callback);
        }
    },

    // Remove listener
    off: (event, callback) => {
        if (socket) {
            socket.off(event, callback);
        }
    }
};
