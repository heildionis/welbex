import { Row, Button, Space, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { memo, useCallback, useState } from 'react';

import cls from './Navbar.module.scss';

import { logout, useUserAuthData, useUserInited } from '@/entities/User';
import { AuthModal, AuthType } from '@/features/AuthForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Container } from '@/shared/ui/Container/Container';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
	const { className } = props;
	const authData = useUserAuthData();
	const inited = useUserInited();
	const dispatch = useAppDispatch();
	const [isAuthModal, setIsAuthModal] = useState(false);
	const [type, setType] = useState<AuthType>('login');

	const onCloseModal = useCallback(() => {
		setIsAuthModal(false);
	}, []);

	const onShowModal = useCallback(
		(type: AuthType) => () => {
			setType(type);
			setIsAuthModal(true);
		},
		[]
	);

	const onLogout = useCallback(() => {
		dispatch(logout());
	}, [dispatch]);

	if (!inited) {
		return <Header className={classNames(cls.Navbar, {}, [className])} />;
	}

	if (authData) {
		return (
			<Header className={classNames(cls.Navbar, {}, [className])}>
				<Container>
					<Row justify='end' align='middle' className={cls.auth}>
						<Space size={10}>
							<Typography className={cls.user}>
								Пользователь: {authData.username}
							</Typography>
							<Button type='primary' onClick={onLogout}>
								Выйти
							</Button>
						</Space>
					</Row>
				</Container>
			</Header>
		);
	}

	return (
		<Header className={classNames(cls.Navbar, {}, [className])}>
			<Container>
				<Row
					justify='space-between'
					align='middle'
					className={cls.auth}
				>
					<Typography className={cls.user}>Блог</Typography>
					<Space size={10}>
						<Button type='primary' onClick={onShowModal('login')}>
							Войти
						</Button>
						<Button
							type='default'
							onClick={onShowModal('register')}
						>
							Зарегистрироваться
						</Button>
					</Space>
					<AuthModal
						type={type}
						isOpen={isAuthModal}
						onClose={onCloseModal}
					/>
				</Row>
			</Container>
		</Header>
	);
});
