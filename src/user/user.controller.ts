/**
 * @fileoverview User management controller
 */

import { Request, Response, NextFunction } from 'express';
import { User } from './user';
import Serializer from './serializer';
import { UserDocument } from '.';

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
	const user = await getUserById(req.params.id);
	res.json(await Serializer.serialize('users', user));
}

/**
 * Get user by its id
 *
 * @param {string} id user id
 * @return {Promise<UserDocument>}
 */
export async function getUserById(id: string): Promise<UserDocument> {
	return User.findById(id).exec();
}

/**
 * Get all stored users
 */
export async function getAllUsers(): Promise<UserDocument[]> {
	return User.find().exec();
}

/**
 * Returns all users
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function index(req: Request, res: Response): Promise<void> {
	res.json(await Serializer.serialize('users', await getAllUsers()));
}

/**
 * Creates a valid user. Sending a validation error if happens
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function create(req: Request, res: Response): Promise<void> {
	const user = await User.create(req.body);
	res.json(await Serializer.serialize('users', user));
}

/**
 * Delete user with 204 success status
 *
 * Gets a user by a _id and remove it with a 204 status if it were found. In
 * case the user did not existed send a 404 status error. Also next any errors
 * occurred
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @return {Promise<void>}
 */
export async function destroy(req: Request, res: Response,
	next: NextFunction): Promise<void> {
	try {
		const result = await User.deleteOne({ _id: req.params.id }).exec();

		result.deletedCount === 1 ? res.sendStatus(204) : res.sendStatus(404);
	} catch (error) {
		next(error);
	}
}
