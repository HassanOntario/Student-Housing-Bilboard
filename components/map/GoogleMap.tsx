'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import {
  GoogleMap as GMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import styles from './GoogleMap.module.css';

/* ── Preset points of interest around uOttawa ────────────── */
export interface PointOfInterest {
  label: string;
  lat: number;
  lng: number;
}

const POINTS_OF_INTEREST: PointOfInterest[] = [
  { label: 'uOttawa Main Campus (Tabaret Hall)', lat: 45.4231, lng: -75.6831 },
  { label: 'Rideau Centre', lat: 45.4257, lng: -75.6925 },
  { label: 'Parliament Hill', lat: 45.4236, lng: -75.7009 },
  { label: 'Ottawa Train Station (VIA Rail)', lat: 45.4017, lng: -75.6514 },
  { label: 'Lees LRT Station', lat: 45.4166, lng: -75.6706 },
  { label: 'St. Laurent Shopping Centre', lat: 45.4185, lng: -75.6240 },
  { label: 'Canadian Tire Centre (Senators)', lat: 45.2969, lng: -75.9272 },
  { label: 'Ottawa Hospital – Civic Campus', lat: 45.3925, lng: -75.7194 },
  { label: 'Byward Market', lat: 45.4286, lng: -75.6921 },
  { label: 'Billings Bridge Shopping Centre', lat: 45.3833, lng: -75.6778 },
];

const TRAVEL_MODES = [
  { value: 'DRIVING', icon: '🚗', label: 'Drive' },
  { value: 'TRANSIT', icon: '🚌', label: 'Transit' },
  { value: 'WALKING', icon: '🚶', label: 'Walk' },
  { value: 'BICYCLING', icon: '🚲', label: 'Bike' },
] as const;

type TravelModeKey = (typeof TRAVEL_MODES)[number]['value'];

const LIBRARIES: ('places')[] = ['places'];

/* ── Props ─────────────────────────────────────────────────── */
interface GoogleMapProps {
  lat: number;
  lng: number;
  title?: string;
}

const containerStyle = { width: '100%', height: '100%' };

