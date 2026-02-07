'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CAMPUS_RESIDENCES, getResidenceBySlug } from '@/types/listing';
import { getCheapestMonthlyPrice } from '@/hooks/useListings';
import GoogleMap from '@/components/map/GoogleMap';
import type { CampusResidence, ResidenceFee } from '@/types';
import styles from './listing.module.css';

/** Build a readable list of feature highlights */
function featureHighlights(r: CampusResidence): string[] {
  const out: string[] = [];
  const f = r.features;
  if (f.studioOrSingleRoom) out.push('Single Room');
  if (f.privateBathroom) out.push('Private Bathroom');
  if (f.inUnitKitchenDining) out.push('In-unit Kitchen & Dining');
  if (f.inUnitTemperatureControl) out.push('Temperature Control');
  if (f.fitnessRoom) out.push('Fitness Room');
  if (f.gamesRoom) out.push('Games Room');
  if (f.tvInCommonRoom) out.push('TV in Common Room');
  return out;
}

export default function ListingDetailPage() {
  const params = useParams();
  const slug = params.id as string;

  const residence = useMemo(() => {
    return (
      getResidenceBySlug(slug) ??
      CAMPUS_RESIDENCES.find((r) => r.id === slug) ??
      null
    );
  }, [slug]);

  if (!residence) {
    return <p className={styles.notFound}>Residence not found.</p>;
  }

  const monthlyPrice = getCheapestMonthlyPrice(residence);
  const latestFees = residence.feesByYear[0];
  const highlights = featureHighlights(residence);
  const heroImage = residence.imageUrls[0] || null;

  return (
    <div className={styles.page}>
      <Link href="/search" className={styles.back}>
        ← Back to residences
      </Link>

      <div className={styles.grid}>
        {/* Building photo */}
        <div className={styles.imageWrapper}>
          {heroImage ? (
            <Image
              src={heroImage}
              alt={`${residence.name} exterior view`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
              priority
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(135deg, rgba(156,28,48,0.12) 0%, rgba(58,58,55,0.08) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.5rem',
                fontWeight: 700,
                color: 'var(--uottawa-garnet)',
                opacity: 0.45,
              }}
            >
              {residence.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Details */}
        <div className={styles.details}>
          <h1 className={styles.title}>{residence.name}</h1>
          <span className={styles.price}>From ${monthlyPrice}/mo</span>
          <p className={styles.address}>{residence.locationDescription}</p>

          <div className={styles.meta}>
            <span>{residence.totalBeds} beds</span>
            <span style={{ textTransform: 'capitalize' }}>
              {residence.residenceStyle}
            </span>
            <span>{residence.agreementLength}</span>
          </div>

          <p className={styles.description}>{residence.description}</p>

          {/* Feature highlights */}
          {highlights.length > 0 && (
            <div className={styles.amenities}>
              {highlights.map((h) => (
                <span key={h} className={styles.amenity}>
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fee breakdown */}
      {latestFees && (
        <section className={styles.mapSection}>
          <h2>{latestFees.year} Fees</h2>
          <div className={styles.feeTable}>
            <table>
              <thead>
                <tr>
                  <th>Room Type</th>
                  <th>Residence Fee</th>
                  <th>Meal Plan</th>
                  <th>Total / Year</th>
                  <th>≈ Monthly</th>
                </tr>
              </thead>
              <tbody>
                {latestFees.fees.map((fee: ResidenceFee, i: number) => {
                  const months =
                    residence.agreementLength === '12-month' ? 12 : 8;
                  return (
                    <tr key={i}>
                      <td>{fee.roomType}</td>
                      <td>
                        {fee.roomCost
                          ? `$${fee.roomCost.toLocaleString()}`
                          : '—'}
                      </td>
                      <td>
                        {fee.mealPlanCost
                          ? `$${fee.mealPlanCost.toLocaleString()}`
                          : '—'}
                      </td>
                      <td>${fee.totalCost.toLocaleString()}</td>
                      <td>${Math.round(fee.totalCost / months).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Amenities */}
      <section className={styles.mapSection}>
        <h2>Amenities</h2>
        <div className={styles.amenities}>
          {Object.entries(residence.amenities).map(([key, val]) =>
            val ? (
              <span key={key} className={styles.amenity}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            ) : null
          )}
        </div>
      </section>

      {/* Map */}
      <div className={styles.mapSection}>
        <h2>Location</h2>
        <GoogleMap
          lat={residence.latitude}
          lng={residence.longitude}
          title={residence.name}
        />
      </div>
    </div>
  );
}
