// Socket.IO Event Handlers
export const chatHandler = (io, socket) => {
    socket.on('join-room', (data) => {
        socket.join(data.room);
        socket.to(data.room).emit('user-joined', {
            userId: socket.id,
            message: 'User joined the room'
        });
    });

    socket.on('send-message', (data) => {
        socket.to(data.room).emit('receive-message', data);
    });

    socket.on('leave-room', (data) => {
        socket.leave(data.room);
        socket.to(data.room).emit('user-left', {
            userId: socket.id,
            message: 'User left the room'
        });
    });
};

export const notificationHandler = (io, socket) => {
    socket.on('send-notification', (data) => {
        io.to(data.userId).emit('notification', data);
    });
};
