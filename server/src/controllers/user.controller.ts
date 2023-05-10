import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import colors from 'colors';

import { userService } from '../services/user.service.js';

dotenv.config();

// Enter ORIGIN_URL in .env file
const clientURL = process.env.ORIGIN_URL || '';

// Class which controls user routes
class UserController {
	// Registrating user and setting refreshToken in cookies
	async registration(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | undefined> {
		try {
			// Validating request
			const errors = validationResult(req);
			// if (!errors.isEmpty()) {
			// 	return next(
			// 		ApiError.badRequest('Ошибка при валидации', errors.array())
			// 	);
			// }

			// Registrating user in app
			const { email, password } = req.body;
			const userData = await userService.registration(email, password);

			// Setting refresh token in cookies
			res.cookie('refreshToken', userData?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			// Log
			const userDataLog = colors.green(JSON.stringify(userData));
			console.log(userDataLog);

			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}
	// Logging in user and setting refreshToken in cookies
	async login(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | undefined> {
		try {
			// Logging user
			const { email, password } = req.body;
			const userData = await userService.login(email, password);

			// Setting refresh token in cookies
			res.cookie('refreshToken', userData?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			// Log
			const userDataLog = colors.yellow(JSON.stringify(userData));
			console.log(userDataLog);

			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}
	// Logging out user
	async logout(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | undefined> {
		try {
			// Deleting refreshToken from db
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);

			// Clearing cookies
			res.clearCookie('refreshToken');

			return res.json(token);
		} catch (error) {
			next(error);
		}
	}
	// Refreshing refreshToken
	async refresh(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | undefined> {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);

			// Setting refresh token in cookies
			res.cookie('refreshToken', userData?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			const userDataLog = colors.cyan(JSON.stringify(userData));

			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
