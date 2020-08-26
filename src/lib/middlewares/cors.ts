/**
 * @file Cors middleware. Setup to CORS configuration
 */

import cors, { CorsOptions } from 'cors';
import express from 'express';

const router = express.Router();

/**
 * Permitted uri's
 */
const whitelist = [/localhost/, 'https://studio.apollographql.com'];

/**
 * Configure cors using cors package
 * @see https://www.npmjs.com/package/cors
 */
const config: CorsOptions = {
	origin: whitelist,
	optionsSuccessStatus: 200
};

router.options('*', cors(config));
router.use(cors(config));

export default router;
