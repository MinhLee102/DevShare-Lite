import axios from "axios"

const apiClient = axios.create({baseURL: "http://localhost:8000/api"});

export const getPosts = async (page = 1, limit = 10) => {
    try {
        const response = await apiClient.get(`/posts/?page=${page}&limit=${limit}`);
        return response.data; //format data BE: {count, next, previous, results}
    } catch (error) {
        console.error("Failed to load post", error);
        return { results: [], next: null };
    };
};

