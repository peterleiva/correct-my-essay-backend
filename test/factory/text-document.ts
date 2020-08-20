import { Factory } from 'rosie';
import * as faker from 'faker';
import UserFactory from './user';

export default new Factory()
	.attrs({
		title: faker.name.title(),
		author: UserFactory.build({}, { student: true }),
		text: faker.lorem.paragraphs()
	});
