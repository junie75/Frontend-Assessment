//Container for the main table view of operations and operators. Handles search and filter functionality, as well as the toggle to expand and collapse all operator rows.

"use client";

import {
  Typography,
  Container,
  Box,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Op } from "../types";
import { useMemo, useState } from "react";
import OpRow from "./OpRow";

export default function OpView({ ops }: { ops: Op[] }) {
  const [searchText, setSearchText] = useState(""); //state for search input
  const [toggleExpandAll, setToggleExpandAll] = useState<boolean>(true); //state for toggle switch to expand/collapse all operator rows, default to expand all

  //filter and sort ops based on search text
  const filteredOps = useMemo(() => {
    const term = searchText.toLowerCase().trim(); //clean and normalize search term for validation

    if (!term) return ops; //if search term is empty display all data

    const matches = ops
      .map((op) => {
        //check if operation title or public id match the search term
        const opMatches =
          op.opTitle.toLowerCase().includes(term) ||
          op.publicId.toLowerCase().includes(term);

        //check if operator first or last name matches the search term
        const matchingOperators = op.operators.filter(
          (operator) =>
            operator.firstName.toLowerCase().includes(term) ||
            operator.lastName.toLowerCase().includes(term),
        );

        //if there is a match for op, display op (with all the operators)
        if (opMatches) {
          return op;
        }

        //if there is not a match for op but there is a match for operators, display the op with only the matching operators
        if (matchingOperators.length > 0) {
          return {
            ...op,
            operators: matchingOperators,
          };
        }

        return null; //if no match at all return null
      })
      .filter((op): op is Op => op !== null); //filter out null values

    return matches;
  }, [ops, searchText]);

  //function to handle toggle switch for expanding/collapsing all operator rows
  const handleToggleSwitch = () => {
    if (toggleExpandAll === null) {
      setToggleExpandAll(true);
    }

    setToggleExpandAll((prev) => !prev);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormControlLabel
          control={
            <Switch
              color="default"
              defaultChecked
              onChange={handleToggleSwitch}
            />
          }
          label={toggleExpandAll ? "Toggle Close" : "Toggle Open"}
          sx={{ color: "primary.contrastText" }}
        />
        <TextField
          label="Search..."
          variant="filled"
          color="secondary"
          value={searchText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(event.target.value);
          }}
          sx={{ backgroundColor: "captain.three" }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="op table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "hulk.two" }}>
              <TableCell>Op Title</TableCell>
              <TableCell align="right">Public ID</TableCell>
              <TableCell align="right">Operators Needed</TableCell>
              <TableCell align="right">Start Time</TableCell>
              <TableCell align="right">End Time</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOps.length > 0 ? (
              filteredOps.map((op) => (
                <OpRow
                  op={op}
                  key={op.publicId}
                  toggleExpand={toggleExpandAll}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    No Results Found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
