import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getSocket } from '../api/socket';

export const useOrderSocket = (orderId) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();

    const handleStatusUpdate = (payload) => {
      if (payload?.order) {
        queryClient.setQueryData(['order', payload.orderId], payload.order);
        queryClient.invalidateQueries({ queryKey: ['orders'] });
      }
    };

    socket.on('orderStatusUpdated', handleStatusUpdate);

    if (orderId) {
      socket.emit('joinOrder', orderId);
    }

    return () => {
      socket.off('orderStatusUpdated', handleStatusUpdate);
      if (orderId) {
        socket.emit('leaveOrder', orderId);
      }
    };
  }, [orderId, queryClient]);
};
