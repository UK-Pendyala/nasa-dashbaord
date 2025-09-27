import { Stack, Switch, Typography } from '@mui/material';
import { Units } from '../types/Units';

type Props = {
  unit: Units;
  setUnit: (unit: Units) => void;
};

/**
 * UnitToggle
 * A component that renders a toggle switch for selecting between metric and imperial units.
 *
 * @param {Props} props - The component props.
 * @param {Units} props.unit - The current unit system, either 'metric' or 'imperial'.
 * @param {(unit: Units) => void} props.setUnit - A function to update the selected unit system.
 */
export default function UnitToggle({ unit, setUnit }: Props) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginRight: 5 }}>
      <Typography sx={{ fontWeight: unit === 'metric' ? 'bold' : 'normal' }}>Metric</Typography>
      <Switch
        checked={unit === 'imperial'}
        onChange={(e) => setUnit(e.target.checked ? 'imperial' : 'metric')}
        slotProps={{
          input: {
            'aria-label': 'unit toggle',
          },
        }}
      />
      <Typography sx={{ fontWeight: unit === 'imperial' ? 'bold' : 'normal' }}>Imperial</Typography>
    </Stack>
  );
}
