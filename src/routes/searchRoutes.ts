import { Router } from 'express';
import { getVideoById, getVideoListByQuery } from 'controllers/searchController';

const router = Router();

router.get('/searchByQuery', getVideoListByQuery);
router.get('/searchById', getVideoById);

export default router;
