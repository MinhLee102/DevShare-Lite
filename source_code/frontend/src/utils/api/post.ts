import { PostType } from "@/types";
import apiClient from "./apiConfig";


export const createPost = async (data: { title: string; content: string; tags?: string[]; status?: 'DR' | 'PB' }) => {
    const response = await apiClient.post<PostType>('/posts/', data);
    return response.data;
};

export const updatePost = async (id: string | number, data: { title: string; content: string; tags?: string[] }) => {
    const response = await apiClient.put<PostType>(`/posts/${id}/`, data);
    return response.data;
};

export const deletePost = async (id: string | number) => {
    const response = await apiClient.delete(`/posts/${id}/`);
    return response;
};

export const getPosts = async (page = 1, limit = 10) => {
    try {
        const response = await apiClient.get(`/posts/?page=${page}&limit=${limit}`);
        return response.data; //format data BE: {count, next, previous, results}
    } catch (error) {
        console.error("Failed to load post", error);
        return { results: [], next: null };
    };
};

export const getPostById = async (id: string | number) => {
    try {
        const response = await apiClient.get(`/posts/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Failed to get post details", error);
        return null;
    }
}

export const searchPosts = async (query: string) => {
    try {
        const response = await apiClient.get(`/posts/?search=${query}`);
        return response.data.results || [];
    } catch (error) {
        console.error("Search failed:", error);
        return [];
    }
};

export const publishPost = async (id: string | number) => {
    try {
        const response = await apiClient.post<PostType>(`/posts/${id}/publish/`);
        return response.data;
    } catch (error) {
        console.error(`Failed to publish post ${id}:`, error);
        throw error;
    }
}
