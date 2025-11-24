import type { Property } from '@/types/property';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { axiosPrivate } from '../../api/axios';
import { propertiesKeys } from './useGetProperties';

export function useProperty(id?: string | null) {
  return useQuery<Property, AxiosError>({
    queryKey: id ? propertiesKeys.detail(id) : ['property', 'none'],
    queryFn: async () => {
      if (!id) throw new Error('ID de propriété requis');
      const { data } = await axiosPrivate.get<Property>(`/api/properties/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 60000,
    retry: 1,
  });
}
