import { Modal } from 'antd';
import { FC, Suspense, memo } from 'react';

import { EditablePostCardAsync } from '../EditablePostCard/EditablePostCard.async';

import cls from './EditablePostCardModal.module.scss';

import { Post } from '@/entities/Post';
import { classNames } from '@/shared/lib/classNames/classNames';

interface EditablePostCardMoadlProps {
	className?: string;
	post: Post;
	isOpen?: boolean;
	onClose?: () => void;
}

export const EditablePostCardModal: FC<EditablePostCardMoadlProps> = memo(
	(props: EditablePostCardMoadlProps) => {
		const { className, post, isOpen, onClose } = props;

		return (
			<Modal
				open={isOpen}
				footer={false}
				onCancel={onClose}
				destroyOnClose
				className={classNames(cls.EditablePostCardModal, {}, [
					className,
				])}
			>
				<Suspense fallback='loading'>
					<EditablePostCardAsync
						post={post}
						onCancelEdit={onClose}
						onSave={onClose}
					/>
				</Suspense>
			</Modal>
		);
	}
);
