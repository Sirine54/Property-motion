import { useQuery } from '@tanstack/react-query';
import { axiosPrivate } from '../../api/axios';

export type Booking = {
  id: string;
  uid: string;
  details: string | null;
  service?: {
    name: string;
  };
};
export const useBookings = (month?: string | null, status?: string | null) => {
  return useQuery({
    queryKey: ['bookings', month,status],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (month) {
        params.append('month', month);
      }
       if (status) {
         params.append('status', status);
       }
      params.append('limit', '20');

      const url = `/api/bookings${params.toString() ? '?' + params.toString() : ''}`;
      const response = await axiosPrivate.get(url);
      const data = response.data;

      if (!data.success) {
        throw new Error('Failed to fetch bookings');
      }

      return data.data;
    },
    retry: 1,
  });
};
export const usePendingBookings = (month?: string | null) => {
  return useBookings(month, 'PENDING');
};

export const useInProgressBookings = (month?: string | null) => {
  return useBookings(month, 'IN_PROGRESS');
};

export const useCompletedBookings = (month?: string | null) => {
  return useBookings(month, 'COMPLETED');
};
