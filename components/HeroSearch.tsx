import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { SearchParams } from '../types';

interface HeroSearchProps {
  onSearch: (params: SearchParams) => void;
}

const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location: location || 'Bangalore', checkIn, checkOut, guests });
  };

  return (
    <div className="relative h-[500px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
         <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover"
         />
         {/* Gradient Overlay for better text visibility */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 text-center">
        {/* Brand Text */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">
          QuickStay
        </h1>
        <p className="text-xl md:text-2xl text-white font-medium mb-10 drop-shadow-md opacity-90">
          Hotels, homes, and everything in between.
        </p>

        {/* Floating Search Box */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-4 flex flex-col md:flex-row gap-4 items-center max-w-4xl mx-auto transform transition-all hover:scale-[1.01]">
          
          <div className="flex-1 w-full bg-gray-50 rounded-lg border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all group relative">
            <div className="absolute top-2 left-3 text-xs font-bold text-gray-400 uppercase tracking-wider group-focus-within:text-blue-500">Destination</div>
            <div className="flex items-center px-3 pt-6 pb-2">
              <MapPin className="w-5 h-5 mr-3 text-gray-500 group-focus-within:text-blue-500" />
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent outline-none font-semibold text-gray-800 placeholder-gray-400 text-lg"
                placeholder="Enter a city or location"
              />
            </div>
          </div>

          <div className="w-full md:w-auto flex gap-4">
             <div className="flex-1 bg-gray-50 rounded-lg border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all group relative min-w-[140px]">
                <div className="absolute top-2 left-3 text-xs font-bold text-gray-400 uppercase tracking-wider group-focus-within:text-blue-500">Check-in</div>
                <div className="flex items-center px-3 pt-6 pb-2">
                    <Calendar className="w-5 h-5 mr-2 text-gray-500 group-focus-within:text-blue-500" />
                    <input 
                        type="date" 
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-transparent outline-none font-semibold text-gray-800 text-sm"
                    />
                </div>
            </div>

             <div className="flex-1 bg-gray-50 rounded-lg border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all group relative min-w-[120px]">
                <div className="absolute top-2 left-3 text-xs font-bold text-gray-400 uppercase tracking-wider group-focus-within:text-blue-500">Guests</div>
                <div className="flex items-center px-3 pt-6 pb-2">
                    <Users className="w-5 h-5 mr-2 text-gray-500 group-focus-within:text-blue-500" />
                    <select 
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full bg-transparent outline-none font-semibold text-gray-800 text-lg appearance-none cursor-pointer"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                        <option value={10}>10+</option>
                    </select>
                </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-10 rounded-lg shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span>SEARCH</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSearch;