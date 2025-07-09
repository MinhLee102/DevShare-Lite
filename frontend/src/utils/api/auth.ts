import apiClient from "./apiConfig";


export const loginUser = (data: Record<string, string>) => {
    return apiClient.post('/auth/login/', data);
};

export const registerUser = (data: Record<string, string>) => {
    return apiClient.post('/auth/registration/', data)
};

export const logoutUser = (refreshToken: string) => {
    return apiClient.post('/auth/logout/', {refresh: refreshToken});
};