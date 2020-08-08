
import request from 'supertest';
import faker from 'faker';
import app from 'src/app';
import { Serializer } from 'src/lib/json-api';
import { UserDocument } from 'src/user';

describe('User Management', () => {
	const users: UserDocument[] = [];

	beforeAll(() => {
		[1, 2, 3].forEach(() => {
			users.push(new User({
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
			}));
		});
	});

	test('Get empty list of users', () => {
		const emptyUsers = Serializer.serialize('users', null);

		request(app)
			.get('/users')
			.expect(200, emptyUsers);
	});

	test.todo('Get a list with one user');
	test.todo('Get a list of multiple users back');
	test.todo('Create a user successfully');
	test.todo('Create a invalid user');
	test.todo('Get inexistent user');
	test.todo('Get single user');
	test.todo('Get user with invalid id parameter');
});
