/**
 * @file TextDocument related GraphQL Schema
 */

import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLFieldConfigMap,
	GraphQLNonNull
} from 'graphql';
import { Request } from 'express';
import { gql } from 'apollo-server-express';

import { UserSchema, UserDocument } from '../user';
import { GraphQLDate } from '../graphql/custom-scalar';
import { TextDocument } from './text-document';
import { getTextById, create } from './controller';

export const typeDefs = gql`
	type TextDocument {
		id: ID!
		"Document unique title"
		title: String!
		text: String!
		# author: User!
		# createdAt: Date!
		updatedAt: String!
	}

	input TextDocumentInput {
		"Document unique title"
		title: String
		"Text represents the content of the document"
		text: String
		"Text' author id"
		author: ID!
	}

	extend type Query {
		text(id: ID!): TextDocument
	}

	extend type Mutation {
		createTextDocument(input: TextDocumentInput!): TextDocument!
	}
`;

export const resolvers = {};

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
			type: new GraphQLNonNull(UserSchema.UserType),
			description: 'Text author',
			resolve: async (text: TextDocument): Promise<UserDocument> => {
				text = await text.populate('author').execPopulate();
				return text.author;
			},
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
 * 	text: String
 *	author: ID!
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
			type: GraphQLString,
			description: 'Document text in string representation'
		},
		author: {
			type: new GraphQLNonNull(GraphQLID),
			description: 'Document author identifier'
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
export const query: GraphQLFieldConfigMap<null, Request> = {
	text: {
		type: TextDocumentType,
		description: 'Gets a single stored user by its id',
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve: (source: null, { id }: {id: string})
			: Promise<TextDocument> => getTextById(id),
	}
};

/**
 * GraphQL TextDocument mutations
 *
 * type mutation {
 * 	createTextDocument(input: TextDocumentInput!): TextDocument!
 * }
 */
export const mutation: GraphQLFieldConfigMap<null, Request> = {
	createTextDocument: {
		type: new GraphQLNonNull(TextDocumentType),
		description: 'Create new essay document in text document',
		args: {
			input: { type: new GraphQLNonNull(TextDocumentInput) }
		},
		resolve: (source: null, { input }: { input: TextDocument })
			: Promise<TextDocument> => create(input),
	}
};
