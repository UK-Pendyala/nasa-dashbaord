import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import type { NeoItem } from '../types/NeoItem';

import type { SortKey, Order } from '../utils';
import NeoTableRow from './NeoTableRow';
import { Units } from '../types/Units';

type Props = {
  rows: NeoItem[];
  order: Order;
  orderBy: SortKey;
  page: number;
  rowsPerPage: number;
  sizeKey: SortKey;
  closenessKey: SortKey;
  velocityKey: SortKey;
  unit: Units;
  onRequestSort: (key: SortKey) => void;
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
 * @param {SortKey} sizeKey - Key for size based on current unit system.
 * @param {SortKey} closenessKey - Key for closeness based on current unit system.
 * @param {SortKey} velocityKey - Key for velocity based on current unit system.
 * @param {Units} unit - Current unit system ("metric" or "imperial").
 */
export default function NeoTable({
  rows,
  order,
  orderBy,
  onRequestSort,
  page,
  rowsPerPage,
  sizeKey,
  closenessKey,
  velocityKey,
  unit,
}: Props) {
  return (
    <Table stickyHeader size="small" aria-label="NEO table">
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Name</TableCell>

          <TableCell align="right" sortDirection={orderBy === sizeKey ? order : false}>
            <TableSortLabel
              active={orderBy === sizeKey}
              direction={orderBy === sizeKey ? order : 'asc'}
              onClick={() => onRequestSort(sizeKey)}
            >
              Size
            </TableSortLabel>
          </TableCell>

          <TableCell align="right" sortDirection={orderBy === closenessKey ? order : false}>
            <TableSortLabel
              active={orderBy === closenessKey}
              direction={orderBy === closenessKey ? order : 'asc'}
              onClick={() => onRequestSort(closenessKey)}
            >
              Closeness to Earth
            </TableSortLabel>
          </TableCell>

          <TableCell align="right" sortDirection={orderBy === velocityKey ? order : false}>
            <TableSortLabel
              active={orderBy === velocityKey}
              direction={orderBy === velocityKey ? order : 'asc'}
              onClick={() => onRequestSort(velocityKey)}
            >
              Relative Velocity
            </TableSortLabel>
          </TableCell>

          <TableCell align="center">Hazardous</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((n, idx) => (
          <NeoTableRow
            key={n.id}
            neoItem={n}
            rowNumber={page * rowsPerPage + idx + 1}
            unit={unit}
          />
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
