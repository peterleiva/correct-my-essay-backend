/**
 * @fileoverview This file contain all user related model using mongoose
 */

import { Schema, model, Document, Model, Query } from 'mongoose';
import { LoginCredentialSchema, LoginCredentialEmbedded }
	from './login-credential';
import Email from '../lib/mongoose/types/email';

/**
 * User models which constructs user documents
 */
interface UserModel extends Model<UserDocument> {
	/**
	 * Find user documents by email
	 *
	 * @param {String} email
	 */
	findByEmail(email: string): Query<UserDocument>;
}

/**
 * Represents a application user with and optional login credential
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
	credential?: LoginCredentialEmbedded;

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
 * User documents defines a object returned by User model
 *
 * It has all behaviour from mongoose documents and is itself a user class
 */
export type UserDocument = Document & User;

/**
 * User schema definition
 */
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

/**
 * Lookup a unique user by email
 *
 * Uses mongoose model to query through findOne to retrivies a unique user by
 * its email, returning a mongoose query
 *
 * @param {string} email email to be lookup
 * @return {Query<UserDocument>}
 */
schema.statics.findByEmail = function(email: string): Query<UserDocument> {
	return this.findOne({ email: email });
};

const users: UserModel = model<UserDocument, UserModel>('User', schema);

export { users as User };

export default users;
