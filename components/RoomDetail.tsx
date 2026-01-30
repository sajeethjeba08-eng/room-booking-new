import React from 'react';
import { Room } from '../types';
import { ArrowLeft, Star, MapPin, CheckCircle, ShieldCheck, Wifi, Coffee, Tv, Car, Wind } from 'lucide-react';

interface RoomDetailProps {
  room: Room;
  onBack: () => void;
  onBook: (room: Room) => void;
}

const RoomDetail: React.FC<RoomDetailProps> = ({ room, onBack, onBook }) => {
  const getIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (lower.includes('breakfast') || lower.includes('kitchen')) return <Coffee className="w-4 h-4" />;
    if (lower.includes('tv')) return <Tv className="w-4 h-4" />;
    if (lower.includes('parking')) return <Car className="w-4 h-4" />;
    if (lower.includes('ac') || lower.includes('wind')) return <Wind className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <div className="max-w-3xl mx-auto bg-white min-h-screen pb-24 md:pb-12 shadow-xl border-x border-gray-100">
      {/* Navbar for Detail View */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 px-4 h-14 flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-gray-800 truncate">{room.name}</span>
      </div>

      {/* Hero Image */}
      <div className="w-full h-64 md:h-80 relative">
        <img src={room.imageUrl} alt={room.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
             <h1 className="text-2xl font-bold text-white mb-1">{room.name}</h1>
             <p className="text-white/90 text-sm flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> {room.location}
             </p>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-8">
        {/* Rating & Review Summary */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="bg-green-600 text-white font-bold px-2 py-0.5 rounded text-sm flex items-center gap-1">
                    {room.rating} <Star className="w-3 h-3 fill-current" />
                </span>
                <span className="text-sm text-gray-600 underline decoration-gray-300">
                    {room.reviewCount} Ratings
                </span>
            </div>
             <div className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded border border-green-100">
                <ShieldCheck className="w-4 h-4" /> Sanitized Stay
            </div>
        </div>

        {/* Description */}
        <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{room.description}</p>
        </div>

        {/* Amenities */}
        <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {room.amenities.map(am => (
                    <div key={am} className="flex items-center gap-2 text-gray-600 text-sm">
                        {getIcon(am)}
                        <span>{am}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Policies (Static Mock) */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h2 className="font-bold text-gray-900 text-sm mb-2">Hotel Policies</h2>
            <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
                <li>Check-in: 12:00 PM</li>
                <li>Check-out: 11:00 AM</li>
                <li>Couples are welcome</li>
                <li>Valid ID required at check-in</li>
            </ul>
        </div>
      </div>

      {/* Sticky Bottom Bar for Booking */}
      <div className="fixed bottom-0 left-0 right-0 md:relative bg-white border-t border-gray-200 p-4 md:rounded-b-lg flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 max-w-3xl mx-auto">
        <div>
            <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">₹{room.discountedPrice}</span>
                <span className="text-sm text-gray-400 line-through decoration-red-500">₹{room.originalPrice}</span>
            </div>
            <p className="text-xs text-green-600 font-semibold">You save ₹{room.originalPrice - room.discountedPrice}!</p>
        </div>
        <button 
            onClick={() => onBook(room)}
            className="bg-red-600 text-white font-bold py-3 px-8 rounded shadow-lg hover:bg-red-700 active:scale-95 transition-all"
        >
            Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomDetail;