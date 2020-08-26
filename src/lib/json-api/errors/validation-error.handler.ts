/**
 * @file Json api errors middlewares
 */

import { Response, Request, NextFunction } from 'express';
import { Error } from 'mongoose';
import Serializer from '../serializer';
import JsonApiError from './error.model';

/**
 * Handler for record validation error
 *
 * Validation error is thwroed by mongoose module when there's an error on
 * saving the record. This handler uses validationHandler function to transform
 * each validity error to an correspondind in JsonApiError, sending back a 404
 * status
 *
 * @param {Error} error express error
 * @param {express.Request} req express request
 * @param {express.Response} res express response
 * @param {express.NextFunction} next express next function
 * @return {Promise<void>}
 */
export async function validationErrorHandler(error: Error, req: Request,
	res: Response, next?: NextFunction): Promise<void> {
	try {
		if (error instanceof Error.ValidationError) {
			const jsonApiErrors = validationErrorTransform(error);
			res.status(404).send(await Serializer.serializeError(jsonApiErrors));
		} else {
			next(error);
		}
	} catch (error) {
		next(error);
	}
}

export default validationErrorHandler;

/**
 * Transform validation error to JsonApiError
 *
 * Validation error is generated by mongoose whever trying to save a record. It
 * contains a list of ValidatorError. This handler transform error item to
 * JsonApiError object
 *
 * @param {Error.ValidationError} err mongoose error
 * @return {JsonApiError[]} transformed JsonApiError
 */
export function validationErrorTransform(err: Error.ValidationError)
: Array<JsonApiError> {
	const jsonApiErrors: JsonApiError[] = [];

	for (const errorName of Object.getOwnPropertyNames(err.errors)) {
		const error = err.errors[errorName];
		const jsonApiError = new JsonApiError(error.message);

		jsonApiError.status = '404';
		jsonApiError.title = `Validation error in ${error.path}`;
		jsonApiError.detail = `Invalid value for ${error.path} ` +
			(error.value ? `with value ${error.value}` : '') +
			'. Please read documentation for more detail';

		jsonApiErrors.push(jsonApiError);
	}

	return jsonApiErrors;
}
