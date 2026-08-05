import api from './axiosInstance';

export const fetchOrders = async (params = {}) => {
  const { data } = await api.get('/orders', { params });
  return data.data;
};

export const fetchOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data.data;
};

export const createOrder = async (payload) => {
  const { data } = await api.post('/orders', payload);
  return data.data;
};

export const updateOrderStatus = async ({ id, status }) => {
  const { data } = await api.patch(`/orders/${id}/status`, { status });
  return data.data;
};

export const deleteOrder = async (id) => {
  const { data } = await api.delete(`/orders/${id}`);
  return data.data;
};
