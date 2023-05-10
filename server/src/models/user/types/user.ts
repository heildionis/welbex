import { Document } from 'mongoose';

export interface User {
	email: string;
	password: string;
	username: string;
}

export interface UserModelSchema extends User, Document {}
