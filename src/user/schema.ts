/**
 * @file GraphQL user module types
 */

import { getUserById, getAllUsers, deleteUser, createUser } from './controller';
import { UserDocument } from '.';
import { gql } from 'apollo-server-express';

type UserArgID = {
	id: string;
};

type CreateUserResolveArg = {
	input: UserDocument;
};

/**
 * User schema definition
 */
export const typeDefs = gql`
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
		"Indicates whether the user is active or not"
		active: Boolean!
		"Date of user creation"
		joinedIn: Date!
		"Date when was last updated"
		updatedAt: Date!
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
	UserName: {
		first: (user: UserDocument): string => user.firstName,
		last: (user: UserDocument): string => user.lastName,
		full: (user: UserDocument): string => user.name,
	},

	User: {
		name: (user: UserDocument): UserDocument => user,
	},

	Query: {
		users: (): Promise<UserDocument[]> => getAllUsers(),

		user(parent: null, { id }: UserArgID): Promise<UserDocument> {
			return getUserById(id);
		},
	},

	Mutation: {
		createUser(
			parent: null,
			{ input }: CreateUserResolveArg
		): Promise<UserDocument> {
			return createUser(input);
		},

		deleteUser(parent: null, { id }: UserArgID): Promise<UserDocument> {
			return deleteUser(id);
		},
	},
};
