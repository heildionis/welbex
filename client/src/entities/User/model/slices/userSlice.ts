import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { checkAuth } from '../services/checkAuth';
import { logout } from '../services/logout';
import { User, UserSchema } from '../types/user';

import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/constants/localstorage';

const initialState: UserSchema = {
	isLoading: false,

	_inited: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<User>) => {
			state.authData = action.payload;
		},
		setInited: (state, action: PayloadAction<boolean>) => {
			state._inited = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkAuth.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				localStorage.setItem(
					TOKEN_LOCALSTORAGE_KEY,
					action.payload.accessToken
				);

				state.isLoading = false;
				state.authData = action.payload.user;
				state._inited = true;
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
				state._inited = true;
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);

				state.isLoading = false;
				state.authData = undefined;
			})
			.addCase(logout.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
