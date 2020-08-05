const mongoose = require('mongoose');

const Room = mongoose.model('Room', { 
  actualVideoId: String,
  lastPlayDate: String
});

module.exports = Room;
