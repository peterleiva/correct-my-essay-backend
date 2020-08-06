/**
 * @fileoverview Passport express routes
 */

import { Router } from 'express';
import { authenticate } from 'passport';
import { emitAcessToken } from './authentication.controller';

const router = Router();

router
	.post('/auth', authenticate('local', { session: false }), emitAcessToken);

export default router;