/**
 * @fileoverview GraphQL schema
 */

import { GraphQLSchema } from 'graphql';
import { UserQueryType, UserMutationType } from './user/user.types';

export default new GraphQLSchema({
	query: UserQueryType,
	mutation: UserMutationType,
});
