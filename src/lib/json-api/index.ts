/**
 * @fileoverview Module exports and definitions
 */

import JsonApiError from './error';
import Serializer from './serializer';

export interface MetaObject {
	[member: string]: any;
}

export interface LinkObject {
	href?: string;
	meta?: MetaObject;
}

export interface Links {
	[member: string]: LinkObject | string;
}

export interface ErrorSource {
	pointer?: string;
	parmeter?: string;
}

export { JsonApiError, Serializer };
