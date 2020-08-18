/**
 * @fileoverview Text Document model
 */

import { SchemaTypes, Schema } from 'mongoose';
import { User } from '../user';
import { model } from 'mongoose';
import { StudentModel } from '../user/student';

/**
 * Text document model
 */
type TextDocument = {
	title: string;
	author: User;
	text: string;
	createdAt: Date;
	updatedAt: Date;
};

/**
 * Text Document mongoose model
 */
type TextDocumentModel = Model<TextDocument>;

/**
 * Mongoose document consisting of TextDocument and MongooseDocument
 */
type document = TextDocument & Document;

/**
 * Text Document schema
 */
const schema = new Schema({
	title: {
		type: String,
		trim: true,
		default: () => `text_${new Date().toISOString()}`,
		unique: true,
		maxlength: 120,
	},

	author: {
		type: SchemaTypes.ObjectId,
		ref: StudentModel,
		required: true,
		// validate: {
		// 	validator: async (authorId: SchemaType.ObjectId) => {
		// 		const author = await UserModel.findById(authorId);
		// 		return author.userType === 'Student';
		// 	},

		// 	message: `Author must be a student`
		// }
	}
}, { timestamps: true });

const textDocumentModel = model<document>('TextDocument', schema);

export { textDocumentModel as TextDocumentModel, document as TextDocument };
export default textDocumentModel;
