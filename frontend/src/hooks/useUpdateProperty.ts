import type { CreatePropertyInput } from '@/types/property';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { axiosPrivate } from '../../api/axios';
import { buildPropertyFormData } from './useCreateProperty';
import { propertiesKeys } from './useGetProperties';

export type UpdatePropertyInput = {
  id: string;
  payload: Partial<CreatePropertyInput>;
};

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, UpdatePropertyInput>({
    mutationFn: async ({ id, payload }) => {
      const formData = buildPropertyFormData(payload as CreatePropertyInput);
      const { data } = await axiosPrivate.patch(`/api/properties/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: propertiesKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: propertiesKeys.all });
    },
  });
}
