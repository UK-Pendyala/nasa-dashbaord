import { useMemo, useState } from "react";
import { getComparator, Order, SortKey, stableSort } from "../utils";
import { NeosResponse } from "../types/NeosResponse";
import { UseNeoPageReturnType } from "../types/UseNeoPageRetrurnType";

type Props = { response: NeosResponse };

/**
 * useNeoPage
 * Custom hook for managing sorting and pagination of NEO table data.
 *
 * @param {NeosResponse} response - API response containing NEO items to display.
 * @returns {UseNeoPageReturnType} Sorting state, pagination state, derived rows,
 *   and handlers for table interactions.
 */
const useNeoPage = (response: NeosResponse): UseNeoPageReturnType => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<SortKey>('closenessKm');

   // Current page number (zero-based)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sort all rows according to current order and orderBy
  const rows = useMemo(() => {
    return stableSort(response.items, getComparator(order, orderBy));
  }, [response.items, order, orderBy]);


  // Slice sorted rows to show only the current page
  const pagedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return rows.slice(start, start + rowsPerPage);
  }, [rows, page, rowsPerPage]);

  // Toggle sort direction or change sorted column
  const handleRequestSort = (key: SortKey) => {
    const isAsc = orderBy === key && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(key);
  };

  // Update current page number
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Update rowsPerPage and reset to first page
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