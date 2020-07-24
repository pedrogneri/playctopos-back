const axios = require('axios');

const searchVideoByQuery = (req, res) => {
  const { query } = req.params;

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
    res.status(500).send({ message: `something's wrong: ${err}` });
  });
}

module.exports = {
  searchVideoByQuery
};
