import { Post } from '@/entities/Post';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetPostsArg {
	limit?: number;
	page?: number;
}

interface GetPostsResult {
	posts: Post[];
	count: number;
}

export const homePageApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getPosts: build.query<GetPostsResult, GetPostsArg>({
			query: ({ page = 0, limit = 20 }) => ({
				url: '/posts',
				params: {
					page,
					limit,
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.posts.map(({ id }) => ({
								type: 'Post' as const,
								id,
							})),
							'Post',
					  ]
					: ['Post'],
		}),
	}),
});

export const { useGetPostsQuery } = homePageApi;
