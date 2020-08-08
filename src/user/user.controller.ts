/**
 * @fileoverview User management controller
 */

import { Request, Response, NextFunction } from 'express';
import { User } from './user';
import Serializer from './serializer';
import { JsonApiErrorHandler } from '../lib/json-api/error.middleware';

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
 * Creates a valid user. Sending a validation error if there's any
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function create(req: Request, res: Response,
	next: NextFunction): Promise<void> {
	User.create(req.body)
		.then(async user => {
			try {
				res.json(await Serializer.serialize('users', user));
			} catch (error) {
				return next(error);
			}
		})
		.catch(err => JsonApiErrorHandler(err)(req, res, next));
}
