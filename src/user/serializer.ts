/**
 * @file User serializer
 */

import Serializer from '../lib/json-api/serializer';
import { UserDocument } from '.';

Serializer.register('users', {
	whitelist: [
		'name',
		'firstName',
		'lastName',
		'email',
		'active',
		'joinedIn',
		'updatedAt',
	],

	links: (data: UserDocument) => data && '/users/' + data.id,
});

export default Serializer;
