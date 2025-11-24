import type { CreatePropertyInput } from '@/types/property';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate } from '../../api/axios';
import type { AxiosError } from 'axios';
import { propertiesKeys } from './useGetProperties';

export function buildPropertyFormData(payload: CreatePropertyInput) {
  const formData = new FormData();

  const simpleFields = [
    'name',
    'address',
    'city',
    'country',
    'postCode',
    'reference',
    'propertyType',
    'accessProperty',
    'dimensions',
    'propertyOn',
  ] as const;

  simpleFields.forEach((field) => {
    const value = payload[field];
    if (value) formData.append(field, value); 
  });

  const numericFields = ['propertyValue', 'bedrooms', 'bathrooms', 'floors'] as const;
  numericFields.forEach((field) => {
    const value = payload[field];
    if (value !== undefined && value !== null) {
      formData.append(field, String(value));
    }
  });

  if (payload.features) {
    const featuresValue =
      typeof payload.features === 'string' ? payload.features : JSON.stringify(payload.features);
    formData.append('features', featuresValue);
  }

  if (payload.ownerId) {
    formData.append('ownerId', String(payload.ownerId));
  }

  if (payload.imageFile) {
    formData.append('image', payload.imageFile, payload.imageFile.name);
  }

  return formData;
}

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreatePropertyInput>({
    mutationFn: async (input) => {
      const formData = buildPropertyFormData(input);
      const { data } = await axiosPrivate.post('/api/properties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertiesKeys.all });
    },
  });
}
