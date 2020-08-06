/**
 * @fileoverview Authorization process
 */

import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserDocument } from '../../user';

/**
 * Process to take when the authorization process is runned by express
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
export function emitAcessToken(req: Request, res: Response): void {
	const user = req.user as UserDocument;

	jwt.sign({
		iss: user._id,
		iat: Date.now(),
		exp: Date.now() + 60 * 60,
	}, process.env.JWT_SECRET, (error: Error, token: string) => {
		if (error) {
			res.sendStatus(500).json(error);
		}

		res.json({ 'access-token': token });
	});
}
