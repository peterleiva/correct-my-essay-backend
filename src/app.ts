/**
 * @file Express startup. Define application express middlewares
 */

import './config/dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import * as path from 'path';
import * as logger from 'loglevel';
import * as database from './database/setup';
import { passport, router as requireAuth } from './security/passport';
import cors from './lib/middlewares/cors';
import { jsonApiErrorHandlers } from './lib/json-api';
import ApolloServer from './graphql/apollo-server';
import duplicatedHandler from './lib/errors/duplicated.handler';

// logger setup
const testEnv = process.env.NODE_ENV === 'test';
logger.setLevel(<logger.LogLevelDesc>process.env.LOG_LEVEL ||
  (testEnv? 'warn' : 'info'));

database.setup();
const app = express();

app.use(helmet());
// @see https://www.npmjs.com/package/helmet
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(express.json({
	type: ['application/json', 'application/vns.api+json'],
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.use(cors);

app.use(passport.initialize(), requireAuth);
app.use(ApolloServer);
app.use(duplicatedHandler);
app.use(jsonApiErrorHandlers);

export default app;
