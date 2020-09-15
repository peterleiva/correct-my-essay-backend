/**
 * @file Throw a mongoose duplicated error transformed
 */

import { Request, Response, NextFunction } from 'express';
import AlreadyExistsError from './already-exists-error';

/**
 * Transform a duplicated record by mongoose into a AlreadyExistsError
 *
 * @param {Error} error error object provided in express error handlers
 * @param {express.Request} req express request
 * @param {express.Response} res express response
 * @param {express.NextFunction} next express next function
 * @return {void}
 */
export default function duplicatedHandler(
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
): void {
	if (error?.code == 11000) {
		const property = Object.keys(error.keyValue)[0];

		return next(new AlreadyExistsError(property, error.keyValue[property]));
	}
	next(error);
}
