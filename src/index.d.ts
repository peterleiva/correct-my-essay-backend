import { SchemaType } from 'mongoose';

export declare module 'mongoose' {
	namespace Schema {
		namespace Types {
			// eslint-disable-next-line require-jsdoc
			class Email extends SchemaType {}
		}
	}
}
