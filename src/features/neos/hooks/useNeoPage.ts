import { useEffect, useMemo, useState } from 'react';
import { getComparator, Order, SortKey, stableSort } from '../utils';
import { NeosResponse } from '../types/NeosResponse';
import { UseNeoPageReturnType } from '../types/UseNeoPageRetrurnType';
import { Units } from '../types/Units';

type LogicalKey = 'size' | 'closeness' | 'relativeVelocity';
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
  const [unit, setUnit] = useState<Units>('metric');

  // Current page number (zero-based)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const keyMap = useMemo(() => {
    return {
      size: unit === 'metric' ? 'sizeMeters' : 'sizeFeet',
      closeness: unit === 'metric' ? 'closenessKm' : 'closenessMiles',
      relativeVelocity: unit === 'metric' ? 'relativeVelocityKmH' : 'relativeVelocityMiH',
    } as const;
  }, [unit]);

  // Sort all rows according to current order and orderBy
  const rows = useMemo(() => {
    return stableSort(response.items, getComparator(order, orderBy));
  }, [response.items, order, orderBy]);

  // Slice sorted rows to show only the current page
  const pagedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return rows.slice(start, start + rowsPerPage);
  }, [rows, page, rowsPerPage]);

  const [sizeKey, closenessKey, velocityKey] = useMemo(() => {
    return unit === 'metric'
      ? (['sizeMeters', 'closenessKm', 'relativeVelocityKmH'] as const)
      : (['sizeFeet', 'closenessMiles', 'relativeVelocityMiH'] as const);
  }, [unit]);

  useEffect(() => {
    if (orderBy.toLowerCase().includes('meters') && unit === 'imperial') setOrderBy('sizeFeet');
    else if (orderBy.toLowerCase().includes('feet') && unit === 'metric') setOrderBy('sizeMeters');
    else if (orderBy.toLowerCase().includes('km') && unit === 'imperial')
      setOrderBy('closenessMiles');
    else if (orderBy.toLowerCase().includes('miles') && unit === 'metric')
      setOrderBy('closenessKm');
    else if (orderBy.toLowerCase().includes('kmh') && unit === 'imperial')
      setOrderBy('relativeVelocityMiH');
    else if (orderBy.toLowerCase().includes('mih') && unit === 'metric')
      setOrderBy('relativeVelocityKmH');
  }, [unit]);

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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    unit,
    sizeKey,
    closenessKey,
    velocityKey,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    setUnit,
  };
};

export default useNeoPage;
