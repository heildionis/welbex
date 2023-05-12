import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Post } from '@/entities/Post';

interface GetPostsArg {
	limit?: number;
	page?: number;
}

export const getPosts = createAsyncThunk<
	Post[],
	GetPostsArg,
	ThunkConfig<string>
>('homePage/getPosts', async (_, thunkApi) => {
	const { extra, rejectWithValue } = thunkApi;
	try {
		const response = await extra.api.get<Post[]>('/posts');
		console.log(response.data);
		if (!response.data) {
			throw rejectWithValue('error');
		}

		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue('error');
	}
});
