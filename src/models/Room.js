const mongoose = require('mongoose');

const Room = mongoose.model('Room', {
  name: String,
  lastPlayDate: String,
  actualVideo: {
    id: String,
    title: String,
    channel: String,
    thumbnail: String,
    duration: String,
    addedBy: String,
  },
  playlist: [
    {
      id: String,
      title: String,
      channel: String,
      thumbnail: String,
      duration: String,
      addedBy: String,
    },
  ],
});

module.exports = Room;
