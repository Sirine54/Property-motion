import { useState } from 'react';
import { EllipsisVertical, Plus, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Booking = {
  id: string;
  uid: string;
  serviceId: string;
  total: number | null;
  details: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  date: string | null;
  createdAt: string;
  service?: {
    id: string;
    uid: string;
    name: string;
  };
  user?: {
    id: string;
    uid: string;
    name: string | null;
    email: string;
  };
};

const statusColors = {
  COMPLETED: 'text-green-700 ',
  IN_PROGRESS: 'text-yellow-700',
  PENDING: 'text-red-700 ',
  CANCELLED: 'text-gray-700 ',
};

const statusLabels = {
  COMPLETED: 'Completed',
  IN_PROGRESS: 'In progress',
  PENDING: 'Pending',
  CANCELLED: 'Cancelled',
};

type Props = {
  bookings?: Booking[];
  loading?: boolean;
  onViewDetails?: (booking: Booking) => void;
  onAddBooking?: () => void;
  onMonthChange?:(month:string) => void;
  selectedMonth?:string;
};

export default function BookingsTable({
  bookings = [],
  loading = false,
  onViewDetails,
  onAddBooking,
  onMonthChange,
  selectedMonth
}: Props) {
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const months = [
    'January 2026',
    'February 2026',
    'March 2026',
    'April 2026',
    'May 2026',
    'June 2026',
    'July 2026',
    'August 2026',
    'September 2026',
    'October 2026',
    'November 2026',
    'December 2026',
  ];

  const handleViewDetails = (booking: Booking) => {
    if (onViewDetails) {
      onViewDetails(booking);
    } else {
      alert(`Details: ${booking.details || 'No details available'}`);
    }
  };

  const handleAddBooking = () => {
    if (onAddBooking) {
      onAddBooking();
    } else {
      alert('Add new booking functionality');
    }
  };

  return (
    <div className="w-full mb-3">
      <Card className="w-full border-none shadow-md p-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b-1 ">
          <h3 className="text-sm font-semibold text-slate-900 flex  ">Bookings</h3>

          {/* Month Dropdown */}
          <div
            className="relative  justify-self-center flex
            "
          >
            <button
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700  bg-gray-50 rounded-md hover:bg-gray-50"
            >
              {selectedMonth}
              <ChevronDown size={16} />
            </button>

            {showMonthDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => {
                      onMonthChange?.(month);
                      setShowMonthDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-md">
            <EllipsisVertical size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Table */}
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader className="mt-0 bg-white ">
              <TableRow className="border-none">
                <TableHead className="text-xs font-medium text-gray-500">Service</TableHead>
                <TableHead className="text-xs font-medium text-gray-500  text-center">
                  Total
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500  text-center">
                  Details
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500  text-center">
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500  text-center">
                  Add
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Loading bookings...
                  </TableCell>
                </TableRow>
              ) : bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No bookings found for {selectedMonth}
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-gray-50">
                    <TableCell className="py-4">
                      <div className="text-sm font-medium text-gray-900 text-left">
                        {booking.service?.name || 'Service Name'}
                      </div>
                    </TableCell>

                    <TableCell className="py-4 text-center">
                      <span className="text-sm text-gray-900">{booking.total ?? '-'}</span>
                    </TableCell>

                    <TableCell className="py-4 text-center">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="text-sm text-black hover:text-green-300 underline font-medium"
                      >
                        View All
                      </button>
                    </TableCell>

                    <TableCell className="py-4 text-center">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          statusColors[booking.status]
                        }`}
                      >
                        {statusLabels[booking.status]}
                      </span>
                    </TableCell>

                    <TableCell className="py-4 text-center">
                      <button
                        onClick={handleAddBooking}
                        className="p-0.1 hover:bg-gray-100 rounded-[4px] inline-flex items-center justify-center border-2 border-gray-600 "
                      >
                        <Plus size={16} className="text-gray-600 font-bold" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
