import { Box, Chip, TableCell, TableRow, Typography } from '@mui/material';
import { NeoItem } from '../types/NeoItem';
import { formatCloseness, formatSize, formatVelocity } from '../utils';
import { Units } from '../types/Units';

type NeoTableRowProps = {
  neoItem: NeoItem;
  rowNumber: number;
  unit: Units;
};

/**
 * NeoTableRow
 * Renders a single NEO row in the table, showing index, name,
 * size, closeness, velocity, and hazardous status.
 *
 * @param {NeoItem} neoItem - The NEO data for this row.
 * @param {number} rowNumber - The row index number to display.
 */
export default function NeoTableRow({ neoItem, rowNumber, unit }: NeoTableRowProps) {
  return (
    <TableRow hover key={neoItem.id}>
      <TableCell>{rowNumber}</TableCell>
      <TableCell sx={{ maxWidth: 320 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography variant="body2" noWrap title={neoItem.name}>
            {neoItem.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="right">{formatSize(neoItem.sizeMeters, unit)}</TableCell>
      <TableCell align="right">{formatCloseness(neoItem.closenessKm, unit)}</TableCell>
      <TableCell align="right">{formatVelocity(neoItem.relativeVelocityKmH, unit)}</TableCell>
      <TableCell align="center">
        {neoItem.hazardous ? (
          <Chip size="small" color="error" label="Yes" />
        ) : (
          <Chip size="small" label="No" />
        )}
      </TableCell>
    </TableRow>
  );
}
