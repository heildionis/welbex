import { Post } from '@/entities/Post';
import { rtkApi } from '@/shared/api/rtkApi';

const addPostFormApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		addPost: build.mutation<Post, FormData>({
			query: (arg) => ({
				url: '/posts',
				method: 'POST',
				body: arg,
			}),
			invalidatesTags: ['Post'],
		}),
	}),
});

export const { useAddPostMutation } = addPostFormApi;
