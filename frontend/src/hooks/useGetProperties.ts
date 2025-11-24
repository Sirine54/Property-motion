import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { axiosPrivate } from '../../api/axios';
import type { Property } from '@/types/property';

export const FALLBACK_IMAGE = '/mnt/data/dc6bbe64-819b-43ae-8dd0-ba424f2f65d3.png';

type ListResponse = {
  items: Property[];
  total: number;
  page: number;
  pageSize: number;
};

export const propertiesKeys = {
  all: ['properties'] as const,
  lists: (page = 1, limit = 10) => [...propertiesKeys.all, 'list', { page, limit }] as const,
  detail: (id: string) => [...propertiesKeys.all, 'detail', id] as const,
};

export function useProperties(page = 1, limit = 10) {
  return useQuery<ListResponse, AxiosError>({
    queryKey: propertiesKeys.lists(page, limit),
    queryFn: async () => {
      const { data } = await axiosPrivate.get<ListResponse>('/api/properties', {
        params: { page, limit },
      });
      return data;
    },
    placeholderData: (previousData) => previousData, 
    staleTime: 30000, 
  });
}
