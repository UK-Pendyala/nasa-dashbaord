import { SortKey } from "../utils";
import { NeoItem } from "./NeoItem";


/**
 * @interface UseNeoPageReturnType - State and handlers exposed by the
 * NeoPage hook/component for managing sorting and pagination.
 *  @property order - Current sort order ('asc' | 'desc').
 *  @property orderBy - Current field used for sorting.
 *  @property page - Current page index (zero-based).
 *  @property rowsPerPage - Number of rows displayed per page.
 *  @property rows - Sorted full list of NEOs.
 *  @property pagedRows - Slice of rows for the current page.
 *  @property handleRequestSort - Callback to request a sort change.
 *  @property handleChangePage - Callback to update the current page.
 *  @property handleChangeRowsPerPage - Callback to update rows per page.
 */
export interface UseNeoPageReturnType {
  order: 'asc' | 'desc';
  orderBy: SortKey;
  page: number;
  rowsPerPage: number;
  rows: NeoItem[]; 
  pagedRows: NeoItem[]; 
  handleRequestSort: (key: SortKey) => void;
  handleChangePage: (_: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}