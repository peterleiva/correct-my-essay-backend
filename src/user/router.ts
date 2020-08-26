/**
 * @file Defines all users routes with associated controller
 */

import { Router } from 'express';
import { create, index, get, destroy } from './controller';
import objectIdChecker from '../lib/middlewares/object-id-checker';
import wrap from '../lib/async-wrap';

const router = Router();

export const endpoint = '/users/';

router.param('id', objectIdChecker('id'));

router.route(endpoint)
	.get(wrap(index))
	.post(wrap(create));

router.route(endpoint + ':id')
	.get(wrap(get))
	.delete(wrap(destroy));

export default router;
