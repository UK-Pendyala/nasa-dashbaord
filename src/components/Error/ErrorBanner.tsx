import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { toMessage } from './errorUtils';

type Props = { error: unknown };

export default function ErrorBanner({ error }: Props) {
  return (
    <Stack sx={{ my: 2 }}>
      <Alert severity="error" variant="outlined">
        {toMessage(error)}
      </Alert>
    </Stack>
  );
}
