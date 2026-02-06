'use client';

import { useEffect, useState, useCallback } from 'react';
import { getListings } from '@/lib/firestore';
import type { Listing, ListingFilters } from '@/types';

interface UseListingsReturn {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  filters: ListingFilters;
  setFilters: (filters: ListingFilters) => void;
  refresh: () => Promise<void>;
}

export function useListings(initialFilters?: ListingFilters): UseListingsReturn {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ListingFilters>(initialFilters ?? {});

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getListings(filters);
      setListings(data);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load listings.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return { listings, loading, error, filters, setFilters, refresh: fetchListings };
}
