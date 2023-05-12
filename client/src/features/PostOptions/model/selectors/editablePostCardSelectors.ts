import { buildSelector } from '@/shared/lib/store';

export const [useEditablePostCardData, getEditablePostCardData] = buildSelector(
	(state) => state.editablePostCard?.post
);
export const [useEditablePostCardForm, getEditablePostCardForm] = buildSelector(
	(state) => state.editablePostCard?.form ?? {}
);
export const [useEditablePostCardIsLoading, getEditablePostCardIsLoading] =
	buildSelector((state) => state.editablePostCard?.isLoading);
export const [useEditablePostCardError, getEditablePostCardError] =
	buildSelector((state) => state.editablePostCard?.error);
export const [useEditablePostCardReadonly, getEditablePostCardReadonly] =
	buildSelector((state) => state.editablePostCard?.readonly);
