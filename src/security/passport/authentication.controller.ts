/**
 * @fileoverview Authorization process
 */

import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserDocument } from '../../user';

/**
 * Emit a access token after user authenticated
 *
 * JWT is generated by this emitter, which is called by passport only when the
 * authentication process is successfuly done. Also send a error object for sign
 * jwt error
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
