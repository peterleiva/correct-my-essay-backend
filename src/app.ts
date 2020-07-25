/**
 * @fileoverview Express startup. Declare all application express middleware
 */

import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import * as path from 'path';
import * as logger from 'loglevel';
import { setup } from './database/setup';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

// logger setup
const testEnv = process.env.NODE_ENV === 'test';
logger.setLevel(<logger.LogLevelDesc>process.env.LOG_LEVEL ||
  (testEnv? 'warn' : 'info'));

// database setup
setup();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
