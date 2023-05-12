import { useEffect } from 'react';

import { checkAuth, useUserInited } from '@/entities/User';
import { HomePage } from '@/pages/HomePage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';

export const App = () => {
	const dispatch = useAppDispatch();
	const inited = useUserInited();

	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	return (
		<>
			<Navbar />
			{inited && <HomePage />}
		</>
	);
};
