/**
 * @fileoverview Express startup. Define application express middlewares
 */

import './config/dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import * as path from 'path';
import * as logger from 'loglevel';
import * as database from './database/setup';
import { passport, router as authRouter } from './security/passport';
import { router as usersRouter } from './user';
import { jsonApiErrorHandlers } from './lib/json-api';
import { graphqlHTTP } from 'express-graphql';
import graphqlSchema from './schema';
import duplicatedHandler from './lib/errors/duplicated.handler';
import cors, { CorsOptions } from 'cors';

// logger setup
const testEnv = process.env.NODE_ENV === 'test';
logger.setLevel(<logger.LogLevelDesc>process.env.LOG_LEVEL ||
  (testEnv? 'warn' : 'info'));

database.setup();
const app = express();

app.use(morgan('dev'));
app.use(express.json({
	type: ['application/json', 'application/vns.api+json'],
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

const corsConfig: CorsOptions = {
	origin: [/localhost/, 'https://studio.apollographql.com'],
	optionsSuccessStatus: 200,
};

app.options('*', cors(corsConfig));
app.use(cors(corsConfig));

app.use(passport.initialize());
app.use(authRouter);
app.use('/graphql', graphqlHTTP({
	schema: graphqlSchema,
	graphiql: process.env.NODE_ENV === 'development',
}));
app.use(usersRouter);
app.use(duplicatedHandler);
app.use(jsonApiErrorHandlers);

export default app;
