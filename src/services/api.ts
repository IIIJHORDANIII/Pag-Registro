import axios from 'axios';

const API_URL = 'http://localhost:3000/api/images';

export const getImages = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const uploadImage = async (formData: FormData) => {
  const response = await axios.post(`${API_URL}/upload`, formData);
  return response.data;
};

export const deleteImage = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};