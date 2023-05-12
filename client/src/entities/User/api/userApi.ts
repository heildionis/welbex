import { UserResponse } from '../model/types/user';

import { rtkApi } from '@/shared/api/rtkApi';

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		checkAuth: build.query<UserResponse, void>({
			query: () => ({
				url: '/users/refresh',
				credentials: 'include',
			}),
		}),
		logout: build.mutation<void, void>({
			query: () => ({
				url: '/users/logout',
				credentials: 'include',
				method: 'POST',
			}),
		}),
	}),
});

export const checkAuthQuery = userApi.endpoints.checkAuth.initiate;
export const logoutMutation = userApi.endpoints.logout.initiate;
