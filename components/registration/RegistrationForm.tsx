'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { completeRegistration } from '@/lib/firestore';
import styles from './RegistrationForm.module.css';

export default function RegistrationForm() {
  const router = useRouter();
  const { user, refreshProfile } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!displayName.trim() || !studentNumber.trim() || !phone.trim()) {
      setError('All fields are required.');
      return;
    }

    if (!user) {
      setError('You must be signed in.');
      return;
    }

    setSubmitting(true);
    try {
      await completeRegistration(user.uid, {
        displayName: displayName.trim(),
        studentNumber: studentNumber.trim(),
        phone: phone.trim(),
      });
      await refreshProfile();
      router.push('/search');
    } catch (err: any) {
      setError(err.message ?? 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.title}>Complete Your Profile</h1>
      <p className={styles.subtitle}>
        Please provide your student details to continue.
      </p>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.field}>
        <label className="label" htmlFor="displayName">
          Full Name
        </label>
        <input
          id="displayName"
          className="input"
          type="text"
          placeholder="Jane Doe"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className="label" htmlFor="studentNumber">
            Student Number
          </label>
          <input
            id="studentNumber"
            className="input"
            type="text"
            placeholder="251000000"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className="label" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            className="input"
            type="tel"
            placeholder="(519) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className={`btn btn-primary ${styles.submit}`}
        disabled={submitting}
      >
        {submitting ? 'Saving…' : 'Complete Registration'}
      </button>
    </form>
  );
}
