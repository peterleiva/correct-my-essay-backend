/**
 * @fileoverview Passport express routes
 */

import { Router } from 'express';
import { authenticate } from 'passport';
import { emitAcessToken } from './authentication.controller';
import wrap from '../../lib/async-wrap';

const router = Router();

router
	.post('/auth',
		authenticate('local', { session: false }), wrap(emitAcessToken))

	.use(authenticate('jwt', { session: false }));

export default router;
