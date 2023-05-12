import { buildSelector } from '@/shared/lib/store';

export const [useAuthUsername, getAuthUsername] = buildSelector(
	(state) => state.auth?.username
);
export const [useAuthPassword, getAuthPassword] = buildSelector(
	(state) => state.auth?.password
);
export const [useAuthIsLoading, getAuthIsLoading] = buildSelector(
	(state) => state.auth?.isLoading
);
export const [useAuthError, getAuthError] = buildSelector(
	(state) => state.auth?.error ?? ''
);
