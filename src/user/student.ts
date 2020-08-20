/**
 * @fileoverview Student Model definition
 */

import { Schema } from 'mongoose';
import { UserDocument, UserModel } from './user';
import { Model } from 'mongoose';

/**
 * Student interface
 */
class Student {
	location?: string;
}

/**
 * Student mongo document
 */
type StudentDocument = UserDocument & Student;

/**
 * StudentDocument creator
 */
type StudentModel = Model<StudentDocument>;

/**
 * Student subtype schema
 */
const schema = new Schema({
	location: String
});

export const studentModel = UserModel
	.discriminator<StudentDocument>('Student', schema);

export default studentModel;
export {
	schema as StudentSchema, StudentDocument,
	studentModel as StudentModel
};
