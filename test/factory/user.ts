/**
 * @file User factory file
 */

import { Factory } from 'rosie';
import * as faker from 'faker';

export default new Factory()
	.attrs({
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		email: faker.internet.email(),
	})
	.sequence('email', () => faker.internet.email())
	.attr('active', false)
	.option('password', false)
	.option('withCredential', false)
	.attr(
		'credential',
		['password', 'withCredential'],
		(password, withCredential) => {
			if (password) return { password: password };

			return withCredential ? { password: faker.internet.password() } : null;
		}
	);
