import { useMemo, useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { motion } from 'framer-motion';
import type { TimezoneInfo } from '../utils/timezoneData';

interface Globe3DProps {
  timezone1: TimezoneInfo | null;
  timezone2: TimezoneInfo | null;
}

export const Globe3D = ({ timezone1, timezone2 }: Globe3DProps) => {
  const [globeReady, setGlobeReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const globeRef = useRef<any>(null);

  const points = useMemo(() => {
    const pts: any[] = [];
    if (timezone1) {
      pts.push({
        lat: timezone1.lat,
        lng: timezone1.lng,
        size: 0.8,
        color: '#37352f',
        label: timezone1.city,
      });
    }
    if (timezone2) {
      pts.push({
        lat: timezone2.lat,
        lng: timezone2.lng,
        size: 0.8,
        color: '#787774',
        label: timezone2.city,
      });
    }
    return pts;
  }, [timezone1, timezone2]);

  const arcs = useMemo(() => {
    if (!timezone1 || !timezone2) return [];
    return [{
      startLat: timezone1.lat,
      startLng: timezone1.lng,
      endLat: timezone2.lat,
      endLng: timezone2.lng,
      color: ['#37352f', '#787774'],
    }];
  }, [timezone1, timezone2]);

  // Timeout fallback - if onGlobeReady doesn't fire, show globe anyway after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!globeReady) {
        setGlobeReady(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [globeReady]);

  useEffect(() => {
    if (globeReady && globeRef.current && (timezone1 || timezone2)) {
      try {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = false;
          controls.enableDamping = true;
          controls.dampingFactor = 0.1;
        }
      } catch (err) {
        console.error('Error setting up globe controls:', err);
      }
    }
  }, [globeReady, timezone1, timezone2]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-lg min-h-[400px]">
        <div className="text-white text-sm text-center p-4">
          <p>Error loading globe</p>
          <p className="text-xs mt-2 text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full rounded-lg overflow-hidden border border-gray-200 bg-gray-900 relative"
      style={{ position: 'relative' }}
    >
      {!globeReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
          <div className="text-white text-sm">Loading globe...</div>
        </div>
      )}
      <Globe
        ref={globeRef}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={points}
        pointColor="color"
        pointRadius="size"
        pointLabel="label"
        pointResolution={2}
        pointsMerge={false}
        arcsData={arcs}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.1}
        arcDashAnimateTime={2000}
        arcStroke={1.5}
        onGlobeReady={() => {
          console.log('Globe ready!');
          setGlobeReady(true);
          setError(null);
        }}
        enablePointerInteraction={true}
        showAtmosphere={true}
        atmosphereColor="#37352f"
        atmosphereAltitude={0.15}
        backgroundColor="rgba(0,0,0,0)"
      />
    </motion.div>
  );
};

