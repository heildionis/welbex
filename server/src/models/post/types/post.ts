import { Document, Schema } from 'mongoose';

export interface Post {
	date: Date;
	message?: string;
	author: string;
	media?: string;
}

export interface PostModelSchema extends Omit<Post, 'author'>, Document {
	author: Schema.Types.ObjectId;
}
