import { Request, Response } from 'express';
import { ApiError } from '../exception/ApiError.js';
import colors from 'colors';

// Error handling middleware
export const errorMiddleware = (
	err: any,
	req: Request,
	res: Response,
	next: Function
) => {
	console.log(colors.red(err));

	if (!(err instanceof ApiError)) {
		return res.status(err.status).json(err.message);
	}

	return res.status(500).json('Unhappend error');
};
