/**
 * @fileoverview Student Model definition
 */

import { Schema } from 'mongoose';
import { UserDocument, UserModel } from './user';
import { Model } from 'mongoose';

/**
 * Student mongoose document representation
 */
type StudentDocument = UserDocument;

/**
 * Student mongoose Model, StudentDocument creator
 */
type StudentModel = Model<StudentDocument>;

/**
 * Defines student discriminator at User as userType
 */
const schemaOptions = { discriminatorKey: 'userType' };

/**
 * Student subtype schema
 */
const schema = new Schema({}, schemaOptions); // empty schema, only subtype

export const Student = UserModel.discriminator('Student', schema);

export default Student;
export { schema as StudentSchema, StudentDocument, Student as StudentModel };
