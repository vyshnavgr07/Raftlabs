import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from '../api/orderApi';

export const useOrder = (id) =>
  useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id),
    enabled: Boolean(id),
    retry: 2,
  });
