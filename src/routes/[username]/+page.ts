import { collection, getDocs, query, where } from 'firebase/firestore';
import type { PageLoad } from './$types';
import { db } from '$lib/firebase';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const collectionRef = collection(db, 'users');

  const q = query(collectionRef, where('username', '==', params.username));
  const snapshot = await getDocs(q);
  const exists = snapshot.docs[0]?.exists();

  if (!exists) {
    throw error(404, 'User not found');
  }
  const data = snapshot.docs[0]?.data();

  if (!data.published) {
    throw error(403, `The profile of @${data.username} is not public`);
  }

  return {
    username: data.username,
    photoURL: data.photoURL,
    bio: data.bio,
    links: data.links ?? [],
  };
}) satisfies PageLoad;
