const express = require('express');
const cors = require('cors')

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const dotenv = require('dotenv');

dotenv.config();
const SearchRoutes = require('./routes/Search');

app.use(cors({ origin: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/', SearchRoutes);

io.on('connection', (socket) => {
  console.log('[IO] New Connection');

  socket.on('room.join', roomId => {
    socket.join(roomId);
  });

  socket.on('video.init', ({roomId, initial}) => {
    io.to(roomId).emit('video.init', {roomId: roomId, initial: initial});
  });

  socket.on('room.message', ({roomId, message}) => {
    io.to(roomId).emit('room.message', {roomId: roomId, message: message});
  });
});

const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
  console.log('Running');
});
