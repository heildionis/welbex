import { Button, Card, Divider, Form, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent, memo, useCallback } from 'react';

import { useAddPostMutation } from '../../api/addPostFormApi';
import { useAddPostFormMessage } from '../../model/selectors/addPostFormSelectors';
import {
	addPostFormActions,
	addPostFormReducer,
} from '../../model/slices/AddPostFormSlice';

import cls from './AddPostForm.module.scss';

import { FileDropzone, useFile } from '@/entities/File';
import { useUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface AddPostFormProps {
	className?: string;
}

const reducers: ReducersList = {
	addPostForm: addPostFormReducer,
};

export const AddPostForm = memo((props: AddPostFormProps) => {
	const { className } = props;
	const dispatch = useAppDispatch();
	const message = useAddPostFormMessage();
	const authData = useUserAuthData();
	const [addPost, { isLoading }] = useAddPostMutation();
	const { files, onChangeFiles, setFiles } = useFile({ clear: isLoading });
	const [form] = Form.useForm();

	const onChangeMessage = useCallback(
		(e: ChangeEvent<HTMLTextAreaElement>) => {
			dispatch(addPostFormActions.setMessage(e.target.value));
		},
		[dispatch]
	);

	const onSend = useCallback(() => {
		const formData = new FormData();

		if (authData?.username) formData.append('author', authData?.username);
		if (message) formData.append('message', message);

		formData.append('date', `${Date.now()}`);
		formData.append('file', files[0]);

		addPost(formData);

		setFiles([]);
		dispatch(addPostFormActions.setMessage(''));
		form.resetFields();
	}, [addPost, authData?.username, files, message, setFiles, dispatch, form]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<Card className={classNames(cls.AddPostForm, {}, [className])}>
				<Form form={form} onFinish={onSend}>
					<div className={cls.form}>
						<Form.Item
							name='message'
							rules={[
								{
									message: 'Введите текст записи',
									required: true,
								},
							]}
						>
							<TextArea
								value={message}
								className={cls.area}
								onChange={onChangeMessage}
								placeholder='Что у вас нового?'
								readOnly={isLoading}
								disabled={isLoading}
							/>
						</Form.Item>
						<FileDropzone
							files={files}
							isLoading={isLoading}
							readonly={isLoading}
							onChangeFiles={onChangeFiles}
						/>
					</div>
					<Divider />
					<Row justify='end'>
						<Form.Item>
							<Button htmlType='submit' loading={isLoading}>
								Опубликовать
							</Button>
						</Form.Item>
					</Row>
				</Form>
			</Card>
		</DynamicModuleLoader>
	);
});
