import { SortKey } from "../utils";
import { NeoItem } from "./NeoItem";

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