import { Room, SearchParams } from '../types';

// Static mock inventory to simulate OYO/Agoda-style listings
const MOCK_ROOMS: Room[] = [
  // --- Bangalore ---
  {
    id: '1',
    name: 'QuickStay Townhouse 442',
    location: 'Koramangala, Bangalore',
    originalPrice: 2500,
    discountedPrice: 999,
    discountPercentage: 60,
    imageUrl: 'https://picsum.photos/800/600?random=1',
    rating: 4.5,
    reviewCount: 120,
    amenities: ['Free Wifi', 'AC', 'TV', 'Power Backup'],
    description: 'A premium townhouse in the heart of the city offering sanitized stays with modern amenities.',
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'QuickStay Silver Key',
    location: 'Indiranagar, Bangalore',
    originalPrice: 1800,
    discountedPrice: 899,
    discountPercentage: 50,
    imageUrl: 'https://picsum.photos/800/600?random=2',
    rating: 4.2,
    reviewCount: 85,
    amenities: ['Free Wifi', 'Geyser', 'Elevator'],
    description: 'Budget-friendly stay near metro station, perfect for business travelers.',
  },
  {
    id: '3',
    name: 'QuickStay Home 101',
    location: 'Whitefield, Bangalore',
    originalPrice: 3000,
    discountedPrice: 1200,
    discountPercentage: 60,
    imageUrl: 'https://picsum.photos/800/600?random=3',
    rating: 3.9,
    reviewCount: 40,
    amenities: ['Kitchen', 'Parking', 'AC'],
    description: 'Spacious rooms with kitchen access, ideal for long stays.',
  },

  // --- Mumbai ---
  {
    id: 'm1',
    name: 'QuickStay Sea View Plaza',
    location: 'Colaba, Mumbai',
    originalPrice: 4500,
    discountedPrice: 2200,
    discountPercentage: 51,
    imageUrl: 'https://picsum.photos/800/600?random=10',
    rating: 4.7,
    reviewCount: 350,
    amenities: ['Sea View', 'AC', 'Breakfast'],
    description: 'Stunning views of the Arabian Sea, walking distance from Gateway of India.',
    isBestSeller: true,
  },
  {
    id: 'm2',
    name: 'QuickStay Business Hub',
    location: 'Andheri East, Mumbai',
    originalPrice: 3200,
    discountedPrice: 1500,
    discountPercentage: 53,
    imageUrl: 'https://picsum.photos/800/600?random=11',
    rating: 4.1,
    reviewCount: 120,
    amenities: ['Wifi', 'Work Desk', 'Metro Access'],
    description: 'Perfect for business travelers, close to the airport and metro.',
  },
  {
    id: 'm3',
    name: 'QuickStay Bandra Dorms',
    location: 'Bandra, Mumbai',
    originalPrice: 1500,
    discountedPrice: 799,
    discountPercentage: 45,
    imageUrl: 'https://picsum.photos/800/600?random=12',
    rating: 4.3,
    reviewCount: 89,
    amenities: ['Bunk Beds', 'Locker', 'Common Area'],
    description: 'Hip and happening hostel in the heart of Bandra.',
  },

  // --- Delhi ---
  {
    id: 'd1',
    name: 'QuickStay Capital Residency',
    location: 'Connaught Place, Delhi',
    originalPrice: 3800,
    discountedPrice: 1800,
    discountPercentage: 52,
    imageUrl: 'https://picsum.photos/800/600?random=20',
    rating: 4.5,
    reviewCount: 210,
    amenities: ['Central AC', 'Restaurant', 'Wifi'],
    description: 'Experience the heritage of Delhi with modern luxury.',
    isBestSeller: true,
  },
  {
    id: 'd2',
    name: 'QuickStay Airport Zone',
    location: 'Mahipalpur, Delhi',
    originalPrice: 2000,
    discountedPrice: 999,
    discountPercentage: 50,
    imageUrl: 'https://picsum.photos/800/600?random=21',
    rating: 3.8,
    reviewCount: 400,
    amenities: ['Airport Transfer', 'AC', 'TV'],
    description: 'Transit hotel just 10 mins from IGI Airport T3.',
  },

  // --- Goa ---
  {
    id: 'g1',
    name: 'QuickStay Beach Huts',
    location: 'Palolem, Goa',
    originalPrice: 3000,
    discountedPrice: 1500,
    discountPercentage: 50,
    imageUrl: 'https://picsum.photos/800/600?random=30',
    rating: 4.8,
    reviewCount: 150,
    amenities: ['Beachfront', 'Bar', 'Hammock'],
    description: 'Wake up to the sound of waves in our eco-friendly huts.',
    isBestSeller: true,
  },
  {
    id: 'g2',
    name: 'QuickStay Party Villa',
    location: 'Calangute, Goa',
    originalPrice: 5000,
    discountedPrice: 2499,
    discountPercentage: 50,
    imageUrl: 'https://picsum.photos/800/600?random=31',
    rating: 4.2,
    reviewCount: 95,
    amenities: ['Pool', 'Kitchen', 'Parking'],
    description: 'Group villa with private pool near the main market.',
  },

  // --- Hyderabad ---
  {
    id: 'h1',
    name: 'QuickStay Tech City',
    location: 'Hitech City, Hyderabad',
    originalPrice: 2800,
    discountedPrice: 1300,
    discountPercentage: 53,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviewCount: 110,
    amenities: ['Gym', 'Wifi', 'Breakfast'],
    description: 'Modern stay for techies and corporate guests. Features ergonomic workstations.',
  },
  {
    id: 'h2',
    name: 'QuickStay Heritage',
    location: 'Charminar, Hyderabad',
    originalPrice: 1800,
    discountedPrice: 850,
    discountPercentage: 52,
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    rating: 4.0,
    reviewCount: 60,
    amenities: ['Old City View', 'AC'],
    description: 'Stay close to history in the heart of the old city. Traditional decor with modern comfort.',
  },

  // --- Chennai ---
  {
    id: 'c1',
    name: 'QuickStay Marina Grand',
    location: 'Marina Beach, Chennai',
    originalPrice: 2200,
    discountedPrice: 1100,
    discountPercentage: 50,
    imageUrl: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    reviewCount: 180,
    amenities: ['Sea Breeze', 'Restaurant', 'AC'],
    description: 'Just a short walk from the world\'s second longest urban beach. Bright, airy rooms.',
  },
  {
    id: 'c2',
    name: 'QuickStay T-Nagar Residency',
    location: 'T. Nagar, Chennai',
    originalPrice: 2600,
    discountedPrice: 1250,
    discountPercentage: 52,
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    rating: 4.1,
    reviewCount: 90,
    amenities: ['Shopping Hub', 'Wifi', 'Breakfast'],
    description: 'Located in the shopping heart of Chennai. Modern amenities for the business traveler.',
  },
  {
    id: 'c3',
    name: 'QuickStay OMR IT Hub',
    location: 'OMR, Chennai',
    originalPrice: 2800,
    discountedPrice: 1400,
    discountPercentage: 50,
    imageUrl: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviewCount: 130,
    amenities: ['Pool', 'Gym', 'Wifi'],
    description: 'Premium stay on the IT Corridor, perfect for corporate guests.',
  },

  // --- Kolkata ---
  {
    id: 'k1',
    name: 'QuickStay Park Street Elite',
    location: 'Park Street, Kolkata',
    originalPrice: 3500,
    discountedPrice: 1600,
    discountPercentage: 54,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 200,
    amenities: ['Nightlife', 'Restaurant', 'AC'],
    description: 'Stay in the city\'s most iconic dining and entertainment district.',
  },
  {
    id: 'k2',
    name: 'QuickStay Salt Lake Suites',
    location: 'Salt Lake, Kolkata',
    originalPrice: 2400,
    discountedPrice: 1000,
    discountPercentage: 58,
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    rating: 4.2,
    reviewCount: 75,
    amenities: ['Quiet Area', 'Wifi', 'Kitchen'],
    description: 'Peaceful guesthouse in the planned satellite city.',
  },

  // --- Pune ---
  {
    id: 'p1',
    name: 'QuickStay Koregaon Park',
    location: 'Koregaon Park, Pune',
    originalPrice: 3000,
    discountedPrice: 1400,
    discountPercentage: 53,
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 140,
    amenities: ['Greenery', 'Cafe', 'Wifi'],
    description: 'Trendy neighborhood with plenty of cafes and Osho Ashram nearby.',
  },

  // --- Jaipur ---
  {
    id: 'j1',
    name: 'QuickStay Pink City Haveli',
    location: 'Bani Park, Jaipur',
    originalPrice: 2800,
    discountedPrice: 1200,
    discountPercentage: 57,
    imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 220,
    amenities: ['Traditional Decor', 'Rooftop', 'AC'],
    description: 'Experience Rajasthani hospitality in a heritage-style haveli.',
  },

  // --- Ahmedabad ---
  {
    id: 'a1',
    name: 'QuickStay SG Highway',
    location: 'SG Highway, Ahmedabad',
    originalPrice: 2200,
    discountedPrice: 950,
    discountPercentage: 56,
    imageUrl: 'https://images.unsplash.com/photo-1617859047452-8510bcf207fd?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    reviewCount: 110,
    amenities: ['Business Center', 'Wifi', 'Parking'],
    description: 'Conveniently located on the main highway, connecting the twin cities.',
  },

  // --- Varanasi ---
  {
    id: 'v1',
    name: 'QuickStay Ghat View',
    location: 'Godowlia, Varanasi',
    originalPrice: 2400,
    discountedPrice: 1100,
    discountPercentage: 54,
    imageUrl: 'https://images.unsplash.com/photo-1548602088-9d12a4f9c10f?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 230,
    amenities: ['Ghat View', 'Rooftop', 'AC'],
    description: 'Spiritual retreat walking distance from Kashi Vishwanath Temple and Dashashwamedh Ghat.',
  },

  // --- Udaipur ---
  {
    id: 'u1',
    name: 'QuickStay Lake Palace View',
    location: 'Old City, Udaipur',
    originalPrice: 3500,
    discountedPrice: 1800,
    discountPercentage: 48,
    imageUrl: 'https://images.unsplash.com/photo-1595267866761-e0e676196a09?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 300,
    amenities: ['Lake View', 'Pool', 'Restaurant'],
    description: 'Romantic stay with breathtaking views of Lake Pichola.',
  },

  // --- Kochi ---
  {
    id: 'ko1',
    name: 'QuickStay Fort Kochi',
    location: 'Fort Kochi, Kochi',
    originalPrice: 2800,
    discountedPrice: 1300,
    discountPercentage: 53,
    imageUrl: 'https://images.unsplash.com/photo-1590442387588-e2189004467a?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviewCount: 140,
    amenities: ['Heritage', 'Wifi', 'Cafe'],
    description: 'Colonial style bungalow converted into a charming stay.',
  },

  // --- Amritsar ---
  {
    id: 'am1',
    name: 'QuickStay Golden Stay',
    location: 'Near Golden Temple, Amritsar',
    originalPrice: 2200,
    discountedPrice: 999,
    discountPercentage: 55,
    imageUrl: 'https://images.unsplash.com/photo-1628198751508-c87a5362df55?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 450,
    amenities: ['Walking Distance', 'AC', 'Wifi'],
    description: 'Modern comfort just 500m from the Golden Temple.',
    isBestSeller: true,
  },

  // --- Shimla ---
  {
    id: 's1',
    name: 'QuickStay Hilltop View',
    location: 'Mall Road, Shimla',
    originalPrice: 4000,
    discountedPrice: 2000,
    discountPercentage: 50,
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 180,
    amenities: ['Mountain View', 'Heater', 'Balcony'],
    description: 'Cozy retreat with panoramic views of the Himalayas.',
  }
];

// Simulate an API call with delay
export const searchRooms = async (params: SearchParams): Promise<Room[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple filter logic for the demo
      const locationTerm = params.location.toLowerCase();
      
      const results = MOCK_ROOMS.filter(room => {
        // If no location entered, show all (discovery mode)
        if (!locationTerm) return true;
        
        // Flexible matching
        return room.location.toLowerCase().includes(locationTerm) || 
               room.name.toLowerCase().includes(locationTerm);
      });

      resolve(results);
    }, 600); // Slightly faster response
  });
};