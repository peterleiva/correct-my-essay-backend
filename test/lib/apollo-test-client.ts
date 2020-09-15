import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerTestClient,
	createTestClient,
} from 'apollo-server-testing';
import { APOLLO_CONFIG } from 'src/graphql/apollo-server';
import { User } from 'src/user';

/**
 * Create a Apollo test client with optional authenticated user to use as
 * context
 *
 * @see https://www.apollographql.com/docs/apollo-server/testing/testing/#createtestclient
 * @param {User} user User to return as a context to resolvers
 * @return {ApolloServerTestClient}
 */
export default (user?: User): ApolloServerTestClient => {
	const config = Object.assign(APOLLO_CONFIG, {
		context: () => user,
	});

	return createTestClient(new ApolloServer(config));
};
