import { Post } from '@/entities/Post';

export interface HomePageSchema {
	data: Post[];
	isLoading: boolean;
	error?: string;
	page: number;
	limit: number;
}
