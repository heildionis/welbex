import { Modal } from 'antd';
import { FC, Suspense, memo } from 'react';

import { AuthType } from '../../model/types/authSchema';
import { AuthFormAsync } from '../AuthForm/AuthForm.async';

interface AuthModalProps {
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
	type: AuthType;
}

export const AuthModal: FC<AuthModalProps> = memo((props: AuthModalProps) => {
	const { className, isOpen, onClose, type = 'login' } = props;

	return (
		<Modal
			open={isOpen}
			onCancel={onClose}
			centered
			destroyOnClose
			footer={false}
			style={{ maxWidth: 400, width: 400 }}
			className={className}
		>
			<Suspense>
				<AuthFormAsync onSuccess={onClose} type={type} />
			</Suspense>
		</Modal>
	);
});
