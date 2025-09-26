import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NeosResponse } from './types/NeosResponse';
import { GetNeosArgs } from './types/GetNeosArgs';

const baseUrl = process.env.REACT_APP_API_BASE_URL || '';
const endpoint = process.env.REACT_APP_API_ENDPOINT || '';

// const apiUrl = `${baseUrl}/${endpoint}`;

export const neosApi = createApi({
  reducerPath: 'neosApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNeos: builder.query<NeosResponse, GetNeosArgs>({
      query: ({ startDate, endDate }) => {
        const params = new URLSearchParams({ startDate });
        if (endDate) params.set('endDate', endDate);
        return { url: `/${endpoint}?${params.toString()}` };
      },
    }),
  }),
});

export const { useGetNeosQuery } = neosApi;
