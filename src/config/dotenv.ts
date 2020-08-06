/**
 * @fileoverview dotenv config initializer
 */

import { config } from 'dotenv';

const result = config();

if (result.error) {
	throw result.error;
}

if (!process.env.JWT_SECRET) {
	throw new Error('JWT_SECRET must be defined');
}
