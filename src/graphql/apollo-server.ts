/**
 * @file Constructs a apollo server to setup GraphQL server
 */

import { GraphQLError } from 'graphql';
import { Request } from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as loglevel from 'loglevel';
import { schema } from './schema';
import BaseError from '../lib/errors/base-error';
import { UserDocument } from 'src/user';

export const PATH = '/api';

export const APOLLO_CONFIG = {
	schema,
	context: ({ req }: { req: Request } ): UserDocument => {
		return req.user as UserDocument;
	},
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
};

export const server = new ApolloServer(APOLLO_CONFIG);

export const middleware = server.getMiddleware({
	path: PATH
});

export default middleware;
