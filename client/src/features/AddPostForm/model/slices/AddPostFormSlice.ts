import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddPostFormSchema } from '../types/AddPostFormSchema';

const initialState: AddPostFormSchema = {
	message: '',
	isLoading: false,
	error: '',
};

export const AddPostFormSlice = createSlice({
	name: 'addPostForm',
	initialState,
	reducers: {
		setMessage: (state, action: PayloadAction<string>) => {
			state.message = action.payload;
		},
	},
	// extraReducers: (builder) => {
	//     builder
	//         .addCase(, (state) => {
	//             state.error = undefined;
	//             state.isLoading = true;
	//         })
	//         .addCase(, (state) => {
	//             state.isLoading = false;
	//         })
	//         .addCase(, (state, action) => {
	//             state.isLoading = false;
	//             state.error = action.payload;
	//         });
	// },
});

export const { actions: addPostFormActions } = AddPostFormSlice;
export const { reducer: addPostFormReducer } = AddPostFormSlice;
