const mongoose = require('mongoose');

const Room = mongoose.model('Room', {
  lastPlayDate: String,
  actualVideo: {
    id: String,
    title: String,
    channel: String,
    thumbnail: String,
  },
});

module.exports = Room;
