const axios = require('axios');

const defaultErrorMessage = (err) => `Internal error: ${err}`;

const getVideoListByQuery = (req, res) => {
  const { query } = req.query;

  axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      q: query,
      part: 'snippet',
      type: 'video',
      key: process.env.API_KEY,
    }
  }).then(({ data: { items }}) => {
    res.status(200).send(items);
  }).catch((err) => {
    res.status(500).send(defaultErrorMessage(err));
  });
};

const getVideoById = (req, res) => {
  const { id } = req.query;

  axios.get('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      id,
      part: 'snippet',
      key: process.env.API_KEY,
    }
  }).then(({ data: { items: [item, ] }}) => {
    res.status(200).send(item);
  }).catch((err) => {
    res.status(500).send(defaultErrorMessage(err));
  });
};

module.exports = {
  getVideoListByQuery,
  getVideoById,
};
