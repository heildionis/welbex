import { Document } from 'mongoose';
import { UserModelSchema } from '../../user/index.js';

export interface Tokens {
	accessToken: string;
	refreshToken: string;
}

export interface Token {
	user: UserModelSchema;
	token: string;
}

export interface TokenModelSchema extends Token, Document {}
