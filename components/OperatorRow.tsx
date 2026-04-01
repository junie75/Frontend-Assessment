"use client";

import {
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Stack,
  Checkbox,
  Button,
} from "@mui/material";
import { Operator } from "../types";
import { checkIn } from "@/app/page";

export default function OperatorRow({ operator }: { operator: Operator }) {
  // return (
  // <Box>
  //   <Stack>
  //     <Typography>
  //       Name: {operator.firstName} {operator.lastName}
  //     </Typography>
  //     <Typography>Operations Completed: {operator.opsCompleted}</Typography>
  //     <Typography>Reliability: {operator.reliability * 100}%</Typography>
  //     <Typography>
  //       Endorsements: {operator.endorsements.join(", ")}
  //     </Typography>
  //   </Stack>
  // </Box>
  // );

  return (
    <TableRow
      key={operator.id}
      // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      {/* <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          onChange={() => checkIn(operator.id)}
          // checked={isItemSelected}
          // inputProps={{
          //   'aria-labelledby': labelId,
          // }}
        />
      </TableCell> */}
      <TableCell>
        {operator.firstName} {operator.lastName}
      </TableCell>
      <TableCell align="right">{operator.opsCompleted}</TableCell>
      <TableCell align="right">{operator.reliability * 100}%</TableCell>
      <TableCell align="right">
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            flexWrap: "wrap",
            justifyContent: "right",
            // maxWidth: 500,
            // backgroundColor: "blue",
          }} /*spacing={0.5} direction={"row"} flexWrap={"wrap"} width={500}*/
        >
          {operator.endorsements.map((endorsement, index) => (
            <Chip label={endorsement} key={index} />
          ))}
        </Box>
      </TableCell>
      <TableCell align="right">
        <Button variant="contained">Check In</Button>
      </TableCell>
    </TableRow>
  );
}
