/**
 * @fileoverview Text Document model definition
 */

import { SchemaTypes, Schema, Model, Document, model } from 'mongoose';
import { UserDocument, UserModel, StudentModel, UserType } from '../user';

/**
 * Text document interface
 */
class TextDocument {
	title: string;
	text: string;
	createdAt: Date;
	updatedAt: Date;
	author: UserDocument;
}

/**
 * Database document which contains a TextDocument
 */
type TextMongoDocument = TextDocument & Document;

/**
 * Text Document model, creator of TextDocument instances
 */
type TextDocumentModel = Model<TextMongoDocument>;

/**
 * Text Document schema definition
 */
export const TextDocumentSchema = new Schema<TextMongoDocument>({
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

/**
 * Compile schema into a text document model
 */
const textDocumentModel: TextDocumentModel =
	model<TextMongoDocument>('TextDocument', TextDocumentSchema);

export {
	textDocumentModel as TextDocumentModel,
	TextMongoDocument as TextDocument
};

export default textDocumentModel;
