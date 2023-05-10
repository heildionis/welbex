import multer, { Multer } from 'multer';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const extension = file.originalname.split('.').pop();
		const filename = file.fieldname + '-' + uniqueSuffix + '.' + extension;
		cb(null, filename);
	},
});

const upload: Multer = multer({ storage });

export const uploadSingle = (fieldName: string) => {
	return upload.single(fieldName);
};

export const uploadMultiple = (fieldName: string, maxCount: number) => {
	return upload.array(fieldName, maxCount);
};
