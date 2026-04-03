// Row component within the expanded section of each operation in the OpView table. Handles the check in and check out functionality for each operator using the useAttendanceRecord hook.

"use client";

import { TableRow, TableCell, Chip, Box, Button } from "@mui/material";
import { Operator } from "../types";
import { useAttendanceRecord } from "@/utils/AttendanceRecord";

export default function OperatorRow({
  operator,
  opId,
}: {
  operator: Operator;
  opId: string;
}) {
  const { checkIn, checkOut, getStatus } = useAttendanceRecord(); //get the checkIn, checkOut, and getStatus functions

  const status = getStatus(operator.id); //get the current status of the operator

  //function to handle check in with confirmation
  const handleCheckIn = () => {
    if (
      confirm(
        `Are you sure you want to check in ${operator.firstName} ${operator.lastName}?`,
      )
    ) {
      checkIn(operator.id, opId);
    }
  };

  //function to handle checkout with confirmation
  const handleCheckOut = () => {
    if (
      confirm(
        `Are you sure you want to check out ${operator.firstName} ${operator.lastName}?`,
      )
    ) {
      checkOut(operator.id, opId);
    }
  };

  let button; //variable to hold the button component to display based on the operator's current status

  //switch statement to determine which button to display based on the operator's current status
  switch (status) {
    case "checked_out":
      button = (
        <Button variant="contained" size="small" color="success" disabled>
          Complete
        </Button>
      );
      break;

    case "checked_in": //if checked in, show the check out button
      button = (
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={handleCheckOut}
        >
          Check Out
        </Button>
      );
      break;

    default: //if "not_started", show the check in button
      button = (
        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: "primary.dark" }}
          onClick={handleCheckIn}
        >
          Check In
        </Button>
      );
  }

  return (
    <TableRow
      key={operator.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }} //styling to remove border from last row
    >
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
          }}
        >
          {operator.endorsements.map(
            //display endorsements as chips
            (endorsement, index) => (
              <Chip
                label={endorsement}
                key={index}
                size="small"
                sx={{ backgroundColor: "alabaster.main" }}
              />
            ),
          )}
        </Box>
      </TableCell>
      <TableCell align="center">
        <Box>{button}</Box>
      </TableCell>
    </TableRow>
  );
}
