import { createAsyncThunk } from '@reduxjs/toolkit';

import { updatePostDataMutation } from '../../api/postOptionsApi';
import { getEditablePostCardForm } from '../selectors/editablePostCardSelectors';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FileWithPreview } from '@/entities/File';
import { Post } from '@/entities/Post';

export const updatePostData = createAsyncThunk<
	Post,
	File | FileWithPreview,
	ThunkConfig<string>
>('profile/updateProfileData', async (file, thunkAPI) => {
	const { rejectWithValue, getState, dispatch } = thunkAPI;

	const form = getEditablePostCardForm(getState());
	const formData = new FormData();

	if (form.author && form.date) {
		formData.append('author', form.author);
		formData.append('date', form.date);
		formData.append('message', form.message ?? '');
		formData.append('file', file);
	}

	if (!form.id) {
		return rejectWithValue('error');
	}

	try {
		const response = await dispatch(
			updatePostDataMutation({ postId: form.id, form: formData })
		).unwrap();

		if (!response) {
			throw new Error();
		}

		return response;
	} catch (error) {
		console.log(error);
		return rejectWithValue('error');
	}
});
