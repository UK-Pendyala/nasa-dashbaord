import { useMemo, useState } from 'react';
import { Paper, Toolbar, Typography, TableContainer } from '@mui/material';
import type { NeosResponse } from '../types/NeosResponse';
import NeoTable from '../components/NeoTable';
import type { Order, SortKey } from '../utils';
import { getComparator, stableSort } from '../utils';

type Props = { response: NeosResponse };

export default function NeoPage({ response }: Props) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<SortKey>('closenessKm');

  const rows = useMemo(() => {
    return stableSort(response.items, getComparator(order, orderBy));
  }, [response.items, order, orderBy]);

  const handleRequestSort = (key: SortKey) => {
    const isAsc = orderBy === key && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(key);
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
          rows={rows}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
      </TableContainer>
    </Paper>
  );
}
