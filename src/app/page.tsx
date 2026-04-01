import {
  Container,
  Stack,
  Typography,
  Box,
  TextField,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import OperatorView from "../../components/OperatorRow";
import OpView from "../../components/OpView";
import { Op } from "../../types";

export const checkIn = (employeeId: number) => {
  console.log("user checked in", employeeId);
};

// type operatorStatus = [{opId: string, checkedIn: boolean, checkedInTime?: string, checkedOut: boolean, checkedOutTime: string }]

export default async function Home() {
  const res = await fetch("https://frontend-challenge.veryableops.com/");
  const data = await res.json();

  const ops: Op[] = data ?? [];

  console.log(data[0]);
  console.log("testing baby");

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "captain.one",
        p: 10,
      }}
    >
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          width: "100%",
        }}
        spacing={2}
      >
        <TextField
          id="filled-basic"
          label="Search..."
          variant="filled"
          color="secondary"
          // fullWidth={true}
          sx={{ backgroundColor: "captain.three" }}
        />
        <OpView ops={ops} />
      </Stack>
    </Box>
  );
}
