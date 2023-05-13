import { buildSelector } from '@/shared/lib/store';

export const [useAddPostFormMessage, getAddPostFormMessage] = buildSelector(
	(state) => state.addPostForm?.message
);
