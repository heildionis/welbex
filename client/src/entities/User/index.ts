export { checkAuth } from './model/services/checkAuth';
export { logout } from './model/services/logout';

export {
    useUserAuthData,
    useUserError,
    useUserInited,
    useUserIsLoading,
} from './model/selectors/userSelectors';

export { userReducer, userActions } from './model/slices/userSlice';
export type { User, UserSchema, UserResponse } from './model/types/user';
