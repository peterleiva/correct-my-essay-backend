/**
 * @file This files describe a database setup, to connect and disconnect
 * from database between tests
 */

import mongoose from 'mongoose';
import logger from 'loglevel';
import { connect, disconnect } from 'src/database/setup';

/**
 * Startup database process using app setup which uses mongoose
 *
 * Setup connects to the database and catchs a error and finish the process
 * if there's any error. Also return a promise with mongoose object
 *
 * @return {Promise<mongoose>}
 */
export async function setup(): Promise<typeof mongoose> {
	try {
		return await connect();
	} catch (error) {
		logger.error('Error trying setup test database', error);
		process.exit(0);
	}
}

/**
 * Cleanup the database removing all collections
 *
 * @return {Promise<void>}
 */
export async function dropAll(): Promise<void> {
	try {
		for (const collectionName of Object.getOwnPropertyNames(
			mongoose.connection.collections
		)) {
			const collection = mongoose.connection.collection(collectionName);
			await collection.remove({});
		}
	} catch (error) {
		logger.error('Error trying dropping the test database', error);
	}
}

/**
 * Closes and drop database
 *
 * Use the underlying application connection which uses mongoose to drop all the
 * entire database. This function is used for test teardown tests after each
 * request
 *
 * @return {Promise<void>}
 */
export async function teardown(): Promise<void> {
	try {
		return await disconnect();
	} catch (error) {
		logger.error('Error trying cleanup test database', error);
		process.exit(0);
	}
}
/**
 * Setup and teardown connect and disconnect from db before after in each run
 * respectively
 *
 * @return {void}
 */
export function databaseConnection(): void {
	beforeAll(setup);
	afterAll(teardown);
}

/**
 * Setup and teardown for database connection using test environment
 *
 * Before and after each test the database open the connection and closes it
 * dropping the entire database in the process
 *
 * @return {void}
 **/
export default function databaseSetup(): void {
	databaseConnection();
	afterEach(dropAll);
}
