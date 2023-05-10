import { Post, PostModel } from '../models/post/index.js';

export class PostService {
	async createPost(post: Post) {
		const createdPost = await PostModel.create(post);

		return createdPost;
	}
	async editPost(postId: string, updatedPost: Partial<Post>) {
		const updatedPostData = await PostModel.findByIdAndUpdate(
			postId,
			updatedPost,
			{ new: true }
		);

		return updatedPostData;
	}
	async deletePost(postId: string) {
		await PostModel.findByIdAndDelete(postId);
	}
}
