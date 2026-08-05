import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMenu } from '../hooks/useMenu';
import { useOrder } from '../hooks/useOrder';
import { useOrders } from '../hooks/useOrders';
import { useCreateOrder } from '../hooks/useCreateOrder';
import { useDeleteOrder } from '../hooks/useDeleteOrder';
import { useUpdateStatus } from '../hooks/useUpdateStatus';
import * as menuApi from '../api/menuApi';
import * as orderApi from '../api/orderApi';

vi.mock('../api/menuApi');
vi.mock('../api/orderApi');
vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('React Query hooks', () => {
  test('useMenu fetches menu data', async () => {
    menuApi.fetchMenu.mockResolvedValue([{ name: 'Burger' }]);

    const { result } = renderHook(() => useMenu(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data[0].name).toBe('Burger');
  });

  test('useOrder fetches order by id', async () => {
    orderApi.fetchOrderById.mockResolvedValue({ _id: '1', status: 'ORDER_RECEIVED' });

    const { result } = renderHook(() => useOrder('1'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data._id).toBe('1');
  });

  test('useOrders fetches all orders', async () => {
    orderApi.fetchOrders.mockResolvedValue([{ _id: '1' }]);

    const { result } = renderHook(() => useOrders(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(1);
  });

  test('useCreateOrder creates order', async () => {
    orderApi.createOrder.mockResolvedValue({ _id: '99', total: 20 });

    const { result } = renderHook(() => useCreateOrder(), { wrapper: createWrapper() });

    let order;
    await act(async () => {
      order = await result.current.mutateAsync({
        customer: { name: 'A', phone: '1', address: 'Somewhere long enough' },
        items: [{ menuId: '1', quantity: 1 }],
        paymentMethod: 'Paid',
      });
    });

    expect(order._id).toBe('99');
    expect(orderApi.createOrder).toHaveBeenCalled();
  });

  test('useDeleteOrder deletes order', async () => {
    orderApi.deleteOrder.mockResolvedValue({ _id: '1' });

    const { result } = renderHook(() => useDeleteOrder(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.mutateAsync('1');
    });

    expect(orderApi.deleteOrder.mock.calls[0][0]).toBe('1');
  });

  test('useUpdateStatus updates status', async () => {
    orderApi.updateOrderStatus.mockResolvedValue({ _id: '1', status: 'PREPARING' });

    const { result } = renderHook(() => useUpdateStatus(), { wrapper: createWrapper() });

    let updated;
    await act(async () => {
      updated = await result.current.mutateAsync({ id: '1', status: 'PREPARING' });
    });

    expect(updated.status).toBe('PREPARING');
  });
});
