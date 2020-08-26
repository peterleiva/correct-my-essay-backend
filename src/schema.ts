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

export const schema = makeExecutableSchema({
	typeDefs: [Query, Mutation, TextDocumentTypeDef],
	resolvers: { ...TextDocumentResolvers }
});
