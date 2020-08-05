/**
 * @file Uses mongoose to open a database connection with mongodb
 */

import mongoose from 'mongoose';
import logger from 'loglevel';
import DatabaseConfig from './database-config.interface';
import config from '../config/database.json';

// environment types for config object
type Environment = keyof typeof config;

const defaults: DatabaseConfig = {
	database: 'my-project-database',
	host: 'localhost',
	port: '27017',
};

/**
 * Environment to get the configuration database
 */
const env = process.env.NODE_ENV || 'development';

// Uses dev db config if no env is configured
const options: DatabaseConfig = {
	...defaults,
	...config[env as Environment],
	...process.env,
};

/**
 * Database username and password from config object
 */
const credentials: string =
	options.username && options.password ?
		`${options.database}:${options.password}@`: '';

/**
 * Database URI use for connect function to open a mongodb connection. Using
 * env DATABASE_URL as a default if existis
 */
const DATABASE_URL: string =
  process.env.DATABASE_URL ||
  `mongodb://${credentials}${options.host}:${options.port}/` +
  `${options.database}`;

/**
 * Connects asynchronous to MongoDB using mongoose
 *
 * Use mongoose to open a connection using the underlying mondodb driver, sets
 * up the connection using DATABASE_URL and logging the connection events
 *
 * @return {Promise<typeofmongoose>} promise with mongoose connection
 */
async function connect(): Promise<typeof mongoose> {
	mongoose.connection.on('open', () => {
		logger.info('✅ MondoDB connected to', DATABASE_URL);
	});

	mongoose.connection.on('error', error => {
		logger.error(error);
	});

	mongoose.connection.on('close', () => {
		logger.info('❗️MongoDB disconnected');
	});

	return mongoose
		.connect(DATABASE_URL, { useNewUrlParser: true })
		.catch(error => {
			logger.error('❌ MongoDB failed in connect to ', DATABASE_URL);
			logger.error('Given the following error ', error);
			throw error;
		});
}

/**
 * Close database connection
 *
 * Uses mongoose connection object to disconnect from mongodb. Also logs a error
 * message if there's any
 *
 * @throws logs and rethrows the error sent by mongoose close connection
 * @return {Promise<void>} mongoose connection promise
 */
async function disconnect(): Promise<void> {
	try {
		return mongoose.connection.close();
	} catch (error) {
		logger.error('❌ Mongoose close connection error: ', error);
		throw error;
	}
}

process.on('SIGTERM', async () => {
	await disconnect();
	console.log('Heroku app shuted down');
	process.exit(0);
});

process.on('SIGINT', async () => {
	console.log('\nServer Interrupting...');

	await disconnect();
	console.log('⛔️ Server Shutted Down');
	process.exit(0);
});

process.once('SIGUSR2', async () => {
	console.log('\nServer Terminating...');

	await disconnect();
	console.log('❗️Nodemon restarted\n');
	process.kill(process.pid, 'SIGUSR2');
});

export { connect as setup, connect, disconnect };
