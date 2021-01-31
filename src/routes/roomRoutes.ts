import { Router } from 'express';
import {
  getRoomByName,
  getVideoUrlByRoom,
  updateActualVideo,
  updatePlaylist,
} from 'controllers/roomController';

const router = Router();

router.put('/actualVideo', updateActualVideo);
router.put('/playlist', updatePlaylist);

router.get('/getVideoUrlByRoom', getVideoUrlByRoom);
router.get('/getRoomByName', getRoomByName);

export default router;
