import { hashSync, compare, genSaltSync } from 'bcrypt';
import { v4 as generateIdV4 } from 'uuid';

import { UserDto } from '../dtos/user.dto.js';
import { ApiError } from '../exception/ApiError.js';
import { UserModel } from '../models/user/index.js';
import { tokenService } from './token.service.js';

class UserService {
	async registration(email: string, password: string) {
		const candidate = await UserModel.findOne({ email });
		if (candidate) {
			throw ApiError.badRequest(
				`Пользователь с почтовым адресом ${email} уже существует`
			);
		}

		const salt = genSaltSync(5);
		const hashPassword = hashSync(password, salt);
		const activationLink = generateIdV4();

		const user = await UserModel.create({
			email,
			password: hashPassword,
			activationLink,
		});
		const userDto = new UserDto(user);

		const tokens = tokenService.generateTokens({ ...userDto });
		if (!tokens) {
			throw ApiError.notFound('TOKENS NOT FOUND');
		}
		await tokenService.saveToken(user.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}
	async login(email: string, password: string) {
		const candidate = await UserModel.findOne({ email });
		if (!candidate) {
			throw ApiError.badRequest('Пользователь с таким email не найден');
		}

		const isCorrectPassword = compare(password, candidate.password);
		if (!isCorrectPassword) {
			throw ApiError.badRequest('Неверный пароль');
		}

		const userDto = new UserDto(candidate);
		const tokens = tokenService.generateTokens({ ...userDto });
		if (!tokens) {
			throw ApiError.notFound('TOKENS NOT FOUND');
		}
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}
	async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}
	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw ApiError.unauthorized();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const token = await tokenService.findToken(refreshToken);

		if (!userData || !token) {
			throw ApiError.unauthorized();
		}
		if (typeof userData === 'string') {
			throw ApiError.unauthorized();
		}
		const user = await UserModel.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		if (!tokens) {
			throw ApiError.notFound('TOKENS NOT FOUND');
		}
		await tokenService.saveToken(userDto.id, tokens?.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}
}

export const userService = new UserService();
