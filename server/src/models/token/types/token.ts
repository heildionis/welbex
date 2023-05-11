import { Document, Schema } from 'mongoose';

export interface Tokens {
	accessToken: string;
	refreshToken: string;
}

export interface Token {
	user: Schema.Types.ObjectId;
	token: string;
}

export interface TokenModelSchema extends Token, Document {}
