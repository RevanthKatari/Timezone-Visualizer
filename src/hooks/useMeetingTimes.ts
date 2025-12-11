import { useMemo } from 'react';
import { findMeetingWindows } from '../utils/calculations';

export const useMeetingTimes = (
  timezone1: string | null,
  timezone2: string | null,
  workHours1 = { start: 9, end: 17 },
  workHours2 = { start: 9, end: 17 }
) => {
  return useMemo(() => {
    if (!timezone1 || !timezone2) {
      return [];
    }

    return findMeetingWindows(timezone1, timezone2, workHours1, workHours2);
  }, [timezone1, timezone2, workHours1.start, workHours1.end, workHours2.start, workHours2.end]);
};

