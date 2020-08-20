import { UserDocument, UserModel } from 'src/user';
import databaseSetup from 'test/lib/database-setup';
import Factory from 'test/factory/user';

describe('User', () => {
	let user: UserDocument;

	databaseSetup();

	beforeEach(() => {
		user = new UserModel(Factory.build());
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

	describe('Statics', () => {
		describe('.findByEmail', () => {
			const invalidEmail = 'invalid@emai.co.invalid';

			beforeEach(async () => {
				await user.save();
			});

			test('Returns a single user for registered email', async () => {
				const savedUser = await UserModel.findByEmail(user.email).exec();
				expect(user.toObject()).toMatchObject(savedUser.toObject());
			});

			test('Returns no user for non-registered email', async () => {
				await expect(UserModel.findByEmail(invalidEmail).exec())
					.resolves.toBeNull();
			});
		});
	});
});

