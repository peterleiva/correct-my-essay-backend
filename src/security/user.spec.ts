import UserModel, { UserDocument, User } from './user';
import faker from 'faker';
import databaseSetup from 'test/lib/database-setup';

describe('User', () => {
	let user: UserDocument;

	databaseSetup();

	beforeEach(() => {
		user = new UserModel({
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
				user = new UserModel();
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

	describe('With Credential', () => {
		beforeEach(() => {
			user.set({ credential: {} });
		});

		describe('Methods', () => {
			describe('.authorized', () => {
				const invalidPassword = '829293';
				const validPassword = '123456';

				describe('With hashed password', () => {
					beforeEach(async () => {
						await user.credential.generateHash(validPassword);
					});

					test('Authorize with valid credentials', async () => {
						expect(await user.credential.authorize(validPassword)).toBe(true);
					});

					test('Do not authorize with invalid credentials', async () => {
						const matched = await user.credential.authorize(invalidPassword);
						expect(matched).toBe(false);
					});
				});

				describe('Without hash password', () => {
					test('Dot not authorize', async () => {
						const matched = await user.credential.authorize('anything');
						expect(matched).toBe(false);
					});
				});
			});

			describe('.generateHash', () => {
				const password = '8123823';

				test('Fills the password hash field', async () => {
					await user.credential.generateHash(password);
					expect(user.credential.passwordHash).toBeTruthy();
				});
			});
		});
	});
});

