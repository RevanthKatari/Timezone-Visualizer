import { useState } from 'react';
import { Timeline } from './Timeline';
import { WorkHoursControl } from './WorkHoursControl';
import { useMeetingTimes } from '../hooks/useMeetingTimes';
import type { TimezoneInfo } from '../utils/timezoneData';

interface MeetingFinderProps {
  timezone1: TimezoneInfo | null;
  timezone2: TimezoneInfo | null;
}

export const MeetingFinder = ({ timezone1, timezone2 }: MeetingFinderProps) => {
  const [workHours1, setWorkHours1] = useState({ start: 9, end: 17 });
  const [workHours2, setWorkHours2] = useState({ start: 9, end: 17 });

  const windows = useMeetingTimes(
    timezone1?.timezone || null,
    timezone2?.timezone || null,
    workHours1,
    workHours2
  );

  if (!timezone1 || !timezone2) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          Select both timezones to find meeting times
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Work Hours Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WorkHoursControl
          label={`${timezone1.city} Work Hours`}
          startHour={workHours1.start}
          endHour={workHours1.end}
          onStartChange={(hour) => setWorkHours1(prev => ({ ...prev, start: hour }))}
          onEndChange={(hour) => setWorkHours1(prev => ({ ...prev, end: hour }))}
        />
        <WorkHoursControl
          label={`${timezone2.city} Work Hours`}
          startHour={workHours2.start}
          endHour={workHours2.end}
          onStartChange={(hour) => setWorkHours2(prev => ({ ...prev, start: hour }))}
          onEndChange={(hour) => setWorkHours2(prev => ({ ...prev, end: hour }))}
        />
      </div>

      {/* Meeting Times Timeline */}
      <Timeline
        windows={windows}
        timezone1={timezone1.timezone}
        timezone2={timezone2.timezone}
        city1={timezone1.city}
        city2={timezone2.city}
      />
    </div>
  );
};

