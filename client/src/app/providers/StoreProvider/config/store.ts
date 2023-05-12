import {
	CombinedState,
	configureStore,
	Reducer,
	ReducersMapObject,
} from '@reduxjs/toolkit';

import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

import { userReducer } from '@/entities/User';
import { homePageReducer } from '@/pages/HomePage';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';

export const createReduxStore = (
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) => {
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		user: userReducer,
		homePage: homePageReducer,
		[rtkApi.reducerPath]: rtkApi.reducer,
	};

	const reducerManager = createReducerManager(rootReducers);

	const extraArg: ThunkExtraArg = { api: $api };

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		devTools: __IS_DEV__,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
				thunk: { extraArgument: extraArg },
			}).concat(rtkApi.middleware),
	});

	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
