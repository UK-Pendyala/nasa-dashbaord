/**
 * @file store.ts
 * Configures the global Redux store for the application.
 *
 * - Combines the root reducer (all feature slices and APIs).
 * - Attaches RTK Query middleware (`neosApi.middleware`) for caching,
 *   lifecycle events, and async request handling.
 *
 * @constant store - The configured Redux store instance.
 * @type RootState - Inferred type of the global state tree.
 * @type AppDispatch - Type-safe Redux dispatch type for use with hooks.
 */
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { neosApi } from '../features/neos/neosSlice';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) => getDefault().concat(neosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
