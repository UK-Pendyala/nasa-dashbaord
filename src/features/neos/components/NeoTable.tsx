import {
  Table, TableBody, TableCell, TableHead, TableRow,
  TableSortLabel, Chip, Typography, Box
} from '@mui/material';
import type { NeoItem } from '../types/NeoItem';

import type { SortKey, Order } from '../utils';
import { formatMeters, formatKm, formatKmPerSec } from '../utils';
import NeoTableRow from './NeoTableRow';

type Props = {
  rows: NeoItem[];
  order: Order;
  orderBy: SortKey;
  onRequestSort: (key: SortKey) => void;
};

export default function NeoTable({ rows, order, orderBy, onRequestSort }: Props) {
  return (
    <Table stickyHeader size="small" aria-label="NEO table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>

          <TableCell align="right" sortDirection={orderBy === 'sizeMeters' ? order : false}>
            <TableSortLabel
              active={orderBy === 'sizeMeters'}
              direction={orderBy === 'sizeMeters' ? order : 'asc'}
              onClick={() => onRequestSort('sizeMeters')}
            >
              Size
            </TableSortLabel>
          </TableCell>

          <TableCell align="right" sortDirection={orderBy === 'closenessKm' ? order : false}>
            <TableSortLabel
              active={orderBy === 'closenessKm'}
              direction={orderBy === 'closenessKm' ? order : 'asc'}
              onClick={() => onRequestSort('closenessKm')}
            >
              Closeness to Earth
            </TableSortLabel>
          </TableCell>

          <TableCell align="right" sortDirection={orderBy === 'relativeVelocityKmS' ? order : false}>
            <TableSortLabel
              active={orderBy === 'relativeVelocityKmS'}
              direction={orderBy === 'relativeVelocityKmS' ? order : 'asc'}
              onClick={() => onRequestSort('relativeVelocityKmS')}
            >
              Relative Velocity
            </TableSortLabel>
          </TableCell>

          <TableCell align="center">Hazardous</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((n) => (
          <NeoTableRow key={n.id} neoItem={n}/>
        ))}
        {rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} align="center">No results</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
