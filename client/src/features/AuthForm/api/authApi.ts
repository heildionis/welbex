import { UserResponse } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';

interface AuthByUsernameArg {
	username: string;
	password: string;
}

const authApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		authByUsername: build.mutation<UserResponse, AuthByUsernameArg>({
			query: (body) => ({
				url: '/users/login',
				method: 'POST',
				body,
			}),
		}),
		register: build.mutation<UserResponse, AuthByUsernameArg>({
			query: (body) => ({
				url: '/users/register',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const authByUsernameMutation = authApi.endpoints.authByUsername.initiate;
export const registerByUsernameMutation = authApi.endpoints.register.initiate;
