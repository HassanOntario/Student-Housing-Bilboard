'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { CampusResidence } from '@/types';
import { getCheapestMonthlyPrice } from '@/hooks/useListings';
import styles from './ListingCard.module.css';

interface ListingCardProps {
  listing: CampusResidence;
}

/** Derive a short list of feature tags from the residence data */
function getFeatureTags(r: CampusResidence): string[] {
  const tags: string[] = [];
  if (r.features.privateBathroom) tags.push('Private Bath');
  if (r.features.inUnitKitchenDining) tags.push('Kitchen');
  if (r.features.inUnitTemperatureControl) tags.push('AC');
  if (r.features.fitnessRoom) tags.push('Fitness');
  if (r.features.gamesRoom) tags.push('Games Room');
  if (r.features.tvInCommonRoom) tags.push('TV Lounge');
  return tags;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const monthlyPrice = getCheapestMonthlyPrice(listing);
  const tags = getFeatureTags(listing);
  const heroImage = listing.imageUrls[0] || null;

  return (
    <Link href={`/listing/${listing.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {heroImage ? (
          <Image
            src={heroImage}
            alt={`${listing.name} exterior`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(156,28,48,0.15) 0%, rgba(58,58,55,0.10) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: 'var(--uottawa-garnet)',
              opacity: 0.5,
            }}
          >
            {listing.name.charAt(0)}
          </div>
        )}
        <span className={styles.badge}>{listing.residenceStyle}</span>
      </div>

      <div className={styles.body}>
        <span className={styles.price}>From ${monthlyPrice}/mo</span>
        <h3 className={styles.title}>{listing.name}</h3>
        <p className={styles.address}>{listing.locationDescription}</p>

        <div className={styles.meta}>
          <span>{listing.totalBeds} beds</span>
          <span>{listing.agreementLength}</span>
          <span style={{ textTransform: 'capitalize' }}>{listing.residenceStyle}</span>
        </div>

        {tags.length > 0 && (
          <div className={styles.amenities}>
            {tags.slice(0, 3).map((t) => (
              <span key={t} className={styles.amenity}>
                {t}
              </span>
            ))}
            {tags.length > 3 && (
              <span className={styles.amenity}>+{tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
