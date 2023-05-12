import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/constants/localstorage';

export const rtkApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: __API__,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || '';

			if (token) headers.set('Authorization', `Bearer ${token}`);

			return headers;
		},
		credentials: 'include',
	}),
	endpoints: (build) => ({
		refresh: build.query({
			query: () => '/refresh',
		}),
	}),
	tagTypes: ['Post', 'User'],
});
