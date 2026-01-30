import React from 'react';
import { BookingDetails } from '../types';
import { CheckCircle, Home, Calendar, MapPin, Printer } from 'lucide-react';

interface BookingConfirmationProps {
  booking: BookingDetails;
  onGoHome: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ booking, onGoHome }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 print:bg-white print:p-0">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden relative print:shadow-none print:max-w-none">
        <div className="bg-green-600 p-6 text-center text-white print:bg-white print:text-black print:border-b print:border-gray-200">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 print:hidden">
                <CheckCircle className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold mb-1">Booking Confirmed!</h1>
            <p className="text-green-100 text-sm print:hidden">Your room is reserved.</p>
            <p className="hidden print:block text-gray-500 text-sm">Thank you for choosing QuickStay.</p>
        </div>

        <div className="p-6">
            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                <img src={booking.room.imageUrl} alt="" className="w-20 h-20 rounded-lg object-cover print:hidden" />
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">{booking.room.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" /> {booking.room.location}
                    </p>
                    <div className="mt-2 text-xs bg-gray-100 inline-block px-2 py-1 rounded text-gray-600 print:bg-transparent print:p-0 print:border print:border-gray-300">
                        {booking.searchParams.guests} Guest(s)
                    </div>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Check-in</span>
                    <span className="font-semibold text-gray-800">{booking.searchParams.checkIn || 'Today'}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Booking ID</span>
                    <span className="font-mono font-semibold text-gray-800">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Payment Status</span>
                    <span className="font-bold text-orange-600">Pay at Hotel</span>
                </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6 text-center print:bg-transparent print:border-gray-200">
                 <p className="text-green-800 text-sm font-medium mb-1 print:text-gray-800">Total Payable Amount</p>
                 <p className="text-2xl font-bold text-green-700 print:text-black">₹{booking.finalPrice}</p>
                 <p className="text-xs text-green-600 mt-1 print:hidden">You saved ₹{booking.totalSavings}!</p>
            </div>

            <div className="flex gap-3 print:hidden">
                <button 
                    onClick={handlePrint}
                    className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                    <Printer className="w-4 h-4" />
                    Invoice
                </button>
                <button 
                    onClick={onGoHome}
                    className="flex-1 bg-gray-900 text-white font-bold py-3 px-4 rounded hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                    <Home className="w-4 h-4" />
                    Home
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;