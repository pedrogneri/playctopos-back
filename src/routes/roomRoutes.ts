import { Router } from 'express';
// import {
//   getRoomByName,
//   getVideoUrlByRoom,
//   updateActualVideo,
//   updatePlaylist,
// } from '../controllers/RoomController';

const router = Router();

// router.put('/actualVideo', updateActualVideo);
// router.put('/playlist', updatePlaylist);

// router.get('/getVideoUrlByRoom', getVideoUrlByRoom);
// router.get('/getRoomByName', getRoomByName);

// eslint-disable-next-line @typescript-eslint/no-empty-function
router.get('/getRoomByName', () => {});

export default router;
