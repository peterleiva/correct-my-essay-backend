/**
 * @fileoverview Defines all users routes with associated controller
 */

import { Router } from 'express';
import { create, index, get, destroy } from './user.controller';
import objectIdChecker from '../lib/middlewares/object-id-checker';

const router = Router();

router
	.param('id', objectIdChecker('id'))
	.get('/:id', get)
	.delete('/:id', destroy)
	.get('/', index)
	.post('/', create);

export default router.use(router);
