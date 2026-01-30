import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVstE5d6JaJX7R0uD-mW0GFMWFBvVju9E",
  authDomain: "room-booking-b0a1d.firebaseapp.com",
  projectId: "room-booking-b0a1d",
  storageBucket: "room-booking-b0a1d.firebasestorage.app",
  messagingSenderId: "346710989514",
  appId: "1:346710989514:web:e2f6860afda62143433233"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
