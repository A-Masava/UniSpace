/**
 * Chat Socket
 */

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    socket.on('join_room', (data) => {
      socket.join(data.room);
      console.log(`User ${socket.id} joined room ${data.room}`);
    });

    socket.on('send_message', (data) => {
      io.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
