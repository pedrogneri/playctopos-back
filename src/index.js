const express = require('express');
const cors = require('cors')

const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(cors({ origin: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use('/', (req, res) => {
  res.send({ message: "bom dia" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Running');
});
