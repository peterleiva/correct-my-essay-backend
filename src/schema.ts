/**
 * @fileoverview GraphQL schema
 */

import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { UserQueryType, UserMutationType } from './user/user.schema';

const query = new GraphQLObjectType({
	name: 'Query',
	fields: { ...UserQueryType },
});

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: { ...UserMutationType },
});

export default new GraphQLSchema({
	query: query,
	mutation: mutation,
});
