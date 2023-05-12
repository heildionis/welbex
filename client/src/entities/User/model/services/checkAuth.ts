import { createAsyncThunk } from '@reduxjs/toolkit';

import { checkAuthQuery } from '../../api/userApi';
import { UserResponse } from '../types/user';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const checkAuth = createAsyncThunk<
	UserResponse,
	void,
	ThunkConfig<string>
>('user/checkAuth', async (_, thunkAPI) => {
	const { rejectWithValue, dispatch } = thunkAPI;

	try {
		const response = await dispatch(checkAuthQuery());

		if (!response.data) {
			throw new Error();
		}

		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue('error');
	}
});
