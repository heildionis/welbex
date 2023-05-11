import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../exception/ApiError.js';
import { TokenService } from '../services/token.service.js';

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return next(ApiError.unauthorized());
		}

		const accessToken = authorizationHeader.split(' ')[1];
		if (!accessToken) {
			return next(ApiError.unauthorized());
		}

		TokenService.validateAccessToken(accessToken);

		next();
	} catch (e) {
		return next(ApiError.unauthorized());
	}
};
