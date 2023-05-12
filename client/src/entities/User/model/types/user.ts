import { Tokens } from '@/entities/Auth';

export interface User {
    id: string;
    username: string;
}

export interface UserSchema {
    authData?: User;
    isLoading: boolean;
    error?: string;
    _inited: boolean;
}

export interface UserResponse extends Tokens {
    user: User;
}
