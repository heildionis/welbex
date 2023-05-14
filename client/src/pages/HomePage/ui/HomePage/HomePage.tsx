import { Pagination } from 'antd';
import { memo, useCallback } from 'react';

import { useGetPostsQuery } from '../../api/homePageApi';
import {
	useHomePageLimit,
	useHomePagePage,
} from '../../model/selectors/homePageSelectors';
import { getPosts } from '../../model/services/getPosts';
import { homePageActions } from '../../model/slices/homePageSlice';

import cls from './HomePage.module.scss';

import { Post, PostList } from '@/entities/Post';
import { useUserAuthData } from '@/entities/User';
import { AddPostForm } from '@/features/AddPostForm';
import { PostOptions } from '@/features/PostOptions';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Container } from '@/shared/ui/Container/Container';

interface HomePageProps {
	className?: string;
}

export const HomePage = memo((props: HomePageProps) => {
	const { className } = props;
	const dispatch = useAppDispatch();
	const authData = useUserAuthData();
	const limit = useHomePageLimit();
	const currentPage = useHomePagePage();
	const { data: postsWithCount, isLoading } = useGetPostsQuery({
		page: currentPage,
		limit,
	});

	useInitialEffect(() => {
		dispatch(getPosts({}));
	});

	const renderPostOptions = useCallback(
		(post: Post) => () => <PostOptions post={post} />,
		[]
	);

	const onChangePagination = useCallback(
		(page: number) => {
			dispatch(homePageActions.setPage(page));
		},
		[dispatch]
	);

	return (
		<Container className={classNames(cls.HomePage, {}, [className])}>
			{authData && <AddPostForm />}
			<PostList
				isLoading={isLoading}
				renderOptions={renderPostOptions}
				posts={postsWithCount?.posts.reverse()}
				className={cls.list}
			/>
			<Pagination
				current={currentPage + 1}
				pageSize={limit}
				onChange={onChangePagination}
				total={postsWithCount?.count}
				disabled={isLoading}
			/>
		</Container>
	);
});
