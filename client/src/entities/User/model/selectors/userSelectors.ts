import { buildSelector } from '@/shared/lib/store';

export const [useUserAuthData, getUserAuthData] = buildSelector(
	(state) => state.user.authData
);
export const [useUserIsLoading, getUserIsLoading] = buildSelector(
	(state) => state.user.isLoading
);
export const [useUserError, getUserError] = buildSelector(
	(state) => state.user.error
);
export const [useUserInited, getUserInited] = buildSelector(
	(state) => state.user._inited
);