/* ── Component ─────────────────────────────────────────────── */
export default function GoogleMap({ lat, lng, title }: GoogleMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    libraries: LIBRARIES,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  /* State */
  const [selectedPOI, setSelectedPOI] = useState('');
  const [customAddress, setCustomAddress] = useState('');
  const [travelMode, setTravelMode] = useState<TravelModeKey>('TRANSIT');
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distanceInfo, setDistanceInfo] = useState<{
    distance: string;
    duration: string;
    mode: string;
  } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const origin = useMemo(() => ({ lat, lng }), [lat, lng]);

  /* Fit bounds after directions arrive */
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  /* ── Calculate route ───────────────────────────────────── */
  const calculateRoute = useCallback(() => {
    if (!isLoaded) return;

    setError('');
    setDistanceInfo(null);
    setDirections(null);

    /* Determine destination */
    let destination: google.maps.LatLngLiteral | string | null = null;

    if (selectedPOI) {
      const poi = POINTS_OF_INTEREST.find((p) => p.label === selectedPOI);
      if (poi) destination = { lat: poi.lat, lng: poi.lng };
    } else if (customAddress.trim()) {
      destination = customAddress.trim();
    }

    if (!destination) {
      setError('Select a destination or enter an address.');
      return;
    }

    setLoading(true);

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode[travelMode],
      },
      (result, status) => {
        setLoading(false);

        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          const leg = result.routes[0]?.legs[0];
          if (leg) {
            setDistanceInfo({
              distance: leg.distance?.text ?? '—',
              duration: leg.duration?.text ?? '—',
              mode: travelMode,
            });
          }
          /* Fit the map to the route */
          if (mapRef.current && result.routes[0]) {
            const bounds = new google.maps.LatLngBounds();
            result.routes[0].legs.forEach((leg) => {
              leg.steps.forEach((step) => {
                bounds.extend(step.start_location);
                bounds.extend(step.end_location);
              });
            });
            mapRef.current.fitBounds(bounds, 60);
          }
        } else {
          setError('Could not find a route. Try a different destination.');
        }
      }
    );
  }, [isLoaded, selectedPOI, customAddress, travelMode, origin]);

  /* ── Clear route ───────────────────────────────────────── */
  const clearRoute = useCallback(() => {
    setDirections(null);
    setDistanceInfo(null);
    setSelectedPOI('');
    setCustomAddress('');
    setError('');
    mapRef.current?.panTo(origin);
    mapRef.current?.setZoom(15);
  }, [origin]);

  /* ── Render ────────────────────────────────────────────── */
  if (!isLoaded) {
    /* If there is no API key at all, show a helpful message instead of spinner */
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      return (
        <div className={styles.container}>
          <p style={{ padding: '2rem', color: 'var(--color-text-secondary)' }}>
            Google Maps API key is not configured. Add{' '}
            <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your{' '}
            <code>.env.local</code> file.
          </p>
        </div>
      );
    }
    return <LoadingSpinner inline />;
  }

  return (
    <div className={styles.container}>
      {/* ── Destination picker ─────────────────────────────── */}
      <div className={styles.controls}>
        <p className={styles.controlsHeading}>Distance from this residence</p>

        {/* POI select */}
        <select
          className={`input ${styles.select}`}
          value={selectedPOI}
          onChange={(e) => {
            setSelectedPOI(e.target.value);
            setCustomAddress('');
          }}
        >
          <option value="">— Choose a destination —</option>
          {POINTS_OF_INTEREST.map((p) => (
            <option key={p.label} value={p.label}>
              {p.label}
            </option>
          ))}
        </select>

        {/* Divider */}
        <span className={styles.or}>or type an address</span>

        {/* Custom address */}
        <input
          className={`input ${styles.addressInput}`}
          type="text"
          placeholder="e.g. 200 Rideau St, Ottawa"
          value={customAddress}
          onChange={(e) => {
            setCustomAddress(e.target.value);
            setSelectedPOI('');
          }}
          onKeyDown={(e) => e.key === 'Enter' && calculateRoute()}
        />

        {/* Travel mode */}
        <div className={styles.modes}>
          {TRAVEL_MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              className={`${styles.modeBtn} ${travelMode === m.value ? styles.modeBtnActive : ''}`}
              onClick={() => setTravelMode(m.value)}
              title={m.label}
            >
              <span className={styles.modeIcon}>{m.icon}</span>
              <span className={styles.modeLabel}>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={calculateRoute}
            disabled={loading}
          >
            {loading ? 'Calculating…' : 'Get Directions'}
          </button>
          {directions && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearRoute}
            >
              Clear
            </button>
          )}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {/* Distance result */}
        {distanceInfo && (
          <div className={styles.result}>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>Distance</span>
              <strong>{distanceInfo.distance}</strong>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>Est. travel time</span>
              <strong>{distanceInfo.duration}</strong>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>Mode</span>
              <strong style={{ textTransform: 'capitalize' }}>
                {distanceInfo.mode.toLowerCase()}
              </strong>
            </div>
          </div>
        )}
      </div>

      {/* ── Map ────────────────────────────────────────────── */}
      <div className={styles.wrapper}>
        <GMap
          mapContainerStyle={containerStyle}
          center={origin}
          zoom={15}
          onLoad={onMapLoad}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          {/* Residence pin (always visible) */}
          {!directions && (
            <Marker
              position={origin}
              title={title}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#9c1c30',
                fillOpacity: 1,
                strokeColor: '#fff',
                strokeWeight: 2,
                scale: 10,
              }}
            />
          )}

          {/* Directions overlay */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: '#9c1c30',
                  strokeWeight: 5,
                  strokeOpacity: 0.8,
                },
                markerOptions: {
                  zIndex: 100,
                },
              }}
            />
          )}
        </GMap>
      </div>
    </div>
  );
}
