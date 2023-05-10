import { Schema, model } from 'mongoose';
import { PostModelSchema } from './types/post.js';

const postSchema = new Schema<PostModelSchema>({
	date: { type: Date, required: true },
	message: { type: String, required: true },
	author: { type: String, required: true },
	media: { type: String, required: false },
});

export const PostModel = model<PostModelSchema>('post', postSchema);
