
import request from 'supertest';
import app from 'src/app';
import Factory from '../factory/user';
import { Serializer } from 'src/lib/json-api';
import { User } from 'src/user';
import databaseSetup from '../lib/database-setup';

describe('User Management', () => {
	databaseSetup();

	test('Get empty list of users', () => {
		const emptyUsers = Serializer.serialize('users', null);

		request(app)
			.get('/users')
			.expect(200, emptyUsers);
	});

	test('Get a list with one user', async done => {
		const user = await User.create(Factory.build());

		request(app)
			.get('/users')
			.expect(200,
				JSON.stringify(await Serializer.serialize('users', [user])), done);
	});

	test('Get a list of multiple users', async () => {
		const users = await User.create(Factory.buildList(4));
		const serializedUsers = await Serializer.serialize('users', users);

		request(app)
			.get('/users')
			.expect(200, serializedUsers);
	});

	test('Create a user successfully', async () => {
		const user = Factory.build();
		request(app)
			.post('/users')
			.type('json')
			.send(user)
			.expect(200);
	});

	test('Create a invalid user', async () => {
		const user = Factory.build({ firstName: null });

		request(app)
			.post('/users')
			.type('json')
			.send(user)
			.expect(404);
	});

	test('Get inexistent user', async () => {
		request(app)
			.get('/users/10')
			.expect(200, await Serializer.serialize('users', null));
	});

	test('Get single user', async () => {
		const user = await User.create(Factory.build());

		request(app)
			.get('/user/' + user.id)
			.expect(200, await Serializer.serialize('users', user));
	});
});
