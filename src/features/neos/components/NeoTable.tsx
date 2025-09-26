import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import type { NeoItem } from '../types/NeoItem';

import type { SortKey, Order } from '../utils';
import NeoTableRow from './NeoTableRow';

type Props = {
  rows: NeoItem[];
  order: Order;
  orderBy: SortKey;
  onRequestSort: (key: SortKey) => void;
  page: number;
  rowsPerPage: number;
};
/**
 * NeoTable
 * Renders the full NEO table with the fillowing columns (Row Number, Name, Size, Closess to Earth, Relative Velocity, Hazardous)
 *
 * @param {NeoItem[]} rows - Current page of NEO rows to display.
 * @param {Order} order - Current sort direction ("asc" or "desc").
 * @param {SortKey} orderBy - Column currently sorted by.
 * @param {Function} onRequestSort - Handler to change sort column/direction.
 * @param {number} page - Current page number (zero-based).
 * @param {number} rowsPerPage - Number of rows displayed per page.
 */
export default function NeoTable({
  rows,
  order,
  orderBy,
  onRequestSort,
  page,
  rowsPerPage,
}: Props) {
  return (
    <Table stickyHeader size="small" aria-label="NEO table">
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
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

          <TableCell
            align="right"
            sortDirection={orderBy === 'relativeVelocityKmS' ? order : false}
          >
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
        {rows.map((n, idx) => (
          <NeoTableRow key={n.id} neoItem={n} rowNumber={page * rowsPerPage + idx + 1} />
        ))}
        {rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} align="center">
              No results
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
