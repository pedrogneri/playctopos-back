const express = require('express');
const router = express.Router();
const RoomController = require('controllers/RoomController');

router.put('/actualVideo', RoomController.updateActualVideo);
router.put('/playlist', RoomController.updatePlaylist);

router.get('/getVideoUrlByRoom', RoomController.getVideoUrlByRoom);
router.get('/getRoomByName', RoomController.getRoomByName);

module.exports = router;
