/**
 * @file GraphQL user module types
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
} from './controller';
import { UserDocument } from '.';
import { GraphQLDate } from '../graphql/custom-scalar';
import { Request } from 'express';
import { gql } from 'apollo-server-express';

/**
 * User schema definition
 */
export const schema = gql`

	"""
	Naming user type, all related to the user first, last name and its full name
	"""
	type UserName {
		"User firstname"
		first: String!
		"User lastname"
		last: String!
		"User full name concated from first + last names"
		full: String!
	}

	"""
	Represents a user from the system. User is like a base class, using a OO
	analogy methodology. User can have subtypes, like a student which is also a
	user but with aditional relationships/attributes. A user stored personal
	trackable information about the user and information to identifier a person.
	For example, email is its identifier used for log in to the system.
	"""
	type User {
		"User identifier"
		id: ID!
		"User naming which can returns any variable of first, last and full name"
		name: UserName!
		"User email used as a username to authenticate and identify a user"
		email: String!
		"Indicates wheter the user is active or not"
		active: String!
		"Date of user creation"
		joinedIn: String!
		"Date when was last updated"
  	updatedat: String!
	}

	"""
	User input used by createUser to create a user. It has the necessary
	information to create a new user. A user also can be created with a password
	credential, along with some personal identifiable information
	"""
	input UserInput {
		"User firstname"
		firstName: String!
		"User lastname"
		lastName: String!
		"User email used by the password credential to authenticate it"
		email: String!
		"User login credentials, uses a password to connect to the system"
		credential: CredentialInput
		"Indicates whether the user is created active or inactive"
		active: Boolean
	}

	"""
	User credential used by UserInput which used by userCreate mutation for
	creating a user with a password credential
	"""
	input CredentialInput {
		"Password credential"
		password: String!
	}

	extend type Query {
		"""
		Gets a list of users or empty array, with all registered users. This query
		is used by users with some level of authorization
		"""
		users: [User]!
		"""
		Get a single user by its id. Like query users this query is used by some
		users with apropriated level of authorization
		"""
		user(id: ID!): User
	}

	type UserResponse implements MutationResponse {
		"Response status like a HTTP code"
		code: String!
		"UI friendly message indicanding the operation status "
		message: String!
		"Indiciates wheter the operation happens with success or it was a failure"
		success: Boolean!
		"Gets the user when the mutation happens successfully"
		user: User
	}

	extend type Mutation {
		"""
		Create a single new user using input UserInput as its only argument, with
		user creation optional and required information, returning a UserReponse
		defining the operation status. Whenever User is created successfuly a user
		field is also filed
		"""
		createUser(input: UserInput!): UserResponse
		"""
		Delete a user by its id, like createUser it also returns a UserResponse type
		indicating the operation status
		"""
		deleteUser(id: ID!): UserResponse
	}
`;

/**
 * User resolvers for its schema definitions
 */
export const resolvers = {

};

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
 *  name: UserName!
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
export const query: GraphQLFieldConfigMap<null, Request> = {
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
export const mutation: GraphQLFieldConfigMap<UserDocument, Request> = {
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
