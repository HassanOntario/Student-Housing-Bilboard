// listings.ts
// ON-CAMPUS residences seed data for SESA Student Housing Hackathon
// Includes: Annex, Hyman Soloway, 45 Mann, 90 University (90U), Friel, Stanton

export type ResidenceStyle =
  | 'traditional'
  | 'traditional-plus'
  | 'suite'
  | 'studio'
  | 'apartment'; //no

export type AgreementLength = '8-month' | '12-month'; //no

export interface ResidenceFeatureChecklist {
  studioOrSingleRoom: boolean;
  privateBathroom: boolean;
  sharedInUnitBathrooms: boolean;
  commonKitchen: boolean;
  inUnitKitchenDining: boolean;
  sharedCommonSpaces: boolean;
  gamesRoom?: boolean;
  fitnessRoom?: boolean;
  tvInBedroom: boolean;
  tvInCommonRoom: boolean;
  miniFridgeSpace: boolean;
  kitchenAppliances: boolean;
  inUnitTemperatureControl: boolean;
} //reduce

export interface ResidenceFurniture {
  bedSize: 'single' | 'double' | 'queen';
  beddingIncluded: boolean;
  nightstand: boolean;
  desk: boolean;
  chair: boolean;
  closet: boolean;
  openCloset?: boolean;
  dresserOrWardrobe?: boolean;
  armoireWithDrawers?: boolean;
}

export interface ResidenceFee {
  roomType: string;
  roomCost?: number;
  mealPlanCost?: number;
  totalCost: number;
}

export interface ResidenceFeesByYear {
  year: string;
  fees: ResidenceFee[];
}

export interface ResidenceAmenities {
  kitchen: string;
  laundry: {
    description: string;
    requiredItems: string[];
    notes?: string;
    reportIssueUrl?: string;
  };
  garbageAndRecycling: {
    description: string;
    contactEmail?: string;
    binLocations: string[];
  };
}

