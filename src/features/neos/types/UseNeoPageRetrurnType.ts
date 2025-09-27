import { SortKey } from '../utils';
import { NeoItem } from './NeoItem';
import { Units } from './Units';

/**
 * @interface UseNeoPageReturnType - State and handlers exposed by the
 * NeoPage hook/component for managing sorting and pagination.
 *  @property order - Current sort order ('asc' | 'desc').
 *  @property orderBy - Current field used for sorting.
 *  @property page - Current page index (zero-based).
 *  @property rowsPerPage - Number of rows displayed per page.
 *  @property rows - Sorted full list of NEOs.
 *  @property pagedRows - Slice of rows for the current page.
 *  @property unit - Current unit system ('metric' | 'imperial').
 *  @property sizeKey - Field used for size sorting based on unit.
 *  @property closenessKey - Field used for closeness sorting based on unit.
 *  @property velocityKey - Field used for velocity sorting based on unit.
 *  @property handleRequestSort - Callback to request a sort change.
 *  @property handleChangePage - Callback to update the current page.
 *  @property handleChangeRowsPerPage - Callback to update rows per page.
 *  @property setUnit - Callback to change the unit system.
 */
export interface UseNeoPageReturnType {
  order: 'asc' | 'desc';
  orderBy: SortKey;
  page: number;
  rowsPerPage: number;
  rows: NeoItem[];
  pagedRows: NeoItem[];
  unit: Units;
  sizeKey: SortKey;
  closenessKey: SortKey;
  velocityKey: SortKey;
  handleRequestSort: (key: SortKey) => void;
  handleChangePage: (_: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setUnit: (unit: Units) => void;
}
