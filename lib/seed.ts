/**
 * Seed script – run with `npm run seed`.
 * Populates Firestore with sample housing listings.
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Load env vars – when running via ts-node, dotenv is needed.
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SAMPLE_LISTINGS = [
  {
    title: 'Cozy Studio near Campus',
    description:
      'Bright studio apartment just a 5 minute walk from Western University. Utilities included.',
    address: '123 University Ave, London, ON',
    price: 950,
    type: 'studio',
    residenceArea: 'near-campus',
    bedrooms: 0,
    bathrooms: 1,
    imageUrl: '/images/placeholder-listing.jpg',
    latitude: 43.0096,
    longitude: -81.2737,
    amenities: ['Wi-Fi', 'Laundry', 'Utilities Included'],
    available: true,
    availableFrom: Timestamp.fromDate(new Date('2026-05-01')),
  },
  {
    title: 'Spacious 3-Bedroom House',
    description:
      'Large house ideal for a group of students. Close to bus routes and grocery stores.',
    address: '456 Old North Rd, London, ON',
    price: 650,
    type: 'house',
    residenceArea: 'old-north',
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: '/images/placeholder-listing.jpg',
    latitude: 43.0115,
    longitude: -81.2801,
    amenities: ['Parking', 'Backyard', 'Dishwasher'],
    available: true,
    availableFrom: Timestamp.fromDate(new Date('2026-05-01')),
  },
  {
    title: 'Modern 1-Bedroom Downtown',
    description:
      'Newly renovated apartment in the heart of downtown London. Walking distance to restaurants and nightlife.',
    address: '789 Dundas St, London, ON',
    price: 1200,
    type: 'apartment',
    residenceArea: 'downtown',
    bedrooms: 1,
    bathrooms: 1,
    imageUrl: '/images/placeholder-listing.jpg',
    latitude: 42.9834,
    longitude: -81.2497,
    amenities: ['Gym', 'Rooftop Patio', 'In-Suite Laundry'],
    available: true,
    availableFrom: Timestamp.fromDate(new Date('2026-06-01')),
  },
  {
    title: 'Room in Shared House',
    description:
      'Private room in a friendly student house near Masonville Mall. Shared kitchen and living area.',
    address: '321 Richmond St N, London, ON',
    price: 550,
    type: 'room',
    residenceArea: 'masonville',
    bedrooms: 1,
    bathrooms: 1,
    imageUrl: '/images/placeholder-listing.jpg',
    latitude: 43.0285,
    longitude: -81.2812,
    amenities: ['Wi-Fi', 'Furnished', 'Bus Stop Nearby'],
    available: true,
    availableFrom: Timestamp.fromDate(new Date('2026-05-15')),
  },
  {
    title: 'Luxury 2-Bedroom Apartment',
    description:
      'Premium apartment with modern finishes, in-suite laundry, and underground parking.',
    address: '555 Sarnia Rd, London, ON',
    price: 1600,
    type: 'apartment',
    residenceArea: 'near-campus',
    bedrooms: 2,
    bathrooms: 2,
    imageUrl: '/images/placeholder-listing.jpg',
    latitude: 43.0072,
    longitude: -81.2856,
    amenities: ['Underground Parking', 'In-Suite Laundry', 'Balcony', 'A/C'],
    available: true,
    availableFrom: Timestamp.fromDate(new Date('2026-09-01')),
  },
];

async function seed() {
  console.log('🌱 Seeding listings…');
  const col = collection(db, 'listings');

  for (const listing of SAMPLE_LISTINGS) {
    const docRef = await addDoc(col, {
      ...listing,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log(`  ✅ ${listing.title} → ${docRef.id}`);
  }

  console.log('🎉 Seeding complete!');
}

seed().catch(console.error);
