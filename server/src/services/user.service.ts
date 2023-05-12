import { hashSync, compare, genSaltSync } from 'bcrypt';

import { UserDto } from '../dtos/user.dto.js';
import { ApiError } from '../exception/ApiError.js';
import { UserModel } from '../models/user/index.js';
import { TokenService } from './token.service.js';
import { UserErrors } from '../exception/constants/user.errors.js';
import { Tokens } from '../models/token/index.js';
import { Schema } from 'mongoose';

interface UserData extends Tokens {
	user: UserDto;
}

export class UserService {
	public static async registration(
		password: string,
		username: string
	): Promise<UserData> {
		const candidateWithUsername = await UserModel.findOne({ username });
		if (candidateWithUsername) {
			throw ApiError.badRequest(UserErrors.USER_EXIST);
		}

		const salt = genSaltSync(5);
		const hashPassword = hashSync(password, salt);

		const user = await UserModel.create({
			password: hashPassword,
			username,
		});
		const userDto = new UserDto(user);

		const tokens = TokenService.generateTokens({ ...userDto });

		await TokenService.saveToken(user.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	public static async login(
		username: string,
		password: string
	): Promise<UserData> {
		const candidate = await UserModel.findOne({ username });
		if (!candidate) {
			throw ApiError.badRequest(UserErrors.USER_NOT_FOUND);
		}

		const isCorrectPassword = compare(password, candidate.password);
		if (!isCorrectPassword) {
			throw ApiError.badRequest(UserErrors.INCORRECT_AUTHDATA);
		}

		const userDto = new UserDto(candidate);
		const tokens = TokenService.generateTokens({ ...userDto });

		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	public static async logout(refreshToken: string) {
		if (!refreshToken) {
			throw ApiError.unauthorized();
		}

		const token = await TokenService.removeToken(refreshToken);
		return token;
	}

	public static async refresh(refreshToken: string): Promise<UserData> {
		if (!refreshToken) {
			throw ApiError.unauthorized();
		}

		const userData = TokenService.validateRefreshToken(refreshToken);
		const token = await TokenService.findToken(refreshToken);

		if (!userData || !token) {
			throw ApiError.unauthorized();
		}

		if (typeof userData === 'string') {
			throw ApiError.unauthorized();
		}

		const user = await UserModel.findById(userData.id);

		if (!user) {
			throw ApiError.notFound(UserErrors.USER_NOT_FOUND);
		}

		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });

		await TokenService.saveToken(userDto.id, tokens?.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	public static async findUserByName(username: string) {
		const user = await UserModel.findOne({ username });
		if (!user) {
			throw ApiError.notFound(UserErrors.USER_NOT_FOUND);
		}

		return user;
	}

	public static async findUserById(id: Schema.Types.ObjectId) {
		const user = await UserModel.findById(id);
		if (!user) {
			throw ApiError.notFound(UserErrors.USER_NOT_FOUND);
		}

		return user;
	}
}
