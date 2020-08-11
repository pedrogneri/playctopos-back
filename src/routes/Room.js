const express = require('express');
const router = express.Router();
const RoomController = require('controllers/RoomController');

router.get('/room', RoomController.show);
router.put('/room', RoomController.update);

router.get('/getVideoUrlByRoom', RoomController.getVideoUrlByRoom);

module.exports = router;
