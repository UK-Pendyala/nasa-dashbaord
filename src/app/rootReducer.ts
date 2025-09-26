/**
 * @file rootReducer.ts
 * Combines all feature reducers into a single root reducer.
 *
 * - Registers the RTK Query `neosApi` reducer under its path.
 * - Extend this file as new feature slices are added to the app.
 *
 * @constant rootReducer - Combined reducer for the Redux store.
 * @type RootState - Inferred type of the full Redux state tree.
 */
import { combineReducers } from '@reduxjs/toolkit';
import { neosApi } from '../features/neos/neosSlice';

const rootReducer = combineReducers({
  [neosApi.reducerPath]: neosApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
