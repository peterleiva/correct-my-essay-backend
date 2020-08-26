/**
 * @file Student unit test
 */

import databaseSetup from 'test/lib/database-setup';
import { StudentDocument, StudentModel } from 'src/user/student';
import StudentFactory from '../factory/student';
import { UserType } from 'src/user/user';

describe('Student', () => {
	let student: StudentDocument;

	databaseSetup();

	beforeEach(() => {
		student = new StudentModel(StudentFactory.build());
	});

	it('Create Successfuly', async () => {
		await expect(student.save()).resolves.toEqual(student);
	});

	describe('Attributes', () => {
		it('Has a __t attribute discriminator', async () => {
			await student.save();
			expect(student.__t).toEqual(UserType.Student);
		});
	});
});
