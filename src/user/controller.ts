/**
 * @fileoverview User management controller
 */

import { Request, Response } from 'express';
import { User } from './user';
import Serializer from './serializer';

/**
 * Accept only some params
 *
 * @param {express.Request} req
 */
// function sanitizer(req: Request): void {

// }

/**
 * Gets a single user
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function get(req: Request, res: Response): Promise<void> {
	const user = await User.findById(req.params.id).exec();
	res.json(await Serializer.serialize('users', user));
}

/**
 * Returns all users
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function index(req: Request, res: Response): Promise<void> {
	res.json(await Serializer.serialize('users', await User.find()));
}

/**
 * Creates a user
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function create(req: Request, res: Response): Promise<void> {
	const user = await User.create(req.body);
	res.json(await Serializer.serialize('users', user));
}
