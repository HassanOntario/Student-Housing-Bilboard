'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import styles from './AuthForm.module.css';

export default function AuthForm() {
  const router = useRouter();
  const { handleSignIn, handleSignUp, error: authError } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const displayError = localError || authError;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password) {
      setLocalError('Please fill in all fields.');
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    if (isSignUp && password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    try {
      if (isSignUp) {
        await handleSignUp(email, password);
        router.push('/register');
      } else {
        await handleSignIn(email, password);
        router.push('/search');
      }
    } catch {
      // Error is handled by the auth context
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.title}>
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </h1>
      <p className={styles.subtitle}>
        {isSignUp
          ? 'Sign up with your @uOttawa.ca email'
          : 'Sign in to access student housing'}
      </p>

      {displayError && <div className={styles.error}>{displayError}</div>}

      <div className={styles.field}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="input"
          type="email"
          placeholder="you@uOttawa.ca"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {isSignUp && (
        <div className={styles.field}>
          <label className="label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            className="input"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      )}

      <button
        type="submit"
        className={`btn btn-primary ${styles.submit}`}
        disabled={submitting}
      >
        {submitting ? 'Loading…' : isSignUp ? 'Sign Up' : 'Sign In'}
      </button>

      <p className={styles.toggle}>
        {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
        <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </form>
  );
}
