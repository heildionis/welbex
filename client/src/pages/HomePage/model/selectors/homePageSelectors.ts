import { buildSelector } from '@/shared/lib/store';

export const [useHomePageData, getHomePageData] = buildSelector(
	(state) => state.homePage.data
);
export const [useHomePageIsLoading, getHomePageIsLoading] = buildSelector(
	(state) => state.homePage.isLoading
);
export const [useHomePageError, getHomePageError] = buildSelector(
	(state) => state.homePage.error
);
export const [useHomePagePage, getHomePagePage] = buildSelector(
	(state) => state.homePage.page
);
export const [useHomePageLimit, getHomePageLimit] = buildSelector(
	(state) => state.homePage.limit
);
