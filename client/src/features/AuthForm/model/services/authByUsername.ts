import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	authByUsernameMutation,
	registerByUsernameMutation,
} from '../../api/authApi';
import { AuthEnum } from '../../constants/authErrors';
import { getAuthUsername, getAuthPassword } from '../selectors/authSelectors';
import { AuthError, AuthType } from '../types/authSchema';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { UserResponse, userActions } from '@/entities/User';
import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/constants/localstorage';

interface AuthByUsernameArg {
	type: AuthType;
}

export const authByUsername = createAsyncThunk<
	UserResponse,
	AuthByUsernameArg,
	ThunkConfig<AuthError>
>('auth/authByUsername', async ({ type }, thunkApi) => {
	const { dispatch, rejectWithValue, getState } = thunkApi;

	const username = getAuthUsername(getState());
	const password = getAuthPassword(getState());

	if (!username || !password) {
		throw rejectWithValue({ status: 400, data: AuthEnum.VALIDATION_ERROR });
	}

	try {
		const response = await dispatch(
			type === 'login'
				? authByUsernameMutation({ username, password })
				: registerByUsernameMutation({ username, password })
		).unwrap();

		if (!response) {
			throw new Error();
		}

		const { user, accessToken } = response;

		dispatch(userActions.setAuthData(user));
		dispatch(userActions.setInited(true));
		localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, accessToken);

		return response;
	} catch (error: any) {
		return rejectWithValue(error);
	}
});
