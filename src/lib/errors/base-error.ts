/**
 * @file Base error class
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * Base class for Node errors
 */
export default class BaseError extends Error {
	protected _id: string;
	protected _timestamp: number;

	/**
	 * Creates a BaseError object with stack trace, id and timestamp of creation
	 * @param {string} message
	 */
	constructor(message?: string) {
		super(message);
		Error.captureStackTrace(this, this.constructor);

		this.name = this.constructor.name;
		this._id = uuidv4();
		this._timestamp = Date.now();
	}

	/**
	 * Get uuid v4
	 */
	get id(): string {
		return this._id;
	}

	/**
	 * Get timestamp UNIX epoch
	 */
	get timestamp(): number {
		return this._timestamp;
	}

	/**
	 * Get timestamp ISO date representatin
	 */
	get dateISOString(): string {
		return new Date(this._timestamp).toISOString();
	}
}
