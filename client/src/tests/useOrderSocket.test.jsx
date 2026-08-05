import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useOrderSocket } from '../hooks/useOrderSocket';

const listeners = new Map();

vi.mock('../api/socket', () => ({
  getSocket: () => ({
    on: (event, handler) => listeners.set(event, handler),
    off: (event) => listeners.delete(event),
    emit: vi.fn(),
  }),
}));

describe('useOrderSocket', () => {
  test('updates query cache on status events', () => {
    const queryClient = new QueryClient();
    const setSpy = vi.spyOn(queryClient, 'setQueryData');
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    renderHook(() => useOrderSocket('abc'), { wrapper });

    const handler = listeners.get('orderStatusUpdated');
    handler({
      orderId: 'abc',
      order: { _id: 'abc', status: 'PREPARING' },
    });

    expect(setSpy).toHaveBeenCalled();
    expect(invalidateSpy).toHaveBeenCalled();
  });
});
