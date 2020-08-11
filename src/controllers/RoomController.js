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

const getVideoUrlByRoom = (req, res) => {
  const { id } = req.query;

  Room.findById(id)
    .then((room) => {
      const videoUrl = generateVideoURL(room);
      res.status(200).send(videoUrl);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const generateVideoURL = ({ actualVideoId, lastPlayDate }) => {
  const videoTime = Math.round((new Date().getTime() - lastPlayDate) / 1000);

  if (actualVideoId !== '' && lastPlayDate !== '') {
    return {
      url: `https://www.youtube.com/embed/${actualVideoId}?controls=0&rel=0&cc_load_policy=0&showinfo=0&start=${videoTime}`,
    };
  } else {
    return {
      url: '',
    };
  }
};

module.exports = {
  show,
  update,
  getVideoUrlByRoom,
};
