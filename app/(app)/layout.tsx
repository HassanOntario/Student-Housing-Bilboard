'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import StatusBanner from '@/components/common/StatusBanner';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, handleSignOut } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <>
      {/* Nav Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'var(--header-height)',
          padding: '0 var(--space-lg)',
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <Link
          href="/search"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--color-primary)',
            textDecoration: 'none',
          }}
        >
          <Image src="/icons/logo.svg" alt="Logo" width={32} height={32} />
          Student Housing
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <Link href="/search">Search</Link>
          {profile?.role === 'admin' && <Link href="/admin">Admin</Link>}
          {user && (
            <button className="btn btn-secondary" onClick={handleSignOut}>
              Sign Out
            </button>
          )}
        </nav>
      </header>

      {/* Status Banner */}
      {profile && profile.approvalStatus !== 'approved' && (
        <div style={{ padding: 'var(--space-md) var(--space-lg)' }}>
          <StatusBanner status={profile.approvalStatus} />
        </div>
      )}

      {/* Page Content */}
      <main style={{ padding: 'var(--space-lg)' }}>{children}</main>
    </>
  );
}
