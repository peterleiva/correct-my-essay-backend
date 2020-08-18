/**
 * @fileoverview GraphQL schema
 */

import {
	GraphQLSchema,
	GraphQLObjectType
} from 'graphql';
import { UserQueryType, UserMutationType } from './user/user.schema';
import { TextDocumentMutation, TextDocumentQuery }
	from './text/text-document.schema';

const query = new GraphQLObjectType({
	name: 'Query',
	fields: { ...UserQueryType, ...TextDocumentQuery },
});

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: { ...UserMutationType, ...TextDocumentMutation },
});

export default new GraphQLSchema({
	query: query,
	mutation: mutation,
});
