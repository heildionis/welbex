import { IdcardOutlined } from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	Divider,
	Form,
	Input,
	Row,
	Space,
	Typography,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { ChangeEvent, FC, memo, useCallback } from 'react';

import { AuthEnum } from '../../constants/authErrors';
import {
	useAuthUsername,
	useAuthPassword,
	useAuthIsLoading,
	useAuthError,
} from '../../model/selectors/authSelectors';
import { authByUsername } from '../../model/services/authByUsername';
import { authActions, authReducer } from '../../model/slice/authSlice';
import { AuthType } from '../../model/types/authSchema';

import cls from './AuthForm.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface AuthFormProps {
	className?: string;
	onSuccess?: () => void;
	type: AuthType;
}

const reducers: ReducersList = {
	auth: authReducer,
};

const AuthForm: FC<AuthFormProps> = memo((props: AuthFormProps) => {
	const { className, onSuccess, type } = props;
	const dispatch = useAppDispatch();
	const username = useAuthUsername();
	const password = useAuthPassword();
	const isLoading = useAuthIsLoading();
	const error = useAuthError();

	const onChangeUsername = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			dispatch(authActions.setUsername(e.target.value));
		},
		[dispatch]
	);

	const onChangePassword = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			dispatch(authActions.setPassword(e.target.value));
		},
		[dispatch]
	);

	const onAuthClick = useCallback(async () => {
		const result = await dispatch(authByUsername({ type }));
		if (result.meta.requestStatus === 'fulfilled') {
			onSuccess?.();
		}
	}, [dispatch, onSuccess, type]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Card className={cls.heading} bordered={false}>
				<Space size={16} align='center' className={cls.wrapper}>
					<IdcardOutlined className={cls.icon} />
					<Title level={3} className={cls.title}>
						{type === 'login' ? 'Авторизация' : 'Регистрация'}
					</Title>
				</Space>
			</Card>
			<Card bordered={false}>
				<Form className={classNames(cls.AuthForm, {}, [className])}>
					<Row gutter={[1, 15]}>
						<Col span={24}>
							<Typography>Пользователь</Typography>
							<Input
								disabled={isLoading}
								value={username}
								onChange={onChangeUsername}
								size='large'
								placeholder='Введите имя пользователя...'
								type='text'
								required
							/>
						</Col>
						<Col span={24}>
							<Typography>Пароль</Typography>
							<Input
								required
								disabled={isLoading}
								value={password}
								onChange={onChangePassword}
								type='password'
								size='large'
								placeholder='Введите пароль...'
							/>
						</Col>
					</Row>
					{error && <Typography>{AuthEnum[error.data]}</Typography>}
					<Divider />
					<Button
						onClick={onAuthClick}
						className={cls.btn}
						size='large'
						type='primary'
						loading={isLoading}
					>
						{type === 'login' ? 'Войти' : 'Зарегистрироваться'}
					</Button>
				</Form>
			</Card>
		</DynamicModuleLoader>
	);
});

export default AuthForm;
