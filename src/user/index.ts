/**
 * @file User module index
 */

import router from './router';

export { router };
export { UserModel, UserDocument, UserType } from './user';
export { StudentModel, StudentDocument } from './student';
export * as UserSchema from './schema';
