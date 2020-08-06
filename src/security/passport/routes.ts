/**
 * @fileoverview Passport express routes
 */

import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.json({ user: req.user });
});

export default router;
