import {
	DeleteOutlined,
	EditOutlined,
	EllipsisOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { ReactNode, memo, useCallback, useMemo, useState } from 'react';

import { useDeletePostMutation } from '../../api/postOptionsApi';
import { EditablePostCardModal } from '../EditablePostCardModal/EditablePostCardModal';

import cls from './PostOptions.module.scss';

import { Post } from '@/entities/Post';
import { useUserAuthData } from '@/entities/User';

interface PostOptionsProps {
	post: Post;
	onEditClick?: () => void;
	onDeleteClick?: () => void;
	renderItem?: () => ReactNode;
}

export const PostOptions = memo((props: PostOptionsProps) => {
	const { post, onEditClick, onDeleteClick, renderItem } = props;
	const authData = useUserAuthData();
	const [deletePost] = useDeletePostMutation();
	const [isOpen, setIsOpen] = useState(false);

	const onEditPostClick = useCallback(() => {
		setIsOpen(true);
		onEditClick?.();
	}, [onEditClick]);

	const onClose = () => {
		setIsOpen(false);
	};

	const onDeletePostClick = useCallback(() => {
		if (post.id) {
			deletePost(post?.id);
		}
		onDeleteClick?.();
	}, [deletePost, onDeleteClick, post.id]);

	const items: MenuProps['items'] = useMemo(
		() => [
			{
				label: 'Редактировать',
				key: '1',
				icon: <EditOutlined />,
				onClick: onEditPostClick,
				theme: 'dark',
			},
			{
				label: 'Удалить',
				key: '2',
				icon: <DeleteOutlined />,
				onClick: onDeletePostClick,
				danger: true,
			},
		],
		[onDeletePostClick, onEditPostClick]
	);

	return (
		<>
			{authData?.username === post.author && (
				<Dropdown menu={{ items }} placement='bottomRight'>
					<Button>
						<EllipsisOutlined className={cls.icon} />
					</Button>
				</Dropdown>
			)}
			<EditablePostCardModal
				onClose={onClose}
				isOpen={isOpen}
				post={post}
			/>
		</>
	);
});
