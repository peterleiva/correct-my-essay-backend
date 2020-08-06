/**
 * @fileoverview User management controller
 */

import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User, UserDocument } from './user';

/**
 * Accept only some params
 *
 * @param {express.Request} req
 */
// function sanitizer(req: Request): void {

// }


/**
 * Returns all users
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function index(req: Request, res: Response): Promise<void> {
	try {
		res.json(await User.find());
	} catch (error) {
		res.status(500).json(error);
	}
}

/**
 * Creates a user
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function create(req: Request, res: Response): Promise<void> {
	try {
		// verificar a existencia
		const user = await User.create(req.body);
		res.json(user);
	} catch (error) {
		res.status(404).json(error);
	}
}
