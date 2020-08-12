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
} from 'graphql';
import { User } from './user';

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
		joinedIn: {
			type: GraphQLString,
			resolve: parent => parent.joinedIn.getTime(),
		},
		updatedAt: {
			type: GraphQLString,
			resolve: parent => parent.updatedAt.getTime(),
		},
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
export const UserQueryType = new GraphQLObjectType({
	name: 'Query',
	fields: {
		users: {
			type: new GraphQLList(UserType),
			resolve: async () => await User.find(),
		},
		user: {
			type: UserType,
			args: {
				id: { type: GraphQLID },
			},
		},
	},
});

/**
 * GraphQL user mutations
 *
 * Mutation {
 * 	createUser(input: UserInput): User
 * 	deleteUser(id: ID!): User
 * }
 *
 */
export const UserMutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createUser: {
			type: UserType,
			args: {
				input: { type: UserInputType },
			},
		},

		deleteUser: {
			type: UserType,
			args: {
				id: { type: GraphQLID },
			},
		},
	},
});
