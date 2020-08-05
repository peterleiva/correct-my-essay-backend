import User, { UserDocument } from './user';
import faker from 'faker';
import databaseSetup from 'test/lib/database-setup';

describe('User', () => {
	let user: UserDocument;

	databaseSetup();

	beforeEach(() => {
		user = new User({
			email: faker.internet.email(),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
		});
	});

	test('creates succesfuly', async () => {
		await expect(user.save()).resolves.toBe(user);
	});

	describe('Methods', () => {
		describe('.name', () => {
			beforeEach(() => {
				user = new User();
			});

			test('Gets the first and lastname concatenated', () => {
				user.firstName = 'Augusto';
				user.lastName = 'José';
				expect(user.name).toEqual('Augusto José');
			});

			test('Gets the first name only if no last name', () => {
				user.firstName = 'Jose';
				expect(user.name).toEqual('Jose');
			});

			test('Gets the last name only if no first name', () => {
				user.lastName = 'Augusto';
				expect(user.name).toEqual('Augusto');
			});

			test('Gets a empty string if there\'s no name', () => {
				expect(user.name).toEqual('');
			});
		});
	});
});

