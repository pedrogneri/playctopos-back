const express = require('express');
const router = express.Router();
const RoomController = require('controllers/RoomController');

router.get('/room', RoomController.show);
router.post('/room', RoomController.update);

module.exports = router;
