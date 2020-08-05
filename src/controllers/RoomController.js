const Room = require('../models/Room');

const show = (req, res) => {
  const { id } = req.query;

  Room.findById(id).then((room) => {
    res.status(200).send(room);
  }).catch((err) => {
    res.status(500).send(err);
  });
}

const update = (req, res) => {
  const { id } = req.query;
  const room = req.body;

  Room.findOneAndUpdate({ _id: id }, room).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(500).send(err);
  });
};

module.exports = {
  show,
  update,
};
