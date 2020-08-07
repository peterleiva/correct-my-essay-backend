/**
 * @fileoverview Middleware checks id params for ObjectId validity
 */

import { Request, Response, Handler, NextFunction } from 'express';
import { Types } from 'mongoose';

/**
 * Checks the request param for a valid mongoose objectid type
 *
 * Those checks is made on .findByOne method which causes a error if it can't be
 * cast. So, this method takes a generic params and test it
 *
 * @param {String} param param to be checked
 * @return {express.Handler}
 */
export default (param: string): Handler => {
	return (async function(req: Request, res: Response,
		next: NextFunction): Promise<void> {
		if (!Types.ObjectId.isValid(req.params[param])) {
			res.status(404).send({ error: 'invalid id' });
			return;
		}

		next();
	});
};
