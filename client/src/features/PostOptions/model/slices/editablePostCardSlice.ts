import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { updatePostData } from '../services/updatePostData';
import { EditablePostCardSchema } from '../types/EditablePostCardSchema';

import { Post } from '@/entities/Post';

const initialState: EditablePostCardSchema = {};

export const EditablePostCardSlice = createSlice({
	name: 'editablePostCard',
	initialState,
	reducers: {
		initPostCard: (state, action: PayloadAction<Post>) => {
			state.post = action.payload;
			state.form = { ...action.payload };
		},
		setReadonly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload;
		},
		cancelEdit: (state) => {
			state.readonly = true;
			state.form = state.post;
		},
		updatePost: (state, action: PayloadAction<Post>) => {
			state.form = {
				...state.form,
				...action.payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(updatePostData.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(updatePostData.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(updatePostData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: editablePostCardActions } = EditablePostCardSlice;
export const { reducer: editablePostCardReducer } = EditablePostCardSlice;
