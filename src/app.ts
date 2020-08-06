/**
 * @fileoverview Express startup. Declare all application express middleware
 */

import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import * as path from 'path';
import * as logger from 'loglevel';
import * as database from './database/setup';
import { passport, router } from './security/passport';
import indexRouter from './routes/index';
import { router as usersRouter } from './user';

// logger setup
const testEnv = process.env.NODE_ENV === 'test';
logger.setLevel(<logger.LogLevelDesc>process.env.LOG_LEVEL ||
  (testEnv? 'warn' : 'info'));

database.setup();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use(passport.initialize());
app.use(router);
app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
