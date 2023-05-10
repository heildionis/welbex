import { Post } from '../models/post/index.js';
import { PostService } from './../services/post.service.js';
import { Response, NextFunction, Request } from 'express';

interface ParamsWithId {
	id: string;
}

export class PostController {
	private postService: PostService;

	constructor() {
		this.postService = new PostService();
	}

	async createPost(req: Request, res: Response, next: NextFunction) {
		try {
			const { date, message, author } = req.body;
			const media = req.file;

			const newPost: Post = {
				date,
				message,
				author,
				media: media ? media.filename : undefined,
			};

			const createdPost = await this.postService.createPost(newPost);

			return res.json(createdPost);
		} catch (error) {
			next(error);
		}
	}
	async editPost(req: Request, res: Response, next: NextFunction) {
		try {
			const postId = req.params.id;
			const { date, message, author } = req.body;
			const media = req.file;

			const updatedPost: Partial<Post> = {
				date,
				message,
				author,
				media: media ? media.filename : undefined,
			};

			const updatedPostData = await this.postService.editPost(
				postId,
				updatedPost
			);

			return res.json(updatedPostData);
		} catch (error) {
			next(error);
		}
	}
	async deletePost(
		req: Request<ParamsWithId>,
		res: Response,
		next: NextFunction
	) {
		try {
			const postId = req.params.id;

			await this.postService.deletePost(postId);

			return res.status(204).send();
		} catch (error) {
			next(error);
		}
	}
}

export const postController = new PostController();
