
import { Document } from 'mongoose';

interface Test {
	email?: string;
}

interface TestDocument extends Test, Document { }

describe('Mongoose.Types.Email', () => {
	test.todo('Throws a CastError for non-string value');
});
