/* eslint-disable import/first */
import 'app-module-path/register';
import { addPath } from 'app-module-path';

addPath(`${__dirname}/src`);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import socket from 'socket.io';
import dotenv from 'dotenv';
import SearchRoutes from 'routes/searchRoutes';
import RoomRoutes from 'routes/roomRoutes';
import initSockets from 'controllers/socketController';

const app = express();
const server = http.createServer(app);
const io = socket(server);

dotenv.config();

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
server.listen(PORT, () => {
  console.log('Running');
});
