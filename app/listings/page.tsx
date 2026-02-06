'use client';

import { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Listing {
  id: string;
  title: string;
  description: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  lat?: number;
  lng?: number;
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredListings(listings);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = listings.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          listing.address.toLowerCase().includes(query)
      );
      setFilteredListings(filtered);
    }
  }, [searchQuery, listings]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('title'));
      const querySnapshot = await getDocs(q);
      
      const listingsData: Listing[] = [];
      querySnapshot.forEach((doc) => {
        listingsData.push({ id: doc.id, ...doc.data() } as Listing);
      });
      
      setListings(listingsData);
      setFilteredListings(listingsData);
      setError('');
    } catch (err: unknown) {
      console.error('Error fetching listings:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch listings');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem' 
        }}>
          <h1>Student Housing Listings</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Search listings by title, description, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        {loading && <p>Loading listings...</p>}
        
        {error && (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#fee', 
            color: '#c00',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        {!loading && filteredListings.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
            {searchQuery ? 'No listings found matching your search.' : 'No listings available yet.'}
          </p>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.id}`}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.5rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h2 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{listing.title}</h2>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>{listing.address}</p>
              <p style={{ marginBottom: '1rem', lineHeight: '1.5' }}>
                {listing.description.length > 100
                  ? `${listing.description.substring(0, 100)}...`
                  : listing.description}
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                borderTop: '1px solid #eee',
                paddingTop: '1rem'
              }}>
                <span style={{ fontWeight: 'bold', color: '#0070f3' }}>
                  ${listing.price}/month
                </span>
                <span style={{ color: '#666' }}>
                  {listing.bedrooms} bed · {listing.bathrooms} bath
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
