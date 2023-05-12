import {
	AnyAction,
	CombinedState,
	EnhancedStore,
	Reducer,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { UserSchema } from '@/entities/User';
import { AddPostFormSchema } from '@/features/AddPostForm';
import { AuthSchema } from '@/features/AuthForm';
import { EditablePostCardSchema } from '@/features/PostOptions';
import { HomePageSchema } from '@/pages/HomePage';
import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
	user: UserSchema;
	homePage: HomePageSchema;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

	// Async reducers
	auth?: AuthSchema;
	editablePostCard?: EditablePostCardSchema;
	addPostForm?: AddPostFormSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (
		state: StateSchema,
		action: AnyAction
	) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
	getMountedRecuders: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	extra: ThunkExtraArg;
	rejectValue: T;
	state: StateSchema;
}
