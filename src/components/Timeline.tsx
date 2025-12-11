import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import type { MeetingWindow } from '../utils/calculations';

interface TimelineProps {
  windows: MeetingWindow[];
  timezone1: string;
  timezone2: string;
  city1?: string;
  city2?: string;
}

export const Timeline = ({ windows, timezone1, city1, city2 }: TimelineProps) => {
  if (windows.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="text-center text-gray-500">
          <div className="text-base font-medium mb-1">No overlapping meeting times found today</div>
          <div className="text-sm">Try adjusting the work hours above</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Meeting Times (Today)</h3>
      <div className="space-y-3">
        {windows.map((window, index) => {
          const date1 = toZonedTime(window.start, timezone1);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-900">
                  {format(date1, 'EEE, MMM d')}
                </div>
                <div className="px-2.5 py-1 bg-gray-100 rounded-md">
                  <span className="text-xs font-semibold text-gray-700">
                    {window.duration.toFixed(1)}h
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{city1 || 'Person 1'}</div>
                  <div className="font-medium text-gray-900">
                    {window.person1Local.start} - {window.person1Local.end}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{city2 || 'Person 2'}</div>
                  <div className="font-medium text-gray-900">
                    {window.person2Local.start} - {window.person2Local.end}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

