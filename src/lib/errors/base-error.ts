/**
 * @file Base error class
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * Base class for Node errors
 */
export default class BaseError extends Error {
	protected id: string;
	protected timestamp: number;

	/**
	 * Creates a BaseError object with stack trace, id and timestamp of creation
	 * @param {string} message
	 */
	constructor(message?: string) {
		super(message);
		Error.captureStackTrace(this, this.constructor);

		this.name = this.constructor.name;
		this.id = uuidv4();
		this.timestamp = Date.now();

		this.message = `${this.id}: ${new Date(this.timestamp).toISOString()}\n` +
			(this.message || '');
	}
}
