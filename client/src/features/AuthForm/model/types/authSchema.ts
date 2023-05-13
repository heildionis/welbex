export interface AuthError {
	status: number;
	data: string;
}

export interface AuthSchema {
	username: string;
	password: string;
	isLoading: boolean;
	error?: AuthError;
}

export type AuthType = 'login' | 'register';
