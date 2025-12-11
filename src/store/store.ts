import { configureStore } from '@reduxjs/toolkit';

// Minimal store setup (kept for potential future use with kepler.gl)
export const store = configureStore({
  reducer: {
    // Placeholder for future reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

