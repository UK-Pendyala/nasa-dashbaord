import { combineReducers } from '@reduxjs/toolkit';
import { neosApi } from '../features/neos/neosSlice';

const rootReducer = combineReducers({
  [neosApi.reducerPath]: neosApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
