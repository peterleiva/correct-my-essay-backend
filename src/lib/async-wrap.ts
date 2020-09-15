/**
 * @file Async function wrapper for writting middleware
 */

import { Handler, Request, Response, NextFunction } from 'express';

/**
 * Wraps a express Handler with another Handler exceptions treated
 *
 * The wrapper is inspired by the article present in @see. Only wraps a express
 * handler and returns another handler but with any exception catch by next
 * function. So, it is a good practice to handle all errors
 *
 * @see https://bit.ly/3agOkTq
 *
 * @param {express.Handler} fn
 * @return {express.Handle} fn with exception handled
 */
export default function wrap(fn: Handler): Handler {
	return async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => fn(req, res, next).catch(next);
}
