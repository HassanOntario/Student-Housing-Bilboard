# SESA Student Housing Billboard

A modern student housing listing platform built with **Next.js 14**, **Firebase**, and **Google Maps**. Students can browse verified housing listings near campus, filter by location, price, and type, and view each listing on an interactive map.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **yarn**
- A **Firebase** project (Authentication + Firestore)
- A **Google Maps** API key with Maps JavaScript API enabled

### 1. Clone the repo

```bash
git clone https://github.com/HassanOntario/Student-Housing-Bilboard.git
cd Student-Housing-Bilboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your keys:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key |

### 4. Seed sample data (optional)

```bash
npm run seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
app/            → Next.js App Router pages & layouts
components/     → Reusable UI components
lib/            → Firebase init, auth helpers, Firestore queries
hooks/          → Custom React hooks (useAuth, useListings)
types/          → TypeScript type definitions
styles/         → Global CSS and CSS variables
public/         → Static assets (images, icons)
middleware.ts   → Route protection middleware
```

---

## 🔒 Auth Flow

1. Users sign in / sign up with an **@uwo.ca** email via Firebase Auth.
2. After first sign-in, users complete a **registration form** (name, student number, phone).
3. An **admin** approves or rejects each registration.
4. Approved users gain full access to search and view listings.

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Auth & Database:** Firebase (Auth + Firestore)
- **Maps:** Google Maps JavaScript API via `@react-google-maps/api`
- **Styling:** CSS Modules

---

## 📄 License

MIT
