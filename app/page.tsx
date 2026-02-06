'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/listings');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '4rem auto', 
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Student Housing Billboard
      </h1>
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#666', 
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Find your perfect student accommodation. Browse listings, view locations on maps, 
        and calculate commute times to your campus.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link
          href="/login"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
        >
          Login
        </Link>
        <Link
          href="/signup"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#666',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

