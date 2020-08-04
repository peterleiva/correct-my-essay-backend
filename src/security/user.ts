/**
 * @fileoverview This file contain all user related model using mongoose
 */

import { Schema, model, Document } from 'mongoose';
import Email from 'src/lib/mongoose/types/email';
import { LoginCredentialSchema, LoginCredential } from './login-credential';

/**
 * Represents a application user with optional login credential
 *
 * A User has some identity attributes and a optional credential value for
 * user with password. User without password can be authenticated via
 * third-party application, using OAuth or another service
 */
class User {
	firstName: string;
	lastName: string;
	email: string;
	active: boolean;
	joinedIn: Date;
	credential?: LoginCredential;

	/**
	 * Returns the user full name
	 *
	 * @return {String}
	 */
	get name(): string {
		if (!this.lastName) {
			return this.firstName || '';
		}

		if (!this.firstName) {
			return this.lastName;
		}

		return this.firstName + ' ' + this.lastName;
	}
}

/**
 * Represents a object returned by mongoose model constructor
 *
 * @interface
 */
export interface UserDocument extends Document, User { }

const schema: Schema<User> = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String, // convert to Email custom type
		required: true,
		index: true,
		unique: true,
		lowercase: true,
		trim: true,
		match: Email.validator,
	},
	active: {
		type: Boolean,
		default: true,
	},
	credential: LoginCredentialSchema,
}, {
	timestamps: {
		createdAt: 'joinedIn',
	},
});

schema.loadClass(User);

const UserModel = model<UserDocument>('User', schema);

export { UserModel, User };

export default UserModel;
