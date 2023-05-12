import { Post } from '@/entities/Post';

export interface EditablePostCardSchema {
	post?: Post;
	form?: Post;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
}
