import { Form } from 'antd';
import { ChangeEvent, memo, useCallback } from 'react';

import {
	useEditablePostCardForm,
	useEditablePostCardIsLoading,
	useEditablePostCardReadonly,
} from '../../model/selectors/editablePostCardSelectors';
import { updatePostData } from '../../model/services/updatePostData';
import {
	editablePostCardActions,
	editablePostCardReducer,
} from '../../model/slices/editablePostCardSlice';
import { EditablePostCardFooter } from '../EditablePostCardFooter/EditablePostCardFooter';

import cls from './EditablePostCard.module.scss';

import { FileDropzone, useFile } from '@/entities/File';
import { Post, PostCard } from '@/entities/Post';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

interface EditablePostCardProps {
	className?: string;
	post: Post;
	onCancelEdit?: () => void;
	onSave?: () => void;
}

const reducers: ReducersList = {
	editablePostCard: editablePostCardReducer,
};

const EditablePostCard = memo((props: EditablePostCardProps) => {
	const { className, post, onCancelEdit, onSave } = props;
	const dispatch = useAppDispatch();
	const isLoading = useEditablePostCardIsLoading();
	const readonly = useEditablePostCardReadonly();
	const form = useEditablePostCardForm();
	const { files, onChangeFiles } = useFile({});
	const [formBind] = Form.useForm();

	useInitialEffect(() => {
		dispatch(editablePostCardActions.initPostCard(post));
	});

	const onChangeMessage = useCallback(
		(e: ChangeEvent<HTMLTextAreaElement>) => {
			dispatch(
				editablePostCardActions.updatePost({ message: e.target.value })
			);
		},
		[dispatch]
	);

	const onSaveEdit = useCallback(async () => {
		await dispatch(updatePostData(files[0]));
		onSave?.();
	}, [dispatch, files, onSave]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Form
				form={formBind}
				onFinish={onSaveEdit}
				className={classNames(cls.EditablePostCard, {}, [className])}
			>
				<PostCard
					post={form}
					readonly={readonly}
					isLoading={false}
					onChangeMessage={onChangeMessage}
				/>
				<FileDropzone
					files={files}
					readonly={readonly}
					isLoading={isLoading}
					onChangeFiles={onChangeFiles}
				/>
				<EditablePostCardFooter onCancelEdit={onCancelEdit} />
			</Form>
		</DynamicModuleLoader>
	);
});

export default EditablePostCard;
