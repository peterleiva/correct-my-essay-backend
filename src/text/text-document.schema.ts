/**
 * @fileoverview TextDocument GraphQL Schema related
 */

import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLFieldConfigMap
} from 'graphql';
import { UserType } from '../user/user.schema';

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
	fields: {
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		text: { type: GraphQLString },
		author: { type: UserType },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString }
	},
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
	fields: {
		title: { type: GraphQLString },
		text: { type: GraphQLString }
	},
});

/**
 * GraphQL TextDocument queries
 */
export const TextDocumentQuery: GraphQLFieldConfigMap<null, null> = {
	text: {
		type: TextDocumentType,
		args: {
			id: { type: GraphQLID }
		}
	}
};

/**
 * GraphQL TextDocument mutations
 *
 * type mutation {
 * 	createTextDocument(input: TextDocumentInput): TextDocument
 * }
 */
export const TextDocumentMutation: GraphQLFieldConfigMap<null, null> = {
	createTextDocument: {
		type: TextDocumentType,
		args: {
			input: { type: TextDocumentInput }
		}
	}
};
