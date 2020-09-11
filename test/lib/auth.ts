
import request from 'supertest';
import app from 'src/app';
import Factory from '../factory/user';
import { UserDocument, UserModel } from 'src/user';
import BaseError from 'src/lib/errors/base-error';

/**
 * Authenticate a user creating them if necessary
 *
 * Create a user with password credential by default and perform a
 * authentication with its email and password. Returning two values on sucess,
 * an authenticated user and the access token or Unauthorized error if the
 * credentials fails
 *
 * @throws not authorized
 * @param {User} user user to be authenticated
 * @return {[UserDocument, string]} user authenticated and access token
 */
export async function auth(user = Factory.build({}, { withCredential: true }))
: Promise<[UserDocument, string]> {
	const userDoc = await UserModel.create(user);

	const res = await request(app)
		.post('/auth')
		.send(`email=${user.email}`)
		.send(`password=${user.credential?.password}`);

	if (res.status === 401) throw new BaseError('not authorized');

	return [userDoc, res.body];
}
