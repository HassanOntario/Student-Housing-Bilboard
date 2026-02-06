export type ListingType = 'room' | 'apartment' | 'house' | 'studio';

export type ResidenceArea =
  | 'near-campus'
  | 'downtown'
  | 'old-north'
  | 'masonville'
  | 'other';

export interface Listing {
  id: string;
  title: string;
  description: string;
  address: string;
  price: number;              // monthly rent in CAD
  type: ListingType;
  residenceArea: ResidenceArea;
  bedrooms: number;
  bathrooms: number;
  imageUrl: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  available: boolean;
  availableFrom: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListingFilters {
  search?: string;
  type?: ListingType | '';
  residenceArea?: ResidenceArea | '';
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
}
