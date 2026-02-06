'use client';

import { useEffect, useState, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useParams, useRouter } from 'next/navigation';
import { Loader } from '@googlemaps/js-api-loader';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

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

export default function ListingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [origin, setOrigin] = useState('');
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [calculatingRoute, setCalculatingRoute] = useState(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    const listingId = params?.id as string;
    if (listingId) {
      fetchListing(listingId);
    }
  }, [params]);

  useEffect(() => {
    if (listing && listing.lat && listing.lng) {
      initMap();
    }
  }, [listing]);

  const fetchListing = async (id: string) => {
    try {
      setLoading(true);
      const docRef = doc(db, 'listings', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing({ id: docSnap.id, ...docSnap.data() } as Listing);
      } else {
        setError('Listing not found');
      }
    } catch (err: unknown) {
      console.error('Error fetching listing:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch listing');
      }
    } finally {
      setLoading(false);
    }
  };

  const initMap = async () => {
    if (!listing?.lat || !listing?.lng || !mapRef.current) return;

    try {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
      });

      await loader.load();

      const position = { lat: listing.lat, lng: listing.lng };

      const map = new google.maps.Map(mapRef.current, {
        center: position,
        zoom: 15,
      });

      new google.maps.Marker({
        position,
        map,
        title: listing.title,
      });

      mapInstanceRef.current = map;
      directionsRendererRef.current = new google.maps.DirectionsRenderer();
      directionsRendererRef.current.setMap(map);
    } catch (err) {
      console.error('Error loading Google Maps:', err);
    }
  };

  const calculateRoute = async () => {
    if (!origin || !listing?.lat || !listing?.lng) return;

    setCalculatingRoute(true);
    setRouteInfo(null);

    try {
      const directionsService = new google.maps.DirectionsService();
      const destination = { lat: listing.lat, lng: listing.lng };

      const result = await directionsService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (directionsRendererRef.current) {
        directionsRendererRef.current.setDirections(result);
      }

      if (result.routes[0]?.legs[0]) {
        const leg = result.routes[0].legs[0];
        setRouteInfo({
          distance: leg.distance?.text || '',
          duration: leg.duration?.text || '',
        });
      }
    } catch (err) {
      console.error('Error calculating route:', err);
      alert('Could not calculate route. Please check the origin address.');
    } finally {
      setCalculatingRoute(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
      </ProtectedRoute>
    );
  }

  if (error || !listing) {
    return (
      <ProtectedRoute>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#c00', marginBottom: '1rem' }}>{error || 'Listing not found'}</p>
          <Link href="/listings" style={{ color: '#0070f3' }}>
            Back to Listings
          </Link>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <Link href="/listings" style={{ color: '#0070f3', marginBottom: '1rem', display: 'inline-block' }}>
          ← Back to Listings
        </Link>

        <h1 style={{ marginBottom: '1rem' }}>{listing.title}</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ marginBottom: '1rem' }}>Details</h2>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Address:</strong> {listing.address}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Price:</strong> ${listing.price}/month
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Bedrooms:</strong> {listing.bedrooms}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Bathrooms:</strong> {listing.bathrooms}
            </div>
            <div style={{ marginTop: '1rem' }}>
              <strong>Description:</strong>
              <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{listing.description}</p>
            </div>
          </div>

          <div>
            <h2 style={{ marginBottom: '1rem' }}>Calculate Commute</h2>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Enter your starting address"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                }}
              />
              <button
                onClick={calculateRoute}
                disabled={!origin || calculatingRoute}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: origin && !calculatingRoute ? 'pointer' : 'not-allowed',
                  opacity: origin && !calculatingRoute ? 1 : 0.6,
                }}
              >
                {calculatingRoute ? 'Calculating...' : 'Calculate Route'}
              </button>
            </div>

            {routeInfo && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#f0f9ff',
                borderRadius: '4px',
                marginBottom: '1rem',
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Distance:</strong> {routeInfo.distance}
                </div>
                <div>
                  <strong>Duration:</strong> {routeInfo.duration}
                </div>
              </div>
            )}
          </div>
        </div>

        {listing.lat && listing.lng ? (
          <div>
            <h2 style={{ marginBottom: '1rem' }}>Location</h2>
            <div
              ref={mapRef}
              style={{
                width: '100%',
                height: '500px',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            />
          </div>
        ) : (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}>
            <p>Map location not available for this listing.</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
