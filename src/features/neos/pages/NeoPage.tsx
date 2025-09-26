import { useMemo, useState } from "react";
import {
  Paper,
  Toolbar,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import type { NeosResponse } from "../types/NeosResponse";
import NeoTable from "../components/NeoTable";
import useNeoPage from "../hooks/useNeoPage";
import { UseNeoPageReturnType } from "../types/UseNeoPageRetrurnType";

type Props = { response: NeosResponse };

export default function NeoPage({ response }: Props) {
  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    rows,
    pagedRows,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
  }: UseNeoPageReturnType = useNeoPage(response);

  return (
    <Paper variant="outlined">
      <Toolbar sx={{ px: 2 }}>
        <Typography variant="subtitle1">
          Results: {response.count} &nbsp; ({response.startDate} →{" "}
          {response.endDate})
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
