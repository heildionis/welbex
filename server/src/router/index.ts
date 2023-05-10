import { Router } from 'express';
import { postRouter } from './post.router.js';

export const router = Router();

router.get('/', (req, res) => {
	return res.send({ message: 'hello' });
});

router.use('/posts', postRouter);
