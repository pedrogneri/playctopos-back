const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

require('app-module-path/register');
require('app-module-path').addPath(__dirname + '/src');

const dotenv = require('dotenv');

dotenv.config();
const SearchRoutes = require('routes/Search');
const RoomRoutes = require('routes/Room');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

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
app.use('/', RoomRoutes);

io.on('connection', (socket) => {
  console.log('[IO] New Connection');

  socket.on('room.join', (roomId) => {
    socket.join(roomId);
  });

  socket.on('video.init', ({ roomId, actualVideoId, lastPlayDate }) => {
    io.to(roomId).emit('video.init', { roomId, actualVideoId, lastPlayDate });
  });

  socket.on('room.message', ({ roomId, message }) => {
    io.to(roomId).emit('room.message', { roomId: roomId, message: message });
  });
});

const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
  console.log('Running');
});
