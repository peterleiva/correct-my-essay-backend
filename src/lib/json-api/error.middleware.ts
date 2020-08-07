/**
 * @fileoverview Send a Json api Error object
 */

import { Handler, Response, Request, NextFunction } from 'express';
import { Error } from 'mongoose';
import Serializer from './serializer';
import JsonApiError from './error';

/**
 * Send a JsonApiError object generated from mongoose validation error
 *
 * @param {Error.ValidationError} err mongoose error
 * @return {Handler}
 */
export function JsonApiErrorHandler(err: Error.ValidationError): Handler {
	const jsonApiErrors: JsonApiError[] = [];

	for (const errorName of Object.getOwnPropertyNames(err.errors)) {
		const error = err.errors[errorName];
		const jsonApiError = new JsonApiError(error.message);

		jsonApiError.status = '404';
		jsonApiError.title = `Validation error in ${error.path}`;
		jsonApiError.detail = `Invalid value for ${error.path} ` +
			(error.value ? `with value ${error.value}` : '') +
			'. Please read documentation for more detail';

		console.log(error);

		jsonApiErrors.push(jsonApiError);
	}

	/**
	 * Middleware returns the json api errors
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @return {Promise<void>}
	 */
	return async function(req: Request, res: Response,
		next?: NextFunction): Promise<void> {
		res.status(404).send(Serializer.serializeError(jsonApiErrors));
		return;
	};
}
