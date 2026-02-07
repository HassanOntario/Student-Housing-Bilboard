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
import type { UserProfile, UserRegistrationData } from '@/types';

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
// Listings are now served from the static CAMPUS_RESIDENCES
// array in @/types/listing — no Firestore needed.
