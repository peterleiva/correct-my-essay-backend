/**
 * @fileoverview Jsonapi error object
 */

import { Links, ErrorSource, MetaObject } from '.';

/**
 * Json api error object used by json-api-serializer for generate errors
 * according to json-api standard
 */
export default class JsonApiError extends Error {
	/**
	 * Json api required fields
	 *
	 * @see https://jsonapi.org/format/#error-objects
	 * @param {String} message
	 * @param {string} status
	 * @param {Number} id
	 * @param {string} title
	 * @param {string} code
	 * @param {string} detail
	 * @param {object} links
	 * @param {ErrorSource} source
	 * @param {MetaObject} meta
	 */
	constructor(message: string, public status = '500', public id?: number,
		public title?: string, public code?: string, public detail?: string,
		public links?: Links, public source?: ErrorSource,
		public meta?: MetaObject) {
		super(message);

		this.meta = {
			createdAt: new Date(),
		};
	}
}
