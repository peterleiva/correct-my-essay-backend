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

	jwt.sign({}, process.env.JWT_SECRET, {
		expiresIn: '10h',
		subject: '' + user._id,
	}, (error: Error, token: string) => {
		if (error) {
			res.status(500).json(error);
			return;
		}

		res.json({ 'access-token': token });
	});
}
