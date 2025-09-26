import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { neosApi } from '../features/neos/neosSlice';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) => getDefault().concat(neosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
