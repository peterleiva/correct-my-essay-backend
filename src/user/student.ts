/**
 * @fileoverview Student Model definition
 */

import { Schema } from 'mongoose';
import { UserDocument, UserModel } from './user';
import { Model } from 'mongoose';

/**
 * Student interface
 */
interface Student {
	location?: string;
}

/**
 * Student document
 *
 * Student document consist of documents returned by mongoose api, which
 * represents MongoDB document. StudentDocument is created by StudentModel
 */
export type StudentDocument = UserDocument & Student;

/**
 * Student Schema definition
 */
export const StudentSchema = new Schema({
	location: String
}, { discriminatorKey: 'user_type' });

/**
 * StudentDocument creator compiled by UserModel discriminator
 *
 * StudantModel is defined in terms of UserModel using .discriminiator. Thereof,
 * it become a User subtype
 */
export const StudentModel: Model<StudentDocument> =
	UserModel.discriminator<StudentDocument>('Student', StudentSchema);

export default StudentModel;
