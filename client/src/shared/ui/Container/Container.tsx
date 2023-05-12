import { FC, ReactNode, memo } from 'react';

import cls from './Container.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';

interface ContainerProps {
	className?: string;
	children: ReactNode;
}

export const Container: FC<ContainerProps> = memo((props: ContainerProps) => {
	const { className, children } = props;

	return (
		<div className={classNames(cls.Container, {}, [className])}>
			{children}
		</div>
	);
});
