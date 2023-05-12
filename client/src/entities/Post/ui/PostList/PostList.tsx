import { List } from 'antd';
import { FC, ReactNode, memo, useCallback } from 'react';

import { Post } from '../../model/types/post';
import { PostCard } from '../PostCard/PostCard';

import { classNames } from '@/shared/lib/classNames/classNames';

interface PostListProps {
	className?: string;
	posts?: Post[];
	isLoading?: boolean;
	renderItem?: (post: Post) => ReactNode;
	renderOptions?: (post: Post) => () => ReactNode;
	onChangeAuthor?: () => void;
	onChangeDate?: () => void;
	onChangeMessage?: () => void;
	onChangeMedia?: () => void;
}

export const PostList: FC<PostListProps> = memo((props: PostListProps) => {
	const {
		className,
		posts,
		isLoading,
		renderItem,
		renderOptions,
		onChangeAuthor,
		onChangeDate,
		onChangeMessage,
		onChangeMedia,
	} = props;

	const renderPost = useCallback(
		(post: Post) => (
			<List.Item>
				{renderItem ? (
					renderItem(post)
				) : (
					<PostCard
						key={post.id}
						post={post}
						renderOptions={renderOptions?.(post)}
						onChangeMessage={onChangeMessage}
					/>
				)}
			</List.Item>
		),
		[onChangeMessage, renderItem, renderOptions]
	);

	return (
		<List
			bordered
			dataSource={posts}
			itemLayout='vertical'
			size='large'
			loading={isLoading}
			className={classNames('', {}, [className])}
			renderItem={renderPost}
		/>
	);
});
