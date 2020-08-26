/**
 * @file Middleware checks id params for ObjectId validity
 */

import { Request, Response, Handler, NextFunction } from 'express';
import { Types } from 'mongoose';
import { JsonApiError, Serializer } from '../json-api';

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
		const error = new JsonApiError('Invalid id param');

		error.status = '404';
		error.title = 'Invalid identifier param';
		error.detail = 'You must supply a valid id parameter. For example: '+
		'9f2de1cf26c2941de3d6f980';

		if (!Types.ObjectId.isValid(req.params[param])) {
			res.status(404).send(Serializer.serializeError(error));
			return;
		}

		next();
	});
};
