import { useCallback, useEffect, useMemo, useState } from 'react';

import { FileWithPreview } from '../../../model/types/file';

interface UseFileOptions {
	clear?: boolean;
}

export const useFile = ({ clear }: UseFileOptions) => {
	const [files, setFiles] = useState<FileWithPreview[]>([]);

	const onChangeFiles = useCallback(
		(acceptedFiles: File[]) => () => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
		[]
	);

	useEffect(() => {
		if (clear) {
			setFiles([]);
		}
	}, [clear]);

	useEffect(
		() => () => files.forEach((file) => URL.revokeObjectURL(file.preview)),
		[files]
	);

	const result = useMemo(
		() => ({
			files,
			onChangeFiles,
			setFiles,
		}),
		[files, onChangeFiles]
	);

	return result;
};
