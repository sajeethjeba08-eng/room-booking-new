import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSearch from './components/HeroSearch';
import RoomList from './components/RoomList';
import RoomDetail from './components/RoomDetail';
import BookingConfirmation from './components/BookingConfirmation';
import { searchRooms } from './services/roomService';
import { createBooking } from './services/bookingService';
import { useAuth } from './context/AuthContext';
import { Room, SearchParams, AppView, BookingDetails } from './types';

const MainApp: React.FC = () => {
  // Auth context
  const { user, userData } = useAuth();

  // State for Navigation (Simple View State)
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  // Data State
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Handlers
  const handleSearch = async (params: SearchParams) => {
    setSearchParams(params);
    setCurrentView(AppView.RESULTS);
    setLoading(true);

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const results = await searchRooms(params);
      setRooms(results);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setCurrentView(AppView.DETAILS);
    window.scrollTo(0, 0);
  };

  const handleBookNow = async (room: Room) => {
    setLoading(true);
    setBookingError(null);

    try {
      // Save booking to Firestore
      const booking = await createBooking(
        user?.uid || '',
        user?.email || '',
        userData?.name || 'Guest',
        room,
        searchParams
      );

      // Create booking details with Firestore reference
      const details: BookingDetails = {
        room,
        searchParams,
        finalPrice: room.discountedPrice,
        totalSavings: room.originalPrice - room.discountedPrice,
        bookingRef: booking.bookingRef
      };

      setBookingDetails(details);
      setCurrentView(AppView.CONFIRMATION);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Booking failed:", error);
      setBookingError('Failed to complete booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    setCurrentView(AppView.HOME);
    setSearchParams({ location: '', checkIn: '', checkOut: '', guests: 1 });
    setSelectedRoom(null);
    setRooms([]);
    window.scrollTo(0, 0);
  };

  // Render Logic based on View State
  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <>
            <HeroSearch onSearch={handleSearch} />

            {/* Popular Cities Section */}
            <div className="max-w-6xl mx-auto px-4 py-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">Explore Popular Destinations</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {[
                  { name: 'Bangalore', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Mumbai', img: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Delhi', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Hyderabad', img: 'https://images.unsplash.com/photo-1572455044327-7348c1be7267?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Chennai', img: 'https://images.unsplash.com/photo-1582510003544-52437805dd65?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Kolkata', img: 'https://images.unsplash.com/photo-1558431382-27e30314225d?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Pune', img: 'https://images.unsplash.com/photo-1620766182966-c6eb3d3512f7?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Jaipur', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Ahmedabad', img: 'https://images.unsplash.com/photo-1593368858764-54c7d5c58907?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Varanasi', img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Udaipur', img: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Kochi', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Amritsar', img: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=400&q=80' },
                  { name: 'Shimla', img: 'https://images.unsplash.com/photo-1562649633-e6dadfa50473?auto=format&fit=crop&w=400&q=80' }
                ].map((city) => (
                  <button
                    key={city.name}
                    onClick={() => handleSearch({ location: city.name, checkIn: '', checkOut: '', guests: 1 })}
                    className="relative group rounded-xl overflow-hidden aspect-[3/4] hover:shadow-xl transition-all"
                  >
                    <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <span className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-md">{city.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Banner */}
            <div className="bg-blue-50 py-12">
              <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">List your property on QuickStay</h3>
                  <p className="text-gray-600 mb-4">Reach millions of travelers and grow your business.</p>
                  <button className="text-blue-600 font-bold hover:underline">Get Started &rarr;</button>
                </div>
                <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=500&q=80" alt="House" className="w-full md:w-1/3 rounded-lg shadow-md" />
              </div>
            </div>
          </>
        );
      case AppView.RESULTS:
        return (
          <RoomList
            rooms={rooms}
            loading={loading}
            onSelectRoom={handleSelectRoom}
          />
        );
      case AppView.DETAILS:
        return selectedRoom ? (
          <RoomDetail
            room={selectedRoom}
            onBack={() => setCurrentView(AppView.RESULTS)}
            onBook={handleBookNow}
          />
        ) : null;
      case AppView.CONFIRMATION:
        return bookingDetails ? (
          <BookingConfirmation
            booking={bookingDetails}
            onGoHome={handleGoHome}
          />
        ) : null;
      default:
        return null;
    }
  };

  // Don't show header/footer on confirmation page for immersive feel
  const showLayout = currentView !== AppView.CONFIRMATION;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showLayout && <Header onGoHome={handleGoHome} />}
      <main className="flex-grow">
        {renderView()}
      </main>
      {showLayout && <Footer />}
    </div>
  );
};

export default MainApp;