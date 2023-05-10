import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import { router } from './router/index.js';
import { getDirName } from './dirname.js';

dotenv.config();

// Environment varables
const PORT = process.env.APP_PORT || 5000;
const ORIGIN = process.env.ORIGIN_URL || 'http://localhost:3000';
const MONGO_URL = process.env.MONGO_URL || 'Put your url';

const app = express();
const dirname = getDirName();

const staticPath = path.resolve(dirname, 'static');

// Middlewares
app.use(morgan('dev'));
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(staticPath));
app.use('/api', router);

// App init
const start = async () => {
	try {
		await mongoose.connect(MONGO_URL);
		app.listen(PORT, () => {
			console.log(colors.yellow(`Server started on PORT:${PORT}`));
		});
	} catch (error) {
		console.log(error);
	}
};

start();
