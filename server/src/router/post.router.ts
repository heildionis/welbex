import { Router } from 'express';
import { PostController } from '../controllers/post.controller.js';
import { uploadSingle } from '../middlewares/file.middleware.js';

export const postRouter = Router();

postRouter.get('/', PostController.getPosts);
postRouter.post('/', uploadSingle('file'), PostController.createPost);
postRouter.put('/:id', uploadSingle('file'), PostController.editPost);
postRouter.delete('/:id', PostController.deletePost);
