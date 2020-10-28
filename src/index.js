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
const initSockets = require('controllers/SocketController');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/', SearchRoutes);
app.use('/', RoomRoutes);
initSockets(io);

const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
  console.log('Running');
});
