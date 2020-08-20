/**
 * @fileoverview index from Passport Module
 */

import passport from './config';
import router from './authentication.router';

export interface Payload {
	readonly sub: string;
	readonly exp: Date;
}

export { passport, router };
