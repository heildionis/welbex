import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';

import { UserService } from '../services/user.service.js';
import { ApiError } from '../exception/ApiError.js';
import { ValidationErrors } from '../exception/constants/index.js';

dotenv.config();

export class UserController {
	public static async registration(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(
					ApiError.badRequest(
						ValidationErrors.VALIDATION_ERROR,
						errors.array()
					)
				);
			}

			const { email, password, username } = req.body;
			const userData = await UserService.registration(
				email,
				password,
				username
			);

			res.cookie('refreshToken', userData?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	public static async login(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const { email, password } = req.body;
			const userData = await UserService.login(email, password);

			res.cookie('refreshToken', userData?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	public static async logout(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { refreshToken } = req.cookies;
			await UserService.logout(refreshToken);

			res.clearCookie('refreshToken');
		} catch (error) {
			next(error);
		}
	}

	public static async refresh(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const { refreshToken } = req.cookies;
			const userData = await UserService.refresh(refreshToken);

			res.cookie('refreshToken', userData?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}
}
