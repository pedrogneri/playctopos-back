import { Server } from 'socket.io';
import { Message } from 'models/message';

type RoomMessageArgs = {
  roomId: string;
  message: Message;
}

const initSockets = (io: Server) => {
  io.on('connection', (socket) => {
    socket.on('room.join', (roomId: string) => {
      socket.join(roomId);
    });

    socket.on('video.changeState', (roomId: string) => {
      io.to(roomId).emit('video.changeState', roomId);
    });

    socket.on('room.message', ({ roomId, message }: RoomMessageArgs) => {
      io.to(roomId).emit('room.message', { roomId, message });
    });
  });
};

export default initSockets;
