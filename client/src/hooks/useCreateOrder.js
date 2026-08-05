import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createOrder } from '../api/orderApi';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.setQueryData(['order', order._id], order);
      toast.success('Order placed successfully!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to create order';
      toast.error(message);
    },
  });
};
