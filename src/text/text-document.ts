/**
 * @fileoverview Text Document model
 */

import { SchemaTypes, Schema, Model, Document, model } from 'mongoose';
import { UserDocument } from '../user';
import { StudentModel } from '../user/student';

/**
 * Text document model
 */
class TextDocument {
	title: string;
	author: UserDocument;
	text: string;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Mongoose document consisting of TextDocument and MongooseDocument
 */
type TextMongoDocument = TextDocument & Document;

/**
 * Text Document mongoose model
 */
type TextDocumentModel = Model<TextMongoDocument>;

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

const textDocumentModel = model<TextMongoDocument>('TextDocument',
	schema);

export {
	textDocumentModel as TextDocumentModel,
	TextMongoDocument as TextDocument
};

export default textDocumentModel;
