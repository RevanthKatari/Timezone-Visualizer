export interface TimezoneInfo {
  city: string;
  country: string;
  timezone: string;
  lat: number;
  lng: number;
  offset: number; // UTC offset in hours
}

export const timezones: TimezoneInfo[] = [
  // Americas
  { city: 'New York', country: 'United States', timezone: 'America/New_York', lat: 40.7128, lng: -74.0060, offset: -5 },
  { city: 'Los Angeles', country: 'United States', timezone: 'America/Los_Angeles', lat: 34.0522, lng: -118.2437, offset: -8 },
  { city: 'Chicago', country: 'United States', timezone: 'America/Chicago', lat: 41.8781, lng: -87.6298, offset: -6 },
  { city: 'Toronto', country: 'Canada', timezone: 'America/Toronto', lat: 43.6532, lng: -79.3832, offset: -5 },
  { city: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City', lat: 19.4326, lng: -99.1332, offset: -6 },
  { city: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', lat: -23.5505, lng: -46.6333, offset: -3 },
  { city: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', lat: -34.6118, lng: -58.3960, offset: -3 },
  
  // Europe
  { city: 'London', country: 'United Kingdom', timezone: 'Europe/London', lat: 51.5074, lng: -0.1278, offset: 0 },
  { city: 'Paris', country: 'France', timezone: 'Europe/Paris', lat: 48.8566, lng: 2.3522, offset: 1 },
  { city: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', lat: 52.5200, lng: 13.4050, offset: 1 },
  { city: 'Madrid', country: 'Spain', timezone: 'Europe/Madrid', lat: 40.4168, lng: -3.7038, offset: 1 },
  { city: 'Rome', country: 'Italy', timezone: 'Europe/Rome', lat: 41.9028, lng: 12.4964, offset: 1 },
  { city: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam', lat: 52.3676, lng: 4.9041, offset: 1 },
  { city: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow', lat: 55.7558, lng: 37.6173, offset: 3 },
  { city: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', lat: 41.0082, lng: 28.9784, offset: 3 },
  
  // Asia
  { city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', lat: 35.6762, lng: 139.6503, offset: 9 },
  { city: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai', lat: 31.2304, lng: 121.4737, offset: 8 },
  { city: 'Hong Kong', country: 'Hong Kong', timezone: 'Asia/Hong_Kong', lat: 22.3193, lng: 114.1694, offset: 8 },
  { city: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', lat: 1.3521, lng: 103.8198, offset: 8 },
  { city: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', lat: 37.5665, lng: 126.9780, offset: 9 },
  { city: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok', lat: 13.7563, lng: 100.5018, offset: 7 },
  { city: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', lat: 19.0760, lng: 72.8777, offset: 5.5 },
  { city: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', lat: 25.2048, lng: 55.2708, offset: 4 },
  { city: 'Tel Aviv', country: 'Israel', timezone: 'Asia/Jerusalem', lat: 32.0853, lng: 34.7818, offset: 2 },
  
  // Oceania
  { city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', lat: -33.8688, lng: 151.2093, offset: 10 },
  { city: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne', lat: -37.8136, lng: 144.9631, offset: 10 },
  { city: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland', lat: -36.8485, lng: 174.7633, offset: 12 },
  
  // Africa
  { city: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', lat: 30.0444, lng: 31.2357, offset: 2 },
  { city: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg', lat: -26.2041, lng: 28.0473, offset: 2 },
  { city: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos', lat: 6.5244, lng: 3.3792, offset: 1 },
];

export const getTimezoneByCity = (city: string): TimezoneInfo | undefined => {
  return timezones.find(tz => tz.city.toLowerCase() === city.toLowerCase());
};

export const searchTimezones = (query: string): TimezoneInfo[] => {
  const lowerQuery = query.toLowerCase();
  return timezones.filter(tz => 
    tz.city.toLowerCase().includes(lowerQuery) ||
    tz.country.toLowerCase().includes(lowerQuery) ||
    tz.timezone.toLowerCase().includes(lowerQuery)
  );
};

