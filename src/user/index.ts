/**
 * @fileoverview User module index
 */

import router from './user.router';

export { UserModel, UserDocument, UserType } from './user';
export { StudentModel, StudentDocument } from './student';
export { router };
export * as UserSchema from './user.schema';
