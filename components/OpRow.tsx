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
  Tooltip,
  Checkbox,
} from "@mui/material";
import { Op, Operator } from "../types";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import OperatorRow from "./OperatorRow";

export default function OpRow({ op }: { op: Op }) {
  const [expandOp, setExpandOp] = useState(false);

  const getLocalTime = (date: string) => {
    const d = new Date(date);

    return `${d.toLocaleTimeString()}`;
  };
  return (
    <>
      <TableRow key={op.publicId}>
        <TableCell>{op.opTitle}</TableCell>
        <TableCell align="right">{op.publicId}</TableCell>
        <TableCell align="right">{op.operatorsNeeded}</TableCell>
        <TableCell align="right">{getLocalTime(op.startTime)}</TableCell>
        <TableCell align="right">{getLocalTime(op.endTime)}</TableCell>
        <TableCell width={60}>
          <Tooltip title={expandOp ? "Close Operators" : "See Operators"}>
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
              {/* <Typography variant="h6">Operators</Typography> */}
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        // checked={isItemSelected}
                        // inputProps={{
                        //   'aria-labelledby': labelId,
                        // }}
                      />
                    </TableCell> */}
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Ops Completed</TableCell>
                    <TableCell align="right">Reliability</TableCell>
                    <TableCell align="right">Endorsements</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {op.operators.map((operator) => (
                    <OperatorRow operator={operator} />
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
