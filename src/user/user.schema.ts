/**
 * @fileoverview GraphQL user module types
 */

import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLInputObjectType,
	GraphQLBoolean,
	GraphQLString,
	GraphQLList,
	GraphQLFieldConfigMap
} from 'graphql';
import {
	getUserById,
	getAllUsers,
	deleteUser,
	createUser,
} from './user.controller';
import { UserDocument } from '.';
import { GraphQLDate } from '../graphql/custom-scalar';

/**
 * GraphQL UserName Type
 *
 * type UserName {
 * 	first: String!
 *  last: String!
 * 	full: String!
 * }
 *
 */
const UserNameType = new GraphQLObjectType({
	name: 'UserName',
	fields: {
		first: {
			type: GraphQLString,
			resolve: parent => parent.firstName,
		},
		last: {
			type: GraphQLString,
			resolve: parent => parent.lastName,
		},
		full: {
			type: GraphQLString,
			resolve: parent => parent.name,
		},
	},
});

/**
 * GraphQL UserName Type
 *
 * type User {
 * 	id: ID!
 *  name: UserNamy!
 * 	email: String!
 * 	active: String!
 * 	joinedIn: String!
 *  updatedat: String!
 * }
 *
 */
export const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLID },
		name: {
			type: UserNameType,
			resolve: parent => parent,
		},
		email: { type: GraphQLString },
		active: { type: GraphQLBoolean },
		joinedIn: { type: GraphQLDate },
		updatedAt: { type: GraphQLDate },
	},
});

/**
 * GraphQL CredentialInput input
 *
 * input CredentialInput {
 * 	password: String!
 * }
 *
 */
const CredentialInputType = new GraphQLInputObjectType({
	name: 'CredentialInput',
	fields: {
		password: { type: GraphQLString },
	},
});

/**
 * GraphQL UserInput input
 *
 * input UserInput {
 * 	firstName: String!
 *  lastName: String!
 * 	email: String!
 *  credential: CredentialInput
 * 	active: Boolean
 * }
 *
 */
const UserInputType = new GraphQLInputObjectType({
	name: 'UserInput',
	fields: {
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		email: { type: GraphQLString },
		credential: { type: CredentialInputType },
		active: { type: GraphQLBoolean },
	},
});

/**
 * GraphQL User queries
 *
 * type Query {
 * 	users: [User]!
 * 	user(id: ID!): User
 * }
 *
 */
export const UserQueryType: GraphQLFieldConfigMap<null, null> = {
	users: {
		type: new GraphQLList(UserType),
		resolve: getAllUsers,
	},
	user: {
		type: UserType,
		args: {
			id: { type: GraphQLID },
		},
		resolve: async (_: null,
			{ id }: UserQueryArg): Promise<UserDocument | null> => getUserById(id),
	},
};

type UserQueryArg = {
	id?: string
};

type CreateUserResolveArg = {
	input?: UserDocument
};

/**
 * GraphQL user mutations
 *
 * type mutation {
 * 	createUser(input: UserInput!): User
 * 	deleteUser(id: ID!): User
 * }
 *
 */
export const UserMutationType: GraphQLFieldConfigMap<UserDocument, null> = {
	createUser: {
		type: UserType,
		args: {
			input: { type: UserInputType },
		},

		resolve: (_: UserDocument,
			{ input }: CreateUserResolveArg): Promise<UserDocument> | undefined =>
			input && createUser(input),
	},

	deleteUser: {
		type: UserType,
		args: {
			id: { type: GraphQLID },
		},

		resolve: (_: null, { id }: {id: string}): Promise<UserDocument> =>
			deleteUser(id),
	},
};
