import { Router } from 'express';
import { create, index } from './controller';

const router = Router();

/* GET users listing. */
router
	.get('/', index)
	.post('/', create);

export default router;
