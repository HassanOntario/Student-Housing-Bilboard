'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import StatusBanner from '@/components/common/StatusBanner';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Chatbot from '@/components/chat/Chatbot';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, handleSignOut } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header
        style={{
          background: '#fff',
          borderBottom: '1px solid var(--uottawa-warm-grey-2)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            padding: 'var(--space-md) var(--space-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/search"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: 'var(--uottawa-garnet)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.1rem',
              }}
            >
              uO
            </div>
            <div>
              <div
                style={{
                  color: 'var(--uottawa-charcoal)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  lineHeight: 1.2,
                }}
              >
                University of Ottawa
              </div>
              <div
                style={{
                  color: 'var(--uottawa-warm-grey-1)',
                  fontSize: '0.75rem',
                }}
              >
                Student Housing
              </div>
            </div>
          </Link>

          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-lg)',
            }}
          >
            <Link
              href="/search"
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--uottawa-charcoal)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              Browse Listings
            </Link>
            {profile?.role === 'admin' && (
              <Link
                href="/admin"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--uottawa-charcoal)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                Admin
              </Link>
            )}
            {user && (
              <button
                onClick={handleSignOut}
                style={{
                  padding: 'var(--space-sm) var(--space-lg)',
                  background: 'var(--uottawa-garnet)',
                  color: '#fff',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'background 0.2s',
                }}
              >
                Sign Out
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Status Banner */}
      {profile && profile.approvalStatus !== 'approved' && (
        <div style={{ padding: 'var(--space-md) var(--space-lg)', maxWidth: 'var(--max-width)', margin: '0 auto', width: '100%' }}>
          <StatusBanner status={profile.approvalStatus} />
        </div>
      )}

      {/* Page Content */}
      <main style={{ flex: 1, padding: 'var(--space-lg)' }}>{children}</main>

      {/* Footer */}
      <footer
        style={{
          background: 'var(--uottawa-charcoal)',
          color: '#fff',
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            padding: 'var(--space-2xl) var(--space-lg)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-xl)',
              marginBottom: 'var(--space-xl)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: 'var(--uottawa-garnet)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                  }}
                >
                  uO
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.2 }}>
                    University of Ottawa
                  </div>
                  <div style={{ opacity: 0.7, fontSize: '0.75rem' }}>
                    Student Housing
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                75 Laurier Ave. E, Ottawa, ON K1N 6N5, Canada
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <li><a href="#" style={{ fontSize: '0.875rem', opacity: 0.8, color: '#fff', textDecoration: 'none' }}>About</a></li>
                <li><a href="#" style={{ fontSize: '0.875rem', opacity: 0.8, color: '#fff', textDecoration: 'none' }}>Contact</a></li>
                <li><a href="#" style={{ fontSize: '0.875rem', opacity: 0.8, color: '#fff', textDecoration: 'none' }}>Accessibility</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <li><a href="#" style={{ fontSize: '0.875rem', opacity: 0.8, color: '#fff', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="#" style={{ fontSize: '0.875rem', opacity: 0.8, color: '#fff', textDecoration: 'none' }}>Terms of Use</a></li>
              </ul>
            </div>
          </div>
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: 'var(--space-lg)',
              textAlign: 'center',
              fontSize: '0.875rem',
              opacity: 0.7,
            }}
          >
            © 2026 University of Ottawa. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
