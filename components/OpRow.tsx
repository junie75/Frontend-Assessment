// Row component within Op table for displaying a single operation and its operators.
// Includes functionality for expanding/collapsing operator rows and sorting operators by name, ops completed, and reliability.

"use client";

import {
  Box,
  Collapse,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  TableSortLabel,
} from "@mui/material";
import { Op } from "../types";
import { useEffect, useMemo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import OperatorRow from "./OperatorRow";

type SortByKey = "name" | "opsCompleted" | "reliability"; //type for sorting keys for operators

export default function OpRow({
  op,
  toggleExpand,
}: {
  op: Op;
  toggleExpand: boolean | null;
}) {
  const [expandOp, setExpandOp] = useState(false); //state for whether the operator rows are expanded or collapsed, default to collapsed
  const [sortBy, setSortBy] = useState<SortByKey | null>(null); //state for which key to sort the operators by, default to no sorting
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); //state for sorting order default to ascending

  //if there is a change in toggleExpandAll from opView, match expandOp to it.
  useEffect(() => {
    if (toggleExpand != null) {
      setExpandOp(toggleExpand);
    }
  }, [toggleExpand]);

  //function to convert UTC time to local time for display in the table
  const getLocalTime = (date: string) => {
    const d = new Date(date);
    return `${d.toLocaleTimeString()}`;
  };

  //function to handle sorting when clicking on the table headers for operators
  const handleSort = (sortByKey: SortByKey) => {
    if (sortBy === sortByKey) {
      //toggles between ascending and descending order when clicking the same header
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      //if clicking new header, set sortBy to the new header and default to ascending order
      setSortBy(sortByKey);
      setSortOrder("asc");
    }
  };

  //function to sort the operators based on the current sortBy and sortOrder states
  const sortedOperators = useMemo(() => {
    const operatorsCopy = [...op.operators]; //create a copy of the operators array

    operatorsCopy.sort((a, b) => {
      //sort by name, ops completed, or reliability based on the current sortBy state and sort in ascending or descending order based on the current sortOrder state
      if (sortBy === "name") {
        const aName = `${a.firstName} ${a.lastName}`.trim().toLowerCase();
        const bName = `${b.firstName} ${b.lastName}`.trim().toLowerCase();

        return sortOrder === "asc"
          ? aName.localeCompare(bName)
          : bName.localeCompare(aName);
      }

      if (sortBy === "opsCompleted") {
        return sortOrder === "asc"
          ? a.opsCompleted - b.opsCompleted
          : b.opsCompleted - a.opsCompleted;
      }

      if (sortBy === "reliability") {
        return sortOrder === "asc"
          ? a.reliability - b.reliability
          : b.reliability - a.reliability;
      }

      //if no sorting, return 0 to keep original order
      return 0;
    });

    return operatorsCopy;
  }, [op.operators, sortBy, sortOrder]);

  return (
    <>
      <TableRow key={op.publicId}>
        <TableCell>{op.opTitle}</TableCell>
        <TableCell align="right">{op.publicId}</TableCell>
        <TableCell align="right">{op.operatorsNeeded}</TableCell>
        <TableCell align="right">{getLocalTime(op.startTime)}</TableCell>
        <TableCell align="right">{getLocalTime(op.endTime)}</TableCell>
        <TableCell width={60}>
          <Tooltip
            title={expandOp ? "Close Operators" : "See Operators"}
            aria-label={expandOp ? "Close Operators" : "See Operators"}
          >
            <IconButton onClick={() => setExpandOp((prev) => !prev)}>
              {expandOp ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      {/* operators table */}
      <TableRow>
        <TableCell colSpan={6} sx={{ py: 0, borderBottom: 0 }}>
          <Collapse in={expandOp} timeout="auto" unmountOnExit>
            <Box sx={{ my: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "panther.three" }}>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === "name"}
                        direction={sortBy === "name" ? sortOrder : undefined}
                        onClick={() => handleSort("name")}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={sortBy === "opsCompleted"}
                        direction={
                          sortBy === "opsCompleted" ? sortOrder : undefined
                        }
                        onClick={() => handleSort("opsCompleted")}
                      >
                        Ops Completed
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={sortBy === "reliability"}
                        direction={
                          sortBy === "reliability" ? sortOrder : undefined
                        }
                        onClick={() => handleSort("reliability")}
                      >
                        Reliability
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">Endorsements</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedOperators.map((operator) => (
                    <OperatorRow
                      key={operator.id}
                      operator={operator}
                      opId={op.opId}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
