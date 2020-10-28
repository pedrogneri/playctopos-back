const initSockets = (io) => {
  io.on('connection', (socket) => {
    socket.on('room.join', (roomId) => {
      socket.join(roomId);
    });

    socket.on('video.changeState', (roomId) => {
      io.to(roomId).emit('video.changeState', roomId);
    });

    socket.on('room.message', ({ roomId, message }) => {
      io.to(roomId).emit('room.message', { roomId: roomId, message: message });
    });
  });
};

module.exports = initSockets;
