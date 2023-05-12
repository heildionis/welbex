import { createAsyncThunk } from '@reduxjs/toolkit';

import { logoutMutation } from '../../api/userApi';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const logout = createAsyncThunk<void, void, ThunkConfig<string>>(
	'user/logout',
	async (_, thunkAPI) => {
		const { rejectWithValue, dispatch } = thunkAPI;

		try {
			await dispatch(logoutMutation());
			return undefined;
		} catch (error) {
			console.log(error);
			return rejectWithValue('error');
		}
	}
);
