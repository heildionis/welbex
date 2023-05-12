import { Router } from 'express';
import { PostController } from '../controllers/post.controller.js';
import { uploadSingle } from '../middlewares/file.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const postRouter = Router();

postRouter.get('/', PostController.getPosts);
postRouter.post(
	'/',
	authMiddleware,
	uploadSingle('file'),
	PostController.createPost
);
postRouter.patch(
	'/:id',
	authMiddleware,
	uploadSingle('file'),
	PostController.editPost
);
postRouter.delete('/:id', authMiddleware, PostController.deletePost);
