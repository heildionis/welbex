import { Response, NextFunction, Request } from 'express';
import { PostService } from '../services/post.service.js';
import { PostModelSchema } from '../models/post/index.js';
import { UserService } from '../services/user.service.js';
import { ApiError } from '../exception/ApiError.js';
import { PaginateOptions } from '../types/paginate.js';

export class PostController {
	public static async createPost(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const { date, message, author } = req.body;
			const media = req.file;

			const user = await UserService.findUserByName(author);

			const newPost: Partial<PostModelSchema> = {
				date,
				message: message ? message : '',
				author: user.id,
				media: media ? media.filename : undefined,
			};

			const createdPost = await PostService.createPost(newPost);

			return res.json(createdPost);
		} catch (error) {
			next(error);
		}
	}

	public static async editPost(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const postId = req.params.id;
			const { date, message, author } = req.body;
			const media = req.file;

			const user = await UserService.findUserByName(author);

			if (!user) {
				throw ApiError.notFound();
			}

			const updatedPost: Partial<PostModelSchema> = {
				date,
				message: message ? message : '',
				author: user.id,
				media: media ? media.filename : undefined,
			};

			const updatedPostData = await PostService.editPost(
				postId,
				updatedPost,
				user
			);

			return res.json(updatedPostData);
		} catch (error) {
			next(error);
		}
	}

	public static async deletePost(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const postId = req.params.id;

			await PostService.deletePost(postId);

			return res.status(204).send();
		} catch (error) {
			next(error);
		}
	}
	public static async getPosts(
		req: Request<{}, {}, { page: string; limit: string }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const { page = 0, limit = 20 } = req.query;

			const options: PaginateOptions = {
				page: parseInt(page as string, 10),
				limit: parseInt(limit as string, 10),
			};

			const postsWithCount = await PostService.getPosts(options);
			return res.json(postsWithCount);
		} catch (error) {
			next(error);
		}
	}
}
