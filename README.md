# Student-Housing-Billboard

A modern student housing listing platform built with Next.js, TypeScript, Firebase Authentication, Firestore, and Google Maps API.

## Features

- **User Authentication**: Secure email/password authentication with Firebase Auth
- **Protected Routes**: Listings pages are only accessible to authenticated users
- **Listings Management**: Browse student housing listings stored in Firestore
- **Text Search**: Search listings by title, description, or address
- **Interactive Maps**: View listing locations using Google Maps JavaScript API
- **Route Planning**: Calculate commute distances and times from any origin to the listing location
- **Responsive Design**: Clean, modern UI that works on all devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **Maps**: Google Maps JavaScript API
- **Styling**: Inline CSS (no external CSS frameworks)

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Firebase account
- Google Cloud Platform account (for Maps API)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HassanOntario/Student-Housing-Bilboard.git
cd Student-Housing-Bilboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase and Google Maps credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication in Authentication settings
3. Create a Firestore database in production mode
4. Create a `listings` collection with the following structure:

```javascript
{
  title: "Cozy 2BR near Campus",
  description: "Beautiful apartment close to university...",
  address: "123 Main St, College Town, ST 12345",
  price: 1200,
  bedrooms: 2,
  bathrooms: 1,
  lat: 40.7128,
  lng: -74.0060
}
```

5. Copy your Firebase configuration from Project Settings

### Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the following APIs:
   - Maps JavaScript API
   - Directions API
   - Geocoding API (if needed)
3. Create an API key
4. Restrict the API key to your domain (recommended for production)

### Running the Application

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with AuthProvider
│   ├── page.tsx             # Home page with login/signup links
│   ├── login/
│   │   └── page.tsx         # Login page
│   ├── signup/
│   │   └── page.tsx         # Signup page
│   └── listings/
│       ├── page.tsx         # Listings page with search
│       └── [id]/
│           └── page.tsx     # Listing details with map
├── components/
│   └── ProtectedRoute.tsx   # HOC for protected routes
├── contexts/
│   └── AuthContext.tsx      # Authentication context
├── lib/
│   └── firebase.ts          # Firebase configuration
├── .env.local               # Environment variables (not in git)
└── .env.example             # Example environment variables
```

## Usage

1. **Sign Up**: Create a new account on the signup page
2. **Login**: Access your account on the login page
3. **Browse Listings**: View all available housing listings
4. **Search**: Use the search bar to filter listings
5. **View Details**: Click on any listing to see details and location
6. **Calculate Commute**: Enter your starting address to get directions and travel time

## Security Notes

- All API keys use the `NEXT_PUBLIC_` prefix as they are used client-side
- Firebase Security Rules should be configured properly in production
- Google Maps API key should be restricted to your domain
- Never commit `.env.local` to version control

## License

This project is open source and available under the MIT License.
