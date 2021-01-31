const axios = require('axios');

const getVideoListByQuery = (req, res) => {
  const { query } = req.query;

  axios
    .get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: 20,
        key: process.env.API_KEY,
      },
    })
    .then(({ data: { items } }) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getVideoById = (req, res) => {
  const { id } = req.query;

  axios
    .get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        id,
        part: 'snippet',
        key: process.env.API_KEY,
      },
    })
    .then(
      ({
        data: {
          items: [item],
        },
      }) => {
        res.status(200).send(item);
      },
    )
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  getVideoListByQuery,
  getVideoById,
};
