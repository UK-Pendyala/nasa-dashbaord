/**
 * @file App.tsx
 * Root application component for the NASA NEO Dashboard.
 *
 * Responsibilities:
 * - Provides the top-level layout and introduction text.
 * - Renders a date range form (`DateRangeForm`) to let users query NEO data.
 * - Integrates with the RTK Query `useGetNeosQuery` hook for fetching from the backend.
 * - Displays results using the `NeoPage` component when data is available.
 * - Shows error feedback with `ErrorBanner` and a transparent blocking
 *   `LoadingOverlay` while the first request is in-flight.
 * - Renders a placeholder prompt when no data has been fetched yet.
 *
 * @component
 * @returns {JSX.Element} Container with form, status indicators, and results table.
 */
import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import DateRangeForm from './features/neos/components/DateRangeForm';
import ErrorBanner from './components/Error/ErrorBanner';
import LoadingOverlay from './components/LoadingOverlay';

import NeoPage from './features/neos/pages/NeoPage';
import { useGetNeosQuery } from './features/neos/neosSlice';
import { skipToken } from '@reduxjs/toolkit/query';
import { Box } from '@mui/material';

type QueryParams = { startDate: string; endDate?: string };

export default function App() {
  // Set by the form; when null, we don't fetch yet.
  const [params, setParams] = useState<QueryParams | null>(null);

  // RTK Query: fetch when params exist
  const {
    data,
    currentData,
    error,
    isError,
    isFetching,
    isSuccess,
    isUninitialized,
    isLoading,
    refetch,
  } = useGetNeosQuery(params ?? skipToken, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    // pollingInterval: 10000 // can enable this for auto-refresh
  });

  const formSubmitHandler = (formValues: QueryParams) => {
    setParams(formValues);
    if (isError) refetch();
  };

  const showOverlay = !currentData && (isLoading || isFetching);
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        NASA Near-Earth Objects
      </Typography>

      <Typography variant="h6" sx={{ mb: 1 }}>
        About this app
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        NeoWs (Near Earth Object Web Service) is a RESTful API from NASA that provides asteroid
        information based on their closest approach date to Earth. Our backend integrates with NeoWs
        to process this data, making it easy for the frontend to search and display results.
      </Typography>

      <DateRangeForm onSubmit={formSubmitHandler} />

      {error && <ErrorBanner error={error} />}

      {isSuccess && data && <NeoPage response={data} />}

      {!data && !isFetching && !error && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '40vh',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" color="text.secondary">
            Select dates above to begin your search
          </Typography>
        </Box>
      )}

      <LoadingOverlay open={showOverlay} />
    </Container>
  );
}
