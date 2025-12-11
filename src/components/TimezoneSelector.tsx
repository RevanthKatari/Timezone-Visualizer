import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { searchTimezones, type TimezoneInfo } from '../utils/timezoneData';

interface TimezoneSelectorProps {
  label: string;
  value: TimezoneInfo | null;
  onChange: (timezone: TimezoneInfo) => void;
}

export const TimezoneSelector = ({ label, value, onChange }: TimezoneSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredTimezones = searchTimezones(searchQuery);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all flex items-center justify-between group"
      >
        <span className="text-gray-900">
          {value ? `${value.city}, ${value.country}` : 'Select timezone...'}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-all duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden"
          >
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  autoFocus
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-64">
              {filteredTimezones.length > 0 ? (
                filteredTimezones.map((tz) => (
                  <button
                    key={`${tz.city}-${tz.country}`}
                    onClick={() => {
                      onChange(tz);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
                  >
                    <div className="font-medium text-gray-900">{tz.city}</div>
                    <div className="text-sm text-gray-500">{tz.country}</div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-500">No timezones found</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

