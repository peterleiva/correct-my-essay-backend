import { SchemaType } from 'mongoose';

declare module 'mongoose' {
	namespace Schema {
		namespace Types {
			// eslint-disable-next-line require-jsdoc
			class Email extends SchemaType {}
		}
	}
}
