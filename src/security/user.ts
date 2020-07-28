/**
 * @fileoverview This file contain all user related model using mongoose
 */

import { Schema, model, Document } from 'mongoose';
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
	 */
	get name(): string {
		return this.firstName + this.lastName;
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
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
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
