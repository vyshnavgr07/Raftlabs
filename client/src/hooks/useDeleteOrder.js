import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteOrder } from '../api/orderApi';

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.removeQueries({ queryKey: ['order', id] });
      toast.success('Order deleted');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete order');
    },
  });
};
