'use client';

import { useListings } from '@/hooks/useListings';
import ListingCard from '@/components/listings/ListingCard';
import Filters from '@/components/listings/Filters';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import styles from './search.module.css';

export default function SearchPage() {
  const { listings, loading, error, filters, setFilters } = useListings();

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Browse Listings</h1>

      <div className={styles.layout}>
        <Filters filters={filters} onChange={setFilters} />

        <div>
          {loading && <LoadingSpinner inline />}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && (
            <div className={styles.grid}>
              {listings.length === 0 ? (
                <p className={styles.empty}>
                  No listings found. Try adjusting your filters.
                </p>
              ) : (
                listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
