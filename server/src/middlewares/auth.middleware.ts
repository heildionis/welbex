import { NextFunction, Response } from 'express';

import { ApiError } from '../exception/ApiError.js';
import { tokenService } from '../services/token.service.js';

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return next(ApiError.unauthorized());
		}

		const accessToken = authorizationHeader.split(' ')[1];
		if (!accessToken) {
			return next(ApiError.unauthorized());
		}

		const userData = tokenService.validateAccessToken(accessToken);

		req.user = userData;
		next();
	} catch (e) {
		return next(ApiError.unauthorized());
	}
};
