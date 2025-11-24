import { useBookings } from '@/hooks/useBookings';
import BookingsTable from './dashboard_feature/BookingTable';
import CardsPart from './dashboard_feature/CardsPart';
import TopPart from './dashboard_feature/TopPart';
import { useState } from 'react';

const DashboardPage = () => {
const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

const { data: bookingsData, isLoading, error, isError } = useBookings(selectedMonth);

// Debug logs
console.log('Loading:', isLoading);
console.log('Error:', error);
console.log('Data:', bookingsData);

const handleMonthChange = (month: string) => {
  console.log('Month changed to:', month);
  setSelectedMonth(month);
};
  return (
    <div className=" mt-2 gap-2.5 flex flex-col">
      <TopPart />

      <div className="overflow-y-auto h-[55vh] custom-scrollbar pb-10">
        <BookingsTable
          bookings={bookingsData?.items || []}
          loading={isLoading}
          onViewDetails={(booking) => console.log('View:', booking)}
          onAddBooking={() => console.log('Add booking')}
          onMonthChange={handleMonthChange}
          selectedMonth={selectedMonth || 'november'}
        />
        <CardsPart />
      </div>
    </div>
  );
};

export default DashboardPage;
