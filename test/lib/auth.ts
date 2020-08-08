
import request from 'supertest';
import app from 'src/app';
import Factory from '../factory/user';
import { UserDocument, User } from '../../src/user';

/**
 * Authenticate user provided by user or generate one
 *
 * @throws Error when not authorized
 * @param {User} user authenticated user
 * @return {[UserDocument, string]}
 */
export async function auth(user = Factory.build({}, { withCredential: true }))
: Promise<[UserDocument, string]> {
	const userDoc = await User.create(user);

	const res = await request(app)
		.post('/auth')
		.send(`email=${user.email}`)
		.send(`password=${user.credential?.password}`);

	if (res.status === 401) throw new Error('not authorized');

	return [userDoc, res.body['access-token']];
}
