const Room = require('models/Room');

const updateActualVideo = (req, res) => {
  const { id } = req.query;
  const actualVideo = req.body;
  const updatedRoom = { actualVideo };

  Room.findOneAndUpdate({ _id: id }, updatedRoom)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updatePlaylist = (req, res) => {
  const { id } = req.query;
  const playlist = req.body;
  const updatedRoom = { playlist };

  Room.findOneAndUpdate({ _id: id }, updatedRoom)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getRoomByName = (req, res) => {
  const { name } = req.query;

  Room.findOne({ name })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getVideoUrlByRoom = (req, res) => {
  const { id } = req.query;

  Room.findById(id)
    .then(async (room) => {
      let newRoom;
      const nextVideo = room.playlist.length > 0 ? room.playlist[0] : undefined;
      const videoEnded = room.actualVideo.duration && getVideoTime(room.lastPlayDate) >= room.actualVideo.duration;

      if (videoEnded || room.actualVideo.id === '') {
        if (nextVideo) {
          newRoom = await changeToNextSongAndReturnRoom(room);
        } else {
          newRoom = room;
          newRoom.actualVideo = { id: '', thumbnail: '', title: '', channel: '', duration: '' };
        }
      } else {
        newRoom = room;
      }

      const url = generateVideoURL(newRoom);
      res.status(200).send({ room: newRoom, url });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const changeToNextSongAndReturnRoom = async (room) => {
  const now = new Date().getTime();
  const nextVideo = room.playlist[0];
  const newPlaylist = room.playlist;
  newPlaylist.shift();

  const updatedRoom = {
    playlist: newPlaylist,
    actualVideo: nextVideo,
    duration: '',
    lastPlayDate: now,
  };

  await Room.findOneAndUpdate({ _id: room._id }, updatedRoom);

  return updatedRoom;
};

const generateVideoURL = (room) => {
  const videoTime = getVideoTime(room.lastPlayDate);
  const params = `controls=0&rel=0&cc_load_policy=0&showinfo=0&start=${videoTime}`;

  if (room.actualVideo.id !== '' && room.lastPlayDate !== '') {
    return `https://www.youtube.com/embed/${room.actualVideo.id}?${params}`;
  } else {
    return '';
  }
};

const getVideoTime = (lastPlayDate) => Math.round((new Date().getTime() - lastPlayDate) / 1000);

module.exports = {
  updateActualVideo,
  updatePlaylist,
  getVideoUrlByRoom,
  getRoomByName,
};
