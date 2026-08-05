import api from './axiosInstance';

export const fetchOrders = async () => {
  const { data } = await api.get('/orders');
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
