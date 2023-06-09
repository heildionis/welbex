import { Schema, model } from 'mongoose';
import { PostModelSchema } from './types/post.js';

const postSchema = new Schema<PostModelSchema>({
	date: { type: Date, required: true },
	message: { type: String },
	author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
	media: { type: String, required: false },
});

export const PostModel = model<PostModelSchema>('post', postSchema);
