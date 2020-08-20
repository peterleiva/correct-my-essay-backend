/**
 * @fileoverview User login credential definition
 */

import { Schema, Document, HookNextFunction } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

/**
 * Login credential represents a resource with hashed password
 */
export class LoginCredential {
	private static saltRound = 11;
	passwordHash: string;

	private _password: string;

	/**
	 * Password virtual setter
	 *
	 * @param {String} value
	 */
	set password(value: string) {
		this._password = value;
	}

	/**
	 * Password virtual getter
	 *
	 * @return {String}
	 */
	get password(): string {
		return this._password;
	}

	/**
	 * Checks password authenticity
	 *
	 * Compare a plain text password with stored password hash using bcrypt
	 * compare function. The resource is authorized only if compare is true
	 *
	 * @param {string} password plain uncrypted text to compare with hash
	 * @return {Promise<boolean>}
	 */
	async authorize(password: string): Promise<boolean> {
		if (!this.passwordHash) {
			return Promise.resolve(false);
		}

		return compare(password, this.passwordHash);
	}

	/**
	 * Generate a hash from password string and stores it
	 *
	 * Uses bcrypt to generate a salt and then a hash. Only the corresponding
	 * hash is saved
	 *
	 * @throw Error for password not set
	 * @return {Promise<this>}
	 */
	async generateHash(): Promise<this> {
		if (!this.password) {
			throw new Error('password must be defined to generate hash');
		}

		const salt = await genSalt(LoginCredential.saltRound);
		this.passwordHash = await hash(this.password, salt);

		return this;
	}
}

/**
 * Login credential document
 */
export type LoginCredentialDocument = LoginCredential & Document;

/**
 * Login Credential Schema
 */
export const LoginCredentialSchema = new Schema<LoginCredentialDocument>({
	passwordHash: {
		type: String,
		required: true,
	},
})
	.loadClass(LoginCredential)

	/**
	 * Generate password on validate
	 *
	 * This middleware generate a password hash everytime the document is saved.
	 * Thereof, after validate hook on model this hook is called
	 */
	.pre<LoginCredentialDocument>('validate',
		async function(this: LoginCredentialDocument,
			next: HookNextFunction): Promise<void> {
			try {
				// eslint-disable-next-line no-invalid-this
				await this.generateHash();
				next();
			} catch (error) {
				throw new Error('Unable to, generate hash on pre save hook: ' + error);
			}
		});
