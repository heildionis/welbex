import { Document } from 'mongoose';

export interface Post {
	date: Date;
	message: string;
	author: string;
	media?: string;
}

export interface PostModelSchema extends Post, Document {}
