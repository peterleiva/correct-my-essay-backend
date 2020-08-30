/**
 * @file Constructs a apollo server to setup GraphQL server
 */

import { GraphQLError } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import * as loglevel from 'loglevel';
import { MongoError } from 'mongodb';
import { schema } from './schema';
import BaseError from '../lib/errors/base-error';

export const PATH = '/api';

const server = new ApolloServer({
	schema,
	logger: loglevel,
	engine: {
		reportSchema: true,
		graphVariant: 'current',
		debugPrintReports: true,
	},
	// The apollo server definiton defines this for local development
	// @see https://www.apollographql.com/docs/apollo-server/data/resolvers/#monitoring-resolver-performance
	tracing: true,
	formatError: (gqlError: GraphQLError) => {
		const from = Object.create(gqlError.originalError ?? gqlError);
		const error = Object.assign(new BaseError, from, {
			name: from.name
		});

		// log all errors
		loglevel.error(`${error.id}: ${error.dateISOString}`);
		loglevel.error(error);

		return gqlError;
	}
});

export default server.getMiddleware({
	path: PATH
});
