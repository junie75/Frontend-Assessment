//Error component styling

"use client";

import { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

export default function ErrorPage({ error }: { error: Error }) {
  //log the full error for debugging
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h1" fontWeight={700} fontSize={50}>
            Error
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Oops, something went wrong.
          </Typography>
        </Box>

        <Alert severity="error">
          {error.message || "An unexpected error occurred."}
        </Alert>
        <Typography variant="subtitle2" color="text.primary">
          Try refreshing the page or contact support.
        </Typography>
      </Stack>
    </Container>
  );
}
