import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { UserProfile, UserRegistrationData, Listing, ListingFilters } from '@/types';

// ─── User Queries ───────────────────────────────────────────

const USERS_COLLECTION = 'users';

/**
 * Get a user profile by UID.
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, USERS_COLLECTION, uid));
  if (!snap.exists()) return null;
  return { uid: snap.id, ...snap.data() } as UserProfile;
}

/**
 * Create or initialise a user profile after first sign-up.
 */
export async function createUserProfile(
  uid: string,
  email: string
): Promise<void> {
  await setDoc(doc(db, USERS_COLLECTION, uid), {
    email,
    displayName: '',
    studentNumber: '',
    phone: '',
    role: 'student',
    approvalStatus: 'pending',
    registrationComplete: false,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

/**
 * Complete the registration form for a user.
 */
export async function completeRegistration(
  uid: string,
  data: UserRegistrationData
): Promise<void> {
  await updateDoc(doc(db, USERS_COLLECTION, uid), {
    ...data,
    registrationComplete: true,
    updatedAt: Timestamp.now(),
  });
}

/**
 * Get all users with a given approval status (admin use).
 */
export async function getUsersByStatus(
  status: 'pending' | 'approved' | 'rejected'
): Promise<UserProfile[]> {
  const q = query(
    collection(db, USERS_COLLECTION),
    where('approvalStatus', '==', status),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ uid: d.id, ...d.data() }) as UserProfile);
}

/**
 * Update a user's approval status (admin use).
 */
export async function updateApprovalStatus(
  uid: string,
  status: 'approved' | 'rejected'
): Promise<void> {
  await updateDoc(doc(db, USERS_COLLECTION, uid), {
    approvalStatus: status,
    updatedAt: Timestamp.now(),
  });
}

// ─── Listing Queries ────────────────────────────────────────

const LISTINGS_COLLECTION = 'listings';

/**
 * Fetch all available listings with optional filters.
 */
export async function getListings(
  filters?: ListingFilters
): Promise<Listing[]> {
  let q = query(
    collection(db, LISTINGS_COLLECTION),
    where('available', '==', true),
    orderBy('createdAt', 'desc')
  );

  // Firestore compound queries are limited; we do additional
  // filtering client-side for flexibility.
  const snap = await getDocs(q);
  let listings = snap.docs.map(
    (d) => ({ id: d.id, ...d.data() }) as Listing
  );

  if (filters) {
    if (filters.type) {
      listings = listings.filter((l) => l.type === filters.type);
    }
    if (filters.residenceArea) {
      listings = listings.filter(
        (l) => l.residenceArea === filters.residenceArea
      );
    }
    if (filters.minPrice !== undefined) {
      listings = listings.filter((l) => l.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      listings = listings.filter((l) => l.price <= filters.maxPrice!);
    }
    if (filters.bedrooms !== undefined) {
      listings = listings.filter((l) => l.bedrooms >= filters.bedrooms!);
    }
    if (filters.search) {
      const s = filters.search.toLowerCase();
      listings = listings.filter(
        (l) =>
          l.title.toLowerCase().includes(s) ||
          l.address.toLowerCase().includes(s) ||
          l.description.toLowerCase().includes(s)
      );
    }
  }

  return listings;
}

/**
 * Fetch a single listing by ID.
 */
export async function getListingById(id: string): Promise<Listing | null> {
  const snap = await getDoc(doc(db, LISTINGS_COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Listing;
}
