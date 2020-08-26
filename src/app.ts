/**
 * @file Express startup. Define application express middlewares
 */

import './config/dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import * as path from 'path';
import * as logger from 'loglevel';
import * as database from './database/setup';
import { passport, router as authRouter } from './security/passport';
import cors from './lib/middlewares/cors';
import { router as usersRouter } from './user';
import { jsonApiErrorHandlers } from './lib/json-api';
import { graphqlHTTP } from 'express-graphql';
import { ApolloServer } from 'apollo-server-express';
import graphqlSchema, { schema } from './schema';
import duplicatedHandler from './lib/errors/duplicated.handler';

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

app.use(cors);
app.use(passport.initialize());
app.use(authRouter);

const apolloServer = new ApolloServer({
	schema,
	engine: {
		reportSchema: true,
		graphVariant: 'current',
		debugPrintReports: true
	}
});

apolloServer.applyMiddleware({
	app,
	path: '/api/v2'
});

app.use('/api', graphqlHTTP({
	schema: graphqlSchema,
	graphiql: process.env.NODE_ENV === 'development',
}));
app.use(usersRouter);
app.use(duplicatedHandler);
app.use(jsonApiErrorHandlers);

export default app;
