/**
 * @file GraphQL schema
 */

import {
	GraphQLSchema,
	GraphQLObjectType
} from 'graphql';
import { UserSchema } from './user';
import {
	TextDocumentSchema,
	TextDocumentTypeDef,
	TextDocumentResolvers } from './text';
import { gql, makeExecutableSchema } from 'apollo-server-express';

const query = new GraphQLObjectType({
	name: 'Query',
	fields: { ...UserSchema.query, ...TextDocumentSchema.query }
});

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: { ...UserSchema.mutation, ...TextDocumentSchema.mutation },
});

export default new GraphQLSchema({
	query: query,
	mutation: mutation
});

const Query = gql`
	type Query {
		_empty: String
	}
`;

const Mutation = gql`
	type Mutation {
		_empty: String
	}
`;

const typedefs = gql`
	scalar Date

	"""
	Response type for mutations response operations. All mutation must implement
	this interface
	"""
	interface MutationResponse {
		"status of data transfers, like a HTTP code"
		code: String!
		"Human-readable describing the response, to be used by the UI"
		message: String!
		"Indicates whether the mutation was a success"
		success: Boolean!
	}
`;

export const schema = makeExecutableSchema({
	typeDefs: [typedefs, Query, Mutation, TextDocumentTypeDef],
	resolvers: { ...TextDocumentResolvers }
});
