/**
 * @fileoverview Student unit test
 */

import databaseSetup from 'test/lib/database-setup';
import { StudentDocument, StudentModel } from 'src/user/student';
import StudentFactory from '../../factory/student';

describe('Student', () => {
	let student: StudentDocument;

	databaseSetup();

	beforeEach(() => {
		student = new StudentModel(StudentFactory.build());
	});

	it('Create Successfuly', async () => {
		await expect(student.save()).resolves.toEqual(student);
	});
});
