/**
 * @fileoverview User serializer
 */

import Serializer from '../lib/json-api/serializer';
import { UserDocument } from '.';

Serializer.register('users', {
	whitelist: [
		'firstName',
		'name',
		'lastName',
		'active',
		'joinedIn',
		'updatedAt',
	],

	links: (data: UserDocument) => data && '/users/' + data.id,
});

export default Serializer;
