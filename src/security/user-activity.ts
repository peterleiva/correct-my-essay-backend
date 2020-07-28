/**
 * @file This file contains models for user account activity
 */

import { Schema, SchemaTypes } from 'mongoose';

const activitySchema = new Schema({
	ip: String,
	user_id: {
		type: SchemaTypes.ObjectId,
		ref: 'User',
	},
});

export { activitySchema as Schema };
