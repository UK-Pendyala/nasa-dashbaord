import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NeosResponse } from './types/NeosResponse';

const baseUrl = process.env.REACT_APP_API_BASE_URL || ''
export type GetNeosArgs = {
  startDate: string;   // YYYY-MM-DD (required)
  endDate?: string;    // optional
};

export const neosApi = createApi({
  reducerPath: 'neosApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNeos: builder.query<NeosResponse, GetNeosArgs>({
      query: ({ startDate, endDate }) => {
        const params = new URLSearchParams({ startDate });
        if (endDate) params.set('endDate', endDate);
        return { url: `/near-earth-objects?${params.toString()}` };
      },
    }),
  }),
});

export const { useGetNeosQuery } = neosApi;
