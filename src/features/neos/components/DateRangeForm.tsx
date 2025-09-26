import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField } from '@mui/material';
import useNeoData from '../hooks/functions';
import { FormValues } from '../types/FormValues';



type Props = {
  defaultValues?: FormValues;
  onSubmit: (v: FormValues) => void;
};

export default function DateRangeForm({ onSubmit, defaultValues }: Props) {
  const { register, handleSubmit, formState: { errors } } = useNeoData({ defaultValues });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'flex-end' }}>
        <TextField
          label="Start Date"
          type="date"
          // InputLabelProps={{ shrink: true }}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
          {...register('startDate', {
            required: 'startDate is required',
            pattern: { value: /^\d{4}-\d{2}-\d{2}$/, message: 'Use YYYY-MM-DD' },
          })}
          error={!!errors.startDate}
          helperText={errors.startDate?.message}
        />

        <TextField
          label="End Date (optional)"
          type="date"
          // InputLabelProps={{ shrink: true }}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
          {...register('endDate', {
            pattern: { value: /^\d{4}-\d{2}-\d{2}$/, message: 'Use YYYY-MM-DD' },
          })}
          error={!!errors.endDate}
          helperText={errors.endDate?.message}
        />

        <Button type="submit" variant="contained">Fetch</Button>
      </Stack>
    </Box>
  );
}
