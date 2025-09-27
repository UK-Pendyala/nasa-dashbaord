/**
 * NeoPage
 * Renders a sortable and paginated table of Near-Earth Objects (NEOs).
 * Uses `useNeoPage` for sorting/pagination state and delegates row rendering
 * to `NeoTable`.
 *
 * Features:
 * - Sorting: Uses order + orderBy state (managed in useNeoPage) to sort rows by
 *   size, closeness, or relative velocity.
 * - Pagination: Integrates MUI <TablePagination>, showing a configurable number
 *   of rows per page (default 10). Page and rowsPerPage are also managed in
 *   useNeoPage.
 * - Separation of concerns: Logic for sorting, pagination, and state
 *   management lives in the custom hook `useNeoPage`, returning:
 *     order, orderBy, page, rowsPerPage, rows (all items), pagedRows (slice),
 *     and event handlers for sorting and pagination changes.
 */

import {
  Paper,
  Toolbar,
  Typography,
  TableContainer,
  TablePagination,
  Stack,
  Switch,
} from '@mui/material';
import type { NeosResponse } from '../types/NeosResponse';
import NeoTable from '../components/NeoTable';
import useNeoPage from '../hooks/useNeoPage';
import { UseNeoPageReturnType } from '../types/UseNeoPageRetrurnType';
import UnitToggle from '../components/UnitToggle';
import ProgressBar from '../components/ProgressBar';

type Props = { response: NeosResponse; isFetching: boolean; isLoading: boolean };
/**
 *
 * @param {NeosResponse} response - API response containing NEO items,
 *   total count, and query date range.
 */
export default function NeoPage({ response, isFetching, isLoading }: Props) {
  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    pagedRows,
    unit,
    sizeKey,
    closenessKey,
    velocityKey,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    setUnit,
  }: UseNeoPageReturnType = useNeoPage(response);

  return (
    <Paper variant="outlined">
      <Toolbar sx={{ px: 2, justifyContent: 'space-between', position: 'relative' }}>
        {isFetching && !isLoading && <ProgressBar />}
        <Typography variant="subtitle1">
          Results: {response.count} &nbsp; ({response.startDate} → {response.endDate})
        </Typography>
        <UnitToggle unit={unit} setUnit={setUnit} />
      </Toolbar>

      <TableContainer sx={{ maxHeight: 560 }}>
        <NeoTable
          rows={pagedRows}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          page={page}
          rowsPerPage={rowsPerPage}
          sizeKey={sizeKey}
          closenessKey={closenessKey}
          velocityKey={velocityKey}
          unit={unit}
        />
      </TableContainer>

      <TablePagination
        component="div"
        count={response.count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </Paper>
  );
}
