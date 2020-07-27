const express = require('express');
const cors = require('cors')

const app = express();
const dotenv = require('dotenv');

dotenv.config();
const SearchRoutes = require('./routes/Search');

app.use(cors({ origin: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use('/', SearchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Running');
});
