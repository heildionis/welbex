import { Post } from '@/entities/Post';
import { rtkApi } from '@/shared/api/rtkApi';

interface UpdatePostDataArg {
	postId: string;
	form: FormData;
}

const postOptionsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		deletePost: build.mutation<void, string>({
			query: (postId) => ({
				url: `/posts/${postId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Post'],
		}),
		updatePostData: build.mutation<Post, UpdatePostDataArg>({
			query: ({ postId, form }) => ({
				url: `/posts/${postId}`,
				body: form,
				method: 'PATCH',
			}),
			invalidatesTags: ['Post'],
		}),
	}),
});

export const { useDeletePostMutation } = postOptionsApi;

export const updatePostDataMutation =
	postOptionsApi.endpoints.updatePostData.initiate;
