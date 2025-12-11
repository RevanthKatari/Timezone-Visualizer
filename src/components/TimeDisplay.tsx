import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useTimezone } from '../hooks/useTimezone';

interface TimeDisplayProps {
  label: string;
  timezone: string | null;
  city?: string;
}

export const TimeDisplay = ({ label, timezone, city }: TimeDisplayProps) => {
  if (!timezone) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="text-sm font-medium text-gray-500 mb-2">{label}</div>
        <div className="text-gray-400">Select a timezone</div>
      </div>
    );
  }

  const { formattedTime, formattedDateTime } = useTimezone(timezone);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-gray-400" />
        <div className="text-sm font-medium text-gray-500">{label}</div>
      </div>
      {city && (
        <div className="text-xs text-gray-400 mb-2">{city}</div>
      )}
      <motion.div
        key={formattedTime}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold text-gray-900 mb-2"
      >
        {formattedTime}
      </motion.div>
      <div className="text-sm text-gray-500">{formattedDateTime}</div>
    </motion.div>
  );
};

