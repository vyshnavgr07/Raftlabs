import { useQuery } from '@tanstack/react-query';
import { fetchMenu } from '../api/menuApi';

export const useMenu = (params = {}) =>
  useQuery({
    queryKey: ['menu', params],
    queryFn: () => fetchMenu(params),
    staleTime: 60_000,
    retry: 2,
  });
