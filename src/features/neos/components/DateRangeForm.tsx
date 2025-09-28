import { Box, Button, Stack, TextField } from '@mui/material';
import useNeoData from '../hooks/useNeoData';
import { FormValues } from '../types/FormValues';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  defaultValues?: FormValues;
  submitHandler: (v: FormValues) => void;
};

/**
 * DateRangeForm
 * Renders a form with start and end date inputs for querying NEO data.
 *
 * @param {FormValues} defaultValues - Optional initial values for the form.
 * @param {Function} onSubmit - Callback triggered with validated form values.
 */
export default function DateRangeForm({ submitHandler, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setEndDateFromStartDate,
  } = useNeoData({ defaultValues });

  const onSubmit = (data: FormValues) => {
    setEndDateFromStartDate();
    submitHandler(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'flex-start' }}>
        <TextField
          label="Start Date"
          type="date"
          slotProps={{ inputLabel: { shrink: true } }} // Ensures the label stays visible above the input field even when empty
          fullWidth
          {...register('startDate', {
            required: 'startDate is required',
            pattern: {
              value: /^\d{4}-\d{2}-\d{2}$/,
              message: 'Use YYYY-MM-DD',
            },
          })}
          error={!!errors.startDate}
          helperText={errors.startDate?.message ?? '\u00A0'}
        />

        <TextField
          label="End Date (optional)"
          type="date"
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
          {...register('endDate', {
            pattern: {
              value: /^\d{4}-\d{2}-\d{2}$/,
              message: 'Use YYYY-MM-DD',
            },
          })}
          error={!!errors.endDate}
          helperText={errors.endDate?.message ?? '\u00A0'}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SearchIcon />
        </Button>
      </Stack>
    </Box>
  );
}
