import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { TokenModel, TokenModelSchema, Tokens } from '../models/token/index.js';
import { ApiError } from '../exception/ApiError.js';

dotenv.config();

const accessKey = process.env.JWT_ACCESS_SECRET || 'secret_access';
const refreshKey = process.env.JWT_REFRESH_SECRET || 'secret_refresh';

export class TokenService {
	public static generateTokens(payload: any): Tokens {
		const accessToken = jwt.sign(payload, accessKey, { expiresIn: '1d' });
		const refreshToken = jwt.sign(payload, refreshKey, {
			expiresIn: '30d',
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	public static validateAccessToken(
		token: string
	): string | jwt.JwtPayload | null {
		try {
			const userData = jwt.verify(token, accessKey);
			return userData;
		} catch (error) {
			return null;
		}
	}

	public static validateRefreshToken(
		token: string
	): string | jwt.JwtPayload | null {
		try {
			const userData = jwt.verify(token, refreshKey);
			return userData;
		} catch (error) {
			return null;
		}
	}

	public static async saveToken(
		userId: string,
		refreshToken: string
	): Promise<TokenModelSchema> {
		const tokenData = await TokenModel.findById(userId);
		if (tokenData) {
			tokenData.token = refreshToken;
			return tokenData.save();
		}

		const token = await TokenModel.create({
			user: userId,
			token: refreshToken,
		});

		return token;
	}

	public static async removeToken(refreshToken: string) {
		const tokenDeleteResult = await TokenModel.deleteOne({
			token: refreshToken,
		});
		return tokenDeleteResult;
	}

	public static async findToken(
		refreshToken: string
	): Promise<TokenModelSchema> {
		const tokenData = await TokenModel.findOne({ token: refreshToken });

		if (!tokenData) {
			throw ApiError.unauthorized();
		}

		return tokenData;
	}
}

export const tokenService = new TokenService();
