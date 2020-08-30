/**
 * @file Constructs a apollo server to setup GraphQL server
 */

import { GraphQLError } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import * as loglevel from 'loglevel';
import { MongoError } from 'mongodb';
import { schema } from './schema';
import AlreadyExistsError from 'src/lib/errors/already-exists-error';
import BaseError from '../lib/errors/base-error';

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
		if (error.originalError instanceof MongoError) {
			throw new BaseError(error.originalError.message);
		}

		// log all errors
		loglevel.error(error.originalError);

		return error;
	}
});
