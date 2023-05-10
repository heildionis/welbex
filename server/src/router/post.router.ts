import { Router } from 'express';
import { PostController } from '../controllers/post.controller.js';
import { uploadSingle } from '../middlewares/file.middleware.js';

const postController = new PostController();

export const postRouter = Router();

postRouter.post(
	'/',
	uploadSingle('file'),
	postController.createPost.bind(postController)
);
postRouter.put(
	'/:id',
	uploadSingle('file'),
	postController.editPost.bind(postController)
);
postRouter.delete('/:id', postController.deletePost.bind(postController));
