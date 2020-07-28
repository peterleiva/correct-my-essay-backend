/**
 * @fileoverview
 */

import { Schema } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

/**
 * Credential class represents a credential with password strategy
 */
class LoginCredential {
	private static saltRound = 11;
	passwordHash: string;

	/**
	 * Compare a plain text password with stored password hash and returns true
	 * only if they are a match
	 *
	 * @param {string} password plain uncrypted text to compare with hash
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
	 * @param {string} password password which hash will be generated
	 * @return {Promise<this>}
	 */
	async generateHash(password: string): Promise<this> {
		const salt = await genSalt(LoginCredential.saltRound);
		this.passwordHash = await hash(password, salt);

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

export { LoginCredentialSchema, LoginCredential };
