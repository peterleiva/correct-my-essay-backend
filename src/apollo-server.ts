/**
 * @file Constructs a apollo server to setup GraphQL server
 */

import { ApolloServer } from 'apollo-server-express';
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
	tracing: true
});
