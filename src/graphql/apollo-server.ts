/**
 * @file Constructs a apollo server to setup GraphQL server
 */

import { GraphQLError } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import * as loglevel from 'loglevel';
import { schema } from './schema';

export default new ApolloServer({
	schema,
	engine: {
		reportSchema: true,
		graphVariant: 'current',
		debugPrintReports: true,
	},
	// The apollo server definiton defines this for local development
	// @see https://www.apollographql.com/docs/apollo-server/data/resolvers/#monitoring-resolver-performance
	tracing: true,
	formatError: (error: GraphQLError) => {
		// log all errors
		loglevel.error(error);

		return error;
	}
});
