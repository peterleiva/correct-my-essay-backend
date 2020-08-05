/**
 * @fileoverview Feature test for authenticates user
 */

import request from 'supertest';
import faker from 'faker';
import app from 'src/app';
import UserModel, { UserDocument } from '../../src/security/user';
import databaseSetup from '../lib/database-setup';

describe('Authenticating user', () => {
	let user: UserDocument;
	const password: string = faker.internet.password();

	databaseSetup();

	beforeEach(() => {
		user = new UserModel({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			credential: {
				password: password,
			},
		});
	});

	test('authenticate sucessfuly', async () => {
		await user.save();

		const response = await request(app)
			.post('/login')
			.send('email=' + user.email)
			.send('password=' + user.credential.password);

		// console.log(response);

		expect(response.status).toBe(200);
	});
});
