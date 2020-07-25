/**
 * @file Uses mongoose to open a database connection with mongodb
 */

import mongoose from 'mongoose';
import logger from 'loglevel';
import config from '../config/database.json';

// Uses dev db config if no env is configured
const {
  DATABASE_NAME = config.dev?.database,
  DATABASE_USER = config.dev?.username || '',
  DATABASE_PASSWORD = config.dev?.password || '',
  DATABASE_PORT = config.dev?.port || '27017',
  DATABASE_HOST = config.dev?.host || 'localhost',
} = process.env;

/**
 * Database username and password from config object
 * @type {string}
 */
const DATABASE_CREDENTIALS =
  DATABASE_USER && DATABASE_PASSWORD
    ? `${DATABASE_NAME}:${DATABASE_PASSWORD}@`
    : '';

/**
 * Database URI use for connect function to open a mongodb connection
 * @type {string}
 */
const DATABASE_URL =
  process.env.DATABASE_URL ||
  `mongodb://${DATABASE_CREDENTIALS}${DATABASE_HOST}:${DATABASE_PORT}/` +
  `${DATABASE_NAME}`;

/**
 * Connects to MongoDB using mongoose
 * 
 * Use mongoose to open a connection using the underlying mondodb driver, sets
 * up the connection using DATABASE_URL and logging the connection events
 * 
 * @returns {Promise<mongoose>} promise with mongoose connection
 */
async function connect() {
  mongoose.connection.on('open', () => {
    logger.info('✅ MondoDB connected to', DATABASE_URL);
  });

  mongoose.connection.on('error', (error) => {
    logger.error(error);
  });

  mongoose.connection.on('close', () => {
    logger.info('❗️MongoDB disconnected');
  });

  return mongoose
    .connect(DATABASE_URL, { useNewUrlParser: true })
    .catch((error) => {
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
 * @returns {Promise<void>} mongoose connection promise
 */
async function disconnect() {
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

export { connect as setup, disconnect };