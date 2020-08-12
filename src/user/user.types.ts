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

const CredentialInputType = new GraphQLInputObjectType({
	name: 'CredentialInput',
	fields: {
		password: { type: GraphQLString },
	},
});

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
