import { buildSelector } from '@/shared/lib/store';

export const [useAddPostFormMessage, getAddPostFormMessage] = buildSelector(
	(state) => state.addPostForm?.message
);
export const [useAddPostFormIsLoading, getAddPostFormIsLoading] = buildSelector(
	(state) => state.addPostForm?.isLoading
);
export const [useAddPostFormError, getAddPostFormError] = buildSelector(
	(state) => state.addPostForm?.error
);
