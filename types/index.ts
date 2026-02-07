export type {
  ApprovalStatus,
  UserRole,
  UserProfile,
  UserRegistrationData,
} from './user';

import type { ResidenceStyle as _ResidenceStyle, CampusResidence as _CampusResidence } from './listing';

export type {
  ResidenceStyle,
  AgreementLength,
  CampusResidence,
  ResidenceFeatureChecklist,
  ResidenceFurniture,
  ResidenceFee,
  ResidenceFeesByYear,
  ResidenceAmenities,
} from './listing';

export { CAMPUS_RESIDENCES, UOTTAWA_CAMPUS, getResidenceBySlug, getResidenceSlugs } from './listing';

/** Filters for the search page */
export interface ResidenceFilters {
  search?: string;
  style?: _ResidenceStyle | '';
  minPrice?: number;
  maxPrice?: number;
}

// Backward-compat aliases
export type Listing = _CampusResidence;
export type ListingFilters = ResidenceFilters;
export type ListingType = _ResidenceStyle;
export type ResidenceArea = string;
