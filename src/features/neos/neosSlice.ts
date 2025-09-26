/**
 * @file neosApi.ts
 * RTK Query API slice for fetching Near-Earth Objects (NEOs) from the backend.
 *
 * - Uses `createApi` from Redux Toolkit Query (RTK).
 * - Provides a `getNeos` query that fetches NEO data for a given date range.
 * - Exposes generated React hooks for data fetching (`useGetNeosQuery`).
 *
 * @constant neosApi - Configured RTK Query API instance with NEO endpoints.
 * @constant useGetNeosQuery - Auto-generated hook for running the `getNeos` query.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NeosResponse } from './types/NeosResponse';
import { GetNeosArgs } from './types/GetNeosArgs';

const baseUrl = process.env.REACT_APP_API_BASE_URL || '';
const endpoint = process.env.REACT_APP_API_ENDPOINT || '';

export const neosApi = createApi({
  reducerPath: 'neosApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    /**
     * Query endpoint to fetch Near-Earth Objects for a given date range.
     *
     * @param startDate - Required start date in YYYY-MM-DD format.
     * @param endDate - Optional end date in YYYY-MM-DD format.
     * @returns A `NeosResponse` object containing the list of NEOs in items array.
     *
     */
    getNeos: builder.query<NeosResponse, GetNeosArgs>({
      query: ({ startDate, endDate }) => {
        const params = new URLSearchParams({ startDate });
        if (endDate) params.set('endDate', endDate);
        return {
          url: endpoint,
          params: { startDate, ...(endDate ? { endDate } : {}) },
        };
      },
      keepUnusedDataFor: 300, // cached data expires, if not used for 5 minutes.
    }),
  }),
});

export const { useGetNeosQuery } = neosApi;
