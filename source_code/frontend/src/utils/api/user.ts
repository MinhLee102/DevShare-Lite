import apiClient from "./apiConfig";

export const getProfile = async () => {
  const response = await apiClient.get('/users/profile/');
  return response.data;
};

export const updateProfile = async (data: { bio?: string; profile_image?: File | null }) => {
  const formData = new FormData();

  if (data.bio !== undefined) {
    formData.append('bio', data.bio);
  }
  
  if (data.profile_image) {
    formData.append('profile_image', data.profile_image);
  } else if (data.profile_image === null) {
    formData.append('profile_image', '');
  }

  const response = await apiClient.patch('/users/profile/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};