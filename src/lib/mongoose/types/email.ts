/**
 * @fileoverview Define a mongoose email custom type
 */

import mongoose, { SchemaType, SchemaTypeOpts } from 'mongoose';

/**
 * Mongoose email custom type
 */
class Email extends SchemaType {
	// eslint-disable-next-line max-len
	static validator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

	/**
	 * Email constructor with instance name (email)
	 *
	 * @param {String} key schema type path
	 * @param {any} options schema type options
	 */
	constructor(key: string, options?: SchemaTypeOpts<Email>) {
		options.index = options.index || true;
		options.unique = options.unique || true;
		options.lowercase = options.lowercase || true;
		options.trim = options.trim || true;

		super(key, options, 'email');
	}

	/**
	 * ah some
	 * @throws CastError for no valid value
	 * @see https://mongoosejs.com/docs/customschematypes.html
	 * @param {StringDecoder} email any value
	 * @return {String}
	 */
	cast(email: string) {
		if (!this.validateEmail(email)) {
			throw new Error(`Email ${email} is not valid string`);
		}

		return email;
	}

	/**
	 * Validates the type value using email validator regex
	 *
	 * @param {String} email
	 * @return {boolean}
	 */
	private validateEmail(email: string): boolean {
		return Email.validator.test(email);
	}
}

export default Email;

// mongoose.Schema.Types.Email = Email;
