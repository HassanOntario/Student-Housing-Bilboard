# Setup Guide

This guide will walk you through setting up the Student Housing Billboard application from scratch.

## Prerequisites

Before you begin, ensure you have:
- Node.js 20+ installed
- npm or yarn package manager
- A Firebase account (free tier is fine)
- A Google Cloud Platform account (free trial available)

## Step 1: Clone and Install

```bash
git clone https://github.com/HassanOntario/Student-Housing-Bilboard.git
cd Student-Housing-Bilboard
npm install
```

## Step 2: Firebase Setup

### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "student-housing-app")
4. Accept terms and click "Continue"
5. Disable Google Analytics (optional) and click "Create project"
6. Wait for project creation to complete

### Enable Email/Password Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Click on the "Sign-in method" tab
4. Click on "Email/Password"
5. Enable the first toggle (Email/Password)
6. Click "Save"

### Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select "Start in production mode" (you can change rules later)
4. Choose a location (select the closest to your users)
5. Click "Enable"

### Get Firebase Configuration

1. Click the gear icon next to "Project Overview" in the sidebar
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (`</>`) to create a web app
5. Register your app with a nickname (e.g., "Student Housing Web")
6. Copy the configuration object

## Step 3: Google Maps API Setup

### Enable APIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to "APIs & Services" > "Library"
4. Search for and enable:
   - Maps JavaScript API
   - Directions API
   - (Optional) Geocoding API

### Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the API key
4. (Recommended) Click "Restrict Key":
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain (e.g., `localhost:3000/*` for development)
   - Under "API restrictions", select "Restrict key"
   - Select the APIs you enabled above
   - Click "Save"

## Step 4: Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
```

## Step 5: Add Sample Data

### Option 1: Using Firebase Console (Recommended)

1. Go to Firestore Database in Firebase Console
2. Click "Start collection"
3. Collection ID: `listings`
4. Click "Next"
5. Add a document with these fields:

```
Document ID: (auto-generated)
Fields:
  title (string): "Cozy 2BR near Campus"
  description (string): "Beautiful apartment close to university with modern amenities"
  address (string): "123 Main St, College Town, ST 12345"
  price (number): 1200
  bedrooms (number): 2
  bathrooms (number): 1
  lat (number): 40.7128
  lng (number): -74.0060
```

6. Click "Save"
7. Repeat to add more listings

### Option 2: Using Firebase Admin SDK (Advanced)

Create a script to populate data programmatically (not included in this guide).

## Step 6: Run the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Step 7: Test the Application

1. **Sign Up**: Go to `/signup` and create a new account
2. **Login**: Sign in with your credentials at `/login`
3. **Browse Listings**: You should see the listings you added
4. **Search**: Try searching for keywords from your listings
5. **View Details**: Click on a listing to see details
6. **Calculate Route**: Enter a starting address and click "Calculate Route"

## Troubleshooting

### Firebase Authentication Issues

- **Error: "Invalid API key"**
  - Double-check your `NEXT_PUBLIC_FIREBASE_API_KEY` in `.env.local`
  - Ensure Email/Password authentication is enabled in Firebase Console

- **Error: "Permission denied"**
  - Update Firestore security rules to allow authenticated users to read listings

### Google Maps Issues

- **Map doesn't load**
  - Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is correct
  - Check that Maps JavaScript API is enabled
  - Verify API key restrictions allow your domain

- **Route calculation fails**
  - Ensure Directions API is enabled
  - Check that the origin address is valid

### Build Issues

- **TypeScript errors**
  - Run `npm install` to ensure all dependencies are installed
  - Delete `.next` folder and rebuild: `rm -rf .next && npm run build`

### Data Issues

- **No listings appear**
  - Check that Firestore has a `listings` collection with documents
  - Verify Firestore security rules allow read access
  - Check browser console for errors

## Firebase Security Rules (Production)

Before deploying to production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Listings can be read by authenticated users
    match /listings/{listing} {
      allow read: if request.auth != null;
      // Optionally allow write for admins
      allow write: if false; // or add admin logic
    }
    
    // Other collections...
  }
}
```

## Next Steps

- Add more listing fields (photos, amenities, etc.)
- Implement admin interface for managing listings
- Add favorites/bookmarks feature
- Implement real-time updates with Firestore listeners
- Add email verification for new accounts
- Implement password reset functionality

## Support

If you encounter issues:
1. Check the main README.md for general information
2. Review Firebase and Google Cloud documentation
3. Check browser console for error messages
4. Verify all environment variables are set correctly
