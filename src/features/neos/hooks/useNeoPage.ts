import { useMemo, useState } from "react";
import { getComparator, Order, SortKey, stableSort } from "../utils";
import { NeosResponse } from "../types/NeosResponse";
import { UseNeoPageReturnType } from "../types/UseNeoPageRetrurnType";

type Props = { response: NeosResponse };

const useNeoPage = (response: NeosResponse): UseNeoPageReturnType => {
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

  return {
    order,
    orderBy,
    page,
    rowsPerPage,
    rows,
    pagedRows,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage
  }
}

export default useNeoPage;