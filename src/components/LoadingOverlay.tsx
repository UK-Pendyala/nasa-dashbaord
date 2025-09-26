import { Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type Props = { open: boolean };
/**
 * LoadingOverlay
 * Displays a full-screen backdrop with a circular progress indicator.
 *
 * Used to block user interaction while data is being fetched.
 *
 * @param {boolean} open - Controls whether the overlay is visible.
 *   - `true`: shows the backdrop and spinner
 *   - `false`: hides it
 *
 * Example:
 * <LoadingOverlay open={isFetching} />
 */
export default function LoadingOverlay({ open }: Props) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }} open={open}>
      <Stack spacing={2} alignItems="center">
        <CircularProgress color="inherit" />
        <Typography variant="h6">Fetching asteroid data from NASA...</Typography>
      </Stack>
    </Backdrop>
  );
}
