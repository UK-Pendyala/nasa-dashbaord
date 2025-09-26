import { useMemo, useState } from 'react';
import { Paper, Toolbar, Typography, TableContainer, TablePagination } from '@mui/material';
import type { NeosResponse } from '../types/NeosResponse';
import NeoTable from '../components/NeoTable';
import type { Order, SortKey } from '../utils';
import { getComparator, stableSort } from '../utils';

type Props = { response: NeosResponse };

export default function NeoPage({ response }: Props) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<SortKey>('closenessKm');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const rows = useMemo(() => {
    return stableSort(response.items, getComparator(order, orderBy));
  }, [response.items, order, orderBy]);

  const pagedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return rows.slice(start, start + rowsPerPage);
  }, [rows, page, rowsPerPage]);


  const handleRequestSort = (key: SortKey) => {
    const isAsc = orderBy === key && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(key);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper variant="outlined">
      <Toolbar sx={{ px: 2 }}>
        <Typography variant="subtitle1">
          Results: {response.count} &nbsp; ({response.startDate} → {response.endDate})
        </Typography>
      </Toolbar>

      <TableContainer sx={{ maxHeight: 560 }}>
        <NeoTable
          rows={pagedRows}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          page={page}
          rowsPerPage={rowsPerPage}
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
