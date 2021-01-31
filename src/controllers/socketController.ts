import { Server } from 'socket.io'

const initSockets = (io: Server) => {
  io.on('connection', (socket) => {
    socket.on('room.join', (roomId: string) => {
      socket.join(roomId);
    });

    socket.on('video.changeState', (roomId: string) => {
      io.to(roomId).emit('video.changeState', roomId);
    });

    socket.on('room.message', ({ roomId, message }) => {
      io.to(roomId).emit('room.message', { roomId: roomId, message: message });
    });
  });
};

export default initSockets;
