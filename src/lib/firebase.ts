import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCAe7fy6fVopTmFDBOOrwYrK0GY4nmejQE',
  authDomain: 'svelte-course-2ff9d.firebaseapp.com',
  projectId: 'svelte-course-2ff9d',
  storageBucket: 'svelte-course-2ff9d.appspot.com',
  messagingSenderId: '763846320950',
  appId: '1:763846320950:web:0e5cafebddb268000e8997',
  measurementId: 'G-C34VV3Q3ET',
};

// Initialize Firebase
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const analytics = getAnalytics(app);

export const db = getFirestore();
