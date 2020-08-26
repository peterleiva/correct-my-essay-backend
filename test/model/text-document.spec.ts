/**
 * @file Text document model spec
 */

import { Error } from 'mongoose';
import databaseSetup from 'test/lib/database-setup';
import StudentFactory from 'test/factory/student';
import UserFactory from 'test/factory/user';
import TextDocumentFactory from 'test/factory/text-document';
import { UserModel, StudentModel, StudentDocument } from 'src/user';
import { TextDocumentModel, TextDocument } from 'src/text/text-document';

describe('TextDocument', () => {
	let author: StudentDocument;
	let textDocument: TextDocument;

	databaseSetup();

	beforeEach(async () => {
		author = await StudentModel.create(StudentFactory.build());
		textDocument = new TextDocumentModel(
			TextDocumentFactory.build({ author: author.id })
		);
	});

	it('Create successfuly', async () => {
		await expect(textDocument.save()).resolves.toBe(textDocument);
	});

	describe('Attributes', () => {
		let doc;

		beforeEach(() => {
			doc = TextDocumentFactory.build({ author: author.id });
		});

		describe('title', () => {
			it('Failed to save if length is bigger than 120', async () => {
				const title = new Array(122).map(() => '_'); // the first do not enter
				doc.title = title;

				await expect(TextDocumentModel.create(doc))
					.rejects.toThrowError(Error.ValidationError);
				// todo: verificar se o erro é de fato o desejado
			});

			it.skip('Save default value when is null', async () => {
				const date = new Date();
				spyOn(global, 'Date').and.callFake(() => date);

				doc.title = undefined;
				const text = await TextDocumentModel.create(doc);

				expect(text.title).toMatch(`text ${date.toISOString()}`);
			});

			it('trim spaces when save', async () => {
				doc.text = '\n\ttext\n\n\t';
				const textDocument = await TextDocumentModel.create(doc);

				expect(textDocument.text).toMatch('text');
			});

			it('Don\'t save already saved value', async () => {
				await textDocument.save();
				doc.title = textDocument.title;

				await expect(TextDocumentModel.create(doc)).rejects
					.toThrowError('E11000 duplicate key error collection');
			});
		});

		describe('text', () => {
			it('Set empty string when undefined', async () => {
				doc.text = undefined;
				const textDocument = await TextDocumentModel.create(doc);

				expect(textDocument.text).toEqual('');
			});

			it('Fails when bigger than 10,000,000 caracteres', async () => {
				doc.text = new Array(10_000_000 + 2).join('_');

				await expect(TextDocumentModel.create(doc)).rejects
					.toThrowError(Error.ValidationError);
			});
		});
	});

	describe('Relationships', () => {
		describe('author', () => {
			it('Fails to save without author', async () => {
				textDocument.author = null;

				await expect(TextDocumentModel.create(textDocument)).rejects
					.toThrowError(Error.ValidationError);
			});

			it('Fails to save when is not student', async () => {
				const user = await UserModel.create(UserFactory.build());
				textDocument.author = user.id;

				await expect(TextDocumentModel.create(textDocument))
					.rejects.toThrowError('Author must be a student');
			});
		});
	});
});
