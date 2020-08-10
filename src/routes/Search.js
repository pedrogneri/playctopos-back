const express = require('express');

const router = express.Router();
const SearchController = require('controllers/SearchController');

router.get('/searchByQuery', SearchController.getVideoListByQuery);
router.get('/searchById', SearchController.getVideoById);

module.exports = router;
