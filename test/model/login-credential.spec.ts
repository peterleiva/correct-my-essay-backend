/**
 * @file Login credential spec
 */

import { model, Model } from 'mongoose';
import * as faker from 'faker';
import {
	LoginCredentialSchema,
	LoginCredentialDocument,
} from 'src/user/login-credential';
import databaseSetup from 'test/lib/database-setup';

describe('LoginCredential', () => {
	let LoginCredential: Model<LoginCredentialDocument>;
	let credential: LoginCredentialDocument;
	const password: string = faker.internet.password();

	databaseSetup();

	beforeEach(() => {
		LoginCredential = model<LoginCredentialDocument>(
			'LoginCredential',
			LoginCredentialSchema
		);

		credential = new LoginCredential();
	});

	it('Have password field', () => {
		expect(credential).toHaveProperty('password');
	});

	it('Get password after setter', () => {
		credential.password = password;
		expect(credential.password).toEqual(password);
	});

	it('Does not save with no password', async () => {
		await expect(credential.save()).rejects.toThrow(
			'password must be defined to generate hash'
		);
	});

	describe('Middlewares', () => {
		describe('pre:save', () => {
			describe('No password set', () => {
				it('Does not generate a password hash', async () => {
					await expect(credential.validate('passwordHash')).rejects.toThrow(
						'password must be defined to generate hash'
					);
				});
			});

			describe('Password Set', () => {
				it('Generate password hash', async () => {
					credential.password = password;
					await expect(
						credential.validate('passwordHash')
					).resolves.toBeUndefined();
				});
			});
		});
	});

	describe('Methods', () => {
		describe('.authorized', () => {
			const invalidPassword = '829293';
			const validPassword = '123456';

			describe('With hashed password', () => {
				let credential: LoginCredentialDocument;

				beforeEach(async () => {
					credential = new LoginCredential({ password: validPassword });
					await credential.save();
				});

				it('Authorize with valid credentials', async () => {
					expect(await credential.authorize(validPassword)).toBe(true);
				});

				it('Do not authorize with invalid credentials', async () => {
					const matched = await credential.authorize(invalidPassword);
					expect(matched).toBe(false);
				});
			});

			describe('Without hash password', () => {
				it('Dot not authorize', async () => {
					const matched = await credential.authorize('anything');
					expect(matched).toBe(false);
				});
			});
		});

		describe('.generateHash', () => {
			it('Generate a password hash field', async () => {
				credential.password = password;
				await credential.generateHash();
				expect(credential.passwordHash).toBeTruthy();
			});
		});
	});
});
