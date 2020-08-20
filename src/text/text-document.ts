/**
 * @fileoverview Text Document model definition
 */

import { SchemaTypes, Schema, Model, Document, model } from 'mongoose';
import { UserDocument, UserModel } from '../user';
import { StudentModel } from '../user/student';
import { UserType } from 'src/user/user';

/**
 * Text document interface
 */
class TextDocument {
	author: UserDocument;
	title: string;
	text: string;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Mongoose document extends TextDocument and MongooseDocument
 */
type TextMongoDocument = TextDocument & Document;

/**
 * Text Document mongoose model, TextmongoDocument creator type
 */
type TextDocumentModel = Model<TextMongoDocument>;

/**
 * Text Document schema definition
 */
const schema = new Schema<TextMongoDocument>({
	title: {
		type: String,
		trim: true,
		unique: true,
		maxlength: 120,
		default: () => `Text ${new Date().toISOString()}`,
	},
	text: {
		type: String,
		default: '',
		maxlength: 10**7
	},

	author: {
		type: SchemaTypes.ObjectId,
		ref: StudentModel,
		required: true,
		validate: {
			validator: async (authorId: Schema.Types.ObjectId) => {
				const user = await UserModel.findById(authorId);
				return user['__t'] === UserType.Student;
			},

			message: `Author must be a student`
		}
	}
}, { timestamps: true });

const textDocumentModel = model<TextMongoDocument>('TextDocument',
	schema);

export {
	textDocumentModel as TextDocumentModel,
	TextMongoDocument as TextDocument
};

export default textDocumentModel;
