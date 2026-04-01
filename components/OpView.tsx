"use client";

import {
  Stack,
  Typography,
  Container,
  Box,
  Card,
  Collapse,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Op, Operator } from "../types";
import OperatorView from "./OperatorRow";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import OpRow from "./OpRow";

// const columns: GridColDef<Operator>[] = [
//   {
//     field: "firstName",
//     headerName: "First name",
//     width: 150,
//     editable: false,
//   },
//   {
//     field: "lastName",
//     headerName: "Last name",
//     width: 150,
//     editable: false,
//   },
//   {
//     field: "opsCompleted",
//     headerName: "Operations Completed",
//     type: "number",
//     width: 110,
//     editable: false,
//   },
//   {
//     field: "reliability",
//     headerName: "Reliability",
//     type: "number",
//     width: 110,
//     editable: false,
//     valueGetter: (value) => {
//       if (!value) {
//         return value;
//       }
//       return value * 100;
//     },
//     valueFormatter: (value?: number) => {
//       if (value == null) {
//         return "";
//       }
//       return `${value.toLocaleString()} %`;
//     },
//   },
//   {
//     field: "endorsements",
//     headerName: "Endorsments",
//     width: 800,
//     editable: false,
//     sortable: false,
//   },
// ];

export default function OpView({ ops }: { ops: Op[] }) {
  //   return (
  //     <Box
  //       sx={{
  //         // maxWidth: 800,
  //         p: 5,
  //         backgroundColor: "captain.three",
  //       }}
  //     >
  //       <Stack spacing={2}>
  //         <Typography variant="h1">{op.opTitle}</Typography>
  //         <Typography variant="h5">ID: {op.publicId}</Typography>
  //         <Typography variant="h5">
  //           Operators Needed: {op.operatorsNeeded}
  //         </Typography>
  //         <Typography variant="h5">
  //           Shift Time: {getLocalTime(op.startTime)} - {getLocalTime(op.endTime)}
  //         </Typography>
  //         <Typography variant="h5">Operators: </Typography>
  //       </Stack>

  //       <Box>
  //         <DataGrid
  //           rows={op.operators}
  //           columns={columns}
  //           //   initialState={{
  //           //     pagination: {
  //           //       paginationModel: {
  //           //         pageSize: 5,
  //           //       },
  //           //     },
  //           //   }}
  //           //   pageSizeOptions={[5]}
  //           checkboxSelection
  //           disableRowSelectionOnClick
  //         />
  //       </Box>

  //       {/* <Stack spacing={2}>
  //         {op.operators.map((operator) => (
  //           <OperatorView operator={operator} key={operator.id} />
  //         ))}
  //       </Stack> */}
  //     </Box>
  //   );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Op Title</TableCell>
            <TableCell align="right">Public ID</TableCell>
            <TableCell align="right">Operators Needed</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {ops.map((op) => (
            <OpRow op={op} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
