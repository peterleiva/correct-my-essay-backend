/**
 * @file Define error handles dealed by express errors
 */

import duplicatedErrorHandler from './duplicated-error-handler';
import validationErrorHandler from './validation-error.handler';

const handlers = [duplicatedErrorHandler, validationErrorHandler];

export default handlers;
