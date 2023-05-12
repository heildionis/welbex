import { Button, Form, Row, Space } from 'antd';
import { FC, memo } from 'react';

import { useEditablePostCardIsLoading } from '../../model/selectors/editablePostCardSelectors';

interface EditablePostCardFooterProps {
	onCancelEdit?: () => void;
}

export const EditablePostCardFooter: FC<EditablePostCardFooterProps> = memo(
	(props: EditablePostCardFooterProps) => {
		const { onCancelEdit } = props;
		const isLoading = useEditablePostCardIsLoading();

		return (
			<Row justify='end'>
				<Space size={8}>
					<Form.Item>
						<Button
							htmlType='reset'
							onClick={onCancelEdit}
							disabled={isLoading}
							danger
						>
							Отменить
						</Button>
					</Form.Item>
					<Form.Item>
						<Button
							htmlType='submit'
							type='primary'
							loading={isLoading}
						>
							Сохранить
						</Button>
					</Form.Item>
				</Space>
			</Row>
		);
	}
);
