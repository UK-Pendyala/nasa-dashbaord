import { Box, Chip, TableCell, TableRow, Typography } from "@mui/material";
import { NeoItem } from "../types/NeoItem";
import { formatKm, formatKmPerSec, formatMeters } from "../utils";

type NeoTableRowProps = {
  neoItem: NeoItem;
  rowNumber: number;
}

export default function NeoTableRow({ neoItem, rowNumber }: NeoTableRowProps) {
  return (
    <TableRow hover key={neoItem.id}>
      <TableCell>{rowNumber}</TableCell>
      <TableCell sx={{ maxWidth: 320 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography variant="body2" noWrap title={neoItem.name}>
            {neoItem.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="right">{formatMeters(neoItem.sizeMeters)}</TableCell>
      <TableCell align="right">{formatKm(neoItem.closenessKm)}</TableCell>
      <TableCell align="right">
        {formatKmPerSec(neoItem.relativeVelocityKmS)}
      </TableCell>
      <TableCell align="center">
        {neoItem.hazardous ? (
          <Chip size="small" color="error" label="Yes" />
        ) : (
          <Chip size="small" label="No" />
        )}
      </TableCell>
    </TableRow>
  );
}
