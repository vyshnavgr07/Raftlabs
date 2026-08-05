import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../api/orderApi';

export const useOrders = (params = {}, options = {}) =>
  useQuery({
    queryKey: ['orders', params],
    queryFn: () => fetchOrders(params),
    retry: 2,
    ...options,
  });
