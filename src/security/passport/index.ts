/**
 * @fileoverview index passport module
 */

import passport from './config';
import router from './authentication.router';

export interface Payload {
	readonly sub: string;
	readonly exp: Date;
}

export { passport as configuration, passport, router };
