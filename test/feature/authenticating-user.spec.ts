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

	databaseSetup();

	beforeEach(() => {
		user = new User({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			credential: {
				password: password,
			},
		});
	});

	test('authenticate sucessfuly', async done => {
		await user.save();

		request(app)
			.post('/auth')
			.send(`email=${user.email}`)
			.send(`password=${user.credential.password}`)
			.expect(200, { 'access-token': 1000 }, done);
	});
});
