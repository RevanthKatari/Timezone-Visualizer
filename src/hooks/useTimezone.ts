import { useState, useEffect } from 'react';
import { getCurrentTime, formatTime, formatDateTime } from '../utils/calculations';

export const useTimezone = (timezone: string) => {
  const [currentTime, setCurrentTime] = useState<Date>(getCurrentTime(timezone));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime(timezone));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return {
    currentTime,
    formattedTime: formatTime(currentTime, timezone),
    formattedDateTime: formatDateTime(currentTime, timezone),
  };
};

export const useTimezonePair = (timezone1: string | null, timezone2: string | null) => {
  const time1 = useTimezone(timezone1 || 'UTC');
  const time2 = useTimezone(timezone2 || 'UTC');

  return {
    time1: timezone1 ? time1 : null,
    time2: timezone2 ? time2 : null,
  };
};

