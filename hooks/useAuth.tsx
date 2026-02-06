'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import { onAuthChange, signIn, signUp, signOutUser, type User } from '@/lib/auth';
import { getUserProfile, createUserProfile } from '@/lib/firestore';
import type { UserProfile } from '@/types';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleSignUp: (email: string, password: string) => Promise<void>;
  handleSignOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
  });

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        // Set session cookie for middleware
        const token = await firebaseUser.getIdToken();
        document.cookie = `__session=${token}; path=/; max-age=3600; SameSite=Lax`;

        const profile = await getUserProfile(firebaseUser.uid);
        setState({ user: firebaseUser, profile, loading: false, error: null });
      } else {
        setState({ user: null, profile: null, loading: false, error: null });
      }
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await signIn(email, password);
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err.message ?? 'Sign-in failed.',
      }));
      throw err;
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const cred = await signUp(email, password);
      await createUserProfile(cred.user.uid, cred.user.email!);
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err.message ?? 'Sign-up failed.',
      }));
      throw err;
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    setState({ user: null, profile: null, loading: false, error: null });
  };

  const refreshProfile = async () => {
    if (!state.user) return;
    const profile = await getUserProfile(state.user.uid);
    setState((prev) => ({ ...prev, profile }));
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      handleSignIn,
      handleSignUp,
      handleSignOut,
      refreshProfile,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
