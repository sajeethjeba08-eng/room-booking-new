import {
    collection,
    doc,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    updateDoc,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { Room, SearchParams } from '../types';

// Booking interface for Firestore
export interface Booking {
    id?: string;
    userId: string;
    userEmail: string;
    userName: string;
    roomId: string;
    roomName: string;
    roomLocation: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    originalPrice: number;
    finalPrice: number;
    totalSavings: number;
    status: 'confirmed' | 'cancelled';
    bookingRef: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

/**
 * Create a new booking in Firestore
 */
export const createBooking = async (
    userId: string,
    userEmail: string,
    userName: string,
    room: Room,
    searchParams: SearchParams
): Promise<Booking> => {
    try {
        const bookingRef = `QS-${Date.now()}`;

        const bookingData = {
            userId,
            userEmail,
            userName: userName || 'Guest',
            roomId: room.id,
            roomName: room.name,
            roomLocation: room.location,
            checkIn: searchParams.checkIn || 'Flexible',
            checkOut: searchParams.checkOut || 'Flexible',
            guests: searchParams.guests || 1,
            originalPrice: room.originalPrice,
            finalPrice: room.discountedPrice,
            totalSavings: room.originalPrice - room.discountedPrice,
            status: 'confirmed' as const,
            bookingRef,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, 'bookings'), bookingData);

        return {
            id: docRef.id,
            ...bookingData,
            createdAt: undefined, // Will be set by Firestore
            updatedAt: undefined
        };
    } catch (error) {
        console.error('Error creating booking:', error);
        throw new Error('Failed to create booking. Please try again.');
    }
};

/**
 * Get all bookings for a specific user
 */
export const getUserBookings = async (userId: string): Promise<Booking[]> => {
    try {
        const q = query(
            collection(db, 'bookings'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Booking));
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        throw new Error('Failed to fetch bookings. Please try again.');
    }
};

/**
 * Cancel a booking (update status to 'cancelled')
 */
export const cancelBooking = async (bookingId: string): Promise<void> => {
    try {
        await updateDoc(doc(db, 'bookings', bookingId), {
            status: 'cancelled',
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        throw new Error('Failed to cancel booking. Please try again.');
    }
};
