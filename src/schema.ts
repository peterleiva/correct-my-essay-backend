/**
 * @file GraphQL schema
 */

import _ from 'lodash';
import { gql, makeExecutableSchema } from 'apollo-server-express';
import { GraphQLDate } from './graphql/custom-scalar';
import { UserSchema } from './user';
import { TextSchema } from './text';

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

/**
 * Base typedefs used by the whole schema
 */
const baseDefs = gql`
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

/**
 * Base resolvers used to define custom scalars, normally resolvers to types
 * which can be used through all the whole schema
 */
const baseResolvers = {
	Date: GraphQLDate
};

export const schema = makeExecutableSchema({
	typeDefs: [
		baseDefs,
		Query,
		Mutation,
		TextSchema.typeDefs,
		UserSchema.typeDefs
	],

	resolvers: _.merge(
		baseResolvers,
		TextSchema.resolvers,
		UserSchema.resolvers
	)
});
