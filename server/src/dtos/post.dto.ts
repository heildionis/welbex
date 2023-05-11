import { PostModelSchema } from '../models/post/index.js';
import { UserModel } from '../models/user/user.model.js';

export class PostDto {
	id: string;

	date: Date;

	message: string;
	author: string;

	media?: string;

	constructor(model: PostModelSchema, author: string) {
		this.id = model._id;
		this.message = model.message;
		this.media = model.media;
		this.date = model.date;
		this.author = author;
	}
}
