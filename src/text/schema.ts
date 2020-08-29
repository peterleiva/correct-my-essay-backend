/**
 * @file TextDocument related GraphQL Schema
 */

import { gql } from 'apollo-server-express';
import { TextDocument } from './text-document';
import { getTextById, create } from './controller';
import { UserDocument } from 'src/user';

/**
 * Text document types definition
 */
export const typeDefs = gql`
	"""
	Represents a text document, is like a MS WORD document. Text document must
	have a uniquely identifiable title, a text wich consist of the document
	content. Also has some meta data, like creation and updates date. For last
	it also must have a author object type
	"""
	type TextDocument {
		id: ID!
		"Document unique title"
		title: String!
		"Document content, contains the text"
		text: String!
		"Document author"
		author: User!
		"Document creation date"
		createdAt: Date!
		"Last updated date"
		updatedAt: String!
	}

	"""
	Input for create text document mutation
	"""
	input TextDocumentInput {
		"Document unique title"
		title: String
		"Text represents the content of the document"
		text: String
		"Text' author id"
		author: ID!
	}

	extend type Query {
		"Gets a text by its id"
		text(id: ID!): TextDocument
	}

	"""Response type for createTextDocument mutation"""
	type CreateTextDocumentResponse implements MutationResponse {
		code: String!
		message: String!
		success: Boolean!
		"Text Document response when create text document happens with success"
		document: TextDocument
	}

	extend type Mutation {
		"""
		Create a text document and returns a createTextDocument response indicading
		the status of the operation, which can be a success or not. Whenever the
		response is made successfuly the newly created document is returned
		"""
		createTextDocument(input: TextDocumentInput!): CreateTextDocumentResponse!
	}
`;

/**
 * Text document resolvers
 */
export const resolvers = {
	TextDocument: {
		async author(text: TextDocument): Promise<UserDocument> {
			text = await text.populate('author').execPopulate();
			return text.author;
		}
	},

	Query: {
		text(parent: null, { id }: {id: string}): Promise<TextDocument> {
			return getTextById(id);
		}
	},

	Mutation: {
		createTextDocument(
			parent: null,
			{ input }: { input: TextDocument }
		): Promise<TextDocument> {
			return create(input);
		}
	}
};
