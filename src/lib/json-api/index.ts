/**
 * @file Module exports and definitions
 */

import Serializer from './serializer';
import { JsonApiError } from './errors';

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
	parameter?: string;
}

export { Serializer, JsonApiError };
