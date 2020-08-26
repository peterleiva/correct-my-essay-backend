/**
 * @file Passport express routes
 */

import { Router } from 'express';
import { authenticate } from 'passport';
import { emitAcessToken, bypass } from './authentication.controller';
import wrap from '../../lib/async-wrap';

const router = Router();

router
	.post('/auth',
		authenticate('local', { session: false }), wrap(emitAcessToken))

	.all('*', bypass, authenticate('jwt', { session: false }));

export default router;
