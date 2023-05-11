import { Router } from 'express';
import { body } from 'express-validator';
import { UserController } from '../controllers/user.controller';

const userController = new UserController();

export const userRouter = Router();

userRouter.post(
	'/register',
	body('email').isEmail(),
	body('password').isLength({ min: 6, max: 27 }),
	UserController.registration
);

userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);
userRouter.get('/refresh', UserController.refresh);
