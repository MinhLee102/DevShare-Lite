import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


export const loginUser = (data: Record<string, string>) => {
    return apiClient.post('/auth/login/', data);
};

export const registerUser = (data: Record<string, string>) => {
    return apiClient.post('/auth/registration/', data)
};

export const logoutUser = (refreshToken: string) => {
    return apiClient.post('/auth/logout/', {refresh: refreshToken});
};