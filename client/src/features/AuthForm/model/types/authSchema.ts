export interface AuthSchema {
    username: string;
    password: string;
    isLoading: boolean;
    error?: string;
}

export type AuthType = 'login' | 'register';
