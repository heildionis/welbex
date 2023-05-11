import { PostDto } from '../dtos/post.dto.js';
import { ApiError } from '../exception/ApiError.js';
import { PostModel, PostModelSchema } from '../models/post/index.js';
import { UserModelSchema } from '../models/user/index.js';
import { PaginateOptions } from '../types/paginate.js';
import { UserService } from './user.service.js';

export class PostService {
	public static async createPost(
		post: Partial<PostModelSchema>
	): Promise<PostDto> {
		if (!post.author) {
			throw ApiError.conflict();
		}

		const user = await UserService.findUserById(post.author);

		const createdPost = await PostModel.create(post);

		const postData = new PostDto(createdPost, user.username);

		return postData;
	}

	public static async editPost(
		postId: string,
		updatedPost: Partial<PostModelSchema>,
		author: UserModelSchema
	): Promise<PostDto> {
		if (!updatedPost.author) {
			throw ApiError.notFound();
		}

		const updatedPostData = await PostModel.findByIdAndUpdate(
			postId,
			updatedPost,
			{ new: true }
		);

		if (!updatedPostData) {
			throw ApiError.notFound();
		}

		const postData = new PostDto(updatedPostData, author.username);

		return postData;
	}

	public static async deletePost(postId: string) {
		await PostModel.findByIdAndDelete(postId);
	}

	public static async getPosts({ limit = 20, page = 1 }: PaginateOptions) {
		const posts = await PostModel.find({})
			.skip(page * limit)
			.limit(limit);

		const postDtos: PostDto[] = [];

		for (const post of posts) {
			const user = await UserService.findUserById(post.author);
			const author = user?.username;

			if (!author) {
				throw ApiError.notFound();
			}

			const postDto = new PostDto(post, author);
			postDtos.push(postDto);
		}

		return postDtos;
	}
}
