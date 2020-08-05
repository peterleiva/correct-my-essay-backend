/**
 * @fileoverview
 */

import { Schema, Document, Types } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

/**
 * Login credential represents a resource with hashed password
 */
class LoginCredential {
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
 * Login Credential Schema
 */
const LoginCredentialSchema = new Schema({
	passwordHash: {
		type: String,
		required: true,
	},
});

LoginCredentialSchema.loadClass(LoginCredential);

LoginCredentialSchema.pre<LoginCredentialDocument>('validate',
	async function() {
		try {
			// eslint-disable-next-line no-invalid-this
			await this.generateHash();
		} catch (error) {
			throw new Error('Unable to generate hash on pre save hook: ' + error);
		}
	});

export { LoginCredentialSchema };

export interface LoginCredentialDocument extends Document, LoginCredential {}

export interface LoginCredentialEmbedded
	extends Types.Embedded, LoginCredential {}
