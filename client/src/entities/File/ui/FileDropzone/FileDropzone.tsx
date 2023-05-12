import { Card, Row } from 'antd';
import { FC, memo, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

import { FileWithPreview } from '../../model/types/file';

import cls from './FileDropzone.module.scss';

interface FileDropzoneProps {
	files: FileWithPreview[];
	onChangeFiles: (acceptedFiles: File[]) => () => void;
	isLoading?: boolean;
	readonly?: boolean;
	maxFiles?: number;
	multiple?: boolean;
}

export const FileDropzone: FC<FileDropzoneProps> = memo(
	(props: FileDropzoneProps) => {
		const {
			files,
			onChangeFiles,
			readonly,
			isLoading,
			maxFiles = 1,
			multiple = false,
		} = props;

		const { getRootProps, getInputProps } = useDropzone({
			accept: {
				'image/*': [],
			},
			maxFiles,
			multiple,
			onDrop: (acceptedFiles) => {
				onChangeFiles(acceptedFiles)();
			},
		});

		const thumbs = useMemo(
			() =>
				files.map((file) => (
					<div className={cls.thumb} key={file.name}>
						<div className={cls.thumbInner}>
							<img
								src={file.preview}
								className={cls.img}
								alt=''
								onLoad={() => {
									URL.revokeObjectURL(file.preview);
								}}
							/>
						</div>
					</div>
				)),
			[files]
		);

		return (
			<>
				<Card {...getRootProps({ className: cls.dropzone })}>
					<input
						readOnly={readonly || isLoading}
						{...getInputProps()}
					/>
					<p>Выберите или перетащите медиа-файл в эту зону</p>
					<em>
						(Принимаются изображения формата: *.jpeg, *.jpg, *.png)
					</em>
				</Card>
				<Row justify='center'>{thumbs}</Row>
			</>
		);
	}
);
