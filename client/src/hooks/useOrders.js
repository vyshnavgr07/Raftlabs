import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../api/orderApi';

export const useOrders = () =>
  useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    retry: 2,
  });
