import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path, { dirname } from 'path';

import { router } from './router/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { fileURLToPath } from 'url';

dotenv.config();

// Environment varables
const PORT = process.env.APP_PORT || 5000;
const ORIGIN = process.env.ORIGIN_URL || 'http://localhost:3000';
const MONGO_URL = process.env.MONGO_URL || 'Put your url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsPath = path.join(__dirname, '..', 'uploads');

// Middlewares
app.use(morgan('dev'));
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);
app.use('/uploads', express.static(uploadsPath));
app.use(errorMiddleware);

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
