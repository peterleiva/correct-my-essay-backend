import { Factory } from 'rosie';
import * as faker from 'faker';
import { Types } from 'mongoose';

export default new Factory().attrs({
	title: faker.name.title(),
	text: faker.lorem.paragraphs(),
	author: new Types.ObjectId(),
});
