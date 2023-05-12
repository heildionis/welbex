import axios from 'axios';

import { TOKEN_LOCALSTORAGE_KEY } from '../constants/localstorage';

export const $api = axios.create({
	baseURL: __API__,
	withCredentials: true,
});

$api.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);

	config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});

$api.interceptors.response.use(
	(config) => config,

	async (error) => {
		const originalRequest = error.config;

		const isStatusUnauthorized = error.response.status === 401;
		const isSameRequest = originalRequest;
		const isRetry = error.config._isRetry;

		if (isStatusUnauthorized && isSameRequest && !isRetry) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.get('/refresh', {
					withCredentials: true,
				});
				const { accessToken } = response.data;

				localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, accessToken);

				return $api.request(originalRequest);
			} catch (e) {
				console.log('Не авторизован!');
			}
		}
		throw error;
	}
);
