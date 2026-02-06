'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Listing } from '@/types';
import styles from './ListingCard.module.css';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listing/${listing.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={listing.imageUrl || '/images/placeholder-listing.jpg'}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={styles.image}
        />
        <span className={styles.badge}>{listing.type}</span>
      </div>

      <div className={styles.body}>
        <span className={styles.price}>${listing.price}/mo</span>
        <h3 className={styles.title}>{listing.title}</h3>
        <p className={styles.address}>{listing.address}</p>

        <div className={styles.meta}>
          <span>{listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bed`}</span>
          <span>{listing.bathrooms} bath</span>
          <span style={{ textTransform: 'capitalize' }}>
            {listing.residenceArea.replace('-', ' ')}
          </span>
        </div>

        {listing.amenities.length > 0 && (
          <div className={styles.amenities}>
            {listing.amenities.slice(0, 3).map((a) => (
              <span key={a} className={styles.amenity}>
                {a}
              </span>
            ))}
            {listing.amenities.length > 3 && (
              <span className={styles.amenity}>
                +{listing.amenities.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
