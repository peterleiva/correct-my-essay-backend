import { gql } from 'apollo-server-express';
import createTestClient from '../../lib/apollo-test-client';
import { auth } from 'test/lib/auth';
import databaseSetup from 'test/lib/database-setup';
import DocumentFactory from '../../factory/text-document';
import StudentFactory from '../../factory/student';
import { TextDocumentModel, TextDocument } from 'src/text/text-document';
import { StudentDocument, StudentModel, User } from 'src/user';

describe('Text Document Schema', () => {
	let student: StudentDocument;
	let user: User;
	let query;

	databaseSetup();

	beforeEach(async () => {
		[user] = await auth();
		student = await StudentModel.create(StudentFactory.build());

		({ query } = createTestClient(user));
	});

	describe('Querying', () => {
		const TEXT = gql`
			query text($id: ID!) {
				text(id: $id) {
					id
					title
					text
					author {
						id
					}
				}
			}
		`;

		it('Get existing text document', async () => {
			const text: TextDocument = await TextDocumentModel.create(
				DocumentFactory.build({ author: student.id })
			);

			const res = await query({
				query: TEXT,
				variables: { id: text.id },
			});

			expect(res).toMatchObject({
				data: {
					text: {
						id: text.id,
					},
				},
			});
		});

		it('Get inexistent text document', async () => {
			const res = await query({
				query: TEXT,
				variables: { id: '_someid' },
			});

			expect(res).toMatchObject({ data: { text: null } });
		});
	});

	describe('Mutation', () => {
		it.todo('Creating Text Document successfuly');
		it.todo('Creating Text Document no student author');
		it.todo('Creating Document with existing title');
		it.todo('Creating Document with more than 120 characters');
	});
});
