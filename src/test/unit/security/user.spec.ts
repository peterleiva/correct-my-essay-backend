import UserModel, { UserDocument } from '../../../security/user';

describe('User', () => {
	// describe('Validations', () => {
	// 	it('is invalid with no firstname, lastname, ....');
	// });

	describe('With Credential', () => {
		let user: UserDocument;

		beforeEach(() => {
			user = new UserModel({ credential: {} });
		});

		describe('Methods', () => {
			describe('.authorized', () => {
				const invalidPassword = '829293';
				const validPassword = '123456';

				beforeEach(async () => {
					await user.credential.generateHash(validPassword);
				});

				it('Authorize with valid credentials', async () => {
					expect(await user.credential.authorize(validPassword)).toBe(true);
				});

				it('Do not authorize with invalid credentials', async () => {
					expect(await user.credential.authorize(invalidPassword)).toBe(false);
				});
			});

			describe('.generateHash', () => {
				const password = '8123823';

				it('Fills the password hash field', async () => {
					await user.credential.generateHash(password);
					expect(user.credential.passwordHash).toBeTruthy();
				});
			});
		});
	});
});

