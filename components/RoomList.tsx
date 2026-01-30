import React, { useState, useMemo } from 'react';
import { Room } from '../types';
import { Star, MapPin, ChevronDown } from 'lucide-react';

type SortOption = 'best_deal' | 'price_low' | 'price_high' | 'rating';

interface RoomListProps {
  rooms: Room[];
  loading: boolean;
  onSelectRoom: (room: Room) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, loading, onSelectRoom }) => {
  const [sortBy, setSortBy] = useState<SortOption>('best_deal');

  // Sort rooms based on selected option
  const sortedRooms = useMemo(() => {
    const sorted = [...rooms];
    switch (sortBy) {
      case 'best_deal':
        return sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
      case 'price_low':
        return sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
      case 'price_high':
        return sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [rooms, sortBy]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Searching rooms...</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-2">No rooms available for selected dates</h3>
          <p className="text-gray-500">Try a different location or adjust your travel dates.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header with count and sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {rooms.length} Stays Available
        </h2>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="best_deal">Best Deal</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-4">
        {sortedRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => onSelectRoom(room)}
          >
            {/* Image Section */}
            <div className="md:w-64 h-48 md:h-auto bg-gray-200 relative shrink-0">
              <img src={room.imageUrl} alt={room.name} className="w-full h-full object-cover" />
              {room.isBestSeller && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                  BESTSELLER
                </span>
              )}
              <span className="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-gray-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                <Star className="w-3 h-3 text-green-600 fill-current" />
                {room.rating} ({room.reviewCount})
              </span>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 group-hover:text-red-600 transition-colors">
                  {room.name}
                </h3>
                <p className="text-sm text-gray-500 flex items-center mb-3">
                  <MapPin className="w-3 h-3 mr-1" /> {room.location}
                </p>

                {/* Amenities pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 3).map(am => (
                    <span key={am} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
                      {am}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-xs text-gray-400">+{room.amenities.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-end justify-between border-t border-gray-100 pt-3 mt-auto">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">₹{room.discountedPrice}</span>
                    <span className="text-sm text-gray-400 line-through">₹{room.originalPrice}</span>
                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded">
                      {room.discountPercentage}% OFF
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">per room / per night</p>
                </div>
                <button className="bg-red-600 text-white font-semibold py-2 px-6 rounded shadow hover:bg-red-700 transition-colors">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;