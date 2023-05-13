import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddPostFormSchema } from '../types/AddPostFormSchema';

const initialState: AddPostFormSchema = {
	message: '',
};

export const AddPostFormSlice = createSlice({
	name: 'addPostForm',
	initialState,
	reducers: {
		setMessage: (state, action: PayloadAction<string>) => {
			state.message = action.payload;
		},
	},
});

export const { actions: addPostFormActions } = AddPostFormSlice;
export const { reducer: addPostFormReducer } = AddPostFormSlice;
