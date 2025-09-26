import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import DateRangeForm from "./features/neos/components/DateRangeForm";
import ErrorBanner from "./components/Error/ErrorBanner";
import LoadingOverlay from "./components/LoadingOverlay";

import NeoPage from "./features/neos/pages/NeoPage";
import { useGetNeosQuery } from "./features/neos/neosSlice";
import { skipToken } from '@reduxjs/toolkit/query';

type QueryParams = { startDate: string; endDate?: string };

export default function App() {
  // Set by the form; when null, we don't fetch yet.
  const [params, setParams] = useState<QueryParams | null>(null);



  // RTK Query: fetch when params exist
  const { data, currentData, error, isError, isFetching, isSuccess, isUninitialized, isLoading, refetch } = useGetNeosQuery(
    params ?? skipToken, {
      refetchOnFocus: true,
      refetchOnReconnect: true, 
      refetchOnMountOrArgChange: true     
    }
  );

  const formSubmitHandler = (formValues: QueryParams) => {
    setParams(formValues);
    if (isError) refetch();
  }

  // Show a blocking overlay only when fetching and no cached data yet
  // const showOverlay = Boolean(isFetching && !data);
  // console.log(isLoading, isFetching);
  const showOverlay = !currentData && (isLoading || isFetching);
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        NASA Near-Earth Objects
      </Typography>

      <DateRangeForm onSubmit={formSubmitHandler} />

      {error && <ErrorBanner error={error} />}

      {isSuccess && data && <NeoPage response={data} />}

      <LoadingOverlay open={showOverlay} />
    </Container>
  );
}
