/**
 * @fileoverview GraphQL schema
 */

import {
	GraphQLSchema,
	GraphQLObjectType
} from 'graphql';
import { UserSchema } from './user';
import { TextDocumentSchema } from './text';

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
