'use client';

import { GoogleMap as GMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import styles from './GoogleMap.module.css';

interface GoogleMapProps {
  lat: number;
  lng: number;
  title?: string;
}

const containerStyle = { width: '100%', height: '100%' };

export default function GoogleMap({ lat, lng, title }: GoogleMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });

  if (!isLoaded) return <LoadingSpinner inline />;

  return (
    <div className={styles.wrapper}>
      <GMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={15}
      >
        <Marker position={{ lat, lng }} title={title} />
      </GMap>
    </div>
  );
}
