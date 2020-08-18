/**
 * @fileoverview TextDocument related GraphQL Schema
 */

import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLFieldConfigMap,
	GraphQLNonNull
} from 'graphql';
import { UserType } from '../user/user.schema';
import { GraphQLDate } from '../graphql/custom-scalar';

/**
 * GraphQL TextDocument Type
 *
 * type TextDocument {
 * 	id: ID!
 * 	title: String!
 * 	text: String!
 * 	author: User!
 * 	createdAt: String!
 * 	updatedAt: String!
 * }
 */
export const TextDocumentType = new GraphQLObjectType({
	name: 'TextDocument',
	description: 'The Text Document refers to essay document, like a file' +
	'which store a sequence of text, those documents store texts and metadata',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
			description: 'text document identifier'
		},
		title: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Document unique (by author) identifiable name'
		},
		text: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Document text in string representation'
		},
		author: {
			type: new GraphQLNonNull(UserType),
			description: 'Document author'
		},
		createdAt: {
			type: new GraphQLNonNull(GraphQLDate),
			description: 'Create date'
		},
		updatedAt: {
			type: new GraphQLNonNull(GraphQLDate),
			description: 'Last update date'
		}
	}
});

/**
 * GraphQL TextDocumentInput input
 *
 * input TextDocumentInput {
 * 	title: String
 * 	text: String!
 * }
 */
export const TextDocumentInput = new GraphQLInputObjectType({
	name: 'TextDocumentInput',
	description: 'Text document input argument used to create new text docs',
	fields: {
		title: {
			type: GraphQLString,
			description: 'Unique document title'
		},
		text: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Document text in string representation'
		}
	}
});

/**
 * GraphQL TextDocument queries
 *
 * query {
 * 	text(id: ID!): TextDocument
 * }
 */
export const TextDocumentQuery: GraphQLFieldConfigMap<null, null> = {
	text: {
		type: TextDocumentType,
		description: 'Gets a single stored user by its id',
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		}
	}
};

/**
 * GraphQL TextDocument mutations
 *
 * type mutation {
 * 	createTextDocument(input: TextDocumentInput!): TextDocument!
 * }
 */
export const TextDocumentMutation: GraphQLFieldConfigMap<null, null> = {
	createTextDocument: {
		type: new GraphQLNonNull(TextDocumentType),
		description: 'Create new essay document in text document',
		args: {
			input: { type: new GraphQLNonNull(TextDocumentInput) }
		}
	}
};
