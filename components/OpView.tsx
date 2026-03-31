"use client";

import { Stack, Typography, Container, Box, Card } from "@mui/material";
import { Op, Operator } from "../types";
import OperatorView from "./OperatorView";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<Operator>[] = [
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: false,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: false,
  },
  {
    field: "opsCompleted",
    headerName: "Operations Completed",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "reliability",
    headerName: "Reliability",
    type: "number",
    width: 110,
    editable: false,
    valueGetter: (value) => {
      if (!value) {
        return value;
      }
      return value * 100;
    },
    valueFormatter: (value?: number) => {
      if (value == null) {
        return "";
      }
      return `${value.toLocaleString()} %`;
    },
  },
  {
    field: "endorsements",
    headerName: "Endorsments",
    width: 110,
    editable: false,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function OpView({ op }: { op: Op }) {
  const getLocalTime = (date: string) => {
    const d = new Date(date);

    return `${d.toLocaleTimeString()}`;
  };
  return (
    <Box
      sx={{
        // maxWidth: 800,
        p: 5,
        backgroundColor: "captain.three",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h1">{op.opTitle}</Typography>
        <Typography variant="h5">ID: {op.publicId}</Typography>
        <Typography variant="h5">
          Operators Needed: {op.operatorsNeeded}
        </Typography>
        <Typography variant="h5">
          Shift Time: {getLocalTime(op.startTime)} - {getLocalTime(op.endTime)}
        </Typography>
        <Typography variant="h5">Operators: </Typography>
      </Stack>

      <Box>
        <DataGrid
          rows={op.operators}
          columns={columns}
          //   initialState={{
          //     pagination: {
          //       paginationModel: {
          //         pageSize: 5,
          //       },
          //     },
          //   }}
          //   pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      {/* <Stack spacing={2}>
        {op.operators.map((operator) => (
          <OperatorView operator={operator} key={operator.id} />
        ))}
      </Stack> */}
    </Box>
  );
}
