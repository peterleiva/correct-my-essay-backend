/**
 * @fileoverview Feature test for authenticates user
 */

import request from 'supertest';
import faker from 'faker';
import app from '../../src/app';
import { User, UserDocument } from 'src/user';
import databaseSetup from '../lib/database-setup';

describe('Authenticating user', () => {
	let user: UserDocument;
	const password: string = faker.internet.password();
	const invalidPassword = password + '12302';

	databaseSetup();

	beforeEach(async () => {
		user = new User({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			credential: {
				password: password,
			},
		});
		await user.save();
	});

	test('authenticate with valid credentials', done => {
		request(app)
			.post('/auth')
			.send(`email=${user.email}`)
			.send(`password=${user.credential.password}`)
			.expect(200, { 'access-token': 1000 }, done);
	});

	test('Unauthorizing invalid credentials', done => {
		request(app)
			.post('/auth')
			.send(`email=${user.email}`)
			.send(`password=${invalidPassword}`)
			.expect(401, done);
	});
});
