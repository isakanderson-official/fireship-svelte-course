import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { writable } from 'svelte/store';

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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();
