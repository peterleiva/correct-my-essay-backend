/**
 * @file User management controller
 */

import { UserModel, UserDocument } from './user';

/**
 * Accept only some params
 *
 * @param {express.Request} req
 */

/**
 * Get user by its id
 *
 * @param {string} id user id
 * @return {Promise<UserDocument>}
 */
export async function getUserById(id?: string): Promise<UserDocument | null> {
	return UserModel.findOne({ _id: id }).exec();
}

/**
 * Get all stored users
 */
export async function getAllUsers(): Promise<UserDocument[]> {
	return UserModel.find().exec();
}

/**
 * Create a user document
 *
 * @param {UserDocument} user user document
 * @return {Promise<User>}
 */
export async function createUser(user: UserDocument): Promise<UserDocument> {
	return UserModel.create(user);
}

/**
 * Delete a single user by its identifier returning it
 *
 * Delete a user by its ObjectID and if it was a success returns the saved user
 * document or null on failure
 *
 * @param {string} id user identifier
 * @return {Promise<UserDocument>}
 */
export async function deleteUser(id: string): Promise<UserDocument> {
	const result = await UserModel.deleteOne({ _id: id }).exec();
	return result.deletedCount === 1 ? await getUserById(id) : null;
}
