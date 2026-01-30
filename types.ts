export interface Room {
  id: string;
  name: string;
  location: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  amenities: string[];
  description: string;
  isBestSeller?: boolean;
}

export interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export enum AppView {
  HOME = 'HOME',
  RESULTS = 'RESULTS',
  DETAILS = 'DETAILS',
  CONFIRMATION = 'CONFIRMATION',
}

export interface BookingDetails {
  room: Room;
  searchParams: SearchParams;
  totalSavings: number;
  finalPrice: number;
}