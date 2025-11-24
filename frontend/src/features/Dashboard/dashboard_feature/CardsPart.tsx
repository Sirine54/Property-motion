import { useBookings, useCompletedBookings, useInProgressBookings, usePendingBookings, type Booking } from '@/hooks/useBookings';
import CustomCard from './CustomCard';
import { SquareArrowOutUpRight } from 'lucide-react';
import BookingsTable from './BookingTable';
import { useState } from 'react';

const CardsPart = () => {
const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

const { data: pendingData, isLoading: loadingPending } = usePendingBookings(selectedMonth);
const { data: inProgressData, isLoading: loadingInProgress } = useInProgressBookings(selectedMonth);
const { data: completedData, isLoading: loadingCompleted } = useCompletedBookings(selectedMonth);
const { data: bookingsData, isLoading } = useBookings(selectedMonth);

const handleMonthChange = (month: string) => {
  console.log('Month changed to:', month);
  setSelectedMonth(month);
};
const pendingBookings = pendingData?.items || [];
const inProgressBookings = inProgressData?.items || [];
const completedBookings = completedData?.items || [];
  const BookingItem = ({ booking }: { booking: Booking }) => (
    <li className="flex items-center justify-between border-b-2 pb-2.5">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gray-200" />
        <div className="flex flex-col items-start justify-end text-left">
          <div className="text-sm font-medium">{booking.service?.name || 'Service'}</div>
          <div className="text-xs text-gray-500">{booking.details || 'No details'}</div>
        </div>
      </div>
      <a href="#" className="text-gray-400" onClick={(e) => e.preventDefault()}>
        <SquareArrowOutUpRight size={18} color="black" />
      </a>
    </li>
  );
  return (
    <div className="gap-2.5 flex flex-col w-full">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <CustomCard
            title="Marketing"
            isCamembert
            camPercentage={20}
            per_complete={20}
            per_remaining={80}
            className="h-full"
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <CustomCard
            title="Compliance"
            isCamembert
            camPercentage={20}
            per_complete={20}
            per_remaining={80}
            className="h-full"
          />
        </div>
      </div>
      <BookingsTable
        bookings={bookingsData?.items || []}
        loading={isLoading}
        onViewDetails={(booking) => console.log('View:', booking)}
        onAddBooking={() => console.log('Add booking')}
        onMonthChange={handleMonthChange}
        selectedMonth={selectedMonth || 'november'}
      />
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 w-full">
        <CustomCard title="Pending" className="h-full">
          {loadingPending ? (
            <div className="text-center text-gray-500 py-4">Loading...</div>
          ) : pendingBookings.length === 0 ? (
            <div className="text-center text-gray-500 py-4">No pending bookings</div>
          ) : (
            <ul className="space-y-3">
              {pendingBookings.slice(0, 3).map((booking: Booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </ul>
          )}
        </CustomCard>

        <CustomCard title="In Progress" className="h-full">
          {loadingInProgress ? (
            <div className="text-center text-gray-500 py-4">Loading...</div>
          ) : inProgressBookings.length === 0 ? (
            <div className="text-center text-gray-500 py-4">No bookings in progress</div>
          ) : (
            <ul className="space-y-3">
              {inProgressBookings.slice(0, 3).map((booking: Booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </ul>
          )}
        </CustomCard>

        <CustomCard title="Completed" className="h-full">
          {loadingCompleted ? (
            <div className="text-center text-gray-500 py-4">Loading...</div>
          ) : completedBookings.length === 0 ? (
            <div className="text-center text-gray-500 py-4">No completed bookings</div>
          ) : (
            <ul className="space-y-3">
              {completedBookings.slice(0, 3).map((booking: Booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </ul>
          )}
        </CustomCard>
      </div>
    </div>
  );
};

export default CardsPart
