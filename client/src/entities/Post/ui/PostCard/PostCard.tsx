import { Card, Form, Input, Row, Space, Typography } from 'antd';
import Text from 'antd/es/typography/Text';
import { ChangeEvent, FC, ReactNode, memo, useCallback } from 'react';

import { Post } from '../../model/types/post';

import cls from './PostCard.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { convertDate } from '@/shared/lib/convertDate/convertDate';
import { LazyImage } from '@/shared/ui/LazyImage/LazyImage';

interface PostCardProps {
	className?: string;
	post: Post;
	media?: string;
	renderOptions?: () => ReactNode;
	onChangeMessage?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	isLoading?: boolean;
	readonly?: boolean;
}

export const PostCard: FC<PostCardProps> = memo((props: PostCardProps) => {
	const {
		className,
		post,
		media,
		renderOptions,
		onChangeMessage,
		readonly,
		isLoading,
	} = props;

	const renderMessage = useCallback(() => {
		if (onChangeMessage) {
			return (
				<Form.Item
					name='message'
					rules={[
						{ required: true, message: 'Введите текст записи!' },
					]}
				>
					<Input.TextArea
						value={post.message}
						onChange={onChangeMessage}
						className={cls.inputMsg}
						readOnly={readonly || isLoading}
						disabled={readonly || isLoading}
					/>
				</Form.Item>
			);
		}

		return <Typography>{post.message}</Typography>;
	}, [isLoading, readonly, onChangeMessage, post.message]);

	return (
		<Card
			className={classNames(cls.PostCard, {}, [className])}
			title={
				<Row justify='space-between' align='middle'>
					<Typography>{post.author}</Typography>
					<Space size={8}>
						{renderOptions && renderOptions?.()}
						{post.date && (
							<Text type='secondary'>
								{convertDate(post.date)}
							</Text>
						)}
					</Space>
				</Row>
			}
			cover={
				(post.media || media) && (
					<LazyImage
						src={`${__API__}/uploads/${post.media}`}
						className={cls.image}
					/>
				)
			}
		>
			{renderMessage()}
		</Card>
	);
});
