/**
 * @file Feature test for authenticates user
 */

import request, { Response } from 'supertest';
import app from 'src/app';
import { UserModel, UserDocument } from 'src/user';
import Factory from '../factory/user';
import databaseSetup from 'test/lib/database-setup';

describe('Authenticating user', () => {
	let user: UserDocument;
	const password = '123456';
	const invalidPassword = '829343';

	databaseSetup();

	beforeEach(async () => {
		user = new UserModel(Factory.build({}, { password: password }));
		await user.save();
	});

	afterEach(() => user = null);

	test.skip('authenticate with valid credentials', done => {
		request(app)
			.post('/auth')
			.send(`email=${user.email}`)
			.send(`password=${password}`)
			.expect(200, (error, res: Response) => {
				if (error) throw error;

				expect(res.body).toHaveProperty('access-token');
				done();
			});
	});

	test('Unauthorizing invalid credentials', done => {
		request(app)
			.post('/auth')
			.send(`email=${user.email}`)
			.send(`password=${invalidPassword}`)
			.expect(401, done);
	});

	test.todo('Throws error when failed to sign jwt');
});
