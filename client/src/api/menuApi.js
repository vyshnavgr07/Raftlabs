import api from './axiosInstance';

export const fetchMenu = async (params = {}) => {
  const { data } = await api.get('/menu', { params });
  return data.data;
};
