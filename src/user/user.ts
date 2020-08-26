/**
 * @file User model definition
 */

import { Schema, model, Document, Model, Query } from 'mongoose';
import { LoginCredentialSchema, LoginCredential, LoginCredentialDocument }
	from './login-credential';
import Email from '../lib/mongoose/types/email';

/**
 *  User documents creator
 *
 * Represents a mongoose model modefined as a user model, so it can produce user
 * documents
 */
interface UserModel extends Model<UserDocument> {
	/**
	 * Find user by email
	 * @param {String} email
	 */
	findByEmail(email: string): Query<UserDocument>;
}

/**
 * User subtype has a __t attribute set to one of those types. It's a mongoose
 * discriminator feature which creates subtypes. User collections will store
 * all users but the discriminiator key (__t) saves which type it's refering to
 */
export enum UserType {
	Student = 'Student'
}

/**
 * Represents a application user model
 *
 * A User has some identity attributes and a optional credential value for
 * users with password. User without password can be authenticated via
 * third-party application, using OAuth or another services
 */
class User {
	firstName: string;
	lastName: string;
	email: string;
	active: boolean;
	credential?: LoginCredential;
	__t?: UserType;
	joinedIn: Date;
	updatedAt: Date;

	/**
	 * Gets the user full name, first name + last name
	 * @return {String}
	 */
	get name(): string {
		if (!this.lastName) return this.firstName || '';
		if (!this.firstName) return this.lastName;

		return this.firstName + ' ' + this.lastName;
	}

	/**
	 * Lookup a unique user by email
	 *
	 * Uses mongoose model to query through findOne to retrivies a unique user by
	 * its email.
	 *
	 * @param {UserModel} this User model reference
	 * @param {string} email email to be searched
	 * @return {Query<UserDocument>}
	 */
	static findByEmail(this: UserModel, email: string): Query<UserDocument> {
		return this.findOne({ email: email });
	}
}

/**
 * User document
 */
export interface UserDocument extends User, Document {
	credential: LoginCredentialDocument;
}

/**
 * User schema definition
 */
export const UserSchema: Schema<UserDocument> = new Schema({
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
}).loadClass(User);

const users: UserModel = model<UserDocument, UserModel>('User', UserSchema);

export { users as UserModel };
export default users;
