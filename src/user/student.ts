/**
 * @fileoverview Student Model definition
 */

import { Schema } from 'mongoose';
import { UserSchema, UserDocument } from './user';
import { model } from 'mongoose';

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
const schema = Schema({}, schemaOptions); // empty schema, only define subtype

export const Student: StudentModel = model<StudentDocument>(UserSchema, schema);

export default Student;
export { schema as StudentSchema, StudentDocument, Student as StudentModel };
