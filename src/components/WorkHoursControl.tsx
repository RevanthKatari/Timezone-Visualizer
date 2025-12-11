import { motion } from 'framer-motion';
import { Clock, Sunrise, Sunset } from 'lucide-react';

interface WorkHoursControlProps {
  label: string;
  startHour: number;
  endHour: number;
  onStartChange: (hour: number) => void;
  onEndChange: (hour: number) => void;
}

export const WorkHoursControl = ({
  label,
  startHour,
  endHour,
  onStartChange,
  onEndChange,
}: WorkHoursControlProps) => {
  const formatHour = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const duration = endHour > startHour ? endHour - startHour : endHour === startHour ? 0 : 24 - startHour + endHour;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-5">
        <Clock className="w-4 h-4 text-gray-500" />
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
      
      <div className="space-y-5">
        {/* Start Time */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sunrise className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-600">Start Time</span>
            </div>
            <div className="px-3 py-1 bg-gray-100 rounded-md">
              <span className="text-sm font-semibold text-gray-900">{formatHour(startHour)}</span>
            </div>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max={endHour > startHour ? endHour - 1 : 22}
              value={startHour}
              onChange={(e) => {
                const newStart = Number(e.target.value);
                if (newStart < endHour) {
                  onStartChange(newStart);
                }
              }}
              className="work-hours-slider w-full"
              style={{
                background: `linear-gradient(to right, 
                  #37352f 0%, 
                  #37352f ${(startHour / 23) * 100}%, 
                  #e9e9e7 ${(startHour / 23) * 100}%, 
                  #e9e9e7 100%)`
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>12 AM</span>
            <span>11 PM</span>
          </div>
        </div>

        {/* End Time */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sunset className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-600">End Time</span>
            </div>
            <div className="px-3 py-1 bg-gray-100 rounded-md">
              <span className="text-sm font-semibold text-gray-900">{formatHour(endHour)}</span>
            </div>
          </div>
          <div className="relative">
            <input
              type="range"
              min={startHour < 23 ? startHour + 1 : 23}
              max="23"
              value={endHour}
              onChange={(e) => {
                const newEnd = Number(e.target.value);
                if (newEnd > startHour) {
                  onEndChange(newEnd);
                }
              }}
              className="work-hours-slider w-full"
              style={{
                background: `linear-gradient(to right, 
                  #37352f 0%, 
                  #37352f ${(endHour / 23) * 100}%, 
                  #e9e9e7 ${(endHour / 23) * 100}%, 
                  #e9e9e7 100%)`
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>12 AM</span>
            <span>11 PM</span>
          </div>
        </div>

        {/* Duration Display */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Work Duration</span>
            <div className="px-3 py-1.5 bg-gray-100 rounded-md">
              <span className="text-sm font-semibold text-gray-900">
                {duration > 0 ? `${duration} hours` : '0 hours'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

