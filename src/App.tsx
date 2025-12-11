import { useState } from 'react';
import { motion } from 'framer-motion';
import { TimezoneSelector } from './components/TimezoneSelector';
import { TimeDisplay } from './components/TimeDisplay';
import { MeetingFinder } from './components/MeetingFinder';
import { Globe3D } from './components/Globe3D';
import type { TimezoneInfo } from './utils/timezoneData';

function App() {
  const [timezone1, setTimezone1] = useState<TimezoneInfo | null>(null);
  const [timezone2, setTimezone2] = useState<TimezoneInfo | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Timezone Visualizer
          </h1>
          <p className="text-lg text-gray-600">Find the perfect time to connect across the globe</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Timezone Selectors */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <TimezoneSelector
              label="Person 1"
              value={timezone1}
              onChange={setTimezone1}
            />
            <TimezoneSelector
              label="Person 2"
              value={timezone2}
              onChange={setTimezone2}
            />
          </motion.div>

          {/* Time Displays */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <TimeDisplay
              label="Person 1 Time"
              timezone={timezone1?.timezone || null}
              city={timezone1?.city}
            />
            <TimeDisplay
              label="Person 2 Time"
              timezone={timezone2?.timezone || null}
              city={timezone2?.city}
            />
          </motion.div>
        </div>

        {/* 3D Globe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3D Interactive Globe</h2>
            <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
              <Globe3D timezone1={timezone1} timezone2={timezone2} />
            </div>
          </div>
        </motion.div>

        {/* Meeting Finder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <MeetingFinder timezone1={timezone1} timezone2={timezone2} />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
