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

app.use(passport.initialize());
app.use(authRouter);
app.use(usersRouter);

export default app;
