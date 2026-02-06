'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getListingById } from '@/lib/firestore';
import GoogleMap from '@/components/map/GoogleMap';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import type { Listing } from '@/types';
import styles from './listing.module.css';

export default function ListingDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const data = await getListingById(id);
      setListing(data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!listing) {
    return <p className={styles.notFound}>Listing not found.</p>;
  }

  return (
    <div className={styles.page}>
      <Link href="/search" className={styles.back}>
        ← Back to listings
      </Link>

      <div className={styles.grid}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          <Image
            src={listing.imageUrl || '/images/placeholder-listing.jpg'}
            alt={listing.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
          />
        </div>

        {/* Details */}
        <div className={styles.details}>
          <h1 className={styles.title}>{listing.title}</h1>
          <span className={styles.price}>${listing.price}/mo</span>
          <p className={styles.address}>{listing.address}</p>

          <div className={styles.meta}>
            <span>
              {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Bedrooms`}
            </span>
            <span>{listing.bathrooms} Bathrooms</span>
            <span style={{ textTransform: 'capitalize' }}>
              {listing.type}
            </span>
            <span style={{ textTransform: 'capitalize' }}>
              {listing.residenceArea.replace('-', ' ')}
            </span>
          </div>

          <p className={styles.description}>{listing.description}</p>

          {listing.amenities.length > 0 && (
            <div className={styles.amenities}>
              {listing.amenities.map((a) => (
                <span key={a} className={styles.amenity}>
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className={styles.mapSection}>
        <h2>Location</h2>
        <GoogleMap
          lat={listing.latitude}
          lng={listing.longitude}
          title={listing.title}
        />
      </div>
    </div>
  );
}
