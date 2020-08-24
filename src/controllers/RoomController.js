const Room = require('models/Room');

const show = (req, res) => {
  const { id } = req.query;

  Room.findById(id)
    .then((room) => {
      res.status(200).send(room);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const update = (req, res) => {
  const { id } = req.query;
  const room = req.body;
  const now = new Date().getTime();
  const updatedRoom = { ...room, lastPlayDate: now };

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

      if (room.actualVideo.id === '' && nextVideo) {
        newRoom = await changeToNextSongAndReturnRoom(room);
      } else {
        newRoom = room;
      }

      const url = generateVideoURL(newRoom);
      res.status(200).send({ room: newRoom, url });
    })
    .catch((err) => {
      console.log(err);
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
    actualVideo: {
      id: nextVideo.id,
      title: nextVideo.title,
      channel: nextVideo.channel,
      thumbnail: nextVideo.thumbnail,
    },
    lastPlayDate: now,
  };

  await Room.findOneAndUpdate({ _id: room._id }, updatedRoom);

  return updatedRoom;
};

const generateVideoURL = (room) => {
  const videoTime = Math.round((new Date().getTime() - room.lastPlayDate) / 1000);

  if (room.actualVideo.id !== '' && room.lastPlayDate !== '') {
    return `https://www.youtube.com/embed/${room.actualVideo.id}?controls=0&rel=0&cc_load_policy=0&showinfo=0&start=${videoTime}`;
  } else {
    return '';
  }
};

module.exports = {
  show,
  update,
  getVideoUrlByRoom,
  getRoomByName,
};
