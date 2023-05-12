import { Router } from 'express';
import { postRouter } from './post.router.js';
import { userRouter } from './user.router.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const router = Router();

router.use('/posts', postRouter);
router.use('/users', userRouter);
