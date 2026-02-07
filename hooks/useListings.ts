'use client';

import { useMemo, useState } from 'react';
import { CAMPUS_RESIDENCES } from '@/types/listing';
import type { CampusResidence, ResidenceFilters } from '@/types';

/** Return the cheapest total cost from the latest fee year */
export function getCheapestMonthlyPrice(r: CampusResidence): number {
  const latest = r.feesByYear[0];
  if (!latest) return 0;
  const cheapest = Math.min(...latest.fees.map((f) => f.totalCost));
  // Fees are annual — convert to monthly
  const months = r.agreementLength === '12-month' ? 12 : 8;
  return Math.round(cheapest / months);
}

interface UseListingsReturn {
  listings: CampusResidence[];
  loading: boolean;
  error: string | null;
  filters: ResidenceFilters;
  setFilters: (filters: ResidenceFilters) => void;
}

export function useListings(initialFilters?: ResidenceFilters): UseListingsReturn {
  const [filters, setFilters] = useState<ResidenceFilters>(initialFilters ?? {});

  const listings = useMemo(() => {
    let results = [...CAMPUS_RESIDENCES];

    // Text search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.residenceStyle.toLowerCase().includes(q),
      );
    }

    // Style filter
    if (filters.style) {
      results = results.filter((r) => r.residenceStyle === filters.style);
    }

    // Price filter (monthly)
    if (filters.minPrice != null) {
      results = results.filter((r) => getCheapestMonthlyPrice(r) >= filters.minPrice!);
    }
    if (filters.maxPrice != null) {
      results = results.filter((r) => getCheapestMonthlyPrice(r) <= filters.maxPrice!);
    }

    return results;
  }, [filters]);

  return { listings, loading: false, error: null, filters, setFilters };
}
