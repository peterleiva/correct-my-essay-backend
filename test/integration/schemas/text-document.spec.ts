import { createTestClient } from 'apollo-server-testing';
import { server } from 'src/graphql/apollo-server';
import { gql } from 'apollo-server-express';

import { auth } from 'test/lib/auth';
import databaseSetup from 'test/lib/database-setup';
import DocumentFactory from '../../factory/text-document';
import StudentFactory from '../../factory/student';
import { TextDocumentModel, TextDocument } from 'src/text/text-document';
import { StudentDocument, StudentModel } from 'src/user';

const { query } = createTestClient(server);

describe('Text Document Schema', () => {
	let student: StudentDocument;

	databaseSetup();

	beforeEach(async () => {
		await auth();
		student = await StudentModel.create(StudentFactory.build());
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
			const text: TextDocument = await TextDocumentModel
				.create(DocumentFactory.build({ author: student.id }));

			const res = await query({
				query: TEXT,
				variables: { id: text.id }
			});

			expect(res).toMatchObject({
				data: {
					text: {
						id: text.id
					}
				}
			});
		});

		it('Get inexistent text document', async () => {
			const res = await query({
				query: TEXT,
				variables: { id: '_someid' }
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
