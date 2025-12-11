import { addHours, startOfDay } from 'date-fns';
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz';

export interface MeetingWindow {
  start: Date;
  end: Date;
  duration: number; // in hours
  person1Local: { start: string; end: string };
  person2Local: { start: string; end: string };
}

export const getCurrentTime = (timezone: string): Date => {
  return toZonedTime(new Date(), timezone);
};

export const formatTime = (date: Date, timezone: string): string => {
  return formatInTimeZone(date, timezone, 'HH:mm');
};

export const formatDateTime = (date: Date, timezone: string): string => {
  return formatInTimeZone(date, timezone, 'EEE, MMM d, yyyy HH:mm');
};

export const findMeetingWindows = (
  timezone1: string,
  timezone2: string,
  workHours1: { start: number; end: number } = { start: 9, end: 17 },
  workHours2: { start: number; end: number } = { start: 9, end: 17 }
): MeetingWindow[] => {
  const windows: MeetingWindow[] = [];
  const now = new Date();
  
  // Check only today
  const baseDay = startOfDay(now);
  
  // Person 1's work hours in their timezone
  const person1DayStart = startOfDay(toZonedTime(baseDay, timezone1));
  const person1WorkStart = addHours(person1DayStart, workHours1.start);
  const person1WorkEnd = addHours(person1DayStart, workHours1.end);
  
  // Convert person 1's work hours to UTC
  const person1WorkStartUTC = fromZonedTime(person1WorkStart, timezone1);
  const person1WorkEndUTC = fromZonedTime(person1WorkEnd, timezone1);
  
  // Convert to person 2's timezone to see what time it is for them
  const person1WorkStartInTz2 = toZonedTime(person1WorkStartUTC, timezone2);
  const person1WorkEndInTz2 = toZonedTime(person1WorkEndUTC, timezone2);
  
  // Person 2's work hours in their timezone for the same day
  const person2DayStart = startOfDay(toZonedTime(baseDay, timezone2));
  const person2WorkStart = addHours(person2DayStart, workHours2.start);
  const person2WorkEnd = addHours(person2DayStart, workHours2.end);
  
  // Find the overlap in person 2's timezone
  const overlapStart = person1WorkStartInTz2 > person2WorkStart ? person1WorkStartInTz2 : person2WorkStart;
  const overlapEnd = person1WorkEndInTz2 < person2WorkEnd ? person1WorkEndInTz2 : person2WorkEnd;
  
  if (overlapStart < overlapEnd) {
    // Convert overlap back to UTC
    const overlapStartUTC = fromZonedTime(overlapStart, timezone2);
    const overlapEndUTC = fromZonedTime(overlapEnd, timezone2);
    
    const duration = (overlapEndUTC.getTime() - overlapStartUTC.getTime()) / (1000 * 60 * 60);
    
    if (duration > 0.5) { // At least 30 minutes
      windows.push({
        start: overlapStartUTC,
        end: overlapEndUTC,
        duration,
        person1Local: {
          start: formatTime(toZonedTime(overlapStartUTC, timezone1), timezone1),
          end: formatTime(toZonedTime(overlapEndUTC, timezone1), timezone1),
        },
        person2Local: {
          start: formatTime(toZonedTime(overlapStartUTC, timezone2), timezone2),
          end: formatTime(toZonedTime(overlapEndUTC, timezone2), timezone2),
        },
      });
    }
  }
  
  return windows;
};

export const getTimeDifference = (timezone1: string, timezone2: string): number => {
  const now = new Date();
  const time1 = toZonedTime(now, timezone1);
  const time2 = toZonedTime(now, timezone2);
  
  return (time2.getTime() - time1.getTime()) / (1000 * 60 * 60);
};

