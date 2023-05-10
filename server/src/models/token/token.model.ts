import { model, Schema } from 'mongoose';
import { TokenModelSchema } from './types/token.js';

const tokenSchema = new Schema<TokenModelSchema>({
	user: { type: Schema.Types.ObjectId, ref: 'user' },
	token: { type: String, required: true },
});

export const TokenModel = model<TokenModelSchema>('token', tokenSchema);
