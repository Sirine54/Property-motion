import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { axiosPrivate } from '../../api/axios';
import { propertiesKeys } from './useGetProperties';

export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, { id: string }>({
    mutationFn: async ({ id }) => {
      const { data } = await axiosPrivate.delete(`/api/properties/${id}`);
      return data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: propertiesKeys.all });
      queryClient.removeQueries({ queryKey: propertiesKeys.detail(id) });
    },
  });
}
