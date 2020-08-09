import request from 'supertest';
import app from 'src/app';
import Factory from '../factory/user';
import { Serializer } from 'src/lib/json-api';
import { User, UserDocument } from 'src/user';
import databaseSetup from '../lib/database-setup';
import { auth } from '../lib/auth';

describe('User Management', () => {
	let user: UserDocument;
	let accessToken: string;
	let bearerToken: string;
	const endpoint = '/users/';

	databaseSetup();

	beforeEach(async () => {
		[user, accessToken] = await auth();
		bearerToken = 'Bearer ' + accessToken;
	});

	describe('Retreving', () => {
		test('Get list with one user', async () => {
			return request(app)
				.get(endpoint)
				.set('Authorization', bearerToken)
				.expect(200,
					JSON.stringify(await Serializer.serialize('users', [user])));
		});

		test('Get a list of multiple users', async () => {
			const users = await User.create(Factory.buildList(4));
			const serializedUsers = await Serializer
				.serialize('users', [user, ...users]);

			return request(app)
				.get(endpoint)
				.set('Authorization', bearerToken)
				.expect(200, JSON.stringify(serializedUsers));
		});

		test.skip('Get inexistent user', async () => {
			return request(app)
				.get(endpoint + '10')
				.set('Authorization', bearerToken)
				.expect(404,
					JSON.stringify(await Serializer.serialize('users', null)));
		});

		test('Get single user', async () => {
			const user = await User.create(Factory.build());

			return request(app)
				.get(endpoint + user.id)
				.set('Authorization', bearerToken)
				.expect(200,
					JSON.stringify(await Serializer.serialize('users', user)));
		});
	});

	describe('Creating', () => {
		test('Create a user successfully', async () => {
			const user = Factory.build();
			return request(app)
				.post(endpoint)
				.type('json')
				.set('Authorization', bearerToken)
				.send(user)
				.expect(200);
		});

		test('Create a invalid user', async () => {
			const user = Factory.build({ firstName: null });

			return request(app)
				.post(endpoint)
				.type('json')
				.set('Authorization', bearerToken)
				.send(user)
				.expect(404);
		});
	});

	describe('Deleting', () => {
		test('Existing User', async () => {
			const user = await User.create(Factory.build());

			return request(app)
				.delete(endpoint + user.id)
				.set('Authorization', bearerToken)
				.expect(204);
		});

		test('Inexistent User', async () => {
			return request(app)
				.delete(endpoint + '100')
				.set('Authorization', bearerToken)
				.expect(404);
		});
	});
});
