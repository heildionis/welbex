import { model, Schema } from 'mongoose';
import { UserModelSchema } from './types/user.js';

const userSchema = new Schema<UserModelSchema>({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
});

export const UserModel = model<UserModelSchema>('user', userSchema);
