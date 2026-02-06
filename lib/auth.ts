import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from './firebase';

const ALLOWED_DOMAIN = 'uwo.ca';

/**
 * Validate that the email belongs to the allowed university domain.
 */
export function validateEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain === ALLOWED_DOMAIN;
}

/**
 * Sign in an existing user with email and password.
 */
export async function signIn(email: string, password: string) {
  if (!validateEmail(email)) {
    throw new Error(`Only @${ALLOWED_DOMAIN} emails are allowed.`);
  }
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Create a new user account with email and password.
 */
export async function signUp(email: string, password: string) {
  if (!validateEmail(email)) {
    throw new Error(`Only @${ALLOWED_DOMAIN} emails are allowed.`);
  }
  return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Sign out the current user.
 */
export async function signOutUser() {
  // Clear session cookie
  document.cookie = '__session=; path=/; max-age=0';
  return firebaseSignOut(auth);
}

/**
 * Subscribe to authentication state changes.
 */
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export type { User };