export interface CampusResidence {
  id: string;
  slug: string;
  name: string;
  description: string;
  residenceStyle: ResidenceStyle;
  agreementLength: AgreementLength;
  totalBeds: number;
  locationDescription: string;
  latitude: number;
  longitude: number;
  features: ResidenceFeatureChecklist;
  furniture: ResidenceFurniture;
  notes?: string;
  feesByYear: ResidenceFeesByYear[];
  amenities: ResidenceAmenities;
  virtualTourUrl?: string;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * uOttawa campus marker
 */
export const UOTTAWA_CAMPUS = {
  name: 'University of Ottawa',
  latitude: 45.4231,
  longitude: -75.6831,
  address: '75 Laurier Ave E, Ottawa, ON',
} as const;

export const CAMPUS_RESIDENCES: CampusResidence[] = [
  // =========================
  // Annex
  // =========================
  {
    id: 'res_annex',
    slug: 'annex',
    name: 'Annex',
    description:
      'Annex is one of three apartment-style residences, ideal for students seeking a more independent lifestyle.',
    residenceStyle: 'apartment',
    agreementLength: '12-month',
    totalBeds: 518,
    locationDescription:
      'Located at the north end of the downtown campus. Multi-bedroom coed units with kitchens, dining rooms and living rooms.',
    latitude: 45.4231,
    longitude: -75.6831,
    features: {
      studioOrSingleRoom: true,
      privateBathroom: true,
      sharedInUnitBathrooms: false,
      commonKitchen: false,
      inUnitKitchenDining: true,
      sharedCommonSpaces: true,
      tvInBedroom: false,
      tvInCommonRoom: true,
      miniFridgeSpace: true,
      kitchenAppliances: true,
      inUnitTemperatureControl: true,
    },
    furniture: {
      bedSize: 'double',
      beddingIncluded: false,
      nightstand: true,
      desk: true,
      chair: true,
      closet: true,
      dresserOrWardrobe: false,
      armoireWithDrawers: false,
    },
    notes:
      '28 residents share bedrooms and bathrooms; all others have a single room and private bathroom.',
    feesByYear: [
      {
        year: '2026-2027',
        fees: [
          { roomType: 'Premium Studio', totalCost: 27304 },
          { roomType: 'Studio', totalCost: 26860 },
          { roomType: 'Room in a 2-bedroom apartment', totalCost: 20464 },
          { roomType: 'Room in a 3-bedroom apartment', totalCost: 18148 },
          { roomType: 'Room in a 4-bedroom apartment', totalCost: 17068 },
          { roomType: 'Room in a 5-bedroom apartment', totalCost: 15940 },
        ],
      },
      {
        year: '2025-2026',
        fees: [
          { roomType: 'Premium Studio', totalCost: 25758 },
          { roomType: 'Studio', totalCost: 25345 },
          { roomType: 'Room in a 2-bedroom apartment', totalCost: 19345 },
          { roomType: 'Room in a 3-bedroom apartment', totalCost: 17131 },
          { roomType: 'Room in a 4-bedroom apartment', totalCost: 16092 },
          { roomType: 'Room in a 5-bedroom apartment', totalCost: 15032 },
        ],
      },
    ],
    amenities: {
      kitchen:
        'In-unit kitchen and dining area with sink, refrigerator, stove, microwave, and dishwasher.',
      laundry: {
        description: 'Free washer and dryer in each unit.',
        requiredItems: ['Detergent', 'Dryer sheets'],
        notes: 'Clean the dryer lint filter after each use.',
      },
      garbageAndRecycling: {
        description:
          'Garbage chutes are next to elevators on each floor. Recycling and compost bins are nearby in specific rooms.',
        contactEmail: 'prs-recy@uOttawa.ca',
        binLocations: [
          'Room 116',
          'Room 231',
          'Room 324',
          'Room 428',
          'Rooms ending in -21 (floors 5–8)',
        ],
      },
    },
    imageUrls: ['/images/annex/hero.jpg'],
    createdAt: new Date('2026-02-06'),
    updatedAt: new Date('2026-02-06'),
  },

  // =========================
  // Hyman Soloway
  // =========================
  {
    id: 'res_hyman_soloway',
    slug: 'hyman-soloway',
    name: 'Hyman Soloway',
    description:
      'Hyman Soloway is an apartment-style residence offering independent living for students planning to stay on campus.',
    residenceStyle: 'apartment',
    agreementLength: '12-month',
    totalBeds: 239,
    locationDescription:
      'Multi-bedroom coed apartments with shared in-unit bathrooms and in-unit kitchen/dining.',
    latitude: 45.4231,
    longitude: -75.6831,
    features: {
      studioOrSingleRoom: true,
      privateBathroom: false,
      sharedInUnitBathrooms: true,
      commonKitchen: false,
      inUnitKitchenDining: true,
      sharedCommonSpaces: true,
      tvInBedroom: false,
      tvInCommonRoom: false, // TV is on ground floor common room (not in unit)
      miniFridgeSpace: true,
      kitchenAppliances: true, // fridge, stove, microwave (no dishwasher)
      inUnitTemperatureControl: true,
    },
    furniture: {
      bedSize: 'double',
      beddingIncluded: false,
      nightstand: false,
      desk: true,
      chair: true,
      closet: true,
      dresserOrWardrobe: false,
      armoireWithDrawers: false,
    },
    notes:
      'No TV in unit common room (TV available in the ground-floor common room). Kitchen appliances include fridge, stove and microwave (no dishwasher).',
    feesByYear: [
      {
        year: '2026-2027',
        fees: [
          { roomType: 'Room in a 2-bedroom apartment', totalCost: 18757 },
          { roomType: 'Room in a 3-bedroom apartment', totalCost: 16501 },
          { roomType: 'Room in a 4-bedroom apartment', totalCost: 15601 },
        ],
      },
      {
        year: '2025-2026',
        fees: [
          { roomType: 'Room in a 2-bedroom apartment', totalCost: 17701 },
          { roomType: 'Room in a 3-bedroom apartment', totalCost: 15578 },
          { roomType: 'Room in a 4-bedroom apartment', totalCost: 14726 },
        ],
      },
    ],
    amenities: {
      kitchen:
        'In-unit, open concept kitchen and dining area with sink, refrigerator, full-size range and microwave.',
      laundry: {
        description:
          "Free laundry room located on the ground floor.",
        requiredItems: ['Detergent', 'Dryer sheets', 'uOttawa Card'],
        notes:
          'Laundry instructions are posted in each laundry room.',
        reportIssueUrl: 'north_eastexternal link',
      },
      garbageAndRecycling: {
        description:
          'Garbage, recycling, and compost bins are located in the basement in room 009.',
        contactEmail: 'prs-recy@uOttawa.ca',
        binLocations: ['Basement — Room 009'],
      },
    },
    imageUrls: ['/images/hyman/hero.jpg'],
    createdAt: new Date('2026-02-06'),
    updatedAt: new Date('2026-02-06'),
  },

  // =========================
  // 45 Mann
  // =========================
  {
    id: 'res_45_mann',
    slug: '45-mann',
    name: '45 Mann',
    description:
      '45 Mann is an apartment-style residence reserved for students in second year and up, designed for independent living with strong community spaces.',
    residenceStyle: 'apartment',
    agreementLength: '12-month',
    totalBeds: 385,
    locationDescription:
      'Coed multi-bedroom apartments with in-unit kitchen/dining, living room, games room and fitness room.',
    latitude: 45.4231,
    longitude: -75.6831,
    features: {
      studioOrSingleRoom: true,
      privateBathroom: true,
      sharedInUnitBathrooms: false,
      commonKitchen: false,
      inUnitKitchenDining: true,
      sharedCommonSpaces: true,
      gamesRoom: true,
      fitnessRoom: true,
      tvInBedroom: false,
      tvInCommonRoom: true,
      miniFridgeSpace: true,
      kitchenAppliances: true, // fridge, stove, dishwasher
      inUnitTemperatureControl: true,
    },
    furniture: {
      bedSize: 'double',
      beddingIncluded: false,
      nightstand: true,
      desk: true,
      chair: true,
      closet: true,
      dresserOrWardrobe: true,
      armoireWithDrawers: false,
    },
    notes: 'Reserved for students in second year and up.',
    feesByYear: [
      {
        year: '2026-2027',
        fees: [
          { roomType: '1-bedroom apartment', totalCost: 26308 },
          { roomType: 'Room in a 2-bedroom apartment', totalCost: 19804 },
          { roomType: 'Room in a 3-bedroom apartment', totalCost: 17524 },
          { roomType: 'Room in a 4-bedroom apartment', totalCost: 16600 },
        ],
      },
      {
        year: '2025-2026',
        fees: [
          { roomType: '1-bedroom apartment', totalCost: 24816 },
          { roomType: 'Room in a 2-bedroom apartment', totalCost: 18684 },
          { roomType: 'Room in a 3-bedroom apartment', totalCost: 16531 },
          { roomType: 'Room in a 4-bedroom apartment', totalCost: 15667 },
        ],
      },
    ],
    amenities: {
      kitchen:
        'In-unit open-concept kitchen and dining area with sink, refrigerator, stove and dishwasher.',
      laundry: {
        description: 'Laundry facilities are available to residents (free).',
        requiredItems: ['Detergent', 'Dryer sheets', 'uOttawa Card'],
        notes: 'Laundry instructions are posted in the laundry areas.',
        reportIssueUrl: 'north_eastexternal link',
      },
      garbageAndRecycling: {
        description:
          'Garbage, recycling, and compost services are available within the residence.',
        contactEmail: 'prs-recy@uOttawa.ca',
        binLocations: ['Designated waste areas within the building'],
      },
    },
    imageUrls: ['/images/45-mann/hero.jpg'],
    createdAt: new Date('2026-02-06'),
    updatedAt: new Date('2026-02-06'),
  },

  // =========================
  // 90 University (90U)
  // =========================
  {
    id: 'res_90_university',
    slug: '90-university',
    name: '90 University (90U)',
    description:
      '90 University (“90U”) is a suite-style residence with two-bedroom non-coed suites, combining community and privacy.',
    residenceStyle: 'suite',
    agreementLength: '8-month',
    totalBeds: 652,
    locationDescription:
      'Two-bedroom non-coed suites with kitchenette and a bathroom shared with your roommate. Shared common spaces on all floors.',
    latitude: 45.4231,
    longitude: -75.6831,
    features: {
      studioOrSingleRoom: true,
      privateBathroom: false,
      sharedInUnitBathrooms: true,
      commonKitchen: true, // common kitchen on ground floor
      inUnitKitchenDining: true, // kitchenette + dining table/chairs
      sharedCommonSpaces: true,
      tvInBedroom: true,
      tvInCommonRoom: true,
      miniFridgeSpace: true,
      kitchenAppliances: true, // full-size fridge + microwave
      inUnitTemperatureControl: true,
    },
    furniture: {
      bedSize: 'double',
      beddingIncluded: false,
      nightstand: false,
      desk: true,
      chair: true,
      closet: true,
      openCloset: true,
      dresserOrWardrobe: true,
      armoireWithDrawers: false,
    },
    notes:
      "Special case: 12 rooms on the 20th floor are Traditional Plus with a shared bedroom (single bed). No dining table/chairs or in-unit kitchenette; includes mini-fridge and microwave. No common room on the 20th floor.",
    feesByYear: [
      {
        year: '2026-2027',
        fees: [
          {
            roomType: 'Suite with 2 single occupancy bedrooms',
            roomCost: 15448,
            mealPlanCost: 7125,
            totalCost: 22573,
          },
          {
            roomType: 'Double occupancy room (20th floor)',
            roomCost: 13590,
            mealPlanCost: 7125,
            totalCost: 20715,
          },
        ],
      },
      {
        year: '2025-2026',
        fees: [
          {
            roomType: 'Suite with 2 single occupancy bedrooms',
            roomCost: 13677,
            mealPlanCost: 6825,
            totalCost: 20502,
          },
          {
            roomType: 'Double occupancy room (20th floor)',
            roomCost: 12033,
            mealPlanCost: 6825,
            totalCost: 18858,
          },
        ],
      },
    ],
    amenities: {
      kitchen:
        "Each suite has a kitchenette with microwave, full-size fridge, table and two chairs, countertop and storage. There's also a large common kitchen on the ground floor with full-size ranges and microwave ovens.",
      laundry: {
        description: "Free laundry room on the ground floor.",
        requiredItems: ['Detergent', 'Dryer sheets', 'uOttawa Card'],
        notes:
          'Laundry instructions are posted in each laundry room.',
        reportIssueUrl: 'north_eastexternal link',
      },
      garbageAndRecycling: {
        description:
          'Garbage and recycling bins are across from the -03 unit on floors 2–20. On floor 1, they are past the elevator in the hallway leading to units 124–134. Compost is in the first-floor kitchen across from the high-rise elevators and in the Complex lobby near the 90U low-rise entrance.',
        contactEmail: 'prs-recy@uOttawa.ca',
        binLocations: [
          'Floors 2–20: across from the -03 unit',
          'Floor 1: hallway to units 124–134 (past elevator)',
          'Compost: first-floor kitchen (across from high-rise elevators)',
          'Compost: Complex lobby near 90U low-rise entrance',
        ],
      },
    },
    imageUrls: ['/images/90u/hero.jpg'],
    createdAt: new Date('2026-02-06'),
    updatedAt: new Date('2026-02-06'),
  },

  // =========================
  // Friel
  // =========================
  {
    id: 'res_friel',
    slug: 'friel',
    name: 'Friel',
    description:
      'Friel is a suite and studio style residence with 380 beds, designed for students who want both privacy and community.',
    residenceStyle: 'suite',
    agreementLength: '8-month',
    totalBeds: 380,
    locationDescription:
      'Single, double and quadruple occupancy units with living space. All units except the 3rd floor have a kitchenette. Community kitchen on the 3rd floor.',
    latitude: 45.4231,
    longitude: -75.6831,
    features: {
      studioOrSingleRoom: true,
      privateBathroom: false,
      sharedInUnitBathrooms: true,
      commonKitchen: true,
      inUnitKitchenDining: true, // kitchenette except 3rd floor
      sharedCommonSpaces: true,
      tvInBedroom: false,
      tvInCommonRoom: true,
      miniFridgeSpace: true,
      kitchenAppliances: true, // sink, microwave, mini-fridge except 3rd floor
      inUnitTemperatureControl: true,
    },
    furniture: {
      bedSize: 'single',
      beddingIncluded: false,
      nightstand: false,
      desk: true,
      chair: true,
      closet: true,
      dresserOrWardrobe: true,
      armoireWithDrawers: false,
    },
    notes:
      'Variety of studios and 1- or 2-bedroom suites with single, double, or quadruple occupancy. Units on the 3rd floor do not have a kitchenette.',
    feesByYear: [
      {
        year: '2026-2027',
        fees: [
          { roomType: 'Suite with two double occupancy bedrooms', totalCost: 10043 },
          { roomType: 'Double occupancy suite', totalCost: 11468 },
          { roomType: 'Suite with two single occupancy bedrooms', totalCost: 13348 },
          { roomType: 'Suite with one single occupancy bedroom', totalCost: 14345 },
          { roomType: 'Double occupancy studio', totalCost: 11367 },
          { roomType: 'Single occupancy studio', totalCost: 13968 },
          { roomType: 'Double occupancy studio without kitchenette', totalCost: 10814 },
          { roomType: 'Single occupancy studio without kitchenette', totalCost: 12877 },
        ],
      },
      {
        year: '2025-2026',
        fees: [
          { roomType: 'Suite with two double occupancy bedrooms', totalCost: 9233 },
          { roomType: 'Double occupancy suite', totalCost: 10543 },
          { roomType: 'Suite with two single occupancy bedrooms', totalCost: 12097 },
          { roomType: 'Suite with one single occupancy bedroom', totalCost: 13000 },
          { roomType: 'Double occupancy studio', totalCost: 10450 },
          { roomType: 'Single occupancy studio', totalCost: 12658 },
          { roomType: 'Double occupancy studio without kitchenette', totalCost: 9942 },
          { roomType: 'Single occupancy studio without kitchenette', totalCost: 11671 },
        ],
      },
    ],
    amenities: {
      kitchen:
        'Kitchenette (where applicable) with sink, mini-fridge and microwave. Large ground-floor kitchen with full-size range and microwave ovens. Community kitchen on the third floor.',
      laundry: {
        description: "Free laundry room on every floor.",
        requiredItems: ['Detergent', 'Dryer sheets'],
        notes:
          'Laundry instructions are posted in each laundry room.',
        reportIssueUrl: 'north_eastexternal link',
      },
      garbageAndRecycling: {
        description:
          'Garbage, recycling and compost bins are on the 3rd floor (room 336) and on the 8th floor beside stairwell C.',
        contactEmail: 'prs-recy@uOttawa.ca',
        binLocations: ['3rd floor — Room 336', '8th floor — beside stairwell C'],
      },
    },
    imageUrls: ['/images/friel/hero.jpg'],
    createdAt: new Date('2026-02-06'),
    updatedAt: new Date('2026-02-06'),
  },

  // =========================
  // Stanton
  // =========================
  {
    id: 'res_stanton',
    slug: 'stanton',
    name: 'Stanton',
    description:
      'Stanton is a traditional-style residence known for a social environment. Students have a single room or share with one roommate, and share bathrooms with floormates.',
    residenceStyle: 'traditional',
    agreementLength: '8-month',
    totalBeds: 357,
    locationDescription:
      'Part of the main residential complex. Every floor has common spaces and a kitchenette.',
    latitude: 45.4231,
    longitude: -75.6831,
    features: {
      studioOrSingleRoom: true, // single or shared bedroom
      privateBathroom: false,
      sharedInUnitBathrooms: true, // shared with floormates
      commonKitchen: true,
      inUnitKitchenDining: false,
      sharedCommonSpaces: true,
      tvInBedroom: false,
      tvInCommonRoom: true, // common lounge
      miniFridgeSpace: true,
      kitchenAppliances: false, // no in-unit appliances listed
      inUnitTemperatureControl: false,
    },
    furniture: {
      bedSize: 'single',
      beddingIncluded: false,
      nightstand: false,
      desk: true,
      chair: true,
      closet: false, // no dresser/wardrobe/closet in room
      dresserOrWardrobe: false,
      armoireWithDrawers: true,
    },
    notes:
      'Single bedroom or shared bedroom with one roommate. Shared bathroom with floormates.',
    feesByYear: [
      {
        year: '2026-2027',
        fees: [
          {
            roomType: 'Double',
            roomCost: 9278,
            mealPlanCost: 7125,
            totalCost: 16403,
          },
          {
            roomType: 'Single',
            roomCost: 11608,
            mealPlanCost: 7125,
            totalCost: 18733,
          },
        ],
      },
      {
        year: '2025-2026',
        fees: [
          {
            roomType: 'Double',
            roomCost: 8528,
            mealPlanCost: 6825,
            totalCost: 15353,
          },
          {
            roomType: 'Single',
            roomCost: 10623,
            mealPlanCost: 6825,
            totalCost: 17448,
          },
        ],
      },
    ],
    amenities: {
      kitchen:
        'Common kitchen with sink and cooktop, a refrigerator and microwave ovens, plus a separate seating area.',
      laundry: {
        description: 'Free laundry room on the ground floor.',
        requiredItems: ['Detergent', 'Dryer sheets', 'uOttawa Card'],
        notes:
          'Laundry instructions are posted in each laundry room.',
        reportIssueUrl: 'north_eastexternal link',
      },
      garbageAndRecycling: {
        description:
          'Garbage and recycling bins are on all floors in front of the elevator. Compost is located in the Complex lobby near the 90U low-rise entrance.',
        contactEmail: 'prs-recy@uOttawa.ca',
        binLocations: [
          'All floors: in front of the elevator',
          'Compost: Complex lobby near 90U low-rise entrance',
        ],
      },
    },
    imageUrls: ['/images/stanton/hero.jpg'],
    createdAt: new Date('2026-02-06'),
    updatedAt: new Date('2026-02-06'),
  },
];

// Helpers
export const getResidenceBySlug = (slug: string) =>
  CAMPUS_RESIDENCES.find((r) => r.slug === slug);

export const getResidenceSlugs = () => CAMPUS_RESIDENCES.map((r) => r.slug);
