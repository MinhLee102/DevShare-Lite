import apiClient from './apiConfig'
import { Comment } from '@/types';

export const getCommentsForPost = async (postId: string | number) => {
    const response = await apiClient.get<Comment[]>(`/posts/${postId}/comments/`);
    return response.data;
};

export const createComment = async (postId: string | number, data: { content: string, parent?: number | null }) => {
    const response = await apiClient.post<Comment>(`/posts/${postId}/comments/`, data);
    return response.data;
};