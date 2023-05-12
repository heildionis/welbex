import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getPosts } from '../services/getPosts';
import { HomePageSchema } from '../types/HomePageSchema';

const initialState: HomePageSchema = {
	data: [],
	isLoading: false,
	error: '',
	page: 0,
	limit: 20,
};

export const HomePageSlice = createSlice({
	name: 'homePage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload - 1;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPosts.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: homePageActions } = HomePageSlice;
export const { reducer: homePageReducer } = HomePageSlice;
